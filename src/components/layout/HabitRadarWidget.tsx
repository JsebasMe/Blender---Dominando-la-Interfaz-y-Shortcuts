import React, { useState } from 'react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import { 
  Zap, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  X, 
  Activity,
  Layers,
  MousePointer,
  Compass,
  FileCheck
} from 'lucide-react';

interface HabitRadarWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HabitRadarWidget: React.FC<HabitRadarWidgetProps> = ({ isOpen, onClose }) => {
  const { state, profile, radarScores, recordShortcut, resetProgress } = useHabitRadar();
  const [testKeyInput, setTestKeyInput] = useState('');

  if (!isOpen) return null;

  // Radar chart polygon points calculation (5-axis radar chart)
  const axes = [
    { label: 'Interfaz', score: radarScores.interfaz, icon: Layers },
    { label: 'Navegación', score: radarScores.navegacion, icon: Compass },
    { label: 'Transformación', score: radarScores.transformacion, icon: Zap },
    { label: 'Modelado', score: radarScores.modelado, icon: MousePointer },
    { label: 'Evaluación', score: radarScores.evaluacion, icon: FileCheck }
  ];

  const size = 260;
  const center = size / 2;
  const maxRadius = 90;

  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 / axes.length) * index - Math.PI / 2;
    const r = (score / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, Math.max(10, axis.score));
      return `${x},${y}`;
    })
    .join(' ');

  const handleShortcutTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testKeyInput.trim()) return;
    recordShortcut(testKeyInput.trim().toUpperCase());
    setTestKeyInput('');
  };

  const handleQuickKeyClick = (key: string) => {
    recordShortcut(key);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="radar-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Innovación Pedagógica
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 border border-slate-700">
                  Evaluación Formativa Incremental
                </span>
              </div>
              <h2 id="radar-title" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Radar de Hábitos: <span className="text-amber-400">{profile.title}</span>
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal de hábitos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Progression Banner */}
        <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-slate-800/90 to-slate-800/40 border border-slate-700/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400 font-medium">Perfil actual:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-bold text-white">{profile.badge}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {profile.score}% Eficiencia
                </span>
              </div>
            </div>
            <div className="text-right sm:max-w-xs">
              <span className="text-xs text-slate-400 block">Siguiente meta pedagógica:</span>
              <p className="text-xs text-slate-300 font-medium">{profile.nextGoal}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Novato (0%)</span>
              <span>Iniciado (26%)</span>
              <span>Táctico (51%)</span>
              <span>Artista 3D (76-100%)</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-700 shadow-sm shadow-amber-500/50"
                style={{ width: `${Math.max(4, profile.score)}%` }}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 text-justify">
            {profile.description}
          </p>
        </div>

        {/* 2-Column: Radar Graph & Dimension Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Radar Chart SVG */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Mapeo Pentagonal de Competencias
            </span>
            <svg width={size} height={size} className="overflow-visible">
              {/* Background Concentric Webs */}
              {[0.25, 0.5, 0.75, 1].map((levelFraction, idx) => {
                const ringPoints = axes.map((_, i) => {
                  const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                  const r = levelFraction * maxRadius;
                  return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                }).join(' ');
                return (
                  <polygon
                    key={idx}
                    points={ringPoints}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={idx === 3 ? 'none' : '3,3'}
                  />
                );
              })}

              {/* Axis lines */}
              {axes.map((_, i) => {
                const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                const x = center + maxRadius * Math.cos(angle);
                const y = center + maxRadius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgba(245, 130, 32, 0.28)"
                stroke="#ea7600"
                strokeWidth="2.5"
                className="transition-all duration-700"
              />

              {/* Data points */}
              {axes.map((axis, i) => {
                const { x, y } = getCoordinates(i, Math.max(10, axis.score));
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ff9d3b"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Labels */}
              {axes.map((axis, i) => {
                const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                const r = maxRadius + 22;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
            <span className="text-[11px] text-slate-500 mt-1">
              Actualizado dinámicamente según tus interacciones
            </span>
          </div>

          {/* Dimension Details */}
          <div className="space-y-2.5">
            {axes.map((axis, i) => {
              const Icon = axis.icon;
              return (
                <div key={i} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-slate-700/50 text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">{axis.label}</span>
                      <span className="text-[11px] text-slate-400">
                        {axis.score >= 75 ? 'Excelente apropiación' : axis.score >= 40 ? 'En progreso' : 'Requiere práctica'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-amber-400">{axis.score}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practiced Shortcuts section */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Atajos Integrados a tu Memoria Muscular
              </h3>
              <p className="text-xs text-slate-400">
                Has registrado <strong className="text-amber-400">{state.testedShortcuts.length}</strong> atajos activos en la sesión:
              </p>
            </div>

            {/* Quick Key Buttons to Test */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['G', 'R', 'S', 'TAB', 'E', 'CTRL+R', '1', '2', '3'].map((k) => (
                <button
                  key={k}
                  onClick={() => handleQuickKeyClick(k)}
                  className={`text-[11px] px-2 py-0.5 rounded font-mono font-semibold transition-all ${
                    state.testedShortcuts.includes(k)
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500'
                  }`}
                  title="Haz clic para practicar este atajo"
                >
                  +{k}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-slate-950/50 border border-slate-800 min-h-[46px] items-center">
            {state.testedShortcuts.length === 0 ? (
              <span className="text-xs text-slate-500 italic">
                Aún no has probado ningún atajo en las lecciones. Presiona los botones superiores o pruébalos en el visor 3D interactivo.
              </span>
            ) : (
              state.testedShortcuts.map((s, idx) => (
                <KeyBadge key={idx} keys={s} variant="orange" size="sm" />
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas reiniciar tu progreso en el Radar de Hábitos?')) {
                resetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar progreso
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            Continuar Aprendiendo
          </button>
        </div>
      </div>
    </div>
  );
};
