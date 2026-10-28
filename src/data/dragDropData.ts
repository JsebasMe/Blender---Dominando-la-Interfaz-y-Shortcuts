export interface ConceptItem {
  id: string;
  label: string;
  category: 'tool' | 'interface' | 'edit';
  hint: string;
}

export interface TargetZone {
  id: string;
  title: string;
  shortcutOrIcon: string;
  expectedConceptId: string;
  explanation: string;
}

export const DRAG_DROP_CONCEPTS: ConceptItem[] = [
  { id: 'c-mover', label: 'Mover objeto (Grab)', category: 'tool', hint: 'Desplaza libremente o en un eje' },
  { id: 'c-rotar', label: 'Rotar objeto (Rotate)', category: 'tool', hint: 'Gira respecto al pivote seleccionado' },
  { id: 'c-escalar', label: 'Escalar objeto (Scale)', category: 'tool', hint: 'Modifica el tamaño proporcionalmente' },
  { id: 'c-extruir', label: 'Extruir geometría (Extrude)', category: 'edit', hint: 'Genera nuevas caras a partir de las existentes' },
  { id: 'c-loopcut', label: 'Corte de bucle (Loop Cut)', category: 'edit', hint: 'Inserta subdivisiones perimetrales con scroll' },
  { id: 'c-viewport', label: 'Vista de la escena 3D', category: 'interface', hint: 'Área principal de navegación e interacción' },
  { id: 'c-outliner', label: 'Jerarquía y lista de objetos', category: 'interface', hint: 'Árbol organizativo con colecciones' },
  { id: 'c-tab', label: 'Alternar Modo Objeto / Edición', category: 'edit', hint: 'Conmuta entre transformar y modificar malla' }
];

export const TARGET_ZONES: TargetZone[] = [
  {
    id: 'z-g',
    title: 'Atajo: Tecla G',
    shortcutOrIcon: 'G',
    expectedConceptId: 'c-mover',
    explanation: 'La tecla "G" activa la transformación Grab (mover), permitiendo desplazar el objeto o elementos de malla seleccionados.'
  },
  {
    id: 'z-r',
    title: 'Atajo: Tecla R',
    shortcutOrIcon: 'R',
    expectedConceptId: 'c-rotar',
    explanation: 'La tecla "R" activa Rotate, girando la selección en el plano de la vista o en torno a un eje restringido.'
  },
  {
    id: 'z-s',
    title: 'Atajo: Tecla S',
    shortcutOrIcon: 'S',
    expectedConceptId: 'c-escalar',
    explanation: 'La tecla "S" corresponde a Scale, ampliando o contrayendo la dimensión de la geometría.'
  },
  {
    id: 'z-e',
    title: 'Atajo: Tecla E',
    shortcutOrIcon: 'E',
    expectedConceptId: 'c-extruir',
    explanation: 'En Edit Mode, la tecla "E" (Extrude) proyecta nueva geometría normal o perpendicular a los polígonos seleccionados.'
  },
  {
    id: 'z-loopcut',
    title: 'Atajo: Ctrl + R',
    shortcutOrIcon: 'Ctrl + R',
    expectedConceptId: 'c-loopcut',
    explanation: 'La combinación "Ctrl + R" ejecuta el Loop Cut & Slide, insertando bucles de aristas para refinar la silueta del modelo.'
  },
  {
    id: 'z-viewport',
    title: 'Espacio: 3D Viewport',
    shortcutOrIcon: 'Viewport 3D',
    expectedConceptId: 'c-viewport',
    explanation: 'El Viewport es el lienzo espacial donde se navega con el ratón y se visualizan los modelos en perspectiva y ortogonal.'
  },
  {
    id: 'z-outliner',
    title: 'Panel: Outliner',
    shortcutOrIcon: 'Outliner',
    expectedConceptId: 'c-outliner',
    explanation: 'El Outliner muestra la estructura jerárquica de la escena, permitiendo agrupar en colecciones y ocultar objetos.'
  },
  {
    id: 'z-tab',
    title: 'Atajo: Tecla Tab',
    shortcutOrIcon: 'Tab ↹',
    expectedConceptId: 'c-tab',
    explanation: 'La tecla "Tab" conmuta instantáneamente entre Object Mode (modificación global) y Edit Mode (modificación geométrica).'
  }
];
