import React from 'react';
import { PIPELINE_WORKFLOW } from '../../data/contentData';
import { 
  Box, 
  Bone, 
  PlayCircle, 
  Flame, 
  Camera, 
  Layers, 
  Sparkles, 
  ExternalLink,
  Quote
} from 'lucide-react';

export const PipelineCards: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box': return Box;
      case 'Bone': return Bone;
      case 'PlayCircle': return PlayCircle;
      case 'Flame': return Flame;
      case 'Camera': return Camera;
      case 'Layers': return Layers;
      default: return Sparkles;
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Temática 1
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Introducción a Blender y su Pipeline de Trabajo
          </h2>
        </div>
      </div>

      {/* Conceptual Explanation with text-justify */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Blender es una suite de creación 3D gratuita y de código abierto que soporta la totalidad del pipeline de producción: modelado, rigging, animación, simulación, renderizado y composición. Su adopción a nivel global responde a su versatilidad y constante evolución, consolidándose como un entorno integral tanto para la industria creativa como para la investigación académica.
        </p>

        {/* Academic Citation Box */}
        <div className="p-5 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 border-slate-800">
          <p className="text-sm text-amber-100/90 italic text-justify leading-relaxed">
            “Consideramos que Blender es útil no solo como simulador virtual y herramienta de visualización, sino también como herramienta de diseño de modelado de objetos necesarios para la experimentación real.”
          </p>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>(Hattori, Masuda, Moritoh, Imai, Kawakami & Tanaka, 2020)</span>
            <a 
              href="https://ieeexplore.ieee.org/document/9368412" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <span>Ver IEEE TALE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          A diferencia de paquetes comerciales fragmentados donde el artista debe exportar archivos entre múltiples programas independientes, Blender unifica todo el ciclo de vida de un activo digital dentro de un mismo entorno homogéneo, manteniendo coherencia de escalas, materiales y coordenadas de visualización.
        </p>
      </div>

      {/* 6 Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {PIPELINE_WORKFLOW.map((step, idx) => {
          const Icon = getIcon(step.icon);
          return (
            <div
              key={step.id}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 group-hover:bg-amber-500/20 text-amber-400 border border-slate-700/60 group-hover:border-amber-500/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-amber-400/80 transition-colors">
                    Fase 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {step.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 block mb-2">
                    {step.english}
                  </span>
                  <p className="text-xs text-slate-300 text-justify leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-500">Resultado:</span>
                <span className="font-medium text-amber-400/90">{step.deliverable}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
