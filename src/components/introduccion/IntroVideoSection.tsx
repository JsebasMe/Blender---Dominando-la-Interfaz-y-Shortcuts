import React from 'react';
import { Film, ExternalLink, Sparkles, Users } from 'lucide-react';

export const IntroVideoSection: React.FC = () => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Video Oficial de Introducción
              </span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Bienvenida de los Autores
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Presentación del Objeto Virtual de Aprendizaje
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sebastián Mendieta y Danna Duarte</span>
          </span>

          <a
            href="https://youtu.be/DvyefF3lQS4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-400 font-medium transition-colors"
          >
            <span>Ver en YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 16:9 YouTube Video Embed Container */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src="https://www.youtube.com/embed/DvyefF3lQS4?rel=0"
            title="Video Oficial de Introducción al OVA - Sebastián Mendieta y Danna Duarte"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Card Footer info */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-amber-400 font-semibold block">
              Bienvenida e inducción metodológica del OVA
            </span>
            <p className="text-slate-300 text-justify sm:text-left">
              Conoce el alcance del objeto de aprendizaje, el enfoque práctico hacia los shortcuts y cómo dominar el modelado 3D en Blender, presentado por los autores Juan Sebastián Mendieta Pineda y Danna Nickol Duarte Duarte.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Video Oficial
            </span>
            <span className="text-[11px] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 font-medium">
              YouTube HD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
