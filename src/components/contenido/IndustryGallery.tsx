import React, { useState } from 'react';
import { INDUSTRY_FILMS, FilmProject } from '../../data/contentData';
import { 
  Clapperboard, 
  Gamepad2, 
  Sparkles, 
  Printer, 
  Tv, 
  Building, 
  Play, 
  ExternalLink, 
  X,
  Quote
} from 'lucide-react';

export const IndustryGallery: React.FC = () => {
  const [selectedFilm, setSelectedFilm] = useState<FilmProject | null>(null);

  const industrySectors = [
    {
      title: "Desarrollo de Videojuegos",
      icon: Gamepad2,
      desc: "Modelado de props, personajes y escenarios optimizados (low-poly y high-poly con bakeo de texturas) para Unity y Unreal Engine."
    },
    {
      title: "Producción Cinematográfica y TV",
      icon: Clapperboard,
      desc: "Animación de largometrajes comerciales, cortometrajes galardonados en festivales (Festival de Cannes) y series animadas."
    },
    {
      title: "Efectos Visuales (VFX)",
      icon: Sparkles,
      desc: "Integración de elementos 3D hiperrealistas con metraje de acción real, tracking de cámara y simulación de partículas."
    },
    {
      title: "Prototipado e Impresión 3D",
      icon: Printer,
      desc: "Modelado de piezas mecánicas, figuras coleccionables y prototipos funcionales con mallas herméticas libres de agujeros."
    },
    {
      title: "Visualización Arquitectónica (ArchViz)",
      icon: Building,
      desc: "Renderizado fotorealista de interiores y exteriores con cálculo de iluminación física solar e IES."
    },
    {
      title: "Publicidad y Motion Graphics",
      icon: Tv,
      desc: "Animación de productos comerciales, tipografía cinética 3D y secuencias gráficas promocionales."
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400">
          <Clapperboard className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
            Subtemática 1.1
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Blender en la Industria Audiovisual y Creativa
          </h2>
        </div>
      </div>

      {/* Theoretical Context with text-justify */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Las aplicaciones de Blender abarcan desde el modelado 3D para videojuegos e impresión 3D, hasta la producción audiovisual de alto presupuesto y efectos visuales (VFX). Gracias a su comunidad activa y a sus constantes actualizaciones, se ha consolidado como una herramienta ideal tanto para profesionales independientes (<span className="text-amber-400 font-semibold">freelancers</span>) como para grandes estudios de animación y cine.
        </p>

        {/* Academic Previsualization Quote Box (Pramono & Muchransyah, 2025) */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-950/70 border-l-4 border-purple-500 border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <Quote className="w-4 h-4" />
            <span>Previsualización Cinematográfica en Blender</span>
          </div>
          <p className="text-sm sm:text-base text-purple-100/90 italic text-justify leading-relaxed font-serif">
            “Los diseñadores de producción utilizaron la vista previa de Blender para evaluar el balance de color y la colocación de los accesorios en relación con el movimiento de los actores, corrigiendo las inconsistencias de escala e iluminación antes del rodaje.”
          </p>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
            <span>(Pramono & Muchransyah, 2025, ICIMCIS IEEE)</span>
            <span className="text-[11px] text-purple-400 font-mono">Optimización de rodajes</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Esto evidencia cómo el software optimiza los flujos de trabajo profesionales, permitiendo validar decisiones creativas y reducir errores costosos antes de la producción real, garantizando que directores y artistas hablen el mismo lenguaje visual.
        </p>
      </div>

      {/* Sector Pills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {industrySectors.map((sector, idx) => {
          const Icon = sector.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-1.5 rounded-lg bg-slate-800 text-amber-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">{sector.title}</h4>
              </div>
              <p className="text-xs text-slate-300 text-justify leading-relaxed">
                {sector.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Audiovisual Showcase of Real Blender Films */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Galería de Proyectos Cinematográficos Emblemáticos
            </h3>
            <p className="text-xs text-slate-400">
              Obras de referencia creadas íntegramente con Blender para cine y festivales internacionales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRY_FILMS.map((film) => (
            <div
              key={film.id}
              className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Video Thumbnail / Preview Container */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => setSelectedFilm(film)}
                      className="w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      aria-label={`Ver video de ${film.title}`}
                    >
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-slate-950/80 text-white px-2 py-0.5 rounded border border-slate-800">
                    {film.year}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                    <span>{film.studio}</span>
                    <span>{film.type.split('/')[0]}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {film.title}
                  </h4>
                  <p className="text-xs text-slate-300 text-justify leading-relaxed">
                    {film.description}
                  </p>
                </div>
              </div>

              {/* Bottom Technical Highlight */}
              <div className="p-5 pt-0">
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 text-justify mb-3">
                  <strong className="text-slate-300 block mb-0.5">Hito técnico:</strong>
                  {film.technicalHighlight}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => setSelectedFilm(film)}
                    className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Reproducir</span>
                  </button>
                  <a
                    href={film.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-xs"
                  >
                    <span>Enlace YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedFilm.title} ({selectedFilm.year})</h3>
                <span className="text-xs text-amber-400">{selectedFilm.studio} · {selectedFilm.type}</span>
              </div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Cerrar reproductor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedFilm.youtubeId}?autoplay=1&rel=0`}
                title={selectedFilm.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 text-xs text-slate-300 text-justify">
              {selectedFilm.description}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
