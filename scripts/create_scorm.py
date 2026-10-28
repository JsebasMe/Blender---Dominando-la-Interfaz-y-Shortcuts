import os
import zipfile
import subprocess
import shutil

print("1. Running npm run build...")
res = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
if res.returncode != 0:
    print("Build failed:", res.stderr)
    exit(1)
print("Build successful!")

# Ensure public/ exists
os.makedirs("public", exist_ok=True)

# 2. Prepare SCORM imsmanifest.xml
manifest_content = """<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="com.ova.blender.interfaz.v1" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="blender_ova_org">
    <organization identifier="blender_ova_org">
      <title>Blender - Dominando la Interfaz y Shortcuts (OVA)</title>
      <item identifier="item_blender_ova_sco" identifierref="resource_blender_ova">
        <title>Blender: Dominando la Interfaz y Shortcuts</title>
        <adlcp:masteryscore>70</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource_blender_ova" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html" />
    </resource>
  </resources>
</manifest>
"""

with open("dist/imsmanifest.xml", "w", encoding="utf-8") as f:
    f.write(manifest_content.strip())

# Standard minimal SCORM XSD schemas for schema validators
schemas = {
    "adlcp_rootv1p2.xsd": """<?xml version="1.0" encoding="UTF-8"?>
<xs:schema targetNamespace="http://www.adlnet.org/xsd/adlcp_rootv1p2"
           xmlns:xs="http://www.w3.org/2001/XMLSchema"
           xmlns="http://www.adlnet.org/xsd/adlcp_rootv1p2"
           elementFormDefault="unqualified">
  <xs:element name="location" type="xs:string"/>
  <xs:element name="prerequisites" type="xs:string"/>
  <xs:element name="maxtimeallowed" type="xs:string"/>
  <xs:element name="timelimitaction" type="xs:string"/>
  <xs:element name="datafromlms" type="xs:string"/>
  <xs:element name="masteryscore" type="xs:string"/>
  <xs:attribute name="scormtype">
    <xs:simpleType>
      <xs:restriction base="xs:string">
        <xs:enumeration value="asset"/>
        <xs:enumeration value="sco"/>
      </xs:restriction>
    </xs:simpleType>
  </xs:attribute>
</xs:schema>""",
    "imscp_rootv1p1p2.xsd": """<?xml version="1.0" encoding="UTF-8"?>
<xs:schema targetNamespace="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
           xmlns:xs="http://www.w3.org/2001/XMLSchema"
           xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
           elementFormDefault="qualified">
  <xs:element name="manifest" type="xs:anyType"/>
</xs:schema>"""
}

for name, content in schemas.items():
    with open(os.path.join("dist", name), "w", encoding="utf-8") as f:
        f.write(content.strip())

# 3. Create the SCORM ZIP package from dist/
scorm_zip_path = "public/ova-blender-scorm.zip"
if os.path.exists(scorm_zip_path):
    os.remove(scorm_zip_path)

print(f"Creating SCORM package at {scorm_zip_path}...")
total_files = 0
with zipfile.ZipFile(scorm_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk("dist"):
        for file in files:
            # Don't include other zip files inside the scorm package
            if file.endswith(".zip"):
                continue
            filepath = os.path.join(root, file)
            # Must be relative to dist root so imsmanifest.xml is at the root of the ZIP!
            relpath = os.path.relpath(filepath, "dist")
            zipf.write(filepath, relpath)
            total_files += 1

scorm_size = os.path.getsize(scorm_zip_path) / (1024 * 1024)
print(f"SCORM package created successfully!")
print(f"Total files in SCORM zip: {total_files}")
print(f"SCORM package size: {scorm_size:.2f} MB")

# Also verify that imsmanifest.xml is at root of zip
with zipfile.ZipFile(scorm_zip_path, "r") as z:
    file_list = z.namelist()
    print("Has imsmanifest.xml at root:", "imsmanifest.xml" in file_list)
    print("Has index.html at root:", "index.html" in file_list)
    print("Sample files:", file_list[:8])
