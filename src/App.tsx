import React, { useState, useEffect } from 'react';
import { MainSection } from './types/ova';
import { HabitRadarProvider, useHabitRadar } from './context/HabitRadarContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HabitRadarWidget } from './components/layout/HabitRadarWidget';
import { IntroduccionSection } from './components/introduccion/IntroduccionSection';
import { ContenidoSection } from './components/contenido/ContenidoSection';
import { EvaluacionSection } from './components/evaluacion/EvaluacionSection';

const MainAppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<MainSection>('introduccion');
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const { recordShortcut } = useHabitRadar();

  // Listen for global shortcut keypresses to gamify muscle memory!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      if (['G', 'R', 'S', 'E', 'A', 'B', 'C', '1', '2', '3'].includes(key)) {
        recordShortcut(key);
      } else if (e.key === 'Tab') {
        recordShortcut('TAB');
      } else if (e.ctrlKey && key === 'R') {
        // Note: browser default for ctrl+R is reload, but if prevented or in canvas it registers
        recordShortcut('CTRL+R');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recordShortcut]);

  const handleSelectSection = (section: MainSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111216] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation Bar with strictly 3 sections */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenRadar={() => setIsRadarOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeSection === 'introduccion' && (
          <IntroduccionSection onGoToContenido={() => handleSelectSection('contenido')} />
        )}

        {activeSection === 'contenido' && (
          <ContenidoSection onGoToEvaluation={() => handleSelectSection('evaluacion')} />
        )}

        {activeSection === 'evaluacion' && (
          <EvaluacionSection />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectSection={handleSelectSection} />

      {/* Habit Radar Modal Drawer */}
      <HabitRadarWidget
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <HabitRadarProvider>
      <MainAppContent />
    </HabitRadarProvider>
  );
}
