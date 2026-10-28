import React from 'react';
import { MainSection } from '../../types/ova';
import { INSTITUTIONAL_DATA } from '../../data/contentData';
import { Box, GraduationCap, Building2, ExternalLink, Heart } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface FooterProps {
  onSelectSection: (section: MainSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 mt-20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={getAssetUrl('assets/ova_blender_logo_1792991899952.jpg')}
                  alt="Logo OVA Blender"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {INSTITUTIONAL_DATA.title}
                </h3>
                <span className="text-[11px] text-amber-400 font-mono">
                  {INSTITUTIONAL_DATA.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-justify leading-relaxed">
              Recurso educativo digital diseñado para la formación de competencias espaciales y destrezas prácticas en el pipeline de modelado 3D mediante atajos de teclado y metodología activa.
            </p>
          </div>

          {/* Navigation to 3 Sections */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-2">
              Navegación del OVA
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectSection('introduccion');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  1. Introducción y Tutorial de Instalación
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectSection('contenido');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  2. Contenido Temático y Simulador 3D
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectSection('evaluacion');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  3. Evaluación (3 Actividades Prácticas)
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Institutional Info */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-2">
              Créditos Institucionales
            </span>
            <div className="text-xs text-slate-400 space-y-1">
              <p>
                <strong className="text-slate-200">{INSTITUTIONAL_DATA.institution}</strong>
                <br />
                {INSTITUTIONAL_DATA.campus}
              </p>
              <p className="text-amber-400 font-medium">
                {INSTITUTIONAL_DATA.program} · {INSTITUTIONAL_DATA.faculty}
              </p>
              <div className="pt-2 text-[11px] text-slate-400">
                <span className="block text-slate-300 font-semibold">Autores:</span>
                {INSTITUTIONAL_DATA.authors.map((a, i) => (
                  <span key={i} className="block">{a.name}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Objeto Virtual de Aprendizaje (OVA). Desarrollado con fines exclusivamente educativos.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.blender.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
            >
              <span>Blender Foundation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>Licencia GNU GPL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
