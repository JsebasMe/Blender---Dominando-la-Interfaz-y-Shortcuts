import React, { createContext, useContext, useEffect, useState } from 'react';
import { HabitLevel, HabitProfile, HabitRadarState } from '../types/ova';
import { soundFX } from '../utils/audioFeedback';
import { scorm } from '../utils/scorm';

const STORAGE_KEY = 'blender_ova_habits_v1';

const INITIAL_STATE: HabitRadarState = {
  completedStepsInstall: [],
  visitedInterfaceHotspots: [],
  testedShortcuts: [],
  viewportInteractions: {
    orbit: false,
    pan: false,
    zoom: false,
    transform: false
  },
  meshComponentsExplored: [],
  activity1Score: null,
  activity1Completed: false,
  activity2Attempts: [],
  activity3Submitted: false
};

interface HabitRadarContextType {
  state: HabitRadarState;
  profile: HabitProfile;
  radarScores: {
    navegacion: number;    // 0 - 100
    transformacion: number;// 0 - 100
    interfaz: number;      // 0 - 100
    modelado: number;      // 0 - 100
    evaluacion: number;    // 0 - 100
  };
  recordInstallStep: (stepNumber: number) => void;
  recordHotspot: (hotspotId: string) => void;
  recordShortcut: (shortcut: string) => void;
  recordViewportAction: (action: 'orbit' | 'pan' | 'zoom' | 'transform') => void;
  recordMeshComponent: (comp: string) => void;
  saveActivity1Score: (score: number) => void;
  saveQuizAttempt: (score: number, answers: Record<number, number>) => void;
  saveProjectSubmission: (data: NonNullable<HabitRadarState['activity3Data']>) => void;
  resetProgress: () => void;
}

const HabitRadarContext = createContext<HabitRadarContextType | undefined>(undefined);

export const HabitRadarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<HabitRadarState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save habit state to localStorage", e);
    }
  }, [state]);

  const recordInstallStep = (stepNumber: number) => {
    setState(prev => {
      if (prev.completedStepsInstall.includes(stepNumber)) return prev;
      return {
        ...prev,
        completedStepsInstall: [...prev.completedStepsInstall, stepNumber]
      };
    });
  };

  const recordHotspot = (hotspotId: string) => {
    setState(prev => {
      if (prev.visitedInterfaceHotspots.includes(hotspotId)) return prev;
      return {
        ...prev,
        visitedInterfaceHotspots: [...prev.visitedInterfaceHotspots, hotspotId]
      };
    });
  };

  const recordShortcut = (shortcut: string) => {
    setState(prev => {
      const normalized = shortcut.toUpperCase().trim();
      const isNew = !prev.testedShortcuts.includes(normalized);
      
      // Subtle audio feedback using Web Audio API
      soundFX.playShortcutSuccess();

      if (!isNew) return prev;
      return {
        ...prev,
        testedShortcuts: [...prev.testedShortcuts, normalized]
      };
    });
  };

  const recordViewportAction = (action: 'orbit' | 'pan' | 'zoom' | 'transform') => {
    setState(prev => {
      if (prev.viewportInteractions[action]) return prev;
      soundFX.playKeyTap();
      return {
        ...prev,
        viewportInteractions: {
          ...prev.viewportInteractions,
          [action]: true
        }
      };
    });
  };

  const recordMeshComponent = (comp: string) => {
    setState(prev => {
      if (prev.meshComponentsExplored.includes(comp)) return prev;
      return {
        ...prev,
        meshComponentsExplored: [...prev.meshComponentsExplored, comp]
      };
    });
  };

  const saveActivity1Score = (score: number) => {
    setState(prev => ({
      ...prev,
      activity1Score: Math.max(score, prev.activity1Score ?? 0),
      activity1Completed: true
    }));
  };

  const saveQuizAttempt = (score: number, answers: Record<number, number>) => {
    setState(prev => {
      const newAttempt = {
        attemptNumber: prev.activity2Attempts.length + 1,
        score,
        percentage: Math.round((score / 10) * 100),
        date: new Date().toLocaleString('es-CO'),
        answers
      };
      return {
        ...prev,
        activity2Attempts: [...prev.activity2Attempts, newAttempt]
      };
    });
  };

  const saveProjectSubmission = (data: NonNullable<HabitRadarState['activity3Data']>) => {
    setState(prev => ({
      ...prev,
      activity3Submitted: true,
      activity3Data: data
    }));
  };

  const resetProgress = () => {
    setState(INITIAL_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Calculate Radar Dimensions
  // 1. Interfaz (Hotspots + Install)
  const totalHotspots = 6;
  const hotspotScore = Math.min(100, Math.round((state.visitedInterfaceHotspots.length / totalHotspots) * 70) + (state.completedStepsInstall.length >= 4 ? 30 : state.completedStepsInstall.length * 7.5));
  
  // 2. Navegación (Orbit, Pan, Zoom)
  const navInteractionsCount = Object.values(state.viewportInteractions).filter(Boolean).length;
  const navegacionScore = Math.round((navInteractionsCount / 4) * 100);

  // 3. Transformación (Shortcuts G, R, S, axis locks)
  const keyShortcuts = ['G', 'R', 'S', 'TAB', 'E', 'CTRL+R'];
  const testedCount = state.testedShortcuts.filter(s => keyShortcuts.includes(s)).length;
  const otherShortcuts = Math.min(4, Math.max(0, state.testedShortcuts.length - testedCount));
  const transformacionScore = Math.min(100, Math.round(((testedCount * 14) + (otherShortcuts * 4))));

  // 4. Modelado (Mesh components + Edit mode tools)
  const meshCompScore = (state.meshComponentsExplored.length / 3) * 50;
  const modelingToolsBonus = (state.testedShortcuts.includes('E') ? 25 : 0) + (state.testedShortcuts.includes('CTRL+R') ? 25 : 0);
  const modeladoScore = Math.min(100, Math.round(meshCompScore + modelingToolsBonus));

  // 5. Evaluación (Actividad 1 + Actividad 2 + Actividad 3)
  const a1Part = (state.activity1Score ?? 0) * 0.3;
  const bestQuizScore = state.activity2Attempts.reduce((max, att) => Math.max(max, att.percentage), 0);
  const a2Part = bestQuizScore * 0.4;
  const a3Part = state.activity3Submitted ? 30 : 0;
  const evaluacionScore = Math.min(100, Math.round(a1Part + a2Part + a3Part));

  // Overall Global Efficiency Score (Weighted average)
  const overallScore = Math.round(
    (hotspotScore * 0.2) +
    (navegacionScore * 0.2) +
    (transformacionScore * 0.2) +
    (modeladoScore * 0.2) +
    (evaluacionScore * 0.2)
  );

  let level: HabitLevel = 'novato';
  let title = 'Modo Novato';
  let badge = '🌱 Aprendiz con Ratón';
  let description = 'Flujo de trabajo inicial con dependencia del cursor y navegación por menús visuales. Tu próximo paso es incorporar las teclas de acceso rápido (G, R, S).';
  let nextGoal = 'Prueba a mover y rotar el cubo usando las teclas "G" y "R" en lugar de hacer clics.';

  if (overallScore >= 76) {
    level = 'artista';
    title = 'Modo Artista 3D';
    badge = '🚀 Maestro de Shortcuts';
    description = '¡Excelente nivel de autonomía! Navegas con memoria muscular, transformas en ejes cartesianos, editas mallas y aplicas extrusiones con fluidez profesional.';
    nextGoal = 'Perfecciona tu reto práctico y genera tu constancia de modelado.';
  } else if (overallScore >= 51) {
    level = 'tactico';
    title = 'Modelador Táctico';
    badge = '⚡ Operador de Teclado';
    description = 'Demuestras soltura con los tres grandes (G, R, S), alternas modos con Tab y dominas subdivisiones con Ctrl+R sin vacilar.';
    nextGoal = 'Completa el Quiz de 10 preguntas y envía tu modelo final para alcanzar el nivel Artista 3D.';
  } else if (overallScore >= 26) {
    level = 'iniciado';
    title = 'Iniciado en el Viewport';
    badge = '🧭 Explorador 3D';
    description = 'Ya comprendes la orientación espacial por ejes (X, Y, Z) y los paneles de la interfaz de Blender.';
    nextGoal = 'Practica la combinación de transformaciones con ejes numéricos (ej. S + Z).';
  }

  const profile: HabitProfile = {
    level,
    title,
    badge,
    score: overallScore,
    description,
    nextGoal
  };

  // Sync real-time progress and score with LMS via SCORM 1.2 / 2004
  useEffect(() => {
    scorm.setScore(overallScore, overallScore >= 70);
  }, [overallScore]);

  return (
    <HabitRadarContext.Provider
      value={{
        state,
        profile,
        radarScores: {
          interfaz: hotspotScore,
          navegacion: navegacionScore,
          transformacion: transformacionScore,
          modelado: modeladoScore,
          evaluacion: evaluacionScore
        },
        recordInstallStep,
        recordHotspot,
        recordShortcut,
        recordViewportAction,
        recordMeshComponent,
        saveActivity1Score,
        saveQuizAttempt,
        saveProjectSubmission,
        resetProgress
      }}
    >
      {children}
    </HabitRadarContext.Provider>
  );
};

export const useHabitRadar = () => {
  const context = useContext(HabitRadarContext);
  if (!context) {
    throw new Error('useHabitRadar must be used within a HabitRadarProvider');
  }
  return context;
};
