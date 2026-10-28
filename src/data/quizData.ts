export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es la característica principal de Blender respecto a su modelo de distribución y pipeline de producción?",
    options: [
      "Es una suite de pago con suscripción mensual exclusiva para animación 2D.",
      "Es una suite de creación 3D gratuita y de código abierto que cubre todo el pipeline: modelado, animación, render y efectos.",
      "Es un plugin comercial que requiere tener instalado Autodesk Maya para funcionar.",
      "Es un visor 3D ligero diseñado únicamente para exportar modelos a impresoras 3D sin capacidad de modelado."
    ],
    correctIndex: 1,
    explanation: "Blender es un software libre y de código abierto ('Free and Open Source') bajo licencia GNU GPL, que integra todas las fases del pipeline 3D profesional sin costo de licenciamiento (Blender Foundation, s. f.).",
    topicTag: "Generalidades de Blender"
  },
  {
    id: 2,
    question: "En la preproducción y producción cinematográfica con Blender, ¿para qué se utiliza fundamentalmente la previsualización (Previs)?",
    options: [
      "Para redactar los contratos laborales del equipo de actores y camarógrafos.",
      "Para evaluar el balance de color, escala, tiros de cámara y movimiento antes del rodaje, reduciendo errores costosos.",
      "Para convertir el metraje real grabado en películas mudas en blanco y negro.",
      "Para reemplazar los micrófonos de audio físico durante las grabaciones en set."
    ],
    correctIndex: 1,
    explanation: "Tal como documentan Pramono & Muchransyah (2025), la previsualización en Blender permite al equipo de dirección planificar tiros de cámara, balance de iluminación y coherencia espacial antes de filmar en locación.",
    topicTag: "Blender en la Industria"
  },
  {
    id: 3,
    question: "¿Qué panel de la interfaz de Blender muestra la jerarquía organizada de todos los objetos, cámaras y luces contenidos en la escena?",
    options: [
      "3D Viewport",
      "Timeline",
      "Outliner",
      "Properties"
    ],
    correctIndex: 2,
    explanation: "El Outliner (Organizador de Escena) lista todas las colecciones, objetos, mallas, luces y cámaras de forma jerárquica, permitiendo activar u ocultar su visibilidad y renderizado (Soni et al., 2023).",
    topicTag: "Interfaz de Usuario"
  },
  {
    id: 4,
    question: "Para realizar una navegación fluida en el espacio 3D, ¿cuál es la combinación de controles estándar del ratón para desplazar la vista (paneo lateral)?",
    options: [
      "Shift + Botón Central del Ratón (MMB)",
      "Ctrl + Clic Izquierdo",
      "Alt + Doble Clic Derecho",
      "Barra Espaciadora + Clic Izquierdo"
    ],
    correctIndex: 0,
    explanation: "En la configuración estándar de Blender, presionar el Botón Central del Ratón (MMB) orbita la vista, mientras que combinar 'Shift + MMB' permite realizar paneo (desplazamiento lateral sin rotar) (Blender Foundation, s. f.).",
    topicTag: "Navegación 3D"
  },
  {
    id: 5,
    question: "¿Cuál es la correspondencia cromática universal de los tres ejes cartesianos en el espacio 3D de Blender?",
    options: [
      "X = Azul, Y = Rojo, Z = Verde",
      "X = Rojo (ancho), Y = Verde (profundidad), Z = Azul (altura)",
      "X = Amarillo, Y = Naranja, Z = Violeta",
      "X = Blanco, Y = Gris, Z = Negro"
    ],
    correctIndex: 1,
    explanation: "El estándar RGB para coordenadas espaciales define: X en color Rojo (eje lateral/ancho), Y en color Verde (profundidad), y Z en color Azul (elevación/altura).",
    topicTag: "Espacio Tridimensional"
  },
  {
    id: 6,
    question: "¿Qué secuencia de atajos de teclado permite escalar un objeto seleccionado únicamente a lo largo de su altura vertical?",
    options: [
      "Presionar G y después X",
      "Presionar R y después Y",
      "Presionar S y después Z",
      "Presionar Ctrl + S"
    ],
    correctIndex: 2,
    explanation: "La tecla 'S' activa la herramienta Scale (escalar) y pulsar inmediatamente 'Z' restringe la transformación al eje vertical Z (Moioli, 2022).",
    topicTag: "Transformaciones Básicas"
  },
  {
    id: 7,
    question: "¿Qué tecla permite alternar inmediatamente entre el Modo Objeto (Object Mode) y el Modo Edición (Edit Mode)?",
    options: [
      "Escape (Esc)",
      "Tabulador (Tab ↹)",
      "Bloq Mayús",
      "Control (Ctrl)"
    ],
    correctIndex: 1,
    explanation: "La tecla Tabulador conmuta entre Object Mode (donde se selecciona el objeto como un todo) y Edit Mode (donde se tiene acceso a la geometría interna) (Blender Foundation, 2024).",
    topicTag: "Modos de Trabajo"
  },
  {
    id: 8,
    question: "Dentro del Modo Edición, ¿cuáles son los atajos numéricos del teclado principal para alternar entre selección de Vértices, Aristas y Caras?",
    options: [
      "F1, F2 y F3",
      "Teclas numéricas 1 (Vértices), 2 (Aristas) y 3 (Caras)",
      "Alt + 1, Alt + 2 y Alt + 3",
      "Ctrl + Shift + V"
    ],
    correctIndex: 1,
    explanation: "En Edit Mode, las teclas 1, 2 y 3 del teclado superior alternan rápidamente los tres modos de selección sub-geométrica: 1 para vértices (puntos), 2 para aristas (líneas) y 3 para caras (polígonos).",
    topicTag: "Componentes de Malla"
  },
  {
    id: 9,
    question: "¿Qué atajo de teclado ejecuta la herramienta Loop Cut (corte de bucle) para añadir subdivisiones de aristas en una malla poligonal?",
    options: [
      "Ctrl + R",
      "Shift + D",
      "Alt + E",
      "Ctrl + Z"
    ],
    correctIndex: 0,
    explanation: "Ctrl + R activa el Loop Cut & Slide en Edit Mode. Al posicionar el cursor sobre la malla, muestra una guía amarilla y la rueda del ratón permite incrementar el número de cortes (Blender Foundation, 2024).",
    topicTag: "Herramientas de Modelado"
  },
  {
    id: 10,
    question: "Al emprender el reto práctico de esculpir un objeto a partir del cubo por defecto, ¿cuál es el flujo de trabajo más eficiente y recomendado?",
    options: [
      "Borrar el cubo, dibujar en papel y esperar que Blender importe automáticamente el archivo sin interactuar.",
      "Ingresar a Edit Mode (Tab), añadir bucles estratégicos con Ctrl+R, extruir detalles con E y ajustar proporciones con G, R y S restringidos por ejes.",
      "Abrir exclusivamente el panel de Render y aplicar modificadores sin tocar la geometría del objeto.",
      "Usar únicamente el ratón haciendo clic repetido en los menús desplegables sin utilizar ningún atajo de teclado."
    ],
    correctIndex: 1,
    explanation: "El flujo de trabajo profesional se fundamenta en la combinación sinérgica de atajos de transformación (G, R, S) con herramientas de subdivisión (Ctrl+R) y extrusión (E) directamente en Edit Mode, optimizando tiempo y fluidez creativa.",
    topicTag: "Metodología y Reto Práctico"
  }
];
