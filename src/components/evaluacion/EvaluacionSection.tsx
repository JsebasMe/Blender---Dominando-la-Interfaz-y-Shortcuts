import React, { useState } from 'react';
import { DragDropActivity } from './DragDropActivity';
import { QuizActivity } from './QuizActivity';
import { PracticalChallengeActivity } from './PracticalChallengeActivity';
import { Puzzle, FileQuestion, FolderGit2, CheckCircle2, Award } from 'lucide-react';
import { useHabitRadar } from '../../context/HabitRadarContext';

export const EvaluacionSection: React.FC = () => {
  const { state, profile } = useHabitRadar();
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
