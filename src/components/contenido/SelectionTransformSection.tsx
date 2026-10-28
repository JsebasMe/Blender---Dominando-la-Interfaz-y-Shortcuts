import React, { useState } from 'react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import { 
  Move, 
  RotateCw, 
  Maximize, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  HelpCircle,
  Quote,
  MousePointer2,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TransformPreset {
  id: string;
  name: string;
  shortcutCombo: string[];
  action: string;
  axis: 'X' | 'Y' | 'Z' | 'ALL';
  previewDescription: string;
  beforeLabel: string;
  afterLabel: string;
}

const PRESETS: TransformPreset[] = [
  {
    id: 's-z',
    name: 'Escalar únicamente en Altura',
    shortcutCombo: ['S', 'Z'],
    action: 'Scale en el eje Z',
    axis: 'Z',
    previewDescription: 'El objeto estira o comprime su dimensión vertical sin modificar su anchura ni profundidad.',
    beforeLabel: 'Cubo cúbico perfecto (1×1×1)',
    afterLabel: 'Prisma vertical alargado tipo pilar (1×1×3)'
  },
  {
    id: 'r-z-90',
    name: 'Rotación exacta a 90 grados',
    shortcutCombo: ['R', 'Z', '9', '0', 'Enter'],
    action: 'Rotate sobre Z con valor numérico',
    axis: 'Z',
    previewDescription: 'Gira el objeto de forma perpendicular al piso exactamente 90 grados sexagesimales.',
    beforeLabel: 'Orientación angular inicial (0°)',
    afterLabel: 'Giro ortogonal perfecto (+90°)'
  },
  {
    id: 'g-x',
    name: 'Mover hacia el lateral',
    shortcutCombo: ['G', 'X'],
    action: 'Grab restringido al eje rojo',
    axis: 'X',
    previewDescription: 'El cursor fija una línea guía roja infinita y el desplazamiento ignora la altura y profundidad.',
    beforeLabel: 'Centro del mundo (X=0)',
    afterLabel: 'Desplazado a la derecha (X=+2.5 m)'
  },
  {
    id: 's-shift-z',
    name: 'Escalar en plano (ignorar Z)',
    shortcutCombo: ['S', 'Shift', 'Z'],
    action: 'Scale excluyendo el eje Z',
    axis: 'ALL',
    previewDescription: 'Agranda el ancho (X) y profundidad (Y) simultáneamente, manteniendo la altura intacta.',
    beforeLabel: 'Cubo estándar',
    afterLabel: 'Bloque aplanado tipo losa de piso'
  }
];

export const SelectionTransformSection: React.FC = () => {
  const { recordShortcut } = useHabitRadar();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('s-z');
  const [activeInteractiveKey, setActiveInteractiveKey] = useState<string | null>(null);

  const currentPreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  const handleKeyClick = (k: string) => {
    setActiveInteractiveKey(k);
    recordShortcut(k);
    setTimeout(() => setActiveInteractiveKey(null), 300);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
          <Move className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Temáticas 1.3 y 1.3.1
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Selección y Atajos de Transformación
          </h2>
        </div>
      </div>

      {/* Narrative & Moioli (2022) Citation */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Transformar objetos de manera ágil es fundamental para optimizar el tiempo de producción en cualquier proyecto 3D. Los comandos esenciales, conocidos como los <strong>“Tres Grandes”</strong>, son: <span className="text-amber-400 font-bold">G</span> (Grab o mover), <span className="text-amber-400 font-bold">R</span> (Rotate o rotar) y <span className="text-amber-400 font-bold">S</span> (Scale o escalar). Estos atajos pueden combinarse con los ejes de coordenadas para un control milimétrico; por ejemplo, presionar "S" y luego "Z" escalará el objeto únicamente en su altura (eje azul).
        </p>

        {/* Academic Citation Box */}
        <div className="p-5 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 border-slate-800 space-y-1">
          <p className="text-sm text-amber-100/90 italic text-justify leading-relaxed">
            “El dominio de los atajos de teclado para las transformaciones básicas es lo que distingue un flujo de trabajo eficiente de uno dependiente de la interfaz gráfica, permitiendo al artista mantener la concentración en el modelo sin interrupciones.”
          </p>
          <div className="text-xs text-slate-400 pt-1 flex items-center justify-between">
            <span>— Moioli (2022, Introduction to Blender 3.0, Apress)</span>
            <span className="text-[11px] text-amber-400 font-mono">Eficiencia de flujo de trabajo</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Al prescindir de los manipuladores visuales con flechas (gizmos de pantalla) y utilizar combinaciones directas de teclado, el cursor puede situarse libremente en cualquier punto del monitor sin necesidad de precisión milimétrica con el ratón.
        </p>
      </div>

      {/* The Big Three Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grab (G) */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3 group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Move className="w-6 h-6" />
            </div>
            <KeyBadge keys="G" variant="orange" size="lg" onClick={() => handleKeyClick('G')} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mover (Grab)</h3>
            <span className="text-xs font-mono text-slate-400 block mb-1">Del inglés "Grab" (agarrar)</span>
            <p className="text-xs text-slate-300 text-justify leading-relaxed">
              Desplaza el objeto en el plano de la vista activa. Si pulsas <KeyBadge keys="X" size="sm" />, <KeyBadge keys="Y" size="sm" /> o <KeyBadge keys="Z" size="sm" />, el desplazamiento se restringe a ese eje específico.
            </p>
          </div>
          <div className="pt-2 text-[11px] text-amber-400/90 font-mono bg-slate-950 p-2 rounded border border-slate-800">
            Ejemplo: G + X + 3 (Mueve 3 metros en X)
          </div>
        </div>

        {/* Rotate (R) */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3 group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <RotateCw className="w-6 h-6" />
            </div>
            <KeyBadge keys="R" variant="orange" size="lg" onClick={() => handleKeyClick('R')} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Rotar (Rotate)</h3>
            <span className="text-xs font-mono text-slate-400 block mb-1">Giro respecto al punto pivote</span>
            <p className="text-xs text-slate-300 text-justify leading-relaxed">
              Rota el objeto alrededor del eje de visión. Al encadenar un eje y un valor numérico, se obtiene una rotación de precisión matemática. Pulsar <KeyBadge keys="R" size="sm" /> dos veces activa la rotación libre (Trackball).
            </p>
          </div>
          <div className="pt-2 text-[11px] text-purple-400/90 font-mono bg-slate-950 p-2 rounded border border-slate-800">
            Ejemplo: R + Z + 45 (Gira 45° sobre Z)
          </div>
        </div>

        {/* Scale (S) */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3 group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Maximize className="w-6 h-6" />
            </div>
            <KeyBadge keys="S" variant="orange" size="lg" onClick={() => handleKeyClick('S')} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Escalar (Scale)</h3>
            <span className="text-xs font-mono text-slate-400 block mb-1">Modificación dimensional</span>
            <p className="text-xs text-slate-300 text-justify leading-relaxed">
              Multiplica las dimensiones geométricas. Un factor numérico de 2 duplica el tamaño, mientras que 0.5 lo reduce a la mitad.
            </p>
          </div>
          <div className="pt-2 text-[11px] text-blue-400/90 font-mono bg-slate-950 p-2 rounded border border-slate-800">
            Ejemplo: S + Z + 2 (Duplica la altura)
          </div>
        </div>
      </div>

      {/* Interactive Transform Laboratory */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Laboratorio Interactivo de Combinaciones
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Transformación Asistida con Teclado
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Haz clic en los casos o en las teclas para practicar
          </span>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPresetId(preset.id);
                preset.shortcutCombo.forEach(k => recordShortcut(k));
              }}
              className={`p-3 rounded-xl text-left transition-all border ${
                preset.id === selectedPresetId
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                {preset.shortcutCombo.map((k, i) => (
                  <KeyBadge key={i} keys={k} size="sm" variant={preset.id === selectedPresetId ? 'orange' : 'default'} />
                ))}
              </div>
              <span className="text-xs font-bold block">{preset.name}</span>
            </button>
          ))}
        </div>

        {/* Active Preset Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 rounded-xl bg-slate-900/90 border border-slate-800 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Objetivo seleccionado:
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono">
                {currentPreset.action}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white">
              {currentPreset.name}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 text-justify leading-relaxed">
              {currentPreset.previewDescription}
            </p>

            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Secuencia de teclas requerida:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {currentPreset.shortcutCombo.map((k, i) => (
                  <button
                    key={i}
                    onClick={() => handleKeyClick(k)}
                    className="transform active:scale-95 transition-transform"
                    title={`Practicar tecla ${k}`}
                  >
                    <KeyBadge keys={k} size="md" variant="orange" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Before & After Visual Comparison Box */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block text-center">
              Comportamiento Geométrico
            </span>

            <div className="grid grid-cols-2 gap-3 text-center">
              {/* Before state */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-between h-32">
                <span className="text-[10px] text-slate-400 font-mono">Estado Inicial</span>
                <div className="w-10 h-10 bg-slate-700 rounded border border-slate-600 shadow flex items-center justify-center text-[9px] font-mono">
                  1×1
                </div>
                <span className="text-[10px] text-slate-300 leading-tight">
                  {currentPreset.beforeLabel}
                </span>
              </div>

              {/* After state */}
              <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/40 flex flex-col items-center justify-between h-32">
                <span className="text-[10px] text-amber-400 font-mono">Transformado</span>
                {currentPreset.id === 's-z' && (
                  <div className="w-10 h-16 bg-amber-500/80 rounded border border-amber-300 shadow flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">
                    1×3
                  </div>
                )}
                {currentPreset.id === 'r-z-90' && (
                  <div className="w-10 h-10 bg-purple-500/80 rounded border border-purple-300 shadow flex items-center justify-center text-[9px] font-mono text-white transform rotate-45">
                    90°
                  </div>
                )}
                {currentPreset.id === 'g-x' && (
                  <div className="w-10 h-10 bg-red-500/80 rounded border border-red-300 shadow flex items-center justify-center text-[9px] font-mono text-white translate-x-2">
                    +X
                  </div>
                )}
                {currentPreset.id === 's-shift-z' && (
                  <div className="w-16 h-6 bg-blue-500/80 rounded border border-blue-300 shadow flex items-center justify-center text-[9px] font-mono text-white">
                    2×2×0.5
                  </div>
                )}
                <span className="text-[10px] text-amber-300 leading-tight">
                  {currentPreset.afterLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Shortcuts Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MousePointer2 className="w-4 h-4 text-amber-400" />
          Atajos Fundamentales de Selección en el Viewport
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <KeyBadge keys="A" size="sm" onClick={() => handleKeyClick('A')} />
              <span className="text-[10px] text-emerald-400 font-mono">Select All</span>
            </div>
            <h4 className="text-xs font-bold text-white">Seleccionar Todo</h4>
            <p className="text-[11px] text-slate-400 mt-1 text-justify">
              Selecciona instantáneamente todos los objetos o elementos de malla visibles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <KeyBadge keys={["Alt", "A"]} size="sm" onClick={() => handleKeyClick('ALT+A')} />
              <span className="text-[10px] text-slate-400 font-mono">Deselect</span>
            </div>
            <h4 className="text-xs font-bold text-white">Deseleccionar Todo</h4>
            <p className="text-[11px] text-slate-400 mt-1 text-justify">
              Limpia la selección activa. También funciona pulsando rápidamente dos veces la tecla A.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <KeyBadge keys="B" size="sm" onClick={() => handleKeyClick('B')} />
              <span className="text-[10px] text-blue-400 font-mono">Box Select</span>
            </div>
            <h4 className="text-xs font-bold text-white">Selección en Caja</h4>
            <p className="text-[11px] text-slate-400 mt-1 text-justify">
              Arrastra un marco rectangular sobre el visor para capturar múltiples objetos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <KeyBadge keys="C" size="sm" onClick={() => handleKeyClick('C')} />
              <span className="text-[10px] text-purple-400 font-mono">Circle Select</span>
            </div>
            <h4 className="text-xs font-bold text-white">Selección Circular</h4>
            <p className="text-[11px] text-slate-400 mt-1 text-justify">
              Activa un pincel redondo ajustable con la rueda del ratón para pintar selecciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
