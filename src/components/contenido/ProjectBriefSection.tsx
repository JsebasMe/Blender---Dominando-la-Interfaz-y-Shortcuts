import React from 'react';
import { KeyBadge } from '../common/KeyBadge';
import { 
  FolderGit2, 
  Box, 
  Camera, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface ProjectBriefSectionProps {
  onGoToEvaluation: () => void;
}

export const ProjectBriefSection: React.FC<ProjectBriefSectionProps> = ({ onGoToEvaluation }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold">
            Subtemática 1.5
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proyecto Práctico Final: "Del Cubo a mi Creación"
          </h2>
        </div>
      </div>

      {/* Narrative Context with text-justify */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Ha llegado el momento de aplicar todo lo aprendido. El objetivo de este proyecto es iniciar con el clásico cubo por defecto de Blender y, utilizando únicamente los atajos de teclado y herramientas de edición de mallas (<span className="text-amber-400 font-semibold">Extrude</span>, <span className="text-amber-400 font-semibold">Loop Cut</span>, <span className="text-amber-400 font-semibold">Transformaciones G, R, S</span>), esculpir un nuevo objeto tridimensional reconocible (como una silla, una espada, una mesa o un vehículo simple).
        </p>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Este ejercicio pone a prueba tanto la agilidad en la manipulación espacial como la disciplina de modelado limpio (evitar caras invertidas y vértices duplicados). Podrás presentar tus avances en la Sección de Evaluación a través del simulador de entrega oficial.
        </p>
      </div>

      {/* 4 Pillars of Project Delivery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Objeto Reconocible</h3>
          <p className="text-xs text-slate-300 text-justify leading-relaxed">
            Esculpe una pieza con proporciones creíbles (silla, espada, cohete o prop) a partir del cubo original.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Archivo .blend</h3>
          <p className="text-xs text-slate-300 text-justify leading-relaxed">
            Guarda tu escena mediante <KeyBadge keys={["Ctrl", "S"]} size="sm" /> asegurando que la malla conserve su historial limpio.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Camera className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Captura del Viewport</h3>
          <p className="text-xs text-slate-300 text-justify leading-relaxed">
            Captura una imagen PNG/JPG clara de tu modelo en perspectiva para apreciar la topología poligonal.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">4. Explicación Técnica</h3>
          <p className="text-xs text-slate-300 text-justify leading-relaxed">
            Describe brevemente la secuencia de atajos y operaciones realizadas para llegar al producto final.
          </p>
        </div>
      </div>

      {/* Checklist banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Fase de Aplicación
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            ¿Terminaste de estudiar las temáticas teóricas y procedimentales?
          </h4>
          <p className="text-xs text-slate-300">
            Avanza a la Sección 3: Evaluación para realizar el emparejamiento interactivo, el quiz de 10 preguntas y cargar tu proyecto.
          </p>
        </div>

        <button
          onClick={onGoToEvaluation}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 shrink-0"
        >
          <span>Ir a la Sección 3: Evaluación</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
