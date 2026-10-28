import React from 'react';
import { soundFX } from '../../utils/audioFeedback';

interface KeyBadgeProps {
  keys: string | string[];
  variant?: 'default' | 'orange' | 'accent' | 'axis-x' | 'axis-y' | 'axis-z';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const KeyBadge: React.FC<KeyBadgeProps> = ({
  keys,
  variant = 'default',
  size = 'md',
  className = '',
  onClick
}) => {
  const keyList = Array.isArray(keys) ? keys : [keys];

  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md',
    lg: 'text-sm px-3.5 py-1.5 rounded-lg font-bold'
  };

  const getVariantClasses = (v: typeof variant) => {
    switch (v) {
      case 'orange':
        return 'bg-gradient-to-b from-amber-500 to-amber-600 text-white border-amber-400 border-b-amber-700 shadow-amber-900/40';
      case 'axis-x':
        return 'bg-gradient-to-b from-red-600 to-red-700 text-white border-red-500 border-b-red-900 shadow-red-950/40';
      case 'axis-y':
        return 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white border-emerald-500 border-b-emerald-900 shadow-emerald-950/40';
      case 'axis-z':
        return 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-500 border-b-blue-900 shadow-blue-950/40';
      case 'accent':
        return 'bg-gradient-to-b from-purple-600 to-purple-800 text-white border-purple-400 border-b-purple-950';
      default:
        return 'bg-gradient-to-b from-slate-700 to-slate-800 text-slate-100 border-slate-600 border-b-slate-950 shadow-black/50';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 font-mono tracking-tight ${className}`}>
      {keyList.map((k, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="text-slate-400 text-xs font-semibold mx-0.5">+</span>}
          <kbd
            onClick={() => {
              if (onClick) {
                soundFX.playKeyTap();
                onClick();
              }
            }}
            className={`inline-flex items-center justify-center font-mono font-semibold border shadow-md transition-all active:translate-y-0.5 select-none ${sizeClasses[size]} ${getVariantClasses(variant)} ${
              onClick ? 'cursor-pointer hover:brightness-110' : ''
            }`}
          >
            {k}
          </kbd>
        </React.Fragment>
      ))}
    </span>
  );
};
