import React from 'react';
import { APA_REFERENCES } from '../../data/contentData';
import { BookMarked, ExternalLink, ShieldCheck } from 'lucide-react';

export const BibliographySection: React.FC = () => {
  return (
    <section className="space-y-6 pt-6 border-t border-slate-800">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400">
          <BookMarked className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Rigor Académico y Fuentes Verificadas
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Referencias Bibliográficas (Normas APA 7.ª Edición)
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-xs sm:text-sm text-slate-300 text-justify leading-relaxed">
          Todas las afirmaciones conceptuales, definiciones del pipeline 3D, atajos de teclado y datos citados en este Objeto Virtual de Aprendizaje se encuentran debidamente respaldados por la documentación técnica oficial de la Fundación Blender y por publicaciones académicas arbitradas e indexadas en IEEE Xplore y editoriales científicas internacionales:
        </p>

        <ul className="space-y-3 pt-2">
          {APA_REFERENCES.map((ref) => (
            <li
              key={ref.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div className="space-y-1">
                <p className="text-xs text-slate-200 font-serif leading-relaxed text-justify">
                  {ref.citation}
                </p>
                <span className="text-[11px] text-slate-400 block">
                  {ref.note}
                </span>
              </div>

              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 hover:underline shrink-0 pt-1 sm:pt-0"
                >
                  <span>Consultar fuente</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 italic flex items-center justify-between">
          <span>Universidad Simón Bolívar · Facultad de Ingenierías · Programa de Ingeniería Multimedia</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Fuentes cotejadas
          </span>
        </div>
      </div>
    </section>
  );
};
