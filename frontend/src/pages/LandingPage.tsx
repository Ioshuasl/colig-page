import { ArrowRight, Calendar, ChevronRight, GraduationCap, Mail, Newspaper, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { SpotlightCard } from '../components/SpotlightCard';
import { LigaModal } from '../components/admin/ligas/LigaModal';
import { useData } from '../hooks/useData';
import { cn } from '../lib/utils';
import type { Liga } from '../types';

export function LandingPage() {
  const { members, events, news, ligas } = useData();
  const [eventFilter, setEventFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [ligaDetalhe, setLigaDetalhe] = useState<Liga | null>(null);

  const filteredEvents = events.filter(e => eventFilter === 'all' || e.status === eventFilter);

  const ligasAtivas = useMemo(
    () =>
      [...ligas]
        .filter((l) => l.ativo)
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
    [ligas]
  );

  const sectionShell = "max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-8";

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
      {/* Hero Section */}
      <section
        className={`relative ${sectionShell} pt-10 sm:pt-14 md:pt-20 pb-14 sm:pb-20 md:pb-28 flex flex-col items-center text-center`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,800px)] h-[min(100vw,800px)] max-h-[70vh] bg-primary/20 rounded-full blur-[100px] sm:blur-[120px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-5 sm:mb-8 max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white/80 text-left leading-snug">
            Conselho de Ligas Acadêmicas de Medicina
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 sm:mb-8 max-w-4xl leading-[1.12] sm:leading-tight"
        >
          Tudo o que a medicina pode ser, começa quando{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-light-teal">você vai além</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-0.5"
        >
          Explore oportunidades em ensino, pesquisa e extensão com as Ligas
          Acadêmicas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col min-[400px]:flex-row w-full min-[400px]:w-auto gap-3 sm:gap-4 min-[400px]:justify-center"
        >
          <a
            href="#ligas"
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary hover:bg-light-teal text-white text-sm sm:text-base font-medium transition-colors flex items-center justify-center gap-2 group min-h-[44px]"
          >
            Ligas Acadêmicas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://drive.google.com/drive/folders/1EIvDTN5Y508h65J14J2jhxSzaL1nxiTC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm sm:text-base font-medium transition-colors flex items-center justify-center min-h-[44px]"
          >
            Drive Colig
          </a>
        </motion.div>
      </section>

      {/* Bento Grid - Quem Somos */}
      <section id="about" className={`scroll-mt-24 sm:scroll-mt-28 ${sectionShell} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl min-[390px]:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Quem Somos</h2>
          <p className="text-white/60 max-w-2xl text-sm sm:text-base leading-relaxed">
          Somos o órgão central que conecta, organiza e impulsiona a vivência acadêmica na
medicina. Promovemos, coordenamos e fiscalizamos as Ligas Acadêmicas com o objetivo
de criar, junto a elas, um amplo espaço de possibilidades e aprendizado.

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-0 sm:min-h-[260px] md:min-h-[300px] p-5 sm:p-6 md:p-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa História</h3>
              <p className="text-white/70 leading-relaxed">
                Fundado com o objetivo de unificar os esforços das ligas acadêmicas, o COLIG atua como o órgão representativo máximo das atividades extracurriculares da Faculdade de Medicina de Goianésia.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col justify-between min-h-0 sm:min-h-[220px] md:min-h-[300px] bg-primary/10 border-primary/20 p-5 sm:p-6 md:p-8">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">35+</h3>
              <p className="text-white/80 font-medium mb-4">Ligas Ativas</p>
              <p className="text-sm text-white/60">Abrangendo diversas especialidades médicas e áreas de atuação.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col justify-between min-h-0 sm:min-h-[220px] md:min-h-[300px] p-5 sm:p-6 md:p-8">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">CONMEGO</h3>
              <p className="text-white/80 font-medium mb-4">Congresso de Medicina de Goianésia</p>
              <p className="text-sm text-white/60">Coorganizador do principal evento
              acadêmico da região.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-0 sm:min-h-[260px] md:min-h-[300px] p-5 sm:p-6 md:p-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Equipe de Gestão</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {members.slice(0, 3).map(member => (
                  <div key={member.id} className="flex flex-col items-center text-center">
                    <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/10" />
                    <h4 className="font-medium text-white">{member.name}</h4>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Ligas acadêmicas */}
      <section id="ligas" className={`scroll-mt-24 sm:scroll-mt-28 ${sectionShell} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-primary mb-3 sm:mb-4">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Parceiras do COLIG
          </div>
          <h2 className="text-2xl min-[390px]:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Ligas acadêmicas</h2>
          <p className="text-white/60 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            Conheça as ligas que integram o conselho e fortalecem a formação médica na instituição.
          </p>
        </div>

        {ligasAtivas.length === 0 ? (
          <SpotlightCard className="max-w-2xl mx-auto text-center py-10 sm:py-12 md:py-14 p-5 sm:p-6 md:p-8">
            <GraduationCap className="w-10 h-10 text-primary/80 mx-auto mb-4" aria-hidden />
            <p className="text-white/70">
              A lista de ligas será publicada em breve. Volte mais tarde ou entre em contato com o COLIG.
            </p>
          </SpotlightCard>
        ) : (
          <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 min-[420px]:gap-4 md:gap-5 list-none p-0 m-0">
            {ligasAtivas.map((liga, index) => (
              <motion.li
                key={liga.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
              >
                <SpotlightCard
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir detalhes da liga ${liga.nome}`}
                  className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) return;
                    setLigaDetalhe(liga);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    if ((e.target as HTMLElement).closest("a")) return;
                    e.preventDefault();
                    setLigaDetalhe(liga);
                  }}
                >
                  <div className="relative h-36 min-[375px]:h-40 sm:h-44 md:aspect-[16/10] md:h-auto md:min-h-[12rem] bg-white/5 border-b border-white/10 overflow-hidden shrink-0">
                    <img
                      src={liga.logo_url || `https://picsum.photos/seed/liga-${liga.id}/600/400`}
                      alt={liga.nome}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-lg bg-black/55 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        {liga.sigla}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0">
                    <h3 className="text-base min-[390px]:text-lg md:text-xl font-bold leading-snug mb-1.5 sm:mb-2 line-clamp-2">
                      {liga.nome}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/55 mb-0.5">Presidente</p>
                    <p className="text-sm md:text-base text-white/85 font-medium mb-2 sm:mb-3 line-clamp-2">
                      {liga.presidente}
                    </p>
                    {liga.descricao ? (
                      <p className="text-xs sm:text-sm text-white/60 line-clamp-3">{liga.descricao}</p>
                    ) : null}
                    {liga.email ? (
                      <a
                        href={`mailto:${liga.email}`}
                        className={cn(
                          "inline-flex items-center gap-2 py-1.5 -mx-0.5 px-0.5 text-xs sm:text-sm font-medium text-primary hover:text-light-teal transition-colors rounded-lg",
                          liga.descricao ? "mt-3 sm:mt-4" : "mt-2 sm:mt-3"
                        )}
                      >
                        <Mail className="w-4 h-4 shrink-0" aria-hidden />
                        <span className="truncate">{liga.email}</span>
                      </a>
                    ) : null}
                  </div>
                </SpotlightCard>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      {/* Eventos */}
      <section id="events" className={`scroll-mt-24 sm:scroll-mt-28 ${sectionShell} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
          <div className="min-w-0">
            <h2 className="text-2xl min-[390px]:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Eventos</h2>
            <p className="text-white/60 max-w-2xl text-sm sm:text-base">
              Participe dos nossos simpósios, congressos e workshops.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 p-1 bg-white/5 rounded-2xl sm:rounded-full border border-white/10 w-full md:w-auto md:shrink-0">
            {(['all', 'upcoming', 'past'] as const).map(filter => (
              <button
                key={filter}
                type="button"
                onClick={() => setEventFilter(filter)}
                className={cn(
                  "flex-1 sm:flex-none min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-medium transition-colors",
                  eventFilter === filter ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                )}
              >
                {filter === 'all' ? 'Todos' : filter === 'upcoming' ? 'Próximos' : 'Realizados'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 min-[420px]:max-md:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredEvents.map(event => (
            <SpotlightCard key={event.id} className="p-0 overflow-hidden group">
              <div className="h-40 sm:h-44 md:h-48 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-medium text-white">
                  {event.category}
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 shrink-0" />
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 leading-snug">{event.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm line-clamp-2 leading-relaxed">{event.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Notícias */}
      <section id="news" className={`scroll-mt-24 sm:scroll-mt-28 ${sectionShell} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl min-[390px]:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Últimas Notícias</h2>
          <p className="text-white/60 max-w-2xl text-sm sm:text-base">Fique por dentro das novidades e editais.</p>
        </div>

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {news.map(item => (
            <SpotlightCard key={item.id} className="flex flex-col justify-between group cursor-pointer p-5 sm:p-6 md:p-8">
              <div>
                <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">
                  <Newspaper className="w-4 h-4 shrink-0" />
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">
                  {item.summary}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center text-primary text-xs sm:text-sm font-medium">
                Ler mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <LigaModal liga={ligaDetalhe} onClose={() => setLigaDetalhe(null)} />
    </div>
  );
}
