import React, { useState } from 'react';
import { INTERFACE_HOTSPOTS, Hotspot } from '../../data/contentData';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import { 
  Layout, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X,
  Compass,
  Layers,
  Sliders,
  Clock,
  Menu,
  Wrench,
  Maximize2
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export const LabeledGraphicsInterface: React.FC = () => {
  const { state, recordHotspot } = useHabitRadar();
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('viewport');

  const selectedHotspot = INTERFACE_HOTSPOTS.find(h => h.id === selectedHotspotId) || INTERFACE_HOTSPOTS[0];
  const visitedCount = state.visitedInterfaceHotspots.length;

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspotId(hotspot.id);
    recordHotspot(hotspot.id);
  };

  const currentIndex = INTERFACE_HOTSPOTS.findIndex(h => h.id === selectedHotspotId);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + INTERFACE_HOTSPOTS.length) % INTERFACE_HOTSPOTS.length;
    handleSelectHotspot(INTERFACE_HOTSPOTS[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % INTERFACE_HOTSPOTS.length;
    handleSelectHotspot(INTERFACE_HOTSPOTS[nextIdx]);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Subtemática 1.2 · Interacción Obligatoria
              </span>
              <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full border border-slate-700">
                Labeled Graphics
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Anatomía de la Interfaz Gráfica de Blender
            </h2>
          </div>
        </div>

        {/* Visited Progress Tracker */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400">Paneles explorados:</span>
          <span className="font-mono font-bold text-amber-400">
            {visitedCount} / {INTERFACE_HOTSPOTS.length}
          </span>
          {visitedCount === INTERFACE_HOTSPOTS.length && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />
          )}
        </div>
      </div>

      {/* Soni et al. (2023) Citation Context */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <p className="text-sm text-slate-200 text-justify leading-relaxed">
          La interfaz de Blender puede parecer intimidante al principio, pero está diseñada para ser altamente modular y ergonómica. Al respecto, la literatura especializada señala que:
        </p>
        <blockquote className="p-4 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-100/90 italic text-justify leading-relaxed">
          “Blender es considerado por expertos y artistas 3D como la herramienta más eficiente, rica en funciones y solución de código abierto para los gráficos por computadora en 3D, siendo el estudio detallado de sus interfaces especialmente útil para principiantes que inician en el diseño de modelos tridimensionales.”
          <span className="block mt-1 text-[11px] text-slate-400 not-italic">
            — Soni, Kaur & Sharma (2023, IEEE ICOEI)
          </span>
        </blockquote>
        <p className="text-xs text-slate-400 text-justify">
          Haz clic o toca cualquiera de los marcadores interactivos numerados en el diagrama para examinar la función, atajos y casos de uso de cada panel.
        </p>
      </div>

      {/* Labeled Graphics Interactive Canvas & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Diagram (Schematic Blender 4.x Window) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Blender 4.x · Entorno de Trabajo Estándar (Layout)
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Haz clic en los puntos numerados
            </span>
          </div>

          {/* Real Blender Interface Screenshot with Interactive Hotspots */}
          <div className="relative aspect-[16/9] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl select-none group">
            
            {/* The Real Blender 5.1 Screenshot */}
            <img
              src={getAssetUrl('assets/aistudio/interfaz_blender_1520d760.png')}
              alt="Blender 5.1 · Entorno de Trabajo Estándar (Layout)"
              className="w-full h-full object-contain bg-slate-950 pointer-events-none"
            />

            {/* Glowing Area Highlight Box based on active hotspot */}
            {selectedHotspot && (
              <div
                className="absolute pointer-events-none rounded-lg border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_25px_rgba(234,118,0,0.5)] transition-all duration-300 animate-pulse"
                style={{
                  top: selectedHotspot.id === 'topbar' ? '0%' : selectedHotspot.id === 'toolbar' ? '6%' : selectedHotspot.id === 'viewport' ? '6%' : selectedHotspot.id === 'outliner' ? '6%' : selectedHotspot.id === 'properties' ? '49%' : '88%',
                  left: selectedHotspot.id === 'topbar' ? '0%' : selectedHotspot.id === 'toolbar' ? '0%' : selectedHotspot.id === 'viewport' ? '3.5%' : selectedHotspot.id === 'outliner' ? '82%' : selectedHotspot.id === 'properties' ? '82%' : '0%',
                  width: selectedHotspot.id === 'topbar' ? '100%' : selectedHotspot.id === 'toolbar' ? '3.5%' : selectedHotspot.id === 'viewport' ? '78.5%' : selectedHotspot.id === 'outliner' ? '18%' : selectedHotspot.id === 'properties' ? '18%' : '82%',
                  height: selectedHotspot.id === 'topbar' ? '6%' : selectedHotspot.id === 'toolbar' ? '82%' : selectedHotspot.id === 'viewport' ? '82%' : selectedHotspot.id === 'outliner' ? '43%' : selectedHotspot.id === 'properties' ? '51%' : '12%'
                }}
              />
            )}

            {/* Interactive Hotspot Buttons (Overlayed on coordinates) */}
            {INTERFACE_HOTSPOTS.map((hotspot, idx) => {
              const isSelected = hotspot.id === selectedHotspotId;
              const isVisited = state.visitedInterfaceHotspots.includes(hotspot.id);
              return (
                <button
                  key={hotspot.id}
                  onClick={() => handleSelectHotspot(hotspot)}
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-bold transition-all shadow-lg ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-500/50 scale-125 z-30'
                      : isVisited
                      ? 'bg-emerald-500 text-slate-950 hover:scale-110'
                      : 'bg-slate-900 text-white border-2 border-amber-400 hover:scale-110 animate-pulse'
                  }`}
                  aria-label={`Ver información de ${hotspot.name}`}
                  title={hotspot.name}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Quick Hotspot Buttons Below Graphic */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800">
            {INTERFACE_HOTSPOTS.map((h, i) => (
              <button
                key={h.id}
                onClick={() => handleSelectHotspot(h)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  h.id === selectedHotspotId
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : state.visitedInterfaceHotspots.includes(h.id)
                    ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <span>{i + 1}.</span>
                <span>{h.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Explanation Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                {selectedHotspot.areaLabel}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                {selectedHotspot.name}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Hotspot 0{currentIndex + 1}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-200 text-justify leading-relaxed">
            {selectedHotspot.description}
          </p>

          {/* Shortcut badge */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Atajo o acceso rápido principal:
            </span>
            <div className="text-xs font-mono text-amber-400 font-semibold">
              {selectedHotspot.shortcut}
            </div>
          </div>

          {/* Real-world Practical Example */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Ejemplo práctico de uso:
            </span>
            <p className="text-xs text-slate-300 text-justify">
              {selectedHotspot.example}
            </p>
          </div>

          {/* Importance */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-justify">
              <strong>Importancia en el pipeline:</strong> {selectedHotspot.importance}
            </p>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              {currentIndex + 1} de {INTERFACE_HOTSPOTS.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-bold text-slate-950 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
