import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useHabitRadar } from '../../context/HabitRadarContext';
import { KeyBadge } from '../common/KeyBadge';
import { 
  Compass, 
  Rotate3d, 
  Move, 
  ZoomIn, 
  Eye, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  MousePointer
} from 'lucide-react';

export const Viewport3DSimulator: React.FC = () => {
  const { state, recordViewportAction, recordShortcut } = useHabitRadar();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeMeshRef = useRef<THREE.Mesh | null>(null);

  // Navigation mode and states
  const [navMode, setNavMode] = useState<'orbit' | 'pan' | 'zoom'>('orbit');
  const [viewName, setViewName] = useState<string>('Perspectiva de Usuario (3D)');
  const [activeGizmoAxis, setActiveGizmoAxis] = useState<'X' | 'Y' | 'Z' | null>(null);
  
  // Interactive mini-recognition quiz
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = Math.max(380, containerRef.current.clientHeight || 380);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e2025);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Blender-style Floor Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x5a6375, 0x333a47);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Cartesian Axes: X (Red), Y (Green), Z (Blue)
    // Blender convention: X is right/red, Y is depth/green, Z is height/blue
    const axesGroup = new THREE.Group();

    // Red X axis (-5 to 5)
    const xGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5, -1, 0),
      new THREE.Vector3(5, -1, 0)
    ]);
    const xMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });
    axesGroup.add(new THREE.Line(xGeo, xMat));

    // Green Y axis (-5 to 5)
    const yGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -1, -5),
      new THREE.Vector3(0, -1, 5)
    ]);
    const yMat = new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 });
    axesGroup.add(new THREE.Line(yGeo, yMat));

    // Blue Z axis (-1 to 4)
    const zGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 4, 0)
    ]);
    const zMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
    axesGroup.add(new THREE.Line(zGeo, zMat));

    scene.add(axesGroup);

    // The Iconic Default Cube
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    // Wireframe + solid combination like Blender solid viewport shading
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x828997,
      roughness: 0.4,
      metalness: 0.1
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(0, 0, 0);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;
    scene.add(cubeMesh);
    cubeMeshRef.current = cubeMesh;

    // Edges geometry overlay
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x111317, linewidth: 1.5 });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    cubeMesh.add(edgesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Mouse Interaction Variables
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spherical = new THREE.Spherical().setFromVector3(camera.position);

    const dom = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const isPan = e.shiftKey || navMode === 'pan';

      if (isPan) {
        // Pan
        camera.translateX(-deltaX * 0.01);
        camera.translateY(deltaY * 0.01);
        recordViewportAction('pan');
      } else {
        // Orbit
        spherical.theta -= deltaX * 0.01;
        spherical.phi -= deltaY * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
        recordViewportAction('orbit');
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.005;
      spherical.radius += zoomFactor;
      spherical.radius = Math.max(2, Math.min(20, spherical.radius));
      camera.position.setFromSpherical(spherical);
      camera.lookAt(0, 0, 0);
      recordViewportAction('zoom');
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = Math.max(380, containerRef.current.clientHeight || 380);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Quick view angle changes
  const setCameraView = (type: 'top' | 'front' | 'right' | 'persp') => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    
    if (type === 'top') {
      cam.position.set(0, 7, 0.001);
      cam.lookAt(0, 0, 0);
      setViewName('Vista Superior Ortogonal (Numpad 7)');
      recordShortcut('7');
    } else if (type === 'front') {
      cam.position.set(0, 0, 7);
      cam.lookAt(0, 0, 0);
      setViewName('Vista Frontal Ortogonal (Numpad 1)');
      recordShortcut('1');
    } else if (type === 'right') {
      cam.position.set(7, 0, 0);
      cam.lookAt(0, 0, 0);
      setViewName('Vista Lateral Derecha (Numpad 3)');
      recordShortcut('3');
    } else {
      cam.position.set(4, 3, 5);
      cam.lookAt(0, 0, 0);
      setViewName('Perspectiva de Usuario (3D)');
    }
  };

  const handleMiniQuiz = (selectedOption: string) => {
    setQuizAnswer(selectedOption);
    if (selectedOption === 'shift-mmb') {
      setQuizFeedback('¡Correcto! Shift + Botón Central (MMB) permite el desplazamiento lateral o paneo sin alterar la rotación de la cámara.');
      recordViewportAction('pan');
    } else if (selectedOption === 'mmb') {
      setQuizFeedback('No exactamente: presionar solo MMB orbita (gira) la vista alrededor del pivote. Para desplazar lateralmente se añade la tecla Shift.');
    } else {
      setQuizFeedback('Incorrecto: la rueda del ratón acerca o aleja la cámara (zoom).');
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
            Subtemática 1.2.1
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Espacio 3D, Ejes Cartesianos y Navegación
          </h2>
        </div>
      </div>

      {/* Explanatory Narrative with text-justify */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          En un entorno tridimensional, el espacio de trabajo se estructura sobre tres ejes cartesianos fundamentales: <span className="text-red-400 font-bold">X (rojo / ancho)</span>, <span className="text-emerald-400 font-bold">Y (verde / profundidad)</span> y <span className="text-blue-400 font-bold">Z (azul / altura)</span>, siguiendo la convención estándar de la industria del modelado 3D. Para navegar de manera eficiente en el Viewport (vista 3D), el ratón se convierte en la herramienta principal: mantén presionado el botón central (rueda) para orbitar alrededor del objeto, combina la tecla Shift + botón central para desplazarte lateralmente (Paneo) y utiliza la rueda para acercar o alejar la vista (Zoom).
        </p>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
          Dominar estos controles nativos es el primer paso para desarrollar una comprensión espacial efectiva y un flujo de trabajo ágil dentro del software.
        </p>
      </div>

      {/* The 3 Cartesian Axes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveGizmoAxis('X')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeGizmoAxis === 'X'
              ? 'bg-red-500/15 border-red-500 shadow-md shadow-red-500/20'
              : 'bg-slate-900/70 border-slate-800 hover:border-red-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-mono font-bold flex items-center justify-center border border-red-500/40">
              X
            </span>
            <span className="text-[11px] font-mono text-red-400 uppercase font-bold">Eje Rojo</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Ancho / Lateral</h4>
          <p className="text-xs text-slate-300 text-justify">
            Controla el movimiento izquierda y derecha en el plano horizontal.
          </p>
        </div>

        <div 
          onClick={() => setActiveGizmoAxis('Y')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeGizmoAxis === 'Y'
              ? 'bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/40">
              Y
            </span>
            <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Eje Verde</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Profundidad / Adelante</h4>
          <p className="text-xs text-slate-300 text-justify">
            Controla el avance hacia el fondo o hacia el frente en el espacio 3D.
          </p>
        </div>

        <div 
          onClick={() => setActiveGizmoAxis('Z')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeGizmoAxis === 'Z'
              ? 'bg-blue-500/15 border-blue-500 shadow-md shadow-blue-500/20'
              : 'bg-slate-900/70 border-slate-800 hover:border-blue-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center border border-blue-500/40">
              Z
            </span>
            <span className="text-[11px] font-mono text-blue-400 uppercase font-bold">Eje Azul</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Altura / Elevación</h4>
          <p className="text-xs text-slate-300 text-justify">
            En Blender, el eje Z representa la vertical absoluta (hacia arriba y abajo).
          </p>
        </div>
      </div>

      {/* Interactive 3D Viewport Simulator */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Simulador 3D Interactivo
              </span>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {viewName}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Haz clic y arrastra con el ratón directamente en el lienzo para experimentar la navegación real.
            </p>
          </div>

          {/* Quick Perspective Switchers (Numpad emulation) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setCameraView('persp')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
              title="Restaurar perspectiva de usuario"
            >
              Persp
            </button>
            <button
              onClick={() => setCameraView('front')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono flex items-center gap-1"
              title="Frontal (Numpad 1)"
            >
              <span>Frontal</span>
              <KeyBadge keys="1" size="sm" />
            </button>
            <button
              onClick={() => setCameraView('right')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono flex items-center gap-1"
              title="Lateral (Numpad 3)"
            >
              <span>Lateral</span>
              <KeyBadge keys="3" size="sm" />
            </button>
            <button
              onClick={() => setCameraView('top')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono flex items-center gap-1"
              title="Superior (Numpad 7)"
            >
              <span>Superior</span>
              <KeyBadge keys="7" size="sm" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-800/80 bg-[#1e2025]">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Overlay Navigation Help Pill */}
          <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-sm border border-slate-800 rounded-xl p-2.5 text-[11px] text-slate-300 space-y-1 select-none pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span><strong>Arrastrar:</strong> Orbitar (MMB)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              <span><strong>Shift + Arrastrar:</strong> Paneo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span><strong>Rueda:</strong> Zoom</span>
            </div>
          </div>

          {/* Viewport Interaction Status Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 text-[10px] font-mono select-none">
            <span className={`px-2 py-0.5 rounded border transition-colors ${
              state.viewportInteractions.orbit ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}>
              {state.viewportInteractions.orbit ? '✓ Órbita practicada' : '○ Órbita pendiente'}
            </span>
            <span className={`px-2 py-0.5 rounded border transition-colors ${
              state.viewportInteractions.pan ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}>
              {state.viewportInteractions.pan ? '✓ Paneo practicado' : '○ Paneo pendiente'}
            </span>
            <span className={`px-2 py-0.5 rounded border transition-colors ${
              state.viewportInteractions.zoom ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}>
              {state.viewportInteractions.zoom ? '✓ Zoom practicado' : '○ Zoom pendiente'}
            </span>
          </div>
        </div>

        {/* Viewport Action Simulation Buttons for Touch / Non-mouse Users */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
          <span className="text-slate-400">Controles alternativos para dispositivos táctiles:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (cameraRef.current) {
                  cameraRef.current.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.2);
                  cameraRef.current.lookAt(0, 0, 0);
                  recordViewportAction('orbit');
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
            >
              <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
              <span>Girar Vista</span>
            </button>
            <button
              onClick={() => {
                if (cameraRef.current) {
                  cameraRef.current.translateX(0.3);
                  recordViewportAction('pan');
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
            >
              <Move className="w-3.5 h-3.5 text-blue-400" />
              <span>Desplazar</span>
            </button>
            <button
              onClick={() => {
                if (cameraRef.current) {
                  cameraRef.current.translateZ(-0.5);
                  recordViewportAction('zoom');
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
            >
              <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acercar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recognition Mini-Activity (As mandated by Subtemática 1.2.1) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Mini-Actividad de Reconocimiento: Navegación de Vista
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 text-justify">
          ¿Qué combinación de controles permite realizar <strong>paneo lateral</strong> (desplazar la vista lateralmente sin rotar el ángulo de la cámara)?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleMiniQuiz('mmb')}
            className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
              quizAnswer === 'mmb'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            A. Solo presionar Botón Central (MMB)
          </button>

          <button
            onClick={() => handleMiniQuiz('shift-mmb')}
            className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
              quizAnswer === 'shift-mmb'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            B. Shift + Botón Central (MMB)
          </button>

          <button
            onClick={() => handleMiniQuiz('wheel')}
            className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
              quizAnswer === 'wheel'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            C. Girar la Rueda del ratón hacia adelante
          </button>
        </div>

        {quizFeedback && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 text-justify animate-fadeIn">
            {quizFeedback}
          </div>
        )}
      </div>
    </section>
  );
};
