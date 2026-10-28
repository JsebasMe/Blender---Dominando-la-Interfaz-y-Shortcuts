import React, { useState } from 'react';
import { DRAG_DROP_CONCEPTS, TARGET_ZONES, ConceptItem, TargetZone } from '../../data/dragDropData';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import confetti from 'canvas-confetti';
import { 
  Puzzle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  MousePointerClick,
  Check
} from 'lucide-react';

export const DragDropActivity: React.FC = () => {
  const { state, saveActivity1Score } = useHabitRadar();

  // Mapping: targetZoneId -> conceptId
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  // Available concepts that haven't been placed yet
  const placedConceptIds = Object.values(matches);
  const availableConcepts = DRAG_DROP_CONCEPTS.filter(c => !placedConceptIds.includes(c.id));

  const handleDragStart = (e: React.DragEvent, conceptId: string) => {
    e.dataTransfer.setData('text/plain', conceptId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    const conceptId = e.dataTransfer.getData('text/plain');
    if (conceptId) {
      setMatches(prev => ({ ...prev, [zoneId]: conceptId }));
      setIsEvaluated(false);
    }
  };

  // Accessible click-to-pair flow
  const handleSelectConcept = (conceptId: string) => {
    if (selectedConceptId === conceptId) {
      setSelectedConceptId(null);
    } else {
      setSelectedConceptId(conceptId);
    }
  };

  const handleZoneClick = (zoneId: string) => {
    if (selectedConceptId) {
      setMatches(prev => ({ ...prev, [zoneId]: selectedConceptId }));
      setSelectedConceptId(null);
      setIsEvaluated(false);
    } else if (matches[zoneId]) {
      // Unpair if clicking a zone with an existing item
      const newMatches = { ...matches };
      delete newMatches[zoneId];
      setMatches(newMatches);
      setIsEvaluated(false);
    }
  };

  const handleCheckAnswers = () => {
    let correctCount = 0;
    TARGET_ZONES.forEach(zone => {
      if (matches[zone.id] === zone.expectedConceptId) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / TARGET_ZONES.length) * 100);
    setScore(calculatedScore);
    setIsEvaluated(true);
    saveActivity1Score(calculatedScore);

    if (calculatedScore >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedConceptId(null);
    setIsEvaluated(false);
    setScore(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Puzzle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Actividad 1 · Temáticas 1, 2 y 3
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                Emparejamiento Interactivo
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Arrastrar y Conectar: "Conoce Blender"
            </h2>
          </div>
        </div>

        {/* Highest Score Badge */}
        {state.activity1Score !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
            <span className="text-slate-400">Mejor puntaje guardado:</span>
            <span className="font-mono font-bold text-amber-400">{state.activity1Score}%</span>
          </div>
        )}
      </div>

      {/* Narrative instructions with text-justify */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <p className="text-sm text-slate-200 text-justify leading-relaxed">
          Demuestra tu destreza mental relacionando cada herramienta o concepto con su correspondiente atajo de teclado o panel de la interfaz. Puedes <strong>arrastrar los bloques</strong> de la columna izquierda hacia las casillas de destino, o si prefieres, <strong>hacer clic en un concepto y luego clic en la casilla</strong> donde deseas colocarlo (totalmente accesible en celulares y pantallas táctiles).
        </p>
        <p className="text-xs text-slate-400 text-justify">
          Al completar las 8 asociaciones, pulsa el botón "Comprobar Respuestas" para verificar tu resultado y recibir retroalimentación formativa inmediata.
        </p>
      </div>

      {/* Main Interactive Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Concept Blocks pool */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-amber-400" />
              <span>Conceptos Disponibles ({availableConcepts.length})</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Arrastra o Clic</span>
          </div>

          <div className="space-y-2 min-h-[220px]">
            {availableConcepts.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                <Check className="w-6 h-6 text-emerald-400 mb-1" />
                <span>Todos los conceptos han sido ubicados.</span>
                <span className="text-[11px] text-slate-400 mt-1">Haz clic en "Comprobar Respuestas" para evaluar.</span>
              </div>
            ) : (
              availableConcepts.map((concept) => {
                const isSelected = selectedConceptId === concept.id;
                return (
                  <div
                    key={concept.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, concept.id)}
                    onClick={() => handleSelectConcept(concept.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all select-none shadow-sm ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{concept.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">⋮⋮ Arrastrar</span>
                    </div>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                      {concept.hint}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Target Zones */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Zonas de Destino: Atajos y Paneles ({TARGET_ZONES.length})</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Coloca aquí los conceptos</span>
          </div>

          <div className="space-y-3">
            {TARGET_ZONES.map((zone) => {
              const matchedConceptId = matches[zone.id];
              const matchedConcept = DRAG_DROP_CONCEPTS.find(c => c.id === matchedConceptId);
              const isCorrect = isEvaluated && matchedConceptId === zone.expectedConceptId;
              const isIncorrect = isEvaluated && matchedConceptId && matchedConceptId !== zone.expectedConceptId;

              return (
                <div
                  key={zone.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, zone.id)}
                  onClick={() => handleZoneClick(zone.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md shadow-emerald-950/50'
                      : isIncorrect
                      ? 'bg-red-950/40 border-red-500/80 shadow-md shadow-red-950/50'
                      : matchedConcept
                      ? 'bg-slate-900 border-amber-500/50'
                      : selectedConceptId
                      ? 'bg-slate-900/60 border-dashed border-amber-500/40 hover:bg-slate-900'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-amber-400 shadow-sm shrink-0">
                        {zone.shortcutOrIcon}
                      </div>
                      <span className="text-xs font-semibold text-slate-300">
                        {zone.title}
                      </span>
                    </div>

                    {/* Matched item or placeholder */}
                    <div className="text-right">
                      {matchedConcept ? (
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${
                            isCorrect
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : isIncorrect
                              ? 'bg-red-500 text-white border-red-400'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {matchedConcept.label}
                          </span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isIncorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">
                          {selectedConceptId ? 'Haz clic para vincular aquí' : 'Arrastra o haz clic aquí'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feedback explanation if evaluated */}
                  {isEvaluated && (
                    <div className={`mt-2.5 pt-2 border-t text-[11px] text-justify ${
                      isCorrect ? 'border-emerald-900 text-emerald-300' : 'border-red-900 text-red-300'
                    }`}>
                      {zone.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Results and Action Footer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {isEvaluated && score !== null ? (
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-lg font-bold font-mono ${
                score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {score}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {score === 100 ? '¡Perfecto! Dominio total de asociaciones' : score >= 75 ? '¡Muy buen trabajo! Tienes claros los conceptos' : 'Necesitas repasar algunas asociaciones clave'}
                </h4>
                <p className="text-xs text-slate-400">
                  Puntaje registrado en tu Radar de Hábitos. Puedes intentarlo de nuevo para alcanzar el 100%.
                </p>
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              Ubicados {Object.keys(matches).length} de {TARGET_ZONES.length} conceptos.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>

          <button
            onClick={handleCheckAnswers}
            disabled={Object.keys(matches).length === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              Object.keys(matches).length === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            Comprobar Respuestas
          </button>
        </div>
      </div>
    </section>
  );
};
