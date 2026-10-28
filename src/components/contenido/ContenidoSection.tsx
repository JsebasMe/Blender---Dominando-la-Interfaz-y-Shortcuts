import React, { useState } from 'react';
import { PipelineCards } from './PipelineCards';
import { IndustryGallery } from './IndustryGallery';
import { LabeledGraphicsInterface } from './LabeledGraphicsInterface';
import { Viewport3DSimulator } from './Viewport3DSimulator';
import { SelectionTransformSection } from './SelectionTransformSection';
import { MeshEditingSection } from './MeshEditingSection';
import { ProjectBriefSection } from './ProjectBriefSection';
import { BibliographySection } from './BibliographySection';
import { ArrowRight, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface ContenidoSectionProps {
  onGoToEvaluation: () => void;
}

export const ContenidoSection: React.FC<ContenidoSectionProps> = ({ onGoToEvaluation }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('all');

  const subSections = [
    { id: 'all', label: 'Ver Todo el Contenido' },
    { id: 'pipeline', label: '1. Pipeline 3D' },
    { id: 'industria', label: '1.1 Industria & Cine' },
    { id: 'interfaz', label: '1.2 Interfaz Interactiva' },
    { id: 'espacio', label: '1.2.1 Espacio 3D & Ejes' },
    { id: 'transformacion', label: '1.3 Shortcuts G, R, S' },
    { id: 'modelado', label: '1.4 Edición de Mallas' },
    { id: 'proyecto', label: '1.5 Proyecto del Cubo' },
    { id: 'referencias', label: 'Bibliografía APA 7' }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn">
      {/* Sub-navigation bar */}
      <div className="sticky top-16 md:top-20 z-30 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {subSections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id);
                if (tab.id !== 'all') {
                  const elem = document.getElementById(tab.id);
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Introducción a Blender y Pipeline */}
      <div id="pipeline">
        <PipelineCards />
      </div>

      {/* 1.1 Blender en la Industria */}
      <div id="industria">
        <IndustryGallery />
      </div>

      {/* 1.2 Interfaz y Navegación (Labeled Graphics) */}
      <div id="interfaz">
        <LabeledGraphicsInterface />
      </div>

      {/* 1.2.1 Espacio 3D y Navegación (Three.js WebGL Simulator) */}
      <div id="espacio">
        <Viewport3DSimulator />
      </div>

      {/* 1.3 Selección y Transformación & 1.3.1 Shortcuts */}
      <div id="transformacion">
        <SelectionTransformSection />
      </div>

      {/* 1.4 Edición de Mallas & 1.4.1 Herramientas */}
      <div id="modelado">
        <MeshEditingSection />
      </div>

      {/* 1.5 Proyecto y Evaluación Final */}
      <div id="proyecto">
        <ProjectBriefSection onGoToEvaluation={onGoToEvaluation} />
      </div>

      {/* Bibliografía APA 7 */}
      <div id="referencias">
        <BibliographySection />
      </div>

      {/* Final transition banner to Sección 3 */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Temáticas del Contenido Completadas
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Demuestra tu dominio en la Sección de Evaluación
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl text-justify sm:text-left">
            Realiza la Actividad 1 (Arrastrar y Conectar), supera el Quiz de 10 preguntas y entrega tu Reto Práctico del Cubo para certificar tu avance.
          </p>
        </div>

        <button
          onClick={onGoToEvaluation}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 shrink-0"
        >
          <span>Ir a la Sección 3: Evaluación</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
