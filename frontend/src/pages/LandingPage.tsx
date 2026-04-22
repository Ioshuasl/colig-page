import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Newspaper, ChevronRight } from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { useData } from '../hooks/useData';
import { cn } from '../lib/utils';

export function LandingPage() {
  const { members, events, news } = useData();
  const [eventFilter, setEventFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = events.filter(e => eventFilter === 'all' || e.status === eventFilter);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-white/80">Conselho de Ligas Acadêmicas</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl"
        >
          Integrando o conhecimento médico em <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-light-teal">Goianésia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
        >
          O COLIG une as ligas acadêmicas da Faculdade de Medicina, promovendo excelência em pesquisa, ensino e extensão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#events" className="px-8 py-4 rounded-full bg-primary hover:bg-light-teal text-white font-medium transition-colors flex items-center justify-center gap-2 group">
            Ver Eventos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#about" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center">
            Conheça o COLIG
          </a>
        </motion.div>
      </section>

      {/* Bento Grid - Quem Somos */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem Somos</h2>
          <p className="text-white/60 max-w-2xl">Nossa missão é fomentar a educação médica continuada através da integração das diversas ligas acadêmicas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-[300px]">
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

          <SpotlightCard className="flex flex-col justify-between min-h-[300px] bg-primary/10 border-primary/20">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
              <p className="text-white/80 font-medium mb-4">Ligas Ativas</p>
              <p className="text-sm text-white/60">Abrangendo diversas especialidades médicas e áreas de atuação.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-white/80 font-medium mb-4">Alunos Impactados</p>
              <p className="text-sm text-white/60">Participação ativa em simpósios, workshops e projetos de extensão.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-[300px]">
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

      {/* Eventos */}
      <section id="events" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eventos</h2>
            <p className="text-white/60 max-w-2xl">Participe dos nossos simpósios, congressos e workshops.</p>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
            {(['all', 'upcoming', 'past'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setEventFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  eventFilter === filter ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                )}
              >
                {filter === 'all' ? 'Todos' : filter === 'upcoming' ? 'Próximos' : 'Realizados'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <SpotlightCard key={event.id} className="p-0 overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-white/60 text-sm line-clamp-2">{event.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Notícias */}
      <section id="news" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimas Notícias</h2>
          <p className="text-white/60 max-w-2xl">Fique por dentro das novidades e editais.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map(item => (
            <SpotlightCard key={item.id} className="flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                  <Newspaper className="w-4 h-4" />
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.summary}</p>
              </div>
              <div className="mt-6 flex items-center text-primary text-sm font-medium">
                Ler mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}
