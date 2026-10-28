import React, { useState } from 'react';
import { Video, Play, ExternalLink, Settings2, Sparkles, CheckCircle2 } from 'lucide-react';

export const WelcomeVideoModal: React.FC = () => {
  // Configured with requested Blender download & installation tutorial video
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/embed/gKAcnpNYIA0');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      let finalEmbed = tempUrl.trim();
      if (finalEmbed.includes('watch?v=')) {
        finalEmbed = finalEmbed.replace('watch?v=', 'embed/');
      } else if (finalEmbed.includes('youtu.be/')) {
        finalEmbed = finalEmbed.replace('youtu.be/', 'www.youtube.com/embed/');
      }
      setVideoUrl(finalEmbed);
      setIsEditingUrl(false);
      setIsPlaying(true);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold">
                Recurso Audiovisual de Instalación
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30 font-mono">
                YouTube
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Video Tutorial: Cómo Descargar e Instalar Blender Paso a Paso
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.youtube.com/watch?v=gKAcnpNYIA0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-400 font-medium transition-colors"
          >
            <span>Ver en YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              setTempUrl(videoUrl);
              setIsEditingUrl(!isEditingUrl);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
            title="Personalizar URL del video tutorial"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Configurar video</span>
          </button>
        </div>
      </div>

      {/* URL Customization Bar */}
      {isEditingUrl && (
        <form onSubmit={handleApplyUrl} className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col sm:flex-row gap-2 animate-fadeIn">
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="Pega aquí el enlace de YouTube o youtu.be (ej. https://youtu.be/...)"
            className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Aplicar enlace
            </button>
            <button
              type="button"
              onClick={() => setIsEditingUrl(false)}
              className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* 16:9 Video Container with Playback / Placeholder */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
        {isPlaying ? (
          <iframe
            src={`${videoUrl}?autoplay=1&rel=0`}
            title="Video tutorial: Cómo descargar e instalar Blender"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60">
            {/* Visual background element */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea7600_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-lg space-y-4">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-105 transition-all mx-auto active:scale-95"
                aria-label="Reproducir video de instalación"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </button>

              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold block mb-1">
                  Guía Audiovisual Paso a Paso
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Cómo Descargar e Instalar Blender en tu Computadora
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 text-justify sm:text-center">
                  Aprende visualmente el proceso completo desde la descarga del instalador oficial en blender.org hasta el primer inicio del software en tu sistema.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  Resolución nativa: 16:9 HD
                </span>
                <span className="text-[11px] text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  Instalación Guiada
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 text-justify">
        Este espacio audiovisual permite integrar la inducción oficial de la asignatura o sustituirla por cualquier contenido en video mediante el botón "Configurar video".
      </p>
    </section>
  );
};
