import React from 'react';
import { INSTITUTIONAL_DATA } from '../../data/contentData';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Layers, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Terminal,
  MousePointer2
} from 'lucide-react';
import { KeyBadge } from '../common/KeyBadge';
import { getAssetUrl } from '../../utils/assetUrl';

interface HeroCoverProps {
  onStartLearning: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ onStartLearning }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-14">
      {/* Decorative ambient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Objeto Virtual de Aprendizaje (OVA)
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Tiempo estimado: {INSTITUTIONAL_DATA.estimatedTime}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-emerald-400 border border-emerald-500/30">
            ● Activo y Evaluativo
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3 mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Blender: <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Dominando la Interfaz</span> y Shortcuts
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl text-justify font-normal leading-relaxed">
            Aprende a reconocer los componentes clave de Blender, navegar con precisión en el espacio tridimensional y acelerar tu flujo de trabajo mediante el dominio práctico de los atajos de teclado fundamentales.
          </p>
        </div>

        {/* 3D Visual Composition Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-8 p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              Pipeline de Aprendizaje Acelerado
            </div>
            <p className="text-sm text-slate-300 text-justify leading-relaxed">
              Pasa de depender de los menús gráficos a operar la vista 3D con la memoria muscular de un artista digital profesional. En este recurso interactivo dominarás la navegación espacial, los ejes cartesianos <span className="text-red-400 font-semibold font-mono">X</span>, <span className="text-emerald-400 font-semibold font-mono">Y</span>, <span className="text-blue-400 font-semibold font-mono">Z</span>, las transformaciones <KeyBadge keys="G" size="sm" />, <KeyBadge keys="R" size="sm" />, <KeyBadge keys="S" size="sm" /> y las herramientas clave de modelado poligonal.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">Atajos esenciales a dominar:</span>
              <KeyBadge keys="MMB" variant="orange" size="sm" />
              <KeyBadge keys={["Shift", "MMB"]} size="sm" />
              <KeyBadge keys="Tab" variant="orange" size="sm" />
              <KeyBadge keys="E" size="sm" />
              <KeyBadge keys={["Ctrl", "R"]} variant="orange" size="sm" />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group">
            {/* User Provided Featured Artwork (Blender + FLOW Animation) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={getAssetUrl('assets/aistudio/first_86721a68.jpg')}
                alt="Blender 3D - The Freedom to Create"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-amber-400 font-bold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Blender 3D Suite</span>
              </div>

              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
                <span className="font-semibold text-white">The Freedom to Create</span>
                <span className="text-amber-400 font-mono text-[10px]">Open Source</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 mt-2.5 text-center font-medium">
              Suite de creación tridimensional de código abierto
            </span>
          </div>
        </div>

        {/* Institutional & Authors Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          {/* Institutional Info */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                Institución de Educación Superior
              </span>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">
                {INSTITUTIONAL_DATA.institution}
              </p>
              <p className="text-xs text-amber-400/90 font-medium">
                {INSTITUTIONAL_DATA.campus}
              </p>
            </div>
          </div>

          {/* Academic Program */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                Programa Académico
              </span>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">
                {INSTITUTIONAL_DATA.program}
              </p>
              <p className="text-xs text-slate-400">
                {INSTITUTIONAL_DATA.faculty}
              </p>
            </div>
          </div>

          {/* Authors */}
          <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                Autores / Diseñadores del OVA
              </span>
              <div className="text-xs space-y-0.5 mt-0.5">
                <p className="font-bold text-slate-200">{INSTITUTIONAL_DATA.authors[0].name}</p>
                <p className="font-bold text-slate-200">{INSTITUTIONAL_DATA.authors[1].name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-base transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.99] group"
          >
            <span>Comenzar Aprendizaje</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Diseñado para estudiantes y principiantes sin experiencia previa en 3D.
          </span>
        </div>
      </div>
    </section>
  );
};
