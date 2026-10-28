/**
 * SCORM 1.2 & SCORM 2004 API Wrapper
 * 
 * Provides seamless bi-directional communication between the Blender OVA
 * and Learning Management Systems (Moodle, Blackboard, Canvas, Chamilo, etc.).
 * Includes automatic LMS API discovery up parent frames and graceful fallback
 * for standalone web browsing.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    API?: any;          // SCORM 1.2
    API_1484_11?: any;  // SCORM 2004
  }
}

export type ScormVersion = '1.2' | '2004' | 'none';

export interface ScormInfo {
  connected: boolean;
  version: ScormVersion;
  studentName: string | null;
  studentId: string | null;
  lessonStatus: string | null;
  score: number | null;
}

class ScormService {
  private api: any = null;
  private version: ScormVersion = 'none';
  private isInitialized = false;
  private isFinished = false;
  private startTime: number = Date.now();
  private listeners: ((info: ScormInfo) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
      window.addEventListener('beforeunload', () => this.finish());
      window.addEventListener('pagehide', () => this.finish());
    }
  }

  /**
   * Search for SCORM API in window hierarchy
   */
  private findAPI(win: Window): { api: any; version: ScormVersion } | null {
    let attempts = 0;
    const maxAttempts = 10;
    let currentWin: Window | null = win;

    while (currentWin && attempts < maxAttempts) {
      try {
        if (currentWin.API) {
          return { api: currentWin.API, version: '1.2' };
        }
        if (currentWin.API_1484_11) {
          return { api: currentWin.API_1484_11, version: '2004' };
        }
      } catch (e) {
        // Cross-origin iframe security block
        break;
      }

      if (currentWin === currentWin.parent) {
        break;
      }
      currentWin = currentWin.parent;
      attempts++;
    }

    // Try opener if window was opened as a popup
    try {
      if (win.opener && typeof win.opener === 'object') {
        if (win.opener.API) {
          return { api: win.opener.API, version: '1.2' };
        }
        if (win.opener.API_1484_11) {
          return { api: win.opener.API_1484_11, version: '2004' };
        }
      }
    } catch {
      // ignore cross-origin opener
    }

    return null;
  }

  /**
   * Initialize SCORM communication
   */
  public init(): boolean {
    if (this.isInitialized) return true;

    const found = this.findAPI(window);
    if (!found) {
      this.version = 'none';
      this.api = null;
      console.log('📦 [SCORM] Entorno independiente (Standalone). No se detectó LMS.');
      return false;
    }

    this.api = found.api;
    this.version = found.version;

    try {
      let initResult = false;
      if (this.version === '1.2') {
        const res = this.api.LMSInitialize('');
        initResult = res === 'true' || res === true;
      } else if (this.version === '2004') {
        const res = this.api.Initialize('');
        initResult = res === 'true' || res === true;
      }

      if (initResult) {
        this.isInitialized = true;
        this.startTime = Date.now();
        console.log(`📦 [SCORM] Conectado exitosamente con LMS (Estándar SCORM ${this.version})`);

        // Check if first launch, mark incomplete
        const currentStatus = this.getStatus();
        if (!currentStatus || currentStatus === 'not attempted' || currentStatus === 'unknown') {
          this.setStatus('incomplete');
        }

        this.notifyListeners();
        return true;
      }
    } catch (e) {
      console.warn('⚠️ [SCORM] Error al invocar Initialize en el LMS:', e);
    }

    return false;
  }

  public isConnected(): boolean {
    return this.isInitialized && this.version !== 'none';
  }

  public getVersion(): ScormVersion {
    return this.version;
  }

  /**
   * Read student name from LMS
   */
  public getStudentName(): string | null {
    if (!this.isConnected()) return null;
    try {
      if (this.version === '1.2') {
        return this.api.LMSGetValue('cmi.core.student_name') || null;
      } else if (this.version === '2004') {
        return this.api.GetValue('cmi.learner_name') || null;
      }
    } catch {
      return null;
    }
    return null;
  }

  /**
   * Read student ID from LMS
   */
  public getStudentId(): string | null {
    if (!this.isConnected()) return null;
    try {
      if (this.version === '1.2') {
        return this.api.LMSGetValue('cmi.core.student_id') || null;
      } else if (this.version === '2004') {
        return this.api.GetValue('cmi.learner_id') || null;
      }
    } catch {
      return null;
    }
    return null;
  }

  /**
   * Get lesson status ('incomplete', 'completed', 'passed', 'failed')
   */
  public getStatus(): string | null {
    if (!this.isConnected()) return null;
    try {
      if (this.version === '1.2') {
        return this.api.LMSGetValue('cmi.core.lesson_status') || null;
      } else if (this.version === '2004') {
        return this.api.GetValue('cmi.completion_status') || null;
      }
    } catch {
      return null;
    }
    return null;
  }

  /**
   * Set lesson status
   */
  public setStatus(status: 'incomplete' | 'completed' | 'passed' | 'failed'): boolean {
    if (!this.isConnected()) return false;
    try {
      let res: any = false;
      if (this.version === '1.2') {
        res = this.api.LMSSetValue('cmi.core.lesson_status', status);
      } else if (this.version === '2004') {
        res = this.api.SetValue('cmi.completion_status', status === 'passed' ? 'completed' : status);
        if (status === 'passed' || status === 'failed') {
          this.api.SetValue('cmi.success_status', status);
        }
      }
      this.commit();
      this.notifyListeners();
      return res === 'true' || res === true;
    } catch {
      return false;
    }
  }

  /**
   * Report evaluation score to LMS (0 to 100)
   */
  public setScore(rawScore: number, min = 0, max = 100): boolean {
    if (!this.isConnected()) return false;
    try {
      const clampedScore = Math.max(min, Math.min(max, Math.round(rawScore)));
      
      if (this.version === '1.2') {
        this.api.LMSSetValue('cmi.core.score.min', min.toString());
        this.api.LMSSetValue('cmi.core.score.max', max.toString());
        this.api.LMSSetValue('cmi.core.score.raw', clampedScore.toString());
      } else if (this.version === '2004') {
        this.api.SetValue('cmi.score.min', min.toString());
        this.api.SetValue('cmi.score.max', max.toString());
        this.api.SetValue('cmi.score.raw', clampedScore.toString());
        const scaled = (clampedScore - min) / (max - min);
        this.api.SetValue('cmi.score.scaled', scaled.toFixed(2));
      }

      // If passing grade (>= 70%), mark as passed
      if (clampedScore >= 70) {
        this.setStatus('passed');
      } else {
        this.setStatus('incomplete');
      }

      this.commit();
      this.notifyListeners();
      return true;
    } catch (e) {
      console.warn('⚠️ [SCORM] Error guardando puntaje en LMS:', e);
      return false;
    }
  }

  /**
   * Save suspend_data (JSON progress state)
   */
  public saveSuspendData(data: Record<string, unknown>): boolean {
    if (!this.isConnected()) return false;
    try {
      const json = JSON.stringify(data);
      if (this.version === '1.2') {
        this.api.LMSSetValue('cmi.suspend_data', json);
      } else if (this.version === '2004') {
        this.api.SetValue('cmi.suspend_data', json);
      }
      this.commit();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get suspend_data
   */
  public getSuspendData(): Record<string, unknown> | null {
    if (!this.isConnected()) return null;
    try {
      let raw = '';
      if (this.version === '1.2') {
        raw = this.api.LMSGetValue('cmi.suspend_data');
      } else if (this.version === '2004') {
        raw = this.api.GetValue('cmi.suspend_data');
      }
      if (raw && typeof raw === 'string') {
        return JSON.parse(raw);
      }
    } catch {
      return null;
    }
    return null;
  }

  /**
   * Commit changes to LMS
   */
  public commit(): boolean {
    if (!this.isConnected()) return false;
    try {
      if (this.version === '1.2') {
        const res = this.api.LMSCommit('');
        return res === 'true' || res === true;
      } else if (this.version === '2004') {
        const res = this.api.Commit('');
        return res === 'true' || res === true;
      }
    } catch {
      return false;
    }
    return false;
  }

  /**
   * Record session time and close SCORM session
   */
  public finish(): boolean {
    if (!this.isConnected() || this.isFinished) return false;

    try {
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - this.startTime) / 1000));

      if (this.version === '1.2') {
        const hours = Math.floor(elapsedSeconds / 3600);
        const mins = Math.floor((elapsedSeconds % 3600) / 60);
        const secs = elapsedSeconds % 60;
        const pad = (n: number) => n.toString().padStart(2, '0');
        const formatted = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        this.api.LMSSetValue('cmi.core.session_time', formatted);
        this.api.LMSCommit('');
        this.api.LMSFinish('');
      } else if (this.version === '2004') {
        const isoTime = `PT${elapsedSeconds}S`;
        this.api.SetValue('cmi.session_time', isoTime);
        this.api.Commit('');
        this.api.Terminate('');
      }

      this.isFinished = true;
      this.isInitialized = false;
      this.notifyListeners();
      console.log('📦 [SCORM] Sesión finalizada correctamente con LMS.');
      return true;
    } catch (e) {
      console.warn('⚠️ [SCORM] Error al finalizar sesión SCORM:', e);
      return false;
    }
  }

  /**
   * Get current SCORM info snapshot
   */
  public getInfo(): ScormInfo {
    return {
      connected: this.isConnected(),
      version: this.version,
      studentName: this.getStudentName(),
      studentId: this.getStudentId(),
      lessonStatus: this.getStatus(),
      score: null
    };
  }

  /**
   * Subscribe to SCORM status changes
   */
  public subscribe(listener: (info: ScormInfo) => void): () => void {
    this.listeners.push(listener);
    listener(this.getInfo());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    const info = this.getInfo();
    this.listeners.forEach(l => {
      try {
        l(info);
      } catch {
        // ignore
      }
    });
  }
}

export const scorm = new ScormService();
