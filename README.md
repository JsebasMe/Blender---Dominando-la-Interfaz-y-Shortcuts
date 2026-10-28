# Blender - Dominando la Interfaz y Shortcuts
## Objeto Virtual de Aprendizaje (OVA)
**Universidad Simón Bolívar · Campus Cúcuta**  
**Facultad de Ingenierías · Programa de Ingeniería Multimedia**  
**Autores:** Juan Sebastian Mendieta Pineda & Danna Nickol Duarte Duarte

---

### 🚀 Cómo desplegar en GitHub Pages (Solución a Pantalla en Blanco)

#### ¿Por qué quedaba la página en blanco?
1. **Rutas absolutas vs. subrutas en GitHub Pages**: Por defecto Vite compila con `base: '/'`. Al desplegarse en `https://<usuario>.github.io/<nombre-repo>/`, el navegador intentaba cargar los scripts y estilos en la raíz del dominio (`/assets/...`) en lugar de la subcarpeta del repositorio, generando errores **404 Not Found**.
2. **Archivos fuente sin compilar**: Los navegadores no pueden ejecutar archivos `.tsx` ni TypeScript directamente. Debe servirse la carpeta compilada (`dist`) generada por Vite.

---

#### 🌟 Opción 1: Despliegue Automático con GitHub Actions (Recomendada)
Ya se incluyó el archivo de workflow en `.github/workflows/deploy.yml`. Solo debes:

1. Ve a tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings** (Configuración).
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En **Build and deployment** > **Source**, cambia de *"Deploy from a branch"* a **"GitHub Actions"**.
5. Haz un `push` a tu rama `main` (o ejecuta el workflow manualmente desde la pestaña **Actions**).
6. ¡Listo! En 1 minuto tu OVA estará activo en `https://<usuario>.github.io/<nombre-repo>/` funcionando al 100%.

---

#### 📦 Opción 2: Despliegue Manual desde Rama o Carpeta `dist`
Si prefieres compilar en tu computadora y subir los archivos:
```bash
# 1. Instalar dependencias
npm install

# 2. Compilar el proyecto para producción
npm run build

# 3. La carpeta 'dist' contiene todo el sitio web compilado listo para alojar
```
Puedes publicar el contenido de `dist/` en la rama `gh-pages` o configurarlo en GitHub Pages.

---

### 🛠️ Estructura Académica del OVA
- **1. Introducción**: Contextualización pedagógica, podcast interactivo, tutorial guiado de instalación paso a paso (Windows, macOS, Linux) y video explicativo.
- **2. Contenido Temático**:
  - 1.1 Blender en la industria
  - 1.2 Interfaz y navegación (diagrama interactivo Labeled Graphics de Blender con capturas reales)
  - 1.3 Selección y transformación (Simulador 3D interactivo con Three.js y atajos G, R, S)
  - 1.4 Edición de mallas y modelado (Extrude 'E', Loop Cut 'Ctrl+R')
- **3. Evaluación Formativa y Sumativa**:
  - Actividad 1: Drag & Drop de Componentes de la Interfaz
  - Actividad 2: Desafío Contrarreloj de Shortcuts
  - Actividad 3: Cuestionario Sumativo de 5 Preguntas
  - Generación de Certificado de Finalización Académico
- **Radar de Hábitos ("De Novato a Artista 3D")**:
  - Seguimiento pedagógico gamificado del progreso del estudiante con retroalimentación auditiva (Web Audio API).
