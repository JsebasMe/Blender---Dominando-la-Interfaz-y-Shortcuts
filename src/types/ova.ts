export type MainSection = 'introduccion' | 'contenido' | 'evaluacion';

export type SubThematic = 
  | 'tema1'     // 1. Introducción a Blender
  | 'tema1_1'   // 1.1 Blender en la industria
  | 'tema1_2'   // 1.2 Interfaz y navegación (Labeled Graphics)
  | 'tema1_2_1' // 1.2.1 Espacio 3D y navegación (Ejes y controles)
  | 'tema1_3'   // 1.3 Selección y transformación
  | 'tema1_3_1' // 1.3.1 Shortcuts de transformación
  | 'tema1_4'   // 1.4 Edición de mallas y modelado
  | 'tema1_4_1' // 1.4.1 Herramientas y técnicas (Extrude, Loop Cut)
  | 'tema1_5'   // 1.5 Proyecto final
  | 'referencias';

export interface HabitRadarState {
  // Visited areas & interactions
  completedStepsInstall: number[];
  visitedInterfaceHotspots: string[];
  testedShortcuts: string[];
  viewportInteractions: {
    orbit: boolean;
    pan: boolean;
    zoom: boolean;
    transform: boolean;
  };
  meshComponentsExplored: string[];
  
  // Activities
  activity1Score: number | null; // 0-100
  activity1Completed: boolean;
  activity2Attempts: {
    attemptNumber: number;
    score: number; // 0-10
    percentage: number;
    date: string;
    answers: Record<number, number>;
  }[];
  activity3Submitted: boolean;
  activity3Data?: {
    studentName: string;
    studentId: string;
    fileName: string;
    fileSize: string;
    screenshotUrl: string | null;
    processDescription: string;
    submissionDate: string;
    rubricScores: {
      transformations: number; // /25
      tools: number;           // /25
      modelCoherence: number;  // /25
      documentation: number;   // /25
      total: number;           // /100
    };
  };
}

export type HabitLevel = 'novato' | 'iniciado' | 'tactico' | 'artista';

export interface HabitProfile {
  level: HabitLevel;
  title: string;
  badge: string;
  score: number; // 0 - 100
  description: string;
  nextGoal: string;
}
