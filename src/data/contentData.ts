export interface PipelineStep {
  id: string;
  name: string;
  english: string;
  description: string;
  icon: string;
  deliverable: string;
}

export interface FilmProject {
  id: string;
  title: string;
  year: number;
  studio: string;
  type: string;
  youtubeId: string;
  watchUrl: string;
  description: string;
  technicalHighlight: string;
}

export interface Hotspot {
  id: string;
  name: string;
  areaLabel: string;
  x: number; // percentage
  y: number; // percentage
  width?: number;
  height?: number;
  description: string;
  shortcut: string;
  example: string;
  importance: string;
}

export const INSTITUTIONAL_DATA = {
  title: "Blender - Dominando la Interfaz y Shortcuts",
  subtitle: "Objeto Virtual de Aprendizaje (OVA) Interactivo",
  authors: [
    { name: "Juan Sebastian Mendieta Pineda", role: "Autor / Diseñador Instruccional" },
    { name: "Danna Nickol Duarte Duarte", role: "Autora / Diseñadora Instruccional" }
  ],
  institution: "Universidad Simón Bolívar",
  campus: "Campus Cúcuta",
  program: "Ingeniería Multimedia",
  faculty: "Facultad de Ingenierías",
  estimatedTime: "30 minutos",
  methodology: "Metodología activa y práctica mediante recursos interactivos, simulación tridimensional y retos de aplicación directa.",
  phases: [
    { name: "Fase 1: Diagnóstico", desc: "Exploración de conocimientos previos y familiarización con el entorno 3D." },
    { name: "Fase 2: Diseño y Recursos", desc: "Apropiación conceptual, exploración de la interfaz, visualizadores interactivos y atajos." },
    { name: "Fase 3: Evaluación Formativa", desc: "Prácticas lúdicas de emparejamiento, quiz evaluativo con retroalimentación y proyecto de modelado." }
  ]
};

export const PIPELINE_WORKFLOW: PipelineStep[] = [
  {
    id: "modeling",
    name: "Modelado",
    english: "3D Modeling",
    description: "Creación de la forma geométrica tridimensional a partir de vértices, aristas y caras poligonales. Es la etapa inicial donde se esculpen personajes, escenarios y objetos cotidianos.",
    icon: "Box",
    deliverable: "Malla poligonal (Mesh)"
  },
  {
    id: "rigging",
    name: "Rigging",
    english: "Rigging & Skeletal System",
    description: "Construcción de una estructura de huesos y controladores digitales (esqueleto o armadura) que permite articular y posar las mallas poligonales.",
    icon: "Bone",
    deliverable: "Esqueleto cinemático (Armature)"
  },
  {
    id: "animation",
    name: "Animación",
    english: "Animation",
    description: "Dotación de movimiento y comportamiento temporal a los objetos mediante curvas de interpolación y fotogramas clave (keyframes) en la línea de tiempo.",
    icon: "PlayCircle",
    deliverable: "Secuencia de fotogramas animados"
  },
  {
    id: "simulation",
    name: "Simulación",
    english: "Physics & Particles Simulation",
    description: "Cálculo computacional de fenómenos dinámicos del mundo real como humo, fuego, fluidos, telas, gravedad y colisiones de cuerpos rígidos.",
    icon: "Flame",
    deliverable: "Caché de físicas y dinámicas"
  },
  {
    id: "rendering",
    name: "Renderizado",
    english: "Rendering Engines (Cycles / EEVEE)",
    description: "Generación de la imagen o fotograma final bidimensional mediante el cálculo de rayos de luz, sombras, materiales y oclusión ambiental.",
    icon: "Camera",
    deliverable: "Imágenes ráster o renders fotorealistas"
  },
  {
    id: "composition",
    name: "Composición",
    english: "Compositing & Post-Production",
    description: "Unión y ajuste de múltiples capas de render, corrección de color, etalonaje digital y aplicación de efectos visuales sin salir de Blender.",
    icon: "Layers",
    deliverable: "Producto audiovisual masterizado"
  }
];

export const INDUSTRY_FILMS: FilmProject[] = [
  {
    id: "agent-327",
    title: "Agent 327: Operation Barbershop",
    year: 2017,
    studio: "Blender Studio",
    type: "Cortometraje animado de acción / Espionaje",
    youtubeId: "mN0zPOpADL4",
    watchUrl: "https://www.youtube.com/watch?v=mN0zPOpADL4",
    description: "Producción de prueba de concepto para un largometraje animado basado en la famosa historieta neerlandesa de Martin Lodewijk. Mostró la capacidad de Blender para animación de personajes de estándar cinematográfico.",
    technicalHighlight: "Desarrollo pionero de rigs hiperflexibles y renderizado con Cycles para estilos visuales híbridos."
  },
  {
    id: "sprite-fright",
    title: "Sprite Fright",
    year: 2021,
    studio: "Blender Studio",
    type: "Cortometraje Open Movie / Comedia y Terror",
    youtubeId: "X4MXWcx4jUA",
    watchUrl: "https://www.youtube.com/watch?v=X4MXWcx4jUA",
    description: "Comedia de terror de los años 80 ambientada en Gran Bretaña. Dirigida por Mathew Luhn (ex-veterano de Pixar Story). El proyecto impulsó saltos revolucionarios en Blender 3.0.",
    technicalHighlight: "Pipeline colaborativo en la nube, nuevos Geometry Nodes y avances mayúsculos en el Asset Browser."
  },
  {
    id: "flow-movie",
    title: "FLOW — Tráiler Oficial",
    year: 2024,
    studio: "Dream Well Studio / Janus Films",
    type: "Largometraje Animado Internacional (Festival de Cannes)",
    youtubeId: "ZgZccxuj2RY",
    watchUrl: "https://www.youtube.com/watch?v=ZgZccxuj2RY",
    description: "Obra maestra dirigida por Gints Zilbalodis nominada y galardonada internacionalmente, modelada y animada íntegramente con Blender. Muestra la travesía de un gato en un mundo inundado.",
    technicalHighlight: "Uso poético del motor en tiempo real y cámaras dinámicas sin cortes para narrativas de autor."
  }
];

export const INTERFACE_HOTSPOTS: Hotspot[] = [
  {
    id: "viewport",
    name: "Vista 3D (3D Viewport)",
    areaLabel: "Área Central de Trabajo 3D",
    x: 42,
    y: 48,
    width: 65,
    height: 70,
    description: "Es el corazón de Blender. Constituye el espacio tridimensional virtual donde el artista interactúa visualmente con los objetos, cámaras y luces, visualizando las geometrías en tiempo real.",
    shortcut: "MMB (Órbita) / Shift+MMB (Paneo) / Rueda (Zoom)",
    example: "Seleccionar el cubo inicial y desplazarse en el espacio euclidiano para apreciar sus seis caras.",
    importance: "Aquí ocurre el 90% del trabajo manual de modelado y composición escénica."
  },
  {
    id: "outliner",
    name: "Organizador de Escena (Outliner)",
    areaLabel: "Panel Superior Derecho",
    x: 91,
    y: 14,
    width: 18,
    height: 25,
    description: "Presenta una estructura jerárquica en forma de árbol con todos los elementos contenidos en la escena: colecciones, mallas, cámaras, luces y modificadores.",
    shortcut: "Clic derecho > New Collection / F2 (Renombrar)",
    example: "Organizar props en carpetas temáticas u ocultar temporalmente la iluminación pulsando el icono del ojo.",
    importance: "Mantiene la escena limpia y estructurada, vital en producciones con cientos de elementos."
  },
  {
    id: "properties",
    name: "Panel de Propiedades (Properties)",
    areaLabel: "Panel Inferior Derecho",
    x: 91,
    y: 68,
    width: 18,
    height: 48,
    description: "Permite configurar los parámetros matemáticos, físicos y visuales de la escena y del objeto activo: materiales, modificadores, renderizado, físicas y datos de malla.",
    shortcut: "Numpad o pestañas verticales con iconos",
    example: "Añadir un modificador 'Subdivision Surface' o cambiar el color de un material mediante nodos BSDF.",
    importance: "Es el centro de control técnico de materiales, cámaras y salida final del render."
  },
  {
    id: "timeline",
    name: "Línea de Tiempo (Timeline)",
    areaLabel: "Barra Inferior Horizontal",
    x: 42,
    y: 92,
    width: 65,
    height: 12,
    description: "Panel dedicado a la secuenciación temporal. Permite reproducir la animación, saltar entre fotogramas e insertar o desplazar keyframes (fotogramas clave).",
    shortcut: "Espacio (Play/Pausa) / I (Insertar Keyframe)",
    example: "Ajustar la duración total de la animación a 240 fotogramas y verificar el movimiento fluido a 24 fps.",
    importance: "Fundamental para controlar el ritmo, tempo y sincronización de cualquier animación."
  },
  {
    id: "topbar",
    name: "Barra Superior y Espacios (Top Bar & Workspaces)",
    areaLabel: "Barra Superior Horizontal",
    x: 28,
    y: 3.5,
    width: 80,
    height: 6,
    description: "Contiene los menús globales del sistema (File, Edit, Render, Window, Help) y las pestañas de áreas de trabajo especializadas (Layout, Modeling, Sculpting, Shading, Animation).",
    shortcut: "Ctrl + Página Arriba / Abajo (Cambiar espacio)",
    example: "Cambiar de la pestaña 'Layout' a 'Modeling' para entrar directamente a herramientas de corte.",
    importance: "Organiza el entorno de trabajo adaptando las herramientas según la tarea en curso."
  },
  {
    id: "toolbar",
    name: "Barra de Herramientas (Toolbar / T-Panel)",
    areaLabel: "Columna Lateral Izquierda",
    x: 1.8,
    y: 22,
    width: 3.5,
    height: 40,
    description: "Barra vertical situada al extremo izquierdo del Viewport que agrupa iconos de las herramientas interactivas más frecuentes: selección, cursor 3D, mover, rotar y anotar.",
    shortcut: "Tecla T (Ocultar / Mostrar Toolbar)",
    example: "Seleccionar la herramienta 'Measure' para medir distancias métricas entre dos vértices.",
    importance: "Ofrece acceso visual alternativo a las herramientas de transformación rápida."
  }
];

export const APA_REFERENCES = [
  {
    id: "blender-org",
    citation: "Blender Foundation. (s. f.). Blender: Free and Open 3D Creation Software.",
    url: "https://www.blender.org/",
    note: "Portal oficial de la suite de creación 3D de código abierto."
  },
  {
    id: "blender-download",
    citation: "Blender Foundation. (s. f.). Descarga oficial de Blender.",
    url: "https://www.blender.org/download/",
    note: "Repositorio oficial de versiones estables para Windows, macOS y GNU/Linux."
  },
  {
    id: "blender-manual",
    citation: "Blender Foundation. (s. f.). Manual oficial de Blender (Español).",
    url: "https://docs.blender.org/manual/es/latest/",
    note: "Documentación exhaustiva de la interfaz, herramientas y pipeline 3D."
  },
  {
    id: "blender-keymap",
    citation: "Blender Foundation. (s. f.). Mapa de teclado predeterminado de Blender. Manual oficial de Blender.",
    url: "https://docs.blender.org/manual/es/latest/interface/keymap/blender_default.html",
    note: "Guía oficial de atajos de teclado estándar en Blender."
  },
  {
    id: "blender-manual-42",
    citation: "Blender Foundation. (2024). Blender 4.2 Manual: Modeling, Modifiers & Mesh Editing.",
    url: "https://docs.blender.org/manual/es/latest/",
    note: "Manual de referencia para herramientas de edición de mallas (Extrude y Loop Cut)."
  },
  {
    id: "brown-shortcuts",
    citation: "Brown, H. (s. f.). Blender Shortcuts Reference Guide.",
    url: "https://hollisbrown.github.io/blendershortcuts/",
    note: "Guía de referencia rápida comunitaria de atajos de transformación y navegación."
  },
  {
    id: "hattori-2020",
    citation: "Hattori, T., Masuda, R., Moritoh, Y., Imai, Y., Kawakami, Y., & Tanaka, T. (2020, December). Utilization of both free 3DCG software “blender” and 3D printing for early STEM education. In 2020 IEEE International Conference on Teaching, Assessment, and Learning for Engineering (TALE) (pp. 879-882). IEEE.",
    url: "https://ieeexplore.ieee.org/document/9368412",
    note: "Investigación sobre el impacto pedagógico de Blender en la educación de diseño y prototipado."
  },
  {
    id: "moioli-2022",
    citation: "Moioli, G. (2022). Introducing Blender 3.0. In Introduction to Blender 3.0: Learn Organic and Architectural Modeling, Lighting, Materials, Painting, Rendering, and Compositing with Blender (pp. 1-63). Berkeley, CA: Apress.",
    url: "https://link.springer.com/book/10.1007/978-1-4842-7954-0",
    note: "Fundamentación técnica de los atajos de transformación y optimización del flujo de trabajo."
  },
  {
    id: "pramono-2025",
    citation: "Pramono, A., & Muchransyah, A. P. (2025, December). Previsualization with Blender for Collaborative Short Film Production. In 2025 International Conference on Informatics, Multimedia, Cyber and Information System (ICIMCIS) (pp. 712-717). IEEE.",
    url: "https://ieeexplore.ieee.org/",
    note: "Estudio sobre la previsualización audiovisual con Blender para reducción de costes en rodajes."
  },
  {
    id: "soni-2023",
    citation: "Soni, L., Kaur, A., & Sharma, A. (2023, April). A review on different versions and interfaces of blender software. In 2023 7th international conference on trends in electronics and informatics (ICOEI) (pp. 882-887). IEEE.",
    url: "https://ieeexplore.ieee.org/document/10125867",
    note: "Revisión comparativa sobre la evolución de la interfaz gráfica y ergonomía de usuario en Blender."
  },
  {
    id: "blender-agent327",
    citation: "Blender Studio. (2017). Agent 327: Operation Barbershop [Archivo de video]. YouTube.",
    url: "https://www.youtube.com/watch?v=mN0zPOpADL4",
    note: "Producción cinematográfica de código abierto por Blender Studio."
  },
  {
    id: "blender-spritefright",
    citation: "Blender Studio. (2021). Sprite Fright – Blender Open Movie [Archivo de video]. YouTube.",
    url: "https://www.youtube.com/watch?v=X4MXWcx4jUA",
    note: "Cortometraje Open Movie dirigido por Mathew Luhn."
  }
];
