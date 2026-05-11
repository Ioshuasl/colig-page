import { useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X, Mail, User, Phone, UserCircle, GraduationCap } from "lucide-react";
import type { Liga } from "../../../types";

export interface LigaModalProps {
  liga: Liga | null;
  onClose: () => void;
}

function nonEmpty(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function InfoRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 py-3.5 border-b border-white/[0.06] last:border-b-0">
      <div className="mt-0.5 shrink-0 text-primary/90">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40 mb-1">{label}</p>
        <div className="text-sm sm:text-[15px] text-white/88 leading-snug">{children}</div>
      </div>
    </div>
  );
}

export function LigaModal({ liga, onClose }: LigaModalProps) {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!liga) return;
    window.addEventListener("keydown", handleKeydown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = prev;
    };
  }, [liga, handleKeydown]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {liga ? (
        <motion.div
          key={liga.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="liga-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
            aria-label="Fechar modal"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className="relative z-[1] my-auto w-full max-w-md sm:max-w-lg max-h-[min(88dvh,820px)] overflow-hidden rounded-3xl border border-white/10 bg-darkest/95 shadow-2xl shadow-black/40 flex flex-col ring-1 ring-white/[0.04]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior — alinhada à linguagem da landing */}
            <div className="relative shrink-0 border-b border-white/10 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 sm:right-5 sm:top-5 rounded-xl p-2 text-white/45 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden />
              </button>

              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5 pr-10 sm:pr-12">
                <div className="mb-4 shrink-0 sm:mb-0">
                  <div className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden flex items-center justify-center shadow-inner">
                    {nonEmpty(liga.logo_url) ? (
                      <img
                        src={liga.logo_url}
                        alt=""
                        className="h-full w-full object-contain p-1.5"
                      />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-primary/55" aria-hidden />
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary/90">
                    Liga acadêmica
                  </p>
                  <h2 id="liga-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    {liga.nome}
                  </h2>
                  <p className="text-sm text-white/45 font-medium tracking-wide" aria-label={`Sigla ${liga.sigla}`}>
                    {"\u201C"}
                    {liga.sigla}
                    {"\u201D"}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
              {nonEmpty(liga.descricao) ? (
                <div className="mb-5 sm:mb-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/38 mb-2.5">Sobre a liga</p>
                  <p className="text-[15px] sm:text-base leading-relaxed text-white/72 whitespace-pre-wrap rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 sm:px-5 sm:py-4">
                    {liga.descricao}
                  </p>
                </div>
              ) : null}

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/38 mb-1">Representação</p>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 sm:px-4">
                  <InfoRow label="Presidente" icon={<User className="w-4 h-4" aria-hidden />}>
                    {liga.presidente}
                  </InfoRow>

                  {nonEmpty(liga.contato_presidente) ? (
                    <InfoRow label="Contato do presidente" icon={<Phone className="w-4 h-4" aria-hidden />}>
                      {liga.contato_presidente}
                    </InfoRow>
                  ) : null}

                  {nonEmpty(liga.vice_presidente) ? (
                    <InfoRow label="Vice-presidente" icon={<UserCircle className="w-4 h-4" aria-hidden />}>
                      {liga.vice_presidente}
                    </InfoRow>
                  ) : null}

                  {nonEmpty(liga.contato_vice_presidente) ? (
                    <InfoRow label="Contato do vice-presidente" icon={<Phone className="w-4 h-4" aria-hidden />}>
                      {liga.contato_vice_presidente}
                    </InfoRow>
                  ) : null}

                  {nonEmpty(liga.email) ? (
                    <InfoRow label="E-mail" icon={<Mail className="w-4 h-4" aria-hidden />}>
                      <a
                        href={`mailto:${liga.email}`}
                        className="text-primary hover:text-light-teal transition-colors break-all underline-offset-2 hover:underline"
                      >
                        {liga.email}
                      </a>
                    </InfoRow>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/10 px-5 py-4 sm:px-6 flex justify-end bg-black/20">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 rounded-full border border-white/15 bg-white/[0.06] text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
