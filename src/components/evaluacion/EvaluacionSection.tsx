import React, { useState } from 'react';
import { DragDropActivity } from './DragDropActivity';
import { QuizActivity } from './QuizActivity';
import { PracticalChallengeActivity } from './PracticalChallengeActivity';
import { Puzzle, FileQuestion, FolderGit2, CheckCircle2, Award, Download, School, Layers } from 'lucide-react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { getAssetUrl } from '../../utils/assetUrl';

export const EvaluacionSection: React.FC = () => {
  const { state, profile, scormInfo, radarScores } = useHabitRadar();
  const [activeTab, setActiveTab] = useState<'all' | 'act1' | 'act2' | 'act3'>('all');

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn">
      {/* Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
              Sección 3 · Evaluación del Aprendizaje
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              3 Actividades
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Evaluación Formativa y Sumativa
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl text-justify">
            Demuestra los conocimientos y destrezas prácticas adquiridas a través del emparejamiento interactivo de conceptos, el quiz teórico de 10 preguntas y la entrega de tu reto práctico del cubo 3D.
          </p>
        </div>

        {/* Global Evaluation Snapshot */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-mono">Radar de Hábitos:</span>
            <span className="text-sm font-bold text-white block">{profile.title}</span>
            <span className="text-xs font-mono text-amber-400 font-bold">{profile.score}% Eficiencia</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* SCORM / LMS Sincronización e Información Institucional */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <School className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Sincronización con Plataformas Educativas (LMS)
              </h3>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                scormInfo.connected 
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}>
                {scormInfo.connected 
                  ? `Conectado a LMS (${scormInfo.studentName || 'Estudiante'} · SCORM ${scormInfo.version})` 
                  : 'Estándar SCORM 1.2 Compatible'}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Las calificaciones de las 3 actividades (ponderación 0-100%) y el estado de aprobación (umbral mínimo: 70%) se transmiten automáticamente al libro de calificaciones de Moodle, Canvas, Blackboard o Chamilo vía API SCORM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
          <a
            href={getAssetUrl('ova-blender-scorm.zip')}
            download="ova-blender-scorm.zip"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
            title="Descargar paquete .ZIP en formato SCORM 1.2 para importar en tu aula virtual"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Descargar Paquete SCORM (.ZIP)</span>
          </a>
        </div>
      </div>

      {/* Sub-Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 max-w-xl mx-auto overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Ver Todas (3)
        </button>

        <button
          onClick={() => setActiveTab('act1')}
          className={`flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'act1'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Puzzle className="w-3.5 h-3.5" />
          <span>1. Conecta</span>
        </button>

        <button
          onClick={() => setActiveTab('act2')}
          className={`flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'act2'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileQuestion className="w-3.5 h-3.5" />
          <span>2. Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('act3')}
          className={`flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'act3'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>3. Reto Práctico</span>
        </button>
      </div>

      {/* Activities Display */}
      {(activeTab === 'all' || activeTab === 'act1') && (
        <div id="actividad-1">
          <DragDropActivity />
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'act2') && (
        <div id="actividad-2">
          <QuizActivity />
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'act3') && (
        <div id="actividad-3">
          <PracticalChallengeActivity />
        </div>
      )}
    </div>
  );
};
