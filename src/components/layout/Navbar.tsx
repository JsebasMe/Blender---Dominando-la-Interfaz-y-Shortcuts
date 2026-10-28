import React, { useState } from 'react';
import { MainSection } from '../../types/ova';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Menu, 
  X, 
  Box, 
  Sparkles,
  GraduationCap,
  Volume2,
  VolumeX,
  Download
} from 'lucide-react';
import { soundFX } from '../../utils/audioFeedback';
import { getAssetUrl } from '../../utils/assetUrl';

interface NavbarProps {
  activeSection: MainSection;
  onSelectSection: (section: MainSection) => void;
  onOpenRadar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenRadar
}) => {
  const { profile } = useHabitRadar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFX.getMuted());

  const handleToggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      soundFX.playShortcutSuccess();
    }
  };

  const navItems: { id: MainSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'introduccion', label: '1. Introducción', icon: BookOpen },
    { id: 'contenido', label: '2. Contenido', icon: Layers },
    { id: 'evaluacion', label: '3. Evaluación', icon: CheckCircle2 }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Academic Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectSection('introduccion')}
              className="flex items-center gap-3 text-left group"
              aria-label="Ir a la portada de Introducción"
            >
              {/* Official OVA Blender Logo */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={getAssetUrl('assets/ova_blender_logo_1792991899952.jpg')}
                  alt="Logo Oficial OVA Blender"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    OVA Interactivo
                  </span>
                  <span className="text-[10px] hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    Unisimón · Multimedia
                  </span>
                </div>
                <h1 className="text-sm md:text-base font-bold text-white tracking-tight leading-none mt-0.5">
                  Blender: Interfaz y Shortcuts
                </h1>
              </div>
            </button>
          </div>

          {/* Strict 3 Main Sections Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-2xl shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Sound Feedback & Radar de Hábitos Widget Trigger */}
          <div className="flex items-center gap-2">
            {/* Direct Download ZIP Button */}
            <a
              href={getAssetUrl('ova-blender.zip')}
              download="ova-blender.zip"
              className="p-2 md:px-2.5 md:py-2 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Descargar código completo del OVA (.ZIP)"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline text-[11px] font-mono">Código .ZIP</span>
            </a>

            {/* Audio Feedback Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 md:px-2.5 md:py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAudioMuted
                  ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  : 'bg-slate-800/90 border-amber-500/30 text-amber-400 hover:border-amber-400 shadow-sm'
              }`}
              title={isAudioMuted ? 'Activar feedback sonoro de shortcuts' : 'Silenciar feedback sonoro de shortcuts'}
              aria-label={isAudioMuted ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
              <span className="hidden lg:inline text-[10px] font-mono">
                {isAudioMuted ? 'Mute' : 'Audio FX'}
              </span>
            </button>

            <button
              onClick={onOpenRadar}
              className="flex items-center gap-2 px-3 py-1.5 md:px-3.5 md:py-2 rounded-xl bg-slate-800/90 border border-amber-500/30 hover:border-amber-500 text-slate-200 hover:text-white transition-all shadow-sm group"
              title="Abrir Radar de Hábitos: De Novato a Artista 3D"
            >
              <div className="relative">
                <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-400 font-medium leading-none">Radar de Hábitos</div>
                <div className="text-xs font-bold text-amber-400 leading-tight flex items-center gap-1">
                  <span>{profile.title}</span>
                  <span className="text-[10px] text-slate-300 font-mono font-normal">({profile.score}%)</span>
                </div>
              </div>
              <span className="sm:hidden text-xs font-bold text-amber-400">{profile.score}%</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 p-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
