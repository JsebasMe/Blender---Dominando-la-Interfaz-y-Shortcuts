import React from 'react';
import { BookOpen, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const Contextualizacion: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Fundamentación Pedagógica
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Contextualización y Justificación
          </h2>
        </div>
      </div>

      {/* Main Narrative Paragraphs (Strictly text-justify) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          El manejo de Blender como herramienta de modelado, animación y creación de contenido tridimensional se constituye en una competencia fundamental dentro de la formación en diseño digital, animación y desarrollo de videojuegos, pues es uno de los software libres más utilizados a nivel mundial en la industria del modelado 3D, los efectos visuales y la producción audiovisual. La importancia de su estudio radica en permitir la identificación y aplicación correcta de los atajos de teclado (<span className="text-amber-400 font-semibold">shortcuts</span>) esenciales para navegar, seleccionar, transformar y editar objetos en la vista 3D, optimizando así el flujo de trabajo bajo un enfoque práctico que permite pasar de una idea conceptual a un objeto tridimensional terminado.
        </p>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          En concordancia con esto, el dominio de la interfaz y los atajos de teclado es un pilar fundamental para ejecutar de manera ágil la totalidad del pipeline 3D, permitiendo que los artistas y diseñadores se enfoquen en la creatividad y la resolución de problemas técnicos sin interrupciones ni dispersión mental por la búsqueda constante de menús gráficos contextuales (Blender Foundation, 2023).
        </p>

        {/* Academic Quotation Box */}
        <div className="my-6 p-5 sm:p-6 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 border-y border-r border-slate-800 relative">
          <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4 pointer-events-none" />
          <p className="text-sm sm:text-base text-amber-100/90 italic text-justify leading-relaxed font-serif">
            “Consideramos que Blender es útil no solo como simulador virtual y herramienta de visualización, sino también como herramienta de diseño de modelado de objetos necesarios para la experimentación real.”
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              — Hattori, Masuda, Moritoh, Imai, Kawakami & Tanaka (2020, IEEE TALE)
            </span>
            <span className="text-[11px] text-amber-400 font-mono">Cita académica verificada</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Al transitar de una manipulación visual basada únicamente en el cursor del ratón hacia una metodología bimanual (mano izquierda en teclado para shortcuts y mano derecha en el ratón para precisión espacial), el tiempo de ejecución se reduce de manera notable y la concentración se mantiene centrada en la anatomía y proporciones del modelo tridimensional.
        </p>
      </div>

      {/* Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm mb-2">
            01
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Sin Barreras Económicas</h4>
          <p className="text-xs text-slate-400 text-justify">
            Software de código abierto y completamente gratuito para uso educativo, comercial y científico profesional.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm mb-2">
            02
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Memoria Muscular Eficiente</h4>
          <p className="text-xs text-slate-400 text-justify">
            Apropiación de atajos intuitivos (G, R, S, Tab, E, Ctrl+R) para reducir la fatiga cognitiva al modelar.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
            03
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Pipeline Integral</h4>
          <p className="text-xs text-slate-400 text-justify">
            Cubre desde el bocetado de volúmenes hasta el renderizado fotorrealista y la exportación para motores de juego.
          </p>
        </div>
      </div>
    </section>
  );
};
