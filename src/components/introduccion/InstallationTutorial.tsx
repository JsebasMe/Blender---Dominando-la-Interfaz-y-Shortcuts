import React, { useState } from 'react';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { 
  Download, 
  ExternalLink, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Monitor, 
  Apple, 
  Cpu, 
  ShieldCheck, 
  Play, 
  Box, 
  Info,
  HelpCircle
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

type OperatingSystem = 'windows' | 'macos' | 'linux';

interface InstallStep {
  number: number;
  title: string;
  summary: string;
  officialLink?: string;
  osDetails: Record<OperatingSystem, {
    action: string;
    instructions: string[];
    fileName: string;
    tip: string;
  }>;
  verificationTip: string;
}

const INSTALL_STEPS: InstallStep[] = [
  {
    number: 1,
    title: "Acceder a la página oficial de Blender",
    summary: "El único canal seguro, libre de malware y actualizado para obtener Blender es el sitio oficial de la Fundación Blender.",
    officialLink: "https://www.blender.org/download/",
    osDetails: {
      windows: {
        action: "Abrir el navegador web e ingresar al portal oficial.",
        instructions: [
          "Visita https://www.blender.org/download/ desde tu navegador habitual.",
          "Verifica el certificado de seguridad SSL con candado en la barra de direcciones.",
          "La página detectará automáticamente tu sistema operativo Windows de 64 bits."
        ],
        fileName: "Página web oficial de Blender Foundation",
        tip: "Nunca descargues Blender desde sitios de terceros no oficiales para evitar ejecutables modificados o publicidad no deseada."
      },
      macos: {
        action: "Abrir Safari o Chrome y navegar al portal oficial de Blender.",
        instructions: [
          "Ingresa a https://www.blender.org/download/.",
          "Comprueba que el portal reconozca la arquitectura de tu Mac (Apple Silicon M1/M2/M3/M4 o Intel).",
          "Observa el botón principal de descarga azul con el logo oficial."
        ],
        fileName: "Página web oficial de Blender Foundation",
        tip: "Si tienes un procesador Apple Silicon serie M, la versión nativa ARM ofrece hasta un 40% más de rendimiento en viewport."
      },
      linux: {
        action: "Visitar el sitio oficial o preparar el gestor de paquetes de tu distribución.",
        instructions: [
          "Accede a https://www.blender.org/download/.",
          "El sitio ofrece el paquete tarball oficial (.tar.xz) o enlace directo a Snap Store y Flathub.",
          "También puedes utilizar el repositorio nativo de tu distro."
        ],
        fileName: "Portal oficial o Flathub / Snapcraft",
        tip: "Para distribuciones modernas como Ubuntu, Fedora o Arch, la versión Flatpak o Snap garantiza las librerías más actualizadas."
      }
    },
    verificationTip: "Comprueba que la URL comience exactamente con 'https://www.blender.org'."
  },
  {
    number: 2,
    title: "Seleccionar el sistema operativo y arquitectura",
    summary: "Identifica la versión exacta compatible con el hardware de tu computadora.",
    osDetails: {
      windows: {
        action: "Seleccionar Windows Installer de 64 bits.",
        instructions: [
          "El botón principal suele decir 'Download Blender 4.x.x Windows Installer'.",
          "Si necesitas una versión portable sin permisos de administrador, pulsa 'Windows .zip (portable)'.",
          "Se requiere Windows 10 o Windows 11 de 64 bits."
        ],
        fileName: "blender-4.x.x-windows-x64.msi",
        tip: "El instalador .msi creará los accesos directos y asociará los archivos .blend automáticamente."
      },
      macos: {
        action: "Elegir entre arquitectura Apple Silicon o Intel.",
        instructions: [
          "Haz clic en el menú desplegable debajo del botón de descarga si no se detectó automáticamente.",
          "Elige 'macOS Apple Silicon' para chips M1, M2, M3 o M4.",
          "Elige 'macOS Intel' si tu Mac tiene un procesador Intel previo al año 2020."
        ],
        fileName: "blender-4.x.x-macos-arm64.dmg / x86_64.dmg",
        tip: "Revisa 'Acerca de esta Mac' en el menú Apple para confirmar tu chip."
      },
      linux: {
        action: "Escoger el formato adecuado para tu distribución Linux.",
        instructions: [
          "Descarga el paquete comprimido oficial 'Linux .tar.xz'.",
          "Alternativamente, puedes instalar desde la terminal mediante Snap: `sudo snap install blender --classic`.",
          "O mediante Flatpak: `flatpak install flathub org.blender.Blender`."
        ],
        fileName: "blender-4.x.x-linux-x64.tar.xz",
        tip: "El tarball oficial incluye todas las dependencias de Python y OpenGL empaquetadas sin alterar tu sistema."
      }
    },
    verificationTip: "Verifica que el archivo corresponda a la versión estable más reciente (ej. Blender 4.2 LTS o superior)."
  },
  {
    number: 3,
    title: "Descargar el instalador oficial",
    summary: "Inicia la transferencia del paquete de instalación y guárdalo en tu carpeta de descargas.",
    osDetails: {
      windows: {
        action: "Hacer clic en el botón de descarga y aguardar la finalización.",
        instructions: [
          "Haz clic en el botón azul de descarga.",
          "El navegador iniciará la descarga del archivo .msi (aproximadamente 300 - 350 MB).",
          "Espera a que el navegador complete la verificación de integridad antivirus."
        ],
        fileName: "blender-4.x.x-windows-x64.msi (~320 MB)",
        tip: "La descarga suele tardar entre 1 y 3 minutos según el ancho de banda disponible."
      },
      macos: {
        action: "Descargar la imagen de disco .dmg para macOS.",
        instructions: [
          "Haz clic en descargar para recibir el archivo .dmg.",
          "Permite la descarga en Safari o Chrome si el navegador solicita confirmación.",
          "Espera a que aparezca en tu carpeta Descargas del Finder."
        ],
        fileName: "blender-4.x.x-macos.dmg (~330 MB)",
        tip: "El archivo viene firmado digitalmente con certificado oficial de Apple Developer."
      },
      linux: {
        action: "Descargar el archivo .tar.xz o ejecutar el comando de instalación.",
        instructions: [
          "Guarda el archivo .tar.xz en tu directorio personal o carpeta ~/Descargas.",
          "O ejecuta la orden de descarga por terminal usando `wget` o `curl` si prefieres la línea de comandos.",
          "Verifica que el tamaño ronde los 310 MB."
        ],
        fileName: "blender-4.x.x-linux-x64.tar.xz (~310 MB)",
        tip: "Puedes comprobar el checksum SHA256 listado en blender.org/download si deseas máxima seguridad."
      }
    },
    verificationTip: "Confirma que el archivo descargado finalice sin errores de red en tu gestor de descargas."
  },
  {
    number: 4,
    title: "Ejecutar el proceso de instalación",
    summary: "Sigue los pasos guiados del asistente de instalación para ubicar el software en tu disco duro.",
    osDetails: {
      windows: {
        action: "Ejecutar el archivo .msi y seguir el asistente de configuración.",
        instructions: [
          "Haz doble clic sobre el archivo .msi descargado.",
          "Si Windows SmartScreen muestra una alerta, haz clic en 'Más información' y luego en 'Ejecutar de todas formas' (Blender es 100% seguro y de código abierto).",
          "Haz clic en 'Next', acepta el acuerdo de licencia pública GNU GPL, mantén la ruta por defecto (C:\\Program Files\\Blender Foundation\\Blender 4.x) y presiona 'Install'.",
          "Espera que la barra verde llegue al 100% y haz clic en 'Finish'."
        ],
        fileName: "Asistente Windows Setup Wizard",
        tip: "No desmarques ninguna opción de componentes para que queden registradas las extensiones de archivos .blend."
      },
      macos: {
        action: "Montar el .dmg y arrastrar la aplicación a Aplicaciones.",
        instructions: [
          "Haz doble clic en el archivo .dmg descargado para abrir la ventana de instalación.",
          "Arrastra el icono naranja de Blender hacia la carpeta 'Applications' dentro de la misma ventana.",
          "Espera a que macOS copie los archivos binarios (unos 10 a 20 segundos).",
          "Expulsa la imagen de disco virtual desde el Finder."
        ],
        fileName: "Ventana de arrastre de macOS Finder",
        tip: "Si Gatekeeper te solicita confirmación al abrir por primera vez, haz clic en 'Abrir'."
      },
      linux: {
        action: "Descomprimir el tarball y ubicarlo en tu directorio preferido.",
        instructions: [
          "Descomprime el archivo: `tar -xf blender-4.x.x-linux-x64.tar.xz`.",
          "Opcionalmente muévelo a `/opt/blender` o déjalo en tu carpeta de usuario.",
          "Para crear un acceso directo en tu lanzador de aplicaciones, el archivo `blender.desktop` se incluye dentro de la carpeta descomprimida."
        ],
        fileName: "Carpeta descomprimida de Blender",
        tip: "Si usaste Snap o Flatpak, la instalación es 100% automatizada y el icono aparece directamente en tu menú de aplicaciones."
      }
    },
    verificationTip: "Comprueba que la instalación finalice sin mensajes de error por falta de espacio en disco."
  },
  {
    number: 5,
    title: "Abrir Blender y reconocer la pantalla inicial",
    summary: "Ejecuta el programa por primera vez y familiarízate con la ventana de bienvenida (Splash Screen).",
    osDetails: {
      windows: {
        action: "Iniciar desde el menú Inicio o acceso directo del Escritorio.",
        instructions: [
          "Abre el menú Inicio y escribe 'Blender', o haz doble clic en el icono del escritorio.",
          "Aparecerá una breve ventana de consola en negro mientras se cargan los módulos de Python y GPU (es completamente normal).",
          "Se abrirá la ventana principal de Blender mostrando la 'Splash Screen' (pantalla de bienvenida) con una ilustración comunitaria y opciones de configuración."
        ],
        fileName: "Blender 4.x Splash Screen",
        tip: "En la Splash Screen puedes configurar el idioma de la interfaz (Español o Inglés; se recomienda Inglés para seguir tutoriales internacionales)."
      },
      macos: {
        action: "Abrir desde Launchpad o la carpeta Aplicaciones.",
        instructions: [
          "Abre Launchpad o pulsa Command + Espacio (Spotlight) y escribe 'Blender'.",
          "Confirma la apertura si el sistema solicita verificación de primer inicio.",
          "Aprecia la Splash Screen inicial con opciones de Nuevo Archivo (General)."
        ],
        fileName: "Blender en macOS",
        tip: "Puedes anclar el icono de Blender a tu Dock para acceder con un solo clic en sesiones futuras."
      },
      linux: {
        action: "Lanzar desde el menú de aplicaciones o la terminal ejecutando `./blender`.",
        instructions: [
          "Busca Blender en tu menú de escritorio GNOME / KDE o escribe `blender` en una terminal.",
          "Observa cómo la interfaz gráfica carga instantáneamente.",
          "La Splash Screen te ofrecerá opciones de 'Quick Setup' para configurar atajos."
        ],
        fileName: "Ejecutable binario de Blender",
        tip: "Asegúrate de tener instalados los controladores propietarios de tu GPU (NVIDIA/AMD) para aceleración por hardware."
      }
    },
    verificationTip: "Haz clic en cualquier parte fuera de la Splash Screen o selecciona 'General' para ingresar al entorno de trabajo."
  },
  {
    number: 6,
    title: "Verificar la escena inicial y el espacio 3D",
    summary: "Realiza la comprobación de oro: identifica la escena por defecto con su cubo, cámara y luz.",
    osDetails: {
      windows: {
        action: "Comprobar los tres elementos de la escena inicial.",
        instructions: [
          "Identifica en el centro del Viewport el Cubo gris por defecto (Default Cube).",
          "Observa en la esquina superior izquierda el texto 'User Perspective'.",
          "Localiza la Cámara (objeto piramidal) y la Fuente de Luz puntual (icono con líneas radiantes).",
          "Comprueba que el Outliner a la derecha liste: Camera, Cube y Light."
        ],
        fileName: "Escena por defecto lista",
        tip: "¡Felicidades! Tu instalación está 100% operativa y lista para comenzar a practicar los atajos de teclado."
      },
      macos: {
        action: "Comprobar los tres elementos de la escena inicial.",
        instructions: [
          "Identifica el Cubo inicial en el centro de la cuadrícula tridimensional.",
          "Comprueba que el ratón o trackpad responda con fluidez en el área de visualización.",
          "Verifica que en el panel superior derecho (Outliner) figuren los tres objetos por defecto."
        ],
        fileName: "Escena por defecto lista",
        tip: "Si usas Magic Mouse, se recomienda activar en Preferencias > Input > 'Emulate 3 Button Mouse' para navegar con mayor comodidad."
      },
      linux: {
        action: "Comprobar la escena inicial y la renderización OpenGL.",
        instructions: [
          "Verifica que el cubo se dibuje sin artefactos gráficos ni parpadeos.",
          "Confirma que los ejes X (rojo) e Y (verde) se muestren claramente en la cuadrícula.",
          "Observa la barra de estado inferior con información de memoria y versión de Blender."
        ],
        fileName: "Escena por defecto lista",
        tip: "Puedes verificar que tu tarjeta gráfica esté activa en Edit > Preferences > System > Cycles Render Devices."
      }
    },
    verificationTip: "Si puedes ver el cubo inicial y mover el cursor sobre la cuadrícula, tu entorno está listo para aprender."
  }
];

export const InstallationTutorial: React.FC = () => {
  const { state, recordInstallStep } = useHabitRadar();
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>('windows');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [wizardSubstep, setWizardSubstep] = useState<number>(1);

  const currentStep = INSTALL_STEPS[activeStepIndex];
  const isCurrentCompleted = state.completedStepsInstall.includes(currentStep.number);

  const handleToggleComplete = (stepNum: number) => {
    recordInstallStep(stepNum);
  };

  const handleNext = () => {
    recordInstallStep(currentStep.number);
    if (activeStepIndex < INSTALL_STEPS.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const progressPercent = Math.round((state.completedStepsInstall.length / INSTALL_STEPS.length) * 100);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Guía Paso a Paso Obligatoria
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                Principiantes
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Tutorial Interactivo: Cómo Instalar Blender
            </h2>
          </div>
        </div>

        {/* OS Selector Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
          <button
            onClick={() => setSelectedOS('windows')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedOS === 'windows'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows</span>
          </button>

          <button
            onClick={() => setSelectedOS('macos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedOS === 'macos'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>macOS</span>
          </button>

          <button
            onClick={() => setSelectedOS('linux')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedOS === 'linux'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>GNU/Linux</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Steps Tabs */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">
            Progreso del tutorial de instalación: <strong className="text-amber-400">{state.completedStepsInstall.length} de {INSTALL_STEPS.length} pasos</strong>
          </span>
          <span className="font-mono text-amber-400 font-bold">{progressPercent}% completado</span>
        </div>

        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-6 gap-2 pt-1">
          {INSTALL_STEPS.map((step, idx) => {
            const isCompleted = state.completedStepsInstall.includes(step.number);
            const isCurrent = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-slate-800/80 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
                title={`Paso ${step.number}: ${step.title}`}
              >
                <div className="flex items-center gap-1">
                  <span>Paso {step.number}</span>
                  {isCompleted && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
                <span className="hidden sm:inline-block text-[10px] text-slate-400 truncate max-w-full">
                  {step.title.split(' ')[0]}...
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Paso {currentStep.number} de {INSTALL_STEPS.length}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                Sistema: <strong className="text-slate-200">{selectedOS}</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentStep.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1 text-justify">
              {currentStep.summary}
            </p>
          </div>

          {/* Official Link Button (if applicable, e.g. Step 1) */}
          {currentStep.officialLink && (
            <a
              href={currentStep.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleToggleComplete(currentStep.number)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 shrink-0"
            >
              <span>Ir a la web de descarga</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Detailed Instructions for Selected OS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Procedimiento detallado para {selectedOS.toUpperCase()}:
            </h4>

            <ol className="space-y-3">
              {currentStep.osDetails[selectedOS].instructions.map((instr, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-mono font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-200 text-justify leading-relaxed">
                    {instr}
                  </p>
                </li>
              ))}
            </ol>

            {/* Practical Tip */}
            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-justify">
                <strong>Consejo técnico:</strong> {currentStep.osDetails[selectedOS].tip}
              </p>
            </div>
          </div>

          {/* Real Screenshots provided by the user and generated for Step 6 */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Captura de Pantalla Real
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  Blender Oficial
                </span>
              </div>

              <div className="w-full aspect-[16/10] rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative group shadow-lg flex items-center justify-center">
                {currentStep.number === 1 && (
                  <img
                    src={getAssetUrl('assets/aistudio/1._download_05500453.png')}
                    alt="Paso 1: Portal Oficial de Descargas de Blender"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                )}
                {currentStep.number === 2 && (
                  <div className="relative w-full h-full">
                    <img
                      src={getAssetUrl('assets/blender_os_select_1792991918171.jpg')}
                      alt="Paso 2: Selección de Sistema Operativo y Versión"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 backdrop-blur-sm p-1.5 text-[10px] text-amber-300 font-mono">
                      Selector desplegable: Windows / macOS / Linux y versiones portables
                    </div>
                  </div>
                )}
                {currentStep.number === 3 && (
                  <img
                    src={getAssetUrl('assets/aistudio/2_download_36a3159e.png')}
                    alt="Paso 3: Descarga del instalador .msi de Blender"
                    className="w-full h-full object-contain bg-slate-950 p-2 hover:scale-105 transition-transform duration-300"
                  />
                )}
                {currentStep.number === 4 && (
                  <div className="relative w-full h-full flex flex-col">
                    <img
                      src={getAssetUrl(
                        wizardSubstep === 1
                          ? 'assets/aistudio/3_downlaod_eda576dc.png'
                          : wizardSubstep === 2
                          ? 'assets/aistudio/4_download_10083502.png'
                          : 'assets/aistudio/5_download_8f51d391.png'
                      )}
                      alt="Paso 4: Asistente de Instalación de Blender"
                      className="w-full h-full object-contain bg-slate-950 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                {currentStep.number === 5 && (
                  <img
                    src={getAssetUrl('assets/aistudio/6_download_9c1b1009.png')}
                    alt="Paso 5: Pantalla de Bienvenida Splash Screen de Blender"
                    className="w-full h-full object-contain bg-slate-950 hover:scale-105 transition-transform duration-300"
                  />
                )}
                {currentStep.number === 6 && (
                  <img
                    src={getAssetUrl('assets/blender_default_cube_1792990671786.jpg')}
                    alt="Paso 6: Vista 3D del Viewport con el Cubo Inicial"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Substep selector for Step 4 (Wizard screens) */}
              {currentStep.number === 4 && (
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <span className="text-[10px] text-slate-400 mr-1">Pantalla del Wizard:</span>
                  {[
                    { id: 1, label: '1. Inicio' },
                    { id: 2, label: '2. Carpeta' },
                    { id: 3, label: '3. Instalar' }
                  ].map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => setWizardSubstep(ws.id)}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition-all ${
                        wizardSubstep === ws.id
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {ws.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-justify">
              <strong className="text-slate-300 block mb-0.5">Comprobación en pantalla:</strong>
              {currentStep.verificationTip}
            </div>
          </div>
        </div>

        {/* Step Navigation Controls & Checkbox */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleComplete(currentStep.number)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isCurrentCompleted
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isCurrentCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isCurrentCompleted ? 'Paso completado' : 'Marcar este paso como completado'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
            >
              <span>{activeStepIndex === INSTALL_STEPS.length - 1 ? 'Finalizar Tutorial' : 'Siguiente Paso'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Version Notice */}
        <p className="text-[11px] text-slate-500 italic text-justify pt-1">
          * Nota técnica de compatibilidad: Los cuadros de diálogo y pantallas iniciales pueden presentar ligeras variaciones estéticas según la versión exacta instalada (ej. Blender 4.2 LTS frente a versiones previas) y el tema de escritorio configurado en tu sistema operativo.
        </p>
      </div>
    </section>
  );
};
