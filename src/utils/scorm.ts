/**
 * SCORM 1.2 & SCORM 2004 Universal Runtime Bridge
 * Fully compatible with Moodle, Canvas, Blackboard, Chamilo, and SCORM Cloud.
 */

type SCORMVersion = '1.2' | '2004' | null;

interface LMSAPI12 {
  LMSInitialize: (param: string) => string;
  LMSFinish: (param: string) => string;
  LMSGetValue: (param: string) => string;
  LMSSetValue: (param: string, val: string) => string;
  LMSCommit: (param: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (err: string) => string;
  LMSGetDiagnostic: (err: string) => string;
}

interface LMSAPI2004 {
  Initialize: (param: string) => string;
  Terminate: (param: string) => string;
  GetValue: (param: string) => string;
  SetValue: (param: string, val: string) => string;
  Commit: (param: string) => string;
  GetLastError: () => string;
  GetErrorString: (err: string) => string;
  GetDiagnostic: (err: string) => string;
}

class ScormController {
  private api12: LMSAPI12 | null = null;
  private api2004: LMSAPI2004 | null = null;
  private version: SCORMVersion = null;
  private isInitialized = false;
  private isTerminated = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.findAPI();
      this.init();
    }
  }

  private findAPI(): void {
    let currentWindow: Window | null = window;
    let attempts = 0;

    while (currentWindow && attempts < 10) {
      try {
        if ((currentWindow as unknown as { API?: LMSAPI12 }).API) {
          this.api12 = (currentWindow as unknown as { API: LMSAPI12 }).API;
          this.version = '1.2';
          break;
        }
        if ((currentWindow as unknown as { API_1484_11?: LMSAPI2004 }).API_1484_11) {
          this.api2004 = (currentWindow as unknown as { API_1484_11: LMSAPI2004 }).API_1484_11;
          this.version = '2004';
          break;
        }
      } catch {
        // Cross-origin iframe security fallback
        break;
      }

      if (currentWindow.parent && currentWindow.parent !== currentWindow) {
        currentWindow = currentWindow.parent;
      } else if (currentWindow.opener) {
        currentWindow = currentWindow.opener;
      } else {
        break;
      }
      attempts++;
    }
  }

  public init(): boolean {
    if (this.isInitialized) return true;

    try {
      if (this.version === '1.2' && this.api12) {
        const res = this.api12.LMSInitialize('');
        if (res === 'true' || res === '1') {
          this.isInitialized = true;
          // Set initial status if not already completed/passed
          const currentStatus = this.api12.LMSGetValue('cmi.core.lesson_status');
          if (currentStatus === 'not attempted' || currentStatus === '' || !currentStatus) {
            this.api12.LMSSetValue('cmi.core.lesson_status', 'incomplete');
          }
          this.api12.LMSSetValue('cmi.core.score.min', '0');
          this.api12.LMSSetValue('cmi.core.score.max', '100');
          this.api12.LMSCommit('');
        }
      } else if (this.version === '2004' && this.api2004) {
        const res = this.api2004.Initialize('');
        if (res === 'true' || res === '1') {
          this.isInitialized = true;
          const currentStatus = this.api2004.GetValue('cmi.completion_status');
          if (currentStatus === 'unknown' || currentStatus === '' || !currentStatus) {
            this.api2004.SetValue('cmi.completion_status', 'incomplete');
          }
          this.api2004.SetValue('cmi.score.min', '0');
          this.api2004.SetValue('cmi.score.max', '100');
          this.api2004.Commit('');
        }
      }

      // Attach cleanup on window unload
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => this.terminate());
        window.addEventListener('pagehide', () => this.terminate());
      }
    } catch {
      // Standalone mode without LMS
    }

    return this.isInitialized;
  }

  public setScore(score: number, isPassed: boolean = false): void {
    if (!this.isInitialized) return;
    const clampedScore = Math.min(100, Math.max(0, Math.round(score)));

    try {
      if (this.version === '1.2' && this.api12) {
        this.api12.LMSSetValue('cmi.core.score.raw', String(clampedScore));
        if (isPassed || clampedScore >= 70) {
          this.api12.LMSSetValue('cmi.core.lesson_status', 'passed');
        } else if (clampedScore > 0) {
          this.api12.LMSSetValue('cmi.core.lesson_status', 'completed');
        }
        this.api12.LMSCommit('');
      } else if (this.version === '2004' && this.api2004) {
        this.api2004.SetValue('cmi.score.raw', String(clampedScore));
        this.api2004.SetValue('cmi.score.scaled', String(clampedScore / 100));
        if (isPassed || clampedScore >= 70) {
          this.api2004.SetValue('cmi.success_status', 'passed');
          this.api2004.SetValue('cmi.completion_status', 'completed');
        } else if (clampedScore > 0) {
          this.api2004.SetValue('cmi.completion_status', 'completed');
        }
        this.api2004.Commit('');
      }
    } catch {
      // Ignore in non-SCORM environment
    }
  }

  public terminate(): void {
    if (!this.isInitialized || this.isTerminated) return;
    this.isTerminated = true;

    try {
      if (this.version === '1.2' && this.api12) {
        this.api12.LMSCommit('');
        this.api12.LMSFinish('');
      } else if (this.version === '2004' && this.api2004) {
        this.api2004.Commit('');
        this.api2004.Terminate('');
      }
    } catch {
      // Ignore
    }
  }

  public getLearnerName(): string {
    if (!this.isInitialized) return '';
    try {
      if (this.version === '1.2' && this.api12) {
        return this.api12.LMSGetValue('cmi.core.student_name');
      } else if (this.version === '2004' && this.api2004) {
        return this.api2004.GetValue('cmi.learner_name');
      }
    } catch {
      return '';
    }
    return '';
  }

  public isLMSConnected(): boolean {
    return this.isInitialized;
  }
}

export const scorm = new ScormController();
