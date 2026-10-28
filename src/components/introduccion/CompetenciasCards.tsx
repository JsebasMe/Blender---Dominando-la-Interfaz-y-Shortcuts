import React from 'react';
import { Target, Brain, Wrench, CheckCircle } from 'lucide-react';

export const CompetenciasCards: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
            Resultados de Aprendizaje
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Competencias a Desarrollar
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SABER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Dimensión Cognitiva
              </span>
              <Brain className="w-6 h-6 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              SABER: Conceptualización e Identificación
            </h3>

            <p className="text-sm text-slate-300 text-justify leading-relaxed">
              Identificar los componentes de la interfaz de Blender, su entorno de trabajo y las principales aplicaciones del software en la industria del modelado 3D, la animación y la producción audiovisual. Asimismo, comprender la función y utilidad de los atajos de teclado (<span className="text-amber-400 font-medium">shortcuts</span>) esenciales para la navegación, selección, transformación y edición de objetos en el espacio tridimensional.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Reconocimiento de paneles: Viewport, Outliner, Properties y Timeline.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Comprensión del sistema de ejes cartesianos normalizados (X, Y, Z).</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Fundamento conceptual de los tres grandes: Mover (G), Rotar (R), Escalar (S).</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Evaluado en: Quiz de 10 preguntas</span>
            <span className="font-mono text-amber-400">Teoría y Estructura</span>
          </div>
        </div>

        {/* SABER HACER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between group hover:border-blue-500/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                Dimensión Procedimental
              </span>
              <Wrench className="w-6 h-6 text-blue-400" />
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              SABER HACER: Aplicación Práctica
            </h3>

            <p className="text-sm text-slate-300 text-justify leading-relaxed">
              Aplicar correctamente los atajos de teclado para navegar, seleccionar, transformar y editar objetos en la vista 3D de Blender. Ejecutar el flujo de trabajo de modelado tridimensional utilizando las herramientas de edición de mallas (<span className="text-blue-400 font-medium">Extrude</span>, <span className="text-blue-400 font-medium">Loop Cut</span>, entre otras), optimizando el tiempo y la eficiencia en la creación de objetos desde una idea conceptual hasta un modelo terminado.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Navegación espacial con ratón (Órbita MMB, Paneo Shift+MMB, Zoom rueda).</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Restricción precisa de transformaciones sobre ejes específicos (ej. S + Z).</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Edición sub-poligonal: Vértices (1), Aristas (2), Caras (3), Extrude (E) y Loop Cut (Ctrl+R).</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Evaluado en: Reto práctico del cubo</span>
            <span className="font-mono text-blue-400">Destreza Operativa</span>
          </div>
        </div>
      </div>
    </section>
  );
};
