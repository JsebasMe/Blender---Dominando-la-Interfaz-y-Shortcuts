import React, { useState } from 'react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import confetti from 'canvas-confetti';
import { 
  FolderGit2, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  CheckSquare, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Printer,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const PracticalChallengeActivity: React.FC = () => {
  const { state, saveProjectSubmission } = useHabitRadar();

  // Submission Form State
  const [studentName, setStudentName] = useState<string>(state.activity3Data?.studentName || '');
  const [studentId, setStudentId] = useState<string>(state.activity3Data?.studentId || '');
  const [blendFileName, setBlendFileName] = useState<string>(state.activity3Data?.fileName || '');
  const [blendFileSize, setBlendFileSize] = useState<string>(state.activity3Data?.fileSize || '');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(state.activity3Data?.screenshotUrl || null);
  const [processDescription, setProcessDescription] = useState<string>(state.activity3Data?.processDescription || '');
  
  // Checklist states
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const checklistItems = [
    "Partí exclusivamente del cubo por defecto (Default Cube) sin importar mallas externas.",
    "Utilicé los atajos de transformación G (mover), R (rotar) y S (escalar) con restricción por ejes.",
    "Ingresé a Edit Mode con la tecla Tab y apliqué subdivisiones perimetrales con Loop Cut (Ctrl + R).",
    "Generé nueva geometría utilizando la herramienta Extrude (tecla E).",
    "Guardé mi archivo en formato .blend y tomé una captura clara del Viewport en perspectiva."
  ];

  const handleBlendFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.blend')) {
        setValidationError('Atención: El archivo debe tener extensión oficial de Blender (.blend).');
      } else {
        setValidationError(null);
      }
      setBlendFileName(file.name);
      setBlendFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setScreenshotPreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setValidationError('Por favor ingresa tu nombre completo para expedir la constancia.');
      return;
    }
    if (!blendFileName.trim()) {
      setValidationError('Debes adjuntar o especificar el nombre de tu archivo .blend.');
      return;
    }
    if (!processDescription.trim() || processDescription.length < 30) {
      setValidationError('Por favor redacta una breve explicación técnica de al menos 30 caracteres detallando los atajos utilizados.');
      return;
    }

    setValidationError(null);

    const submissionData = {
      studentName: studentName.trim(),
      studentId: studentId.trim() || 'Estudiante U. Simón Bolívar',
      fileName: blendFileName,
      fileSize: blendFileSize || '1.45 MB',
      screenshotUrl: screenshotPreview,
      processDescription: processDescription.trim(),
      submissionDate: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      rubricScores: {
        transformations: 25,
        tools: 25,
        modelCoherence: 25,
        documentation: 25,
        total: 100
      }
    };

    saveProjectSubmission(submissionData);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold">
                Actividad 3 · Reto Práctico Final
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                100 Puntos
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Reto Práctico: "Del Cubo a mi Creación"
            </h2>
          </div>
        </div>

        {state.activity3Submitted && (
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Reto Entregado y Registrado</span>
          </span>
        )}
      </div>

      {/* Description Banner with text-justify */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <p className="text-sm text-slate-200 text-justify leading-relaxed">
          Abre Blender en tu computadora, borra tus miedos pero no el cubo inicial. Transforma la geometría básica en un modelo completo reconocible utilizando G, R, S, Extrusión (E) y Loop Cuts (Ctrl + R). Guarda tu proyecto final (.blend). Para completar la actividad en este OVA, registra tus datos, adjunta tu archivo y captura de pantalla, y redacta una breve memoria técnica de los atajos empleados.
        </p>
      </div>

      {/* Rubric Table (100 Points Evaluation) */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Rúbrica de Evaluación Propuesta (100 Puntos)</span>
          </h3>
          <span className="text-xs font-mono text-amber-400 font-bold">Total: 100 pts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">1. Transformaciones</span>
              <span className="text-amber-400 font-mono">25 pts</span>
            </div>
            <p className="text-[11px] text-slate-300 text-justify leading-relaxed">
              Uso correcto de G (mover), R (rotar) y S (escalar) con restricción en ejes X, Y, Z.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">2. Extrude & Loop Cut</span>
              <span className="text-amber-400 font-mono">25 pts</span>
            </div>
            <p className="text-[11px] text-slate-300 text-justify leading-relaxed">
              Generación de nueva geometría con E y subdivisión controlada con bucles Ctrl + R.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">3. Coherencia 3D</span>
              <span className="text-amber-400 font-mono">25 pts</span>
            </div>
            <p className="text-[11px] text-slate-300 text-justify leading-relaxed">
              Modelo final reconocible (silla, espada, mesa o nave) con topología limpia sin polígonos invertidos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">4. Entrega y Memoria</span>
              <span className="text-amber-400 font-mono">25 pts</span>
            </div>
            <p className="text-[11px] text-slate-300 text-justify leading-relaxed">
              Adjuntar archivo .blend, captura de pantalla y explicación concisa de los atajos utilizados.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic text-justify pt-1">
          * Nota: Esta distribución de 100 puntos corresponde a una propuesta instruccional de evaluación formativa orientativa para validar con el docente de la cátedra de Ingeniería Multimedia.
        </p>
      </div>

      {/* Submission Simulator Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Formulario Oficial de Registro y Carga de Evidencias</span>
          </h3>
          <span className="text-xs text-slate-400">Paso previo a la entrega LMS</span>
        </div>

        {validationError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p>{validationError}</p>
          </div>
        )}

        {/* Student Identification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Nombre Completo del Estudiante *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ej. Juan Pérez Martínez"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Código Estudiantil / Documento
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Ej. 1090XXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* File and Image Uploaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Blend file */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <label className="text-xs font-bold text-white flex items-center justify-between">
              <span>Archivo de Proyecto (.blend) *</span>
              <span className="text-[10px] text-amber-400 font-mono">Extensión .blend</span>
            </label>
            <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-4 text-center transition-colors bg-slate-950">
              <input
                type="file"
                accept=".blend"
                onChange={handleBlendFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <span className="text-xs font-medium text-slate-300 block">
                {blendFileName ? blendFileName : 'Haz clic o arrastra tu archivo .blend'}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                {blendFileSize ? `Tamaño: ${blendFileSize}` : 'Máximo 50 MB'}
              </span>
            </div>
          </div>

          {/* Screenshot file */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <label className="text-xs font-bold text-white flex items-center justify-between">
              <span>Captura de Pantalla del Viewport *</span>
              <span className="text-[10px] text-blue-400 font-mono">PNG / JPG</span>
            </label>
            <div className="relative border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-xl p-4 text-center transition-colors bg-slate-950 flex flex-col items-center justify-center min-h-[110px]">
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {screenshotPreview ? (
                <div className="relative w-full h-24 rounded-lg overflow-hidden">
                  <img
                    src={screenshotPreview}
                    alt="Vista previa de captura"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-2 py-0.5 rounded font-mono">
                    Captura cargada
                  </span>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-xs font-medium text-slate-300 block">
                    Cargar imagen del modelo en el Viewport
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Formato PNG, JPG o WEBP
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Technical Process Description Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white flex items-center justify-between">
            <span>Memoria Técnica: Explicación del Proceso Paso a Paso *</span>
            <span className="text-[10px] text-slate-400 font-mono">
              Mínimo 30 caracteres ({processDescription.length} ingresados)
            </span>
          </label>
          <textarea
            rows={4}
            value={processDescription}
            onChange={(e) => setProcessDescription(e.target.value)}
            placeholder="Describe aquí cómo esculpiste el objeto paso a paso: 'Comencé en Object Mode seleccionando el cubo inicial. Pulsé Tab para ingresar a Edit Mode, apliqué cortes de bucle con Ctrl + R para definir las patas, extruí las caras inferiores con la tecla E restringiendo en Z, y roté los bordes con R...' "
            className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans text-justify leading-relaxed"
          />
        </div>

        {/* 5-item Checklist */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-200 block">
            Lista de Comprobación Previa a la Entrega:
          </span>
          <div className="space-y-2">
            {checklistItems.map((item, idx) => (
              <label key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!checkedChecklist[idx]}
                  onChange={() => setCheckedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-justify">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400 text-justify sm:max-w-md">
            Al registrar tu entrega, el sistema generará una <strong>Constancia Digital Verificable</strong> con el desglose de la rúbrica para que puedas adjuntarla junto a tu archivo .blend en el buzón institucional del LMS.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 shrink-0"
          >
            Registrar Entrega de Proyecto
          </button>
        </div>
      </form>

      {/* Official Printable Digital Receipt / Certificate (If submitted) */}
      {state.activity3Submitted && state.activity3Data && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 space-y-6 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  Universidad Simón Bolívar · Campus Cúcuta
                </span>
                <h3 className="text-xl font-bold text-white">
                  Constancia Digital de Entrega de Reto Práctico
                </h3>
                <span className="text-xs text-slate-400">
                  Ingeniería Multimedia · OVA: Blender - Dominando la Interfaz y Shortcuts
                </span>
              </div>
            </div>

            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors shrink-0"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>

          {/* Student & Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-mono">Estudiante Evaluado:</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{state.activity3Data.studentName}</span>
              <span className="text-slate-400 text-[11px]">{state.activity3Data.studentId}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-mono">Archivo de Proyecto:</span>
              <span className="font-bold text-amber-400 text-sm mt-0.5 block">{state.activity3Data.fileName}</span>
              <span className="text-slate-400 text-[11px]">Tamaño: {state.activity3Data.fileSize}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-mono">Fecha de Registro:</span>
              <span className="font-bold text-slate-200 text-xs mt-0.5 block">{state.activity3Data.submissionDate}</span>
              <span className="text-emerald-400 text-[11px] font-mono">Código de verificación: BLND-2026-USB</span>
            </div>
          </div>

          {/* Technical Narrative Display */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block">
              Memoria Técnica Registrada:
            </span>
            <p className="text-xs text-slate-300 text-justify italic leading-relaxed">
              "{state.activity3Data.processDescription}"
            </p>
          </div>

          {/* Rubric Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white border-b border-slate-800 pb-1.5">
              <span>Criterio Evaluado en el Modelo</span>
              <span>Calificación</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Uso correcto de transformaciones (G, R, S con ejes)</span>
              <span className="font-mono text-emerald-400 font-bold">25 / 25 pts</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Aplicación de Extrude (E) y Loop Cut (Ctrl+R)</span>
              <span className="font-mono text-emerald-400 font-bold">25 / 25 pts</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Coherencia espacial y volumétrica de la pieza</span>
              <span className="font-mono text-emerald-400 font-bold">25 / 25 pts</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Evidencia completa de archivo y memoria técnica</span>
              <span className="font-mono text-emerald-400 font-bold">25 / 25 pts</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-amber-400 pt-2 border-t border-slate-800">
              <span>Calificación Total del Proyecto:</span>
              <span className="font-mono text-base">100 / 100 PUNTOS</span>
            </div>
          </div>

          {/* LMS Notice */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200/90 text-justify">
            <strong>Instrucciones para la entrega final:</strong> Recuerda cargar el archivo físico <code>{state.activity3Data.fileName}</code> en el buzón oficial de la plataforma tecnológica (LMS Moodle / Canvas) de la Universidad Simón Bolívar junto con esta constancia de cumplimiento.
          </div>
        </div>
      )}
    </section>
  );
};
