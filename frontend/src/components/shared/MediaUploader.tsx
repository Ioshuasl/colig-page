import { ImagePlus, Loader2, RefreshCcw, X } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, DragEvent } from "react";
import { s3Service } from "../../services";
import { cn } from "../../lib/utils";

interface MediaUploaderProps {
  media?: string | null;
  onMediaChange: (url: string) => void;
  acceptedFormats?: string;
  folder?: string;
  label?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  maxSizeMb?: number;
}

export function MediaUploader({
  media,
  onMediaChange,
  acceptedFormats = "image/*",
  folder = "uploads",
  label = "Imagem",
  helperText = "Clique, arraste ou cole (Ctrl+V) para enviar uma imagem.",
  className,
  disabled = false,
  maxSizeMb = 8,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerInput = () => {
    if (disabled || isUploading) {
      return;
    }
    fileInputRef.current?.click();
  };

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "Selecione um arquivo de imagem valido.";
    }

    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return `A imagem deve ter no maximo ${maxSizeMb}MB.`;
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const { url } = await s3Service.upload(file, folder);
      onMediaChange(url);
    } catch {
      setError("Nao foi possivel enviar a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await uploadFile(file);
    event.target.value = "";
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    await uploadFile(file);
  };

  const handlePaste = async (event: ClipboardEvent<HTMLDivElement>) => {
    const clipboardItems = event.clipboardData?.items;
    if (!clipboardItems?.length) {
      return;
    }

    const imageItem = Array.from(clipboardItems as ArrayLike<DataTransferItem>).find((item) =>
      item.type.startsWith("image/")
    );

    const file = imageItem?.getAsFile();
    if (!file) {
      return;
    }

    event.preventDefault();
    await uploadFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-white/80">{label}</label>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        className="hidden"
        onChange={(event) => void handleFileChange(event)}
        disabled={disabled || isUploading}
      />

      <div
        tabIndex={0}
        onClick={triggerInput}
        onPaste={(event) => void handlePaste(event)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => void handleDrop(event)}
        className={cn(
          "relative rounded-2xl border transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/10" : "border-white/15 bg-white/5",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {!media && (
          <div className="h-48 rounded-xl border border-white/10 bg-darkest/60 flex flex-col items-center justify-center text-center px-4">
            {isUploading ? (
              <Loader2 className="w-7 h-7 text-primary animate-spin mb-3" />
            ) : (
              <ImagePlus className="w-7 h-7 text-primary mb-3" />
            )}
            <p className="text-sm font-medium">
              {isUploading ? "Enviando imagem..." : "Adicionar imagem"}
            </p>
            <p className="text-xs text-white/60 mt-1">{helperText}</p>
          </div>
        )}

        {media && (
          <div className="relative group">
            <img
              src={media}
              alt="Preview da midia"
              className="w-full h-52 rounded-xl object-cover border border-white/10"
            />

            <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    triggerInput();
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors flex items-center justify-center"
                  title="Trocar imagem"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onMediaChange("");
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white hover:bg-red-500/90 transition-colors flex items-center justify-center"
                  title="Remover imagem"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

            {isUploading && (
              <div className="absolute inset-0 rounded-xl bg-black/60 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              </div>
            )}
          </div>
        )}

      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
