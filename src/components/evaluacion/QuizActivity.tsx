import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizData';
import { useHabitRadar } from '../../context/HabitRadarContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sparkles, 
  Award,
  AlertCircle,
  FileQuestion,
  History
} from 'lucide-react';

export const QuizActivity: React.FC = () => {
  const { state, saveQuizAttempt } = useHabitRadar();

  // Active quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const attempts = state.activity2Attempts;
  const currentAttemptsCount = attempts.length;
  const canAttempt = currentAttemptsCount < 2;

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestion.id];

  const handleSelectOption = (optionIndex: number) => {
    if (hasSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    setHasSubmitted(true);
    saveQuizAttempt(score, userAnswers);

    if (score >= 8) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleStartSecondAttempt = () => {
    if (!canAttempt) return;
    setUserAnswers({});
    setHasSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // Score calculation
  const correctCount = QUIZ_QUESTIONS.filter(q => userAnswers[q.id] === q.correctIndex).length;
  const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const allAnswered = QUIZ_QUESTIONS.every(q => userAnswers[q.id] !== undefined);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
                Actividad 2 · Evaluación Sumativa
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                10 Preguntas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quiz de Conocimientos: "Pon a prueba lo aprendido"
            </h2>
          </div>
        </div>

        {/* Attempts Counter Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Intentos realizados:</span>
          <span className="font-mono font-bold text-amber-400">{currentAttemptsCount} de 2 permitidos</span>
        </div>
      </div>

      {/* Description Banner with text-justify */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <p className="text-sm text-slate-200 text-justify leading-relaxed">
          Es hora de poner a prueba la teoría. Lee detenidamente cada una de las 10 preguntas sobre navegación espacial, interfaz, transformación y edición de mallas en Blender. Selecciona la opción que consideres correcta. Dispones de un máximo de <strong>dos (2) intentos</strong> para registrar tu desempeño más alto, y el sistema te brindará retroalimentación explicativa sobre cada respuesta.
        </p>
      </div>

      {/* Active Quiz Box or Final Results Summary */}
      {!hasSubmitted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Eje temático: <strong className="text-slate-200">{currentQuestion.topicTag}</strong>
                </span>
              </div>
            </div>

            {/* Answered tracker dots */}
            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-500'
                        : isAnswered
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                    title={`Pregunta ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white text-justify leading-snug">
              {currentQuestion.question}
            </h3>

            {/* 4 Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-justify leading-relaxed flex-1">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation and Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentQuestionIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-slate-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Respondidas: {Object.keys(userAnswers).length} de {QUIZ_QUESTIONS.length}
            </span>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                    allAnswered
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/25 scale-105'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Finalizar y Calificar Quiz</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Summary Screen */
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          {/* Header Score Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-bold font-mono border ${
                percentage >= 80
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                  : percentage >= 60
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-lg shadow-amber-500/20'
                  : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                <span className="text-2xl leading-none">{correctCount}/10</span>
                <span className="text-[11px] font-normal">{percentage}%</span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Evaluación Formativa Finalizada (Intento {currentAttemptsCount})
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {percentage >= 90
                    ? '¡Sobresaliente! Dominio de nivel Artista 3D'
                    : percentage >= 70
                    ? '¡Aprobado! Buenos fundamentos de Blender'
                    : 'Puntaje por debajo del umbral recomendado'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tu puntuación ha sido registrada en el Radar de Hábitos y en el historial de la sesión.
                </p>
              </div>
            </div>

            {/* Second attempt action if available */}
            {canAttempt && (
              <button
                onClick={handleStartSecondAttempt}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Usar 2.º Intento Disponible</span>
              </button>
            )}
          </div>

          {/* Detailed Question by Question Review */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Revisión Detallada y Retroalimentación Pedagógica
            </h4>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-red-950/20 border-red-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2.5">
                        <span className={`w-5 h-5 rounded-md font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
                        }`}>
                          {idx + 1}
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-white text-justify">
                          {q.question}
                        </h5>
                      </div>
                      <span className={`text-xs font-mono font-bold shrink-0 ${
                        isCorrect ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {isCorrect ? 'Correcta' : 'Incorrecta'}
                      </span>
                    </div>

                    <div className="pl-7 space-y-1 text-xs">
                      <div className="text-slate-300">
                        <span className="text-slate-400">Tu respuesta:</span>{' '}
                        <strong className={isCorrect ? 'text-emerald-300' : 'text-red-300'}>
                          {userChoice !== undefined ? q.options[userChoice] : 'Sin responder'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-300">
                          <span className="text-slate-400">Respuesta correcta:</span>{' '}
                          <strong>{q.options[q.correctIndex]}</strong>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-400 pt-1 text-justify italic">
                        <strong>Explicación:</strong> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
