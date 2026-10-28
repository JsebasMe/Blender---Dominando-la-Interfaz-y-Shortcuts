import React from 'react';
import { HeroCover } from './HeroCover';
import { IntroVideoSection } from './IntroVideoSection';
import { Contextualizacion } from './Contextualizacion';
import { PodcastPlayer } from './PodcastPlayer';
import { CompetenciasCards } from './CompetenciasCards';
import { InstallationTutorial } from './InstallationTutorial';
import { WelcomeVideoModal } from './WelcomeVideoModal';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

interface IntroduccionSectionProps {
  onGoToContenido: () => void;
}

export const IntroduccionSection: React.FC<IntroduccionSectionProps> = ({ onGoToContenido }) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn">
      {/* 5.1 Portada de Bienvenida */}
      <HeroCover onStartLearning={onGoToContenido} />

      {/* Video Oficial de Introducción al OVA por el Autor */}
      <IntroVideoSection />

      {/* 5.2 Presentación y Contextualización */}
      <Contextualizacion />

      {/* Podcast Oficial: Blender sin Límites */}
      <PodcastPlayer />

      {/* 5.3 Competencias de Aprendizaje (SABER / SABER HACER) */}
      <CompetenciasCards />

      {/* 5.4 Tutorial Interactivo para Instalar Blender */}
      <InstallationTutorial />

      {/* 5.5 Videos de Bienvenida y Recursos Audiovisuales */}
      <WelcomeVideoModal />

      {/* Section Footer / Transition to Contenido */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
            <BookOpenCheck className="w-4 h-4" />
            Etapa de Introducción Completada
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            ¿Listo para explorar la interfaz y dominar los shortcuts?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl text-justify sm:text-left">
            Avanza a la Sección de Contenido donde interactuarás con el diagrama etiquetado de la interfaz, el simulador 3D y las herramientas de corte y extrusión.
          </p>
        </div>

        <button
          onClick={onGoToContenido}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 shrink-0"
        >
          <span>Ir a la Sección 2: Contenido</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
