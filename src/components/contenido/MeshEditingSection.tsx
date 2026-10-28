import React, { useState } from 'react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import { 
  Edit3, 
  Layers, 
  Dot, 
  Minus, 
  Square, 
  Sparkles, 
  Maximize2, 
  Split, 
  CheckCircle2,
  ArrowRight,
  Box
} from 'lucide-react';

type ComponentType = 'vertex' | 'edge' | 'face';

interface ModelingStep {
  step: number;
  title: string;
  keys: string[];
  action: string;
  result: string;
}

const MODELING_WALKTHROUGH: ModelingStep[] = [
  {
    step: 1,
    title: "Partida desde el Cubo Inicial",
    keys: ["Tab"],
    action: "Presionar Tab para ingresar a Edit Mode.",
    result: "Los 8 vértices y 6 caras del cubo pasan a ser editables."
  },
  {
    step: 2,
    title: "Segmentar con Cortes de Bucle",
    keys: ["Ctrl", "R"],
    action: "Posicionar el cursor en una arista y pulsar Ctrl+R, girar rueda a 2 cortes.",
    result: "Aparecen dos anillos amarillos de subdivisión perimetral."
  },
  {
    step: 3,
    title: "Seleccionar Caras Inferiores",
    keys: ["3"],
    action: "Pulsar 3 para pasar al modo Caras y seleccionar las 4 esquinas inferiores.",
    result: "Quedan marcadas en naranja brillante las caras de apoyo."
  },
  {
    step: 4,
    title: "Extruir Geometría de Patas",
    keys: ["E", "Z"],
    action: "Presionar E para Extrude y tirar hacia abajo en el eje vertical Z.",
    result: "Nacen 4 columnas sólidas (patas de mesa o silla) con topología limpia."
  }
];

export const MeshEditingSection: React.FC = () => {
  const { recordShortcut, recordMeshComponent } = useHabitRadar();
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('face');
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSelectComponent = (comp: ComponentType) => {
    setSelectedComponent(comp);
    recordMeshComponent(comp);
    const keyMap: Record<ComponentType, string> = { vertex: '1', edge: '2', face: '3' };
    recordShortcut(keyMap[comp]);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
          <Edit3 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Temáticas 1.4 y 1.4.1
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Edición de Mallas y Herramientas de Modelado
          </h2>
        </div>
      </div>

      {/* Mode Comparison: Object Mode vs Edit Mode */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>Alternar entre Modos con la Tecla Tab</span>
            <KeyBadge keys="Tab" variant="orange" size="md" onClick={() => recordShortcut('TAB')} />
          </h3>
          <p className="text-sm text-slate-200 text-justify leading-relaxed">
            Para modificar la forma intrínseca de cualquier objeto tridimensional debes pasar del <strong>Object Mode (Modo Objeto)</strong> al <strong>Edit Mode (Modo Edición)</strong> presionando la tecla <KeyBadge keys="Tab" size="sm" />. Dentro de este modo, la malla se descompone en sus tres átomos fundamentales: vértices, aristas y caras poligonales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Modo Objeto (Object Mode)</span>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">Global</span>
            </div>
            <p className="text-xs text-slate-300 text-justify leading-relaxed">
              El objeto se trata como una unidad indivisible en el mundo 3D. Se utiliza para posicionar piezas, emparentar jerarquías, asignar materiales y componer la escena.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Modo Edición (Edit Mode)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">Geometría</span>
            </div>
            <p className="text-xs text-slate-300 text-justify leading-relaxed">
              Permite manipular los componentes anatómicos de la malla. Se accede pulsando <KeyBadge keys="Tab" size="sm" /> y permite esculpir, subdividir, extruir y eliminar polígonos.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-mesh Components Interactive Explorer (1: Vertices, 2: Edges, 3: Faces) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Selector Sub-Poligonal (Teclas 1, 2 y 3)
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Los Tres Componentes Fundamentales de una Malla
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Haz clic en los botones para comparar su función
          </span>
        </div>

        {/* 3 Component Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSelectComponent('vertex')}
            className={`p-4 rounded-xl text-left transition-all border ${
              selectedComponent === 'vertex'
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                ●
              </span>
              <KeyBadge keys="1" size="sm" variant={selectedComponent === 'vertex' ? 'orange' : 'default'} />
            </div>
            <h4 className="text-sm font-bold block">1. Vértices (Vertices)</h4>
            <span className="text-[11px] text-slate-400 font-mono">Puntos espaciales (X, Y, Z)</span>
          </button>

          <button
            onClick={() => handleSelectComponent('edge')}
            className={`p-4 rounded-xl text-left transition-all border ${
              selectedComponent === 'edge'
                ? 'bg-blue-500/20 border-blue-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-lg bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-xs">
                —
              </span>
              <KeyBadge keys="2" size="sm" variant={selectedComponent === 'edge' ? 'orange' : 'default'} />
            </div>
            <h4 className="text-sm font-bold block">2. Aristas (Edges)</h4>
            <span className="text-[11px] text-slate-400 font-mono">Segmentos entre 2 vértices</span>
          </button>

          <button
            onClick={() => handleSelectComponent('face')}
            className={`p-4 rounded-xl text-left transition-all border ${
              selectedComponent === 'face'
                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ■
              </span>
              <KeyBadge keys="3" size="sm" variant={selectedComponent === 'face' ? 'orange' : 'default'} />
            </div>
            <h4 className="text-sm font-bold block">3. Caras (Faces)</h4>
            <span className="text-[11px] text-slate-400 font-mono">Superficies poligonales</span>
          </button>
        </div>

        {/* Dynamic Detail Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                {selectedComponent === 'vertex' ? 'Elemento: Vértice (Punto 0D)' : selectedComponent === 'edge' ? 'Elemento: Arista (Línea 1D)' : 'Elemento: Cara (Polígono 2D)'}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Atajo numérico: Tecla {selectedComponent === 'vertex' ? '1' : selectedComponent === 'edge' ? '2' : '3'}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">
              {selectedComponent === 'vertex' && 'Manipulación de Vértices Individuales'}
              {selectedComponent === 'edge' && 'Definición de Bordes y Siluetas con Aristas'}
              {selectedComponent === 'face' && 'Superficies Poligonales para Render y Extrusión'}
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 text-justify leading-relaxed">
              {selectedComponent === 'vertex' && 'Un vértice es un punto exacto en el espacio con coordenadas X, Y, Z. Al mover un vértice con G, deforma los bordes adyacentes. Es la forma más precisa de afinar esquinas y vértices anatómicos.'}
              {selectedComponent === 'edge' && 'Una arista es la línea recta que conecta exactamente dos vértices. Seleccionar aristas permite crear biseles (Bevel con Ctrl+B), definir arrugas y controlar el flujo de bucles de subdivisión (Edge Loops).'}
              {selectedComponent === 'face' && 'Una cara es el plano relleno cerrado por tres (triángulo) o cuatro (quad) aristas. Es el elemento que recibe materiales, texturas e iluminación. Sobre las caras se ejecutan las extrusiones principales (tecla E).'}
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center justify-center">
            {/* 3D Isometric schematic icon */}
            <div className="w-24 h-24 relative flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-slate-600 rounded bg-slate-900/50 transform rotate-12 flex items-center justify-center relative">
                {selectedComponent === 'vertex' && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400 animate-ping" />
                )}
                {selectedComponent === 'edge' && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-blue-400 shadow-md shadow-blue-400" />
                )}
                {selectedComponent === 'face' && (
                  <div className="w-full h-full bg-emerald-500/40 rounded border border-emerald-400 flex items-center justify-center text-[10px] font-mono text-white font-bold">
                    Cara Activa
                  </div>
                )}
              </div>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-mono">
              Representación en Viewport
            </span>
          </div>
        </div>
      </div>

      {/* Two Essential Modeling Tools: Extrude (E) and Loop Cut (Ctrl + R) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extrude Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Maximize2 className="w-6 h-6" />
            </div>
            <KeyBadge keys="E" variant="orange" size="lg" onClick={() => recordShortcut('E')} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Extrusión (Extrude — Tecla E)</h3>
            <span className="text-xs font-mono text-slate-400 block mb-2">Creación de volumen geométrico</span>
            <p className="text-xs sm:text-sm text-slate-300 text-justify leading-relaxed">
              La tecla <KeyBadge keys="E" size="sm" /> extrae nuevas caras a partir de la región o aristas seleccionadas, creando un nuevo bloque de geometría que se extiende a lo largo de la normal de la superficie.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-amber-400 block font-mono text-[11px]">Procedimiento de uso:</strong>
            <p className="text-justify">
              1. En Edit Mode, pulsa 3 y selecciona una cara con clic izquierdo.<br />
              2. Presiona <KeyBadge keys="E" size="sm" /> y mueve el ratón hacia afuera.<br />
              3. Haz clic izquierdo para confirmar la nueva longitud extruida.
            </p>
          </div>
        </div>

        {/* Loop Cut Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Split className="w-6 h-6" />
            </div>
            <KeyBadge keys={["Ctrl", "R"]} variant="orange" size="lg" onClick={() => recordShortcut('CTRL+R')} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Corte de Bucle (Loop Cut — Ctrl + R)</h3>
            <span className="text-xs font-mono text-slate-400 block mb-2">Subdivisión y densidad de malla</span>
            <p className="text-xs sm:text-sm text-slate-300 text-justify leading-relaxed">
              El comando <KeyBadge keys={["Ctrl", "R"]} size="sm" /> proyecta un corte circular completo a lo largo de la malla poligonal, permitiendo añadir detalle y preparar zonas para extrusiones posteriores.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-purple-400 block font-mono text-[11px]">Procedimiento de uso:</strong>
            <p className="text-justify">
              1. En Edit Mode, pulsa <KeyBadge keys={["Ctrl", "R"]} size="sm" /> y pasa el cursor sobre una arista.<br />
              2. Gira la rueda del ratón para aumentar el número de cortes simultáneos.<br />
              3. Clic izquierdo para fijar el corte, o clic derecho para centrarlo exactamente al 50%.
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Step-by-Step Walkthrough: From Cube to Object */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">
            Demostración Progresiva
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Flujo de Construcción: Del Cubo a un Mueble / Objeto Tridimensional
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observa la secuencia lógica combinando atajos para esculpir una pieza reconocible a partir de la geometría elemental.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELING_WALKTHROUGH.map((item, idx) => (
            <div
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                idx === activeStep
                  ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                    0{item.step}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.keys.map((k, i) => (
                      <KeyBadge key={i} keys={k} size="sm" variant={idx === activeStep ? 'orange' : 'default'} />
                    ))}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-300 text-justify leading-relaxed">
                  {item.action}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-amber-300 font-mono">
                {item.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
