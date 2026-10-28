#!/usr/bin/env python3
import os
import sys
import subprocess
import zipfile
import shutil

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
MANIFEST_PATH = os.path.join(PUBLIC_DIR, 'imsmanifest.xml')
OUTPUT_ZIP_PUBLIC = os.path.join(PUBLIC_DIR, 'ova-blender-scorm.zip')

def main():
    print("🚀 [SCORM Packaging] 1. Construyendo aplicación Vite (npm run build)...")
    res = subprocess.run(['npm', 'run', 'build'], cwd=ROOT_DIR)
    if res.returncode != 0:
        print("❌ Error compilando con vite build", file=sys.stderr)
        sys.exit(1)

    print("📄 [SCORM Packaging] 2. Verificando imsmanifest.xml en dist/...")
    dist_manifest = os.path.join(DIST_DIR, 'imsmanifest.xml')
    if not os.path.exists(dist_manifest) and os.path.exists(MANIFEST_PATH):
        shutil.copyfile(MANIFEST_PATH, dist_manifest)

    if not os.path.exists(dist_manifest):
        print("❌ Error: no se encontró imsmanifest.xml", file=sys.stderr)
        sys.exit(1)

    print("📦 [SCORM Packaging] 3. Empaquetando SCORM .ZIP estándar (SCORM 1.2)...")
    # Exclude zip files themselves to avoid recursion
    exclude_extensions = {'.zip'}
    
    with zipfile.ZipFile(OUTPUT_ZIP_PUBLIC, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_extensions:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, DIST_DIR)
                zipf.write(full_path, rel_path)

    # Also copy to dist/
    dist_zip = os.path.join(DIST_DIR, 'ova-blender-scorm.zip')
    shutil.copyfile(OUTPUT_ZIP_PUBLIC, dist_zip)

    size_mb = os.path.getsize(OUTPUT_ZIP_PUBLIC) / (1024 * 1024)
    print(f"✅ [SCORM Packaging] Paquete SCORM generado con éxito:")
    print(f"   -> Archivo: {OUTPUT_ZIP_PUBLIC}")
    print(f"   -> Tamaño: {size_mb:.2f} MB")
    print(f"   -> Estándar: SCORM 1.2 (Compatible con Moodle, Blackboard, Canvas, Chamilo)")

if __name__ == '__main__':
    main()
