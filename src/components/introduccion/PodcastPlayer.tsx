import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  RotateCcw, 
  Sparkles, 
  Download,
  Headphones,
  FastForward,
  Clock
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export const PodcastPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const audioSrc = getAssetUrl('assets/aistudio/blender_sin_limite_podcast_7f02cb3e.mp3');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const cyclePlaybackRate = () => {
    if (!audioRef.current) return;
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const restartTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="space-y-4">
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
          <Radio className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
              Recurso Sonoro Integrado
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono">
              Podcast Oficial
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Podcast: "Blender sin Límites — De Novato a Artista 3D"
          </h2>
        </div>
      </div>

      {/* Main Podcast Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 group">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Podcast Cover Artwork */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-500/30 shadow-2xl flex items-center justify-center p-3 group/cover">
              <img
                src={getAssetUrl('assets/aistudio/first_86721a68.jpg')}
                alt="Blender sin Límites Podcast"
                className="w-full h-full object-cover rounded-xl group-hover/cover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-3.5">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Headphones className="w-3 h-3" /> Episodio 01
                </span>
                <span className="text-xs font-bold text-white leading-tight">
                  Blender sin Límites
                </span>
                <span className="text-[10px] text-slate-300">
                  Juan Mendieta & Danna Duarte
                </span>
              </div>

              {/* Pulsing on-air badge */}
              {isPlaying && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-red-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>EN PLAY</span>
                </div>
              )}
            </div>
          </div>

          {/* Details & Controls */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  Guía Sonora del OVA
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {formatTime(duration || 311)} min
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Fundamentos, Pipeline y Filosofía de Código Abierto
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 text-justify leading-relaxed">
                Acompaña a Juan y Danna en esta inmersión auditiva donde desglosan el pipeline tridimensional completo, la importancia de los atajos de teclado para la memoria muscular y el medidor de progreso del <strong>Radar de Hábitos</strong>.
              </p>
            </div>

            {/* Simulated Animated Waveform Bars */}
            <div className="h-10 flex items-end justify-between gap-1 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-hidden">
              {[40, 65, 85, 30, 95, 70, 50, 80, 100, 60, 45, 90, 75, 35, 80, 65, 90, 55, 70, 85, 45, 60, 95, 75, 50, 85, 70, 40, 90, 65, 50, 80].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'bg-gradient-to-t from-amber-500 to-orange-400'
                      : 'bg-slate-700/60'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * ((i % 3) + 1)) % 100)}%` : `${height * 0.3}%`
                  }}
                />
              ))}
            </div>

            {/* Scrubber Timeline */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                {/* Restart */}
                <button
                  onClick={restartTrack}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Reiniciar podcast desde el principio"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Big Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 active:scale-95 group/btn"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      <span>Reproducir Podcast</span>
                    </>
                  )}
                </button>

                {/* Speed Switcher */}
                <button
                  onClick={cyclePlaybackRate}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold transition-colors"
                  title="Cambiar velocidad de reproducción"
                >
                  {playbackRate}x
                </button>
              </div>

              {/* Volume & Download */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <button onClick={toggleMute} className="text-slate-400 hover:text-white">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <a
                  href={audioSrc}
                  download="blender_sin_limite_podcast.mp3"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Descargar archivo de audio MP3"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
