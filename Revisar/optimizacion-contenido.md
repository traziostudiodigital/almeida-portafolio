# 📄 PLAN MAESTRO DE OPTIMIZACIÓN Y CORRECCIÓN EDITORIAL
## Portafolio Profesional Luis Manuel Almeida Luis
**Fuente primaria:** Revisión directa del titular (`David sugrencia.pdf`)  
**Fecha de elaboración:** Septiembre 2026  
**Objetivo:** Guía técnica y quirúrgica para la actualización integral de contenidos, terminología pericial, arquitectura bilingüe (ES / EN) y sincronización de datos estructurados, plantillas web y motor de IA contextual.

---

## 🏛️ 1. PRINCIPIOS EDITORIALES Y FILOSOFÍA DE CAMBIO

1. **Des-policialización del Discurso:**
   * Sustituir el tono punitivo, de amenaza legal o sospecha policial (*"indefensión jurídica", "expone a falsificación y sobrevaloración"*) por un discurso de **seguridad patrimonial, certeza jurídica, rigor documental y metodología contrastada**.
2. **Terminología Pericial Canónica (Escuela Cubana e Internacional):**
   * Emplear con precisión los términos propios de la profesión: **«Expertizaje»** (o *expertisaje*), **«Tasación»**, **«Ficha técnica de catalogación»**, y **«Método de comparación de datos de mercado teniendo en cuenta el precio máximo pagado en un mercado abierto y legal»** (Escuela del Dr. Alex J. Rosenberg).
   * Evitar el uso descontextualizado o de reclamo comercial de la palabra *"autenticidad/autenticación"*, sustituyéndola por dictamen de autoría, expertizaje y catalogación.
3. **Cero Invención y Trazabilidad Institucional:**
   * Reflejar los cargos y trayectorias exactas: **19 años al frente del Departamento de Registro e Inventario del Registro Nacional de Bienes Culturales de la República de Cuba** y **41 años como especialista de aduanas y decomisos aeroportuarios (1988–2024)**.
   * Categoría docente exacta: **Profesor Auxiliar Adjunto** (ISA, Universidad de La Habana, Colegio Universitario San Gerónimo).
4. **Restitución Fidedigna de Fuentes y Autorías:**
   * La frase emblemática *«En el trabajo de tasación hay que tener tres cosas: ojo y sensibilidad en la apreciación; hay que ver muchas piezas, y saber del mercado del arte.»* pertenece a la **Dra. Marta Arjona Pérez** (Presidenta fundadora del Consejo Nacional de Patrimonio Cultural). Queda desvinculada de la autoría personal de Luis Manuel.
5. **Carga de la Prueba de Procedencia:**
   * Se institucionaliza como axioma pericial en todo el sitio: *«La procedencia (provenance) es una carga técnica y documental que recae sobre el propietario, poseedor o tenedor del bien.»*
6. **Sincronización Bilingüe de Máxima Especialización:**
   * Toda traducción al inglés debe utilizar la jerga profesional anglosajona estándar (AAA, Appraisers Association of America, USPAP), evitando traducciones literales o superficiales.

---

## 🗺️ 2. MAPA MAESTRO DE ARCHIVOS AFECTADOS

### A. Datos Estructurados (`docs/data/01-estructurado/`)
- `copy-editorial-nichos.md` (Textos editoriales de los 6 nichos)
- `copy-home.md` (Textos de la página principal, hero y cintillo)
- `frases-luis.md` (Catálogo de citas de Luis Manuel y referentes)
- `perfil.md` (Ficha biográfica, trayectoria, hitos y acreditaciones)
- `experiencia.md` (Registro cronológico institucional y pericial)
- `nichos-servicio.md` (Definición formal de servicios y metodologías)
- `habilidades.md` / `habilidades-inferidas.md` (Competencias técnicas y docentes)
- `cv-moderno-es.md` (Curriculum vitae en español)
- `cv-moderno-en.md` (Curriculum vitae en inglés)

### B. Diccionario Bilingüe i18n (`web/assets/i18n-data.js`)
- Rama `es`: Claves de UI, proceso, home, nichos 1 a 6, perfil, legal, FAQs y metadatos SEO.
- Rama `en`: Contraparte técnica profesional en inglés para cada una de las claves modificadas.

### C. Plantillas HTML (`web/plantillas/`)
- `index.template.html`
- `coleccionistas-particulares.template.html` (Nicho 1 / Bola 1)
- `docencia-conferencias.template.html` (Nicho 2 / Bola 2)
- `herencias-sucesiones.template.html` (Nicho 3 / Bola 3)
- `abogados-notarios.template.html` (Nicho 4 / Bola 4)
- `aseguradoras-family-offices.template.html` (Nicho 5 / Bola 5)
- `patrimonio-subacuatico.template.html` (Nicho 6 / Bola 6)
- `perfil.template.html`

### D. Componentes Modulares (`web/componentes/`)
- `hero-home.html` (Estructura del hero)
- `nicho-index.html` (Tarjetas de nicho / "bolas" y cédula de detalle en Home)
- `footer-nicho.html` y `footer-home.html` (Citas, bio sintética y enlaces)
- `form-encargo.html` (Formulario de contacto pericial)

### E. Módulo de Asistente IA (`src/context/`)
- `src/context/blocks.js` (Bloques de conocimiento inyectados en Groq Cloudflare Worker en ES y EN)
- `src/context/keywords.js` (Palabras clave para detección de intención)

---

## 🔎 3. DOSSIER DETALLADO PUNTO POR PUNTO (PUNTOS 1 AL 31)

---

### 🎨 SECCIÓN I: BOLA 1 / NICHO 1 — Coleccionistas y Particulares (`coleccionistas-particulares.html`)

#### 📌 Punto 1 (Pág. 1 del PDF) — Subtítulo Hero Nicho 1
* **Contexto / Ubicación:** Nicho 1 (Coleccionistas Privados), Hero Subtitle.
* **Texto Original (ES):**
  > *"Dictámenes técnicos independientes de autenticidad, catalogación y valoración económica para propietarios, coleccionistas e inversionistas de obras de arte y bienes de alto valor."*
* **Instrucción del Padre:** Sustituir por: *"Dictamenes de expertizaje, catalogacion y tasacion a personas naturales, coleccionistas y agentes del mercado del arte de galerias, ferias y subastas."*
* **Texto Corregido y Pulido (ES):**
  > `Dictámenes de expertizaje, catalogación y tasación para personas naturales, coleccionistas y agentes del mercado del arte en galerías, ferias y subastas.`
* **Texto Propuesto (EN):**
  > `Expertise, cataloguing, and appraisal reports for individuals, private collectors, and art market professionals across galleries, art fairs, and auction houses.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Claves `"n1.hero.subtitle"` (ES y EN), `"footer.about"` (ES y EN).
  * `web/plantillas/coleccionistas-particulares.template.html` -> `<p class="... hero subtitle">`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md` -> Nicho 1: Hero Subtítulo.
  * `src/context/blocks.js` -> Bloque `nicho1` (ES y EN).

---

#### 📌 Punto 2 (Pág. 1 del PDF) — Bloque "El Problema" (Nicho 1)
* **Contexto / Ubicación:** Sección 2 de `coleccionistas-particulares.html` ("El Problema").
* **Texto Original (ES):**
  > *"Adquirir o custodiar arte sin un dictamen pericial independiente expone al propietario a la falsificación, la sobrevaloración especulativa y la indefensión jurídica en transacciones comerciales o sucesorias."*
* **Instrucción del Padre:** **QUITAR** (Elimina el tono punitivo/policial).
* **Propuesta Técnica para Evitar Vacíos:**
  Para no dejar la sección visualmente hueca ni descompensar el diseño de la plantilla, se sustituye por una formulación positiva de **certidumbre y seguridad técnica de activos**:
* **Texto Propuesto (ES):**
  > `El coleccionismo y la custodia de obras de arte demandan certeza documental y rigor metodológico. Un dictamen técnico de expertizaje y tasación proporciona el respaldo objetivo indispensable para transacciones comerciales, aseguramiento patrimonial y preservación del valor histórico del bien.`
* **Texto Propuesto (EN):**
  > `Fine art collecting and custodianship demand documentary certainty and methodological rigor. A technical expertise and appraisal report provides the objective backing essential for commercial transactions, insurance coverage, and the long-term preservation of historical value.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Clave `"n1.problem.text"` (ES y EN).
  * `web/plantillas/coleccionistas-particulares.template.html` -> Bloque `#problema`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md` -> Nicho 1: El Problema.
  * `src/context/blocks.js` -> Nicho 1: Problema / Justificación.

---

#### 📌 Punto 3 (Pág. 1 del PDF) — Propuesta de Valor (Nicho 1)
* **Contexto / Ubicación:** Sección 3 de `coleccionistas-particulares.html` ("Propuesta de Valor").
* **Texto Original (ES):**
  > *"Luis Manuel Almeida Luis ejerce el peritaje bajo un principio de cero conflicto de interés: no compra ni vende obras de arte, ni cobra honorarios en función de un porcentaje sobre el valor tasado. Cada dictamen es un juicio técnico independiente, resultado de más de 40 años de trayectoria en el registro, catalogación y tasación del patrimonio cultural cubano e iberoamericano, con más de 20.000 obras y bienes patrimoniales inventariados a lo largo de su carrera."*
* **Instrucción del Padre:** *"Quitar lo amarillo"* (Mantener la sobriedad fáctica sin adjetivos redundantes).
* **Texto Depurado (ES):**
  > `Luis Manuel Almeida Luis ejerce el peritaje bajo un estricto principio de independencia: no compra ni vende obras de arte, ni percibe honorarios en función del valor tasado. Cada dictamen es un juicio técnico fundamentado en más de 40 años de trayectoria en el registro, catalogación y tasación del patrimonio cultural cubano e iberoamericano, con más de 20.000 obras inventariadas.`
* **Texto Propuesto (EN):**
  > `Luis Manuel Almeida Luis conducts fine art appraisal under a strict principle of independence: he neither buys nor sells works of art, nor accepts contingency fees based on appraised value. Each report represents an objective technical judgment backed by over 40 years documenting, cataloguing, and appraising Cuban and Ibero-American cultural heritage, with more than 20,000 works inventoried.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Clave `"n1.value.text"` (ES y EN).
  * `web/plantillas/coleccionistas-particulares.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

#### 📌 Punto 4 (Pág. 1 del PDF) — Servicio 2 (Nicho 1)
* **Contexto / Ubicación:** Sección de Servicios Periciales en Nicho 1.
* **Texto Original (ES):**
  > *"Ficha técnica catalográfica."*
* **Instrucción del Padre:** Sustituir por: *"Ficha técnica de catalogación"* (y en descripción asegurar *"Informe pericial de tasación / valoración económica"*).
* **Texto Corregido (ES):**
  * Título Servicio: `Ficha técnica de catalogación.`
  * Descripción: `Descripción razonada del bien siguiendo directivas y normas internacionales de inventario patrimonial.`
* **Texto Propuesto (EN):**
  * Title: `Technical Cataloguing Record.`
  * Description: `Reasoned description of the asset in accordance with international heritage and inventory documentation standards.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Clave `"n1.service.2"` (ES y EN).
  * `web/plantillas/coleccionistas-particulares.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

#### 📌 Punto 5 (Pág. 2 del PDF) — Servicio 3 (Metodología de Tasación Nicho 1)
* **Contexto / Ubicación:** Servicio 3 en Nicho 1 (`n1.service.3.desc`).
* **Texto Original (ES):**
  > *"Tasación objetiva basada en la cotización real de mercado y subastas internacionales contrastadas."*
* **Instrucción del Padre:** Poner: *"LA TASACIÓN ESTÁ BASADA EN EL MÉTODO DE COMPARACIÓN DE DATOS DE MERCADO TENIENDO EN CUENTA EL PRECIO MÁXIMO PAGADO POR UNA OBRA DE ARTE EN UN MERCADO ABIERTO Y LEGAL."*
* **Texto Corregido (ES):**
  * Título: `Informe pericial de tasación y valoración económica.`
  * Descripción: `Tasación fundamentada en el método de comparación de datos de mercado, considerando el precio máximo pagado por una obra de arte en un mercado abierto y legal.`
* **Texto Propuesto (EN):**
  * Title: `Appraisal and Economic Valuation Report.`
  * Description: `Valuation grounded in the market data comparison method, taking into account the highest price paid for a work of art in an open and lawful market.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Claves `"n1.service.3"` y `"n1.service.3.desc"` (ES y EN).
  * `web/plantillas/coleccionistas-particulares.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.
  * `src/context/blocks.js`.

---

#### 📌 Punto 6 (Pág. 2 del PDF) — Paso 2 del Proceso ("Evaluación Técnica")
* **Contexto / Ubicación:** Componente común de proceso de trabajo (Paso 2).
* **Texto Original (ES):**
  > *"Revisión preliminar de la documentación o fotografías para determinar el alcance pericial."*
* **Instrucción del Padre:** Poner: *"REVISIÓN PRELIMINAR DE LA DOCUMENTACIÓN QUE INCLUYA PROCEDENCIA Y FOTOGRAFÍA DEL BIEN."*
* **Texto Corregido (ES):**
  > `Revisión preliminar de la documentación, incluyendo procedencia y fotografías de la pieza, para determinar el alcance pericial.`
* **Texto Propuesto (EN):**
  > `Preliminary examination of documentation, including provenance and high-resolution photographs of the asset, to establish the appraisal scope.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Clave `"process.step2.desc"` (ES y EN).
  * Plantillas de los 6 nichos (`coleccionistas-particulares.template.html`, etc.).
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

#### 📌 Punto 7 (Pág. 2 del PDF) — Casos Documentados (Nicho 1)
* **Contexto / Ubicación:** Sección Casos Documentados en Nicho 1.
* **Instrucción del Padre:** *Añadir inventario realizado al pintor cubano Servando Cabrera Moreno y Amelia Peláez del Casal.*
* **Texto Corregido (ES):**
  > `Inventario, expertizaje y catalogación de obras y fondos patrimoniales de Servando Cabrera Moreno y Amelia Peláez del Casal.`
* **Texto Propuesto (EN):**
  > `Inventory, technical expertise, and cataloguing of estate collections and artworks by Servando Cabrera Moreno and Amelia Peláez del Casal.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Clave nueva `"n1.case.5"` o actualizar `"n1.case.1"` / `"n1.case.2"`.
  * `web/plantillas/coleccionistas-particulares.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.
  * `docs/data/01-estructurado/experiencia.md`.

---

#### 📌 Punto 8 (Pág. 2 del PDF) — Eliminación de "Autenticidad" como reclamo publicitario
* **Contexto / Ubicación:** Títulos y descripciones de servicios en Coleccionistas Privados.
* **Texto Original (ES):**
  > *"Dictámenes técnicos independientes de autenticidad, catalogación y valoración económica..."*
* **Instrucción del Padre:** **QUITAR AUTENTICIDAD**.
* **Acción Técnica:** Sustituir *"autenticidad / autenticación"* por **«expertizaje»** o **«dictamen de autoría y catalogación»**.
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n1.service.1"`, `"n1.service.1.desc"`.
  * `web/plantillas/coleccionistas-particulares.template.html`.

---

#### 📌 Punto 9 (Pág. 3 del PDF) — Axioma de la Carga de la Prueba de Procedencia
* **Contexto / Ubicación:** Inclusión transversal en Nicho 1 (Coleccionistas), Nicho 4 (Abogados) y FAQs.
* **Instrucción del Padre:** *Necesito poner en alguna bola que “la procedencia o provenance es una carga que recae sobre el propietario, poseedor o tenedor del bien.”*
* **Texto Canónico (ES):**
  > `«La procedencia (provenance) es una carga técnica y documental que recae jurídicamente sobre el propietario, poseedor o tenedor del bien.»`
* **Texto Propuesto (EN):**
  > `“Establishing provenance is a technical and documentary responsibility that rests upon the owner, possessor, or holder of the asset.”`
* **Ubicación Estratégica:**
  1. `web/assets/i18n-data.js` -> Clave `"n1.faq.a3"` y `"n4.problem.text"`.
  2. `docs/data/01-estructurado/copy-editorial-nichos.md` (Nicho 1 y Nicho 4).
  3. `src/context/blocks.js` (Regla pericial para el chatbot IA).

---

### 🎓 SECCIÓN II: BOLA 2 / NICHO 2 — Docencia y Conferencias (`docencia-conferencias.html`)

#### 📌 Punto 10 (Pág. 3 del PDF) — Errata en Subtítulo Hero Nicho 2
* **Contexto / Ubicación:** Nicho 2 Hero Subtitle (`n2.hero.subtitle`).
* **Texto Original (ES):**
  > *"...universidades, museos, aducas, cuerpos policiales..."*
* **Instrucción del Padre:** Debe decir **ADUANA / ADUANAS**.
* **Texto Corregido (ES):**
  > `Módulos académicos, conferencias magistrales y capacitación técnica para universidades, museos, aduanas, cuerpos policiales e instituciones del patrimonio cultural.`
* **Texto Propuesto (EN):**
  > `Academic modules, keynote lectures, and specialized training for universities, museums, customs services, law enforcement, and cultural heritage institutions.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n2.hero.subtitle"` (ES y EN).
  * `web/plantillas/docencia-conferencias.template.html`.

---

#### 📌 Punto 11 (Pág. 3 del PDF) — Categoría Docente y Organismos Internacionales
* **Contexto / Ubicación:** Nicho 2 Propuesta de Valor (`n2.value.text`).
* **Texto Original (ES):**
  > *"Con más de 25 años de docencia universitaria activa, Luis Manuel Almeida Luis es Profesor Auxiliar en la Universidad de las Artes... y colaboración directa con organismos internacionales del patrimonio."*
* **Instrucción del Padre:** Agregar **ADJUNTO** y **COMO LA UNESCO E IBERMUSEOS**.
* **Texto Corregido (ES):**
  > `Con más de 25 años de docencia universitaria ininterrumpida, Luis Manuel Almeida Luis es Profesor Auxiliar Adjunto en la Universidad de las Artes (ISA, 2001–actualidad), la Universidad de La Habana (2001–actualidad) y el Colegio Universitario San Gerónimo de La Habana (2012–actualidad). Su trayectoria académica se articula con publicaciones especializadas y colaboración directa con organismos internacionales del patrimonio como la UNESCO e IBERMUSEOS.`
* **Texto Propuesto (EN):**
  > `With over 25 years of uninterrupted university teaching, Luis Manuel Almeida Luis serves as an Adjunct Associate Professor at the University of the Arts (ISA, 2001–present), the University of Havana (2001–present), and San Gerónimo University College of Havana (2012–present). His academic standing is supported by peer-reviewed publications and direct collaboration with international heritage bodies such as UNESCO and IBERMUSEOS.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n2.value.text"` (ES y EN), `"perfil.area.4.desc"`.
  * `web/plantillas/docencia-conferencias.template.html`.
  * `docs/data/01-estructurado/experiencia.md`, `perfil.md`.
  * `src/context/blocks.js`.

---

#### 📌 Punto 12 (Pág. 4 del PDF) — Asignaturas de Pregrado y Coleccionismo (Nicho 2)
* **Contexto / Ubicación:** Nicho 2 Servicio 1 (`n2.service.1.desc`).
* **Texto Original (ES):**
  > *"Diseño e impartición de asignaturas y posgrados sobre tasación, expertisaje y mercado internacional del arte."*
* **Instrucción del Padre:** Debe decir: *"Diseño e impartición de asignaturas EN PRE GRADO y posgrados sobre tasación, expertisaje y mercado internacional del arte Y COLECCIONISMO."*
* **Texto Corregido (ES):**
  > `Diseño e impartición de asignaturas en pregrado y posgrados sobre tasación, expertizaje, coleccionismo y mercado internacional del arte.`
* **Texto Propuesto (EN):**
  > `Curriculum design and delivery of undergraduate and postgraduate courses on fine art appraisal, technical expertise, art collecting, and the international art market.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n2.service.1.desc"` (ES y EN).
  * `web/plantillas/docencia-conferencias.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

#### 📌 Punto 13 (Pág. 4 del PDF) — Destinatarios Judiciales en Talleres y Conferencias
* **Contexto / Ubicación:** Nicho 2 Servicio 3 (`n2.service.3.desc`).
* **Texto Original (ES):**
  > *"Disertaciones de alta especialización técnica para museos, asociaciones periciales, bienales y comités institucionales."*
* **Instrucción del Padre:** Poner: *"TAMBIÉN A ABOGADOS, JUECES Y FISCALES."*
* **Texto Corregido (ES):**
  > `Disertaciones y seminarios de alta especialización técnica para museos, asociaciones periciales, bienales, comités institucionales, así como para abogados, jueces y fiscales.`
* **Texto Propuesto (EN):**
  > `Specialized technical seminars and keynote lectures for museums, appraisal associations, art biennials, and institutional committees, as well as for lawyers, judges, and public prosecutors.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n2.service.3.desc"` (ES y EN).
  * `web/plantillas/docencia-conferencias.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

#### 📌 Punto 14 (Pág. 4 del PDF) — Puntuación en Cita Docente
* **Contexto / Ubicación:** Nicho 2 Cita de cierre (`n2.phrase.1`).
* **Texto Original (ES):**
  > *"«El conocimiento pericial solo adquiere su verdadero sentido cuando se transmite; enseñar a mirar una obra es la primera trinchera contra la pérdida del patrimonio.»"*
* **Instrucción del Padre:** *Solo poner la coma después de obra…*
* **Texto Corregido (ES):**
  > `«El conocimiento pericial solo adquiere su verdadero sentido cuando se transmite; enseñar a mirar una obra, es la primera trinchera contra la pérdida del patrimonio.»`
* **Texto Propuesto (EN):**
  > `“Appraisal knowledge only achieves its true purpose when shared; teaching how to look at a work of art, is the front line in defending cultural heritage.”`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n2.phrase.1"` (ES y EN).
  * `docs/data/01-estructurado/frases-luis.md`.

---

### ⚖️ SECCIÓN III: BOLA 3 / NICHO 3 — Herencias y Sucesiones (`herencias-sucesiones.html`)

#### 📌 Punto 15 (Pág. 4–5 del PDF) — Reformulación de "El Problema" en Sucesiones
* **Contexto / Ubicación:** Nicho 3 Bloque El Problema (`n3.problem.text`).
* **Texto Original (ES):**
  > *"La partición hereditaria de bienes artísticos genera disputas familiares severas y desajustes fiscales ante Notaría o Hacienda si no media una valoración técnica ecuánime y matemáticamente inatacable..."*
* **Instrucción del Padre:** Modificar por redacción completa sobre procesos judiciales, disimilitud de bienes y metodología objetiva sin acomodo de intereses.
* **Texto Corregido (ES):**
  > `La partición hereditaria de bienes artísticos genera disputas familiares severas y desajustes fiscales en los procesos judiciales ante la disimilitud de los bienes que se pretenden repartir entre los futuros herederos, si no media una valoración técnica con la aplicación de una metodología objetiva, racional y de sentido común, sin acomodo de intereses hacia las partes, matemáticamente intachable e inatacable. Cuando cada heredero desconfía del criterio de valor del otro, el desacuerdo sobre una pintura o una colección puede convertirse en el obstáculo que fractura una familia.`
* **Texto Propuesto (EN):**
  > `The estate division of art assets generates severe family disputes and fiscal discrepancies in judicial proceedings due to the dissimilarity of assets intended for distribution among prospective heirs, unless guided by a technical appraisal grounded in objective methodology, rationality, and common sense, entirely free from bias toward any party, mathematically sound, and unassailable. When heirs question the valuation criteria, disagreement over an artwork or collection can become the insurmountable obstacle that fractures a family.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n3.problem.text"` (ES y EN).
  * `web/plantillas/herencias-sucesiones.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.
  * `src/context/blocks.js`.

---

#### 📌 Punto 18 (Pág. 6 del PDF) — Servicio 1 (Nicho 3 - Caudal Relicto)
* **Contexto / Ubicación:** Nicho 3 Servicio 1 (`n3.service.1.desc`).
* **Texto Original (ES):**
  > *"Catalogación exhaustiva y fotográfica de la masa de bienes artísticos que componen el caudal relicto."*
* **Instrucción del Padre:** Modificar por: *"Catalogación exhaustiva y fotográfica DEL TOTAL de bienes artísticos que componen el caudal relicto."*
* **Texto Corregido (ES):**
  > `Catalogación exhaustiva y registro fotográfico del total de bienes artísticos y patrimoniales que integran el caudal relicto.`
* **Texto Propuesto (EN):**
  > `Comprehensive cataloguing and photographic documentation of all artistic and heritage assets comprising the decedent's estate.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n3.service.1.desc"` (ES y EN).
  * `web/plantillas/herencias-sucesiones.template.html`.

---

#### 📌 Punto 19a (Pág. 6 del PDF) — Depuración de Caudales Hereditarios Históricos
* **Contexto / Ubicación:** Casos Documentados en Nicho 3 y Perfil.
* **Texto Original (ES):**
  > *01 — Servando Cabrera Moreno (1992); 02 — Amelia Peláez del Casal (2003); 03 — Dulce María Loynaz (1997/2006); 04 — Alejo Carpentier (2006); 05 — Alfredo Luis Guevara Valdés (2014); 06 — Aldo Martínez Malo.*
* **Instrucción del Padre:** **QUITAR ALDO MARTÍNEZ MALO EL 06**.
* **Lista Oficial Depurada (5 casos de máxima autoridad):**
  1. `01 — Servando Cabrera Moreno (1992).`
  2. `02 — Amelia Peláez del Casal (2003).`
  3. `03 — Dulce María Loynaz, Premio Cervantes (1997 y manuscritos en 2006).`
  4. `04 — Alejo Carpentier, Premio Cervantes, y Lilia Esteban (2006).`
  5. `05 — Alfredo Luis Guevara Valdés, fundador del ICAIC (2014).`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Eliminar clave `"n3.case.6"`, actualizar `"perfil.evidence.3"`.
  * `web/plantillas/herencias-sucesiones.template.html`, `perfil.template.html`.
  * `docs/data/01-estructurado/experiencia.md`, `copy-editorial-nichos.md`.
  * `src/context/blocks.js`.

---

### 🏛️ SECCIÓN IV: BOLA 4 / NICHO 4 — Abogados y Notarios (`abogados-notarios.html`)

#### 📌 Punto 17 (Pág. 5 del PDF) & Punto 25/30 — Caso Diego Velázquez
* **Contexto / Ubicación:** Casos Documentados Nicho 4 y Perfil.
* **Texto Original (ES):**
  > *"Caso Diego Velázquez (1984): detección en frontera aeroportuaria de una obra atribuida al maestro, restituida al Museo Nacional de Bellas Artes tras dictamen pericial conjunto con la Dra. Marta Arjona, Presidenta del Consejo Nacional de Patrimonio Cultural."*
* **Aclaración Documental de Fechas:** En los puntos 25 y 30 figura 1994, mientras que en `experiencia.md` y Respuestas fidedignas consta **1984** (año en que el perito tenía 9 años de servicio). Mantener la fecha canónica documental **1984**.
* **Texto Corregido (ES):**
  > `Caso Diego Velázquez (1984): detección en frontera aeroportuaria de una obra atribuida al maestro, restituida al Museo Nacional de Bellas Artes tras dictamen pericial conjunto con la Dra. Marta Arjona Pérez, Presidenta del Consejo Nacional de Patrimonio Cultural.`
* **Texto Propuesto (EN):**
  > `Diego Velázquez Case (1984): airport customs detection of an artwork attributed to the master, successfully restituted to the National Museum of Fine Arts following a joint expert report with Dr. Marta Arjona Pérez, President of the National Council of Cultural Heritage.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n4.case.1"`, `"perfil.evidence.1"`.
  * `web/plantillas/abogados-notarios.template.html`.

---

### 🏢 SECCIÓN V: BOLA 5 / NICHO 5 — Aseguradoras y Family Offices (`aseguradoras-family-offices.html`)

#### 📌 Puntos 15b, 19b, 27 (Pág. 5, 6, 8 del PDF) — Misiones Diplomáticas e Inventarios Internacionales
* **Contexto / Ubicación:** Nicho 5 Casos Documentados y Perfil Profesional.
* **Texto Original (ES):**
  > *"1999 y 2018 — Campañas de inventario diplomático en embajadas de más de 15 países..."*
* **Instrucción del Padre:** Precisar años **(1999 y 2018 al 2020)** y redacción institucional completa.
* **Texto Corregido (ES):**
  > `1999 y 2018–2020 — Ejecución de inventarios de los bienes que forman parte del patrimonio cultural de la nación cubana que se encuentran permanentemente en el exterior en sedes diplomáticas y consulares en 15+ países (España, Italia, Santa Sede, Francia, UNESCO-París, Portugal, Austria, Eslovaquia, Rumania, Serbia, Argelia, Egipto, Líbano, Qatar, Kuwait, Irán y Bolivia).`
* **Texto Propuesto (EN):**
  > `1999 and 2018–2020 — Execution of official inventories of Cuban national cultural heritage assets permanently located abroad across diplomatic and consular missions in 15+ countries (Spain, Italy, Holy See, France, UNESCO-Paris, Portugal, Austria, Slovakia, Romania, Serbia, Algeria, Egypt, Lebanon, Qatar, Kuwait, Iran, and Bolivia).`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n5.case.1"`, `"perfil.evidence.4"`.
  * `web/plantillas/aseguradoras-family-offices.template.html`, `perfil.template.html`.
  * `docs/data/01-estructurado/experiencia.md`, `copy-editorial-nichos.md`.
  * `src/context/blocks.js`.

---

#### 📌 Punto 20 (Pág. 6 del PDF) — Servicio 3 (Peritaje y Calificación de Siniestros)
* **Contexto / Ubicación:** Nicho 5 Servicio 3 (`n5.service.3` y `n5.service.3.desc`).
* **Texto Original (ES):**
  > *"Peritaje de daños en siniestros. Dictamen pericial sobre depreciación material, costes técnicos de restauración y pérdida de valor comercial post-daño."*
* **Instrucción del Padre:** Ampliar con: *"Y CALIFICACIÓN DE DAÑOS ATENDIENDO AL PORCENTAJE DE DAÑOS EN LA OBRA DE ARTE YA SEA POR ACCIDENTE, INCENDIO, INUNDACIÓN, DAÑO INTENCIONAL U OTRO."*
* **Texto Corregido (ES):**
  * Título: `Peritaje y calificación de daños en siniestros.`
  * Descripción: `Calificación técnica y determinación del porcentaje de daño en obras de arte por accidente, incendio, inundación o daño intencional, evaluando depreciación material, costes de restauración y pérdida de valor comercial.`
* **Texto Propuesto (EN):**
  * Title: `Casualty Loss Appraisal & Damage Assessment.`
  * Description: `Technical assessment and damage percentage determination for artworks affected by accident, fire, flood, or intentional damage, evaluating physical depreciation, restoration costs, and post-damage loss of commercial value.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"n5.service.3"` y `"n5.service.3.desc"` (ES y EN).
  * `web/plantillas/aseguradoras-family-offices.template.html`.
  * `docs/data/01-estructurado/copy-editorial-nichos.md`.

---

### 👤 SECCIÓN VI: PERFIL PROFESIONAL, CITAS Y HOME (`perfil.html`, `index.html`)

#### 📌 Puntos 16, 28, 31 (Pág. 5, 8, 9 del PDF) — Autoría de la Cita de la Dra. Marta Arjona Pérez
* **Contexto / Ubicación:** Cintillo rotativo en Home, cita de autoridad en `perfil.html`, y archivo `frases-luis.md`.
* **Texto de la Cita:**
  > *«En el trabajo de tasación hay que tener tres cosas: ojo y sensibilidad en la apreciación; hay que ver muchas piezas, y saber del mercado del arte.»*
* **Instrucción del Padre:** **ESTA FRASE ES DE LA DRA. MARTA ARJONA PÉREZ. QUITAR LUIS MANUEL ALMEIDA LUIS · PERITO TASADOR.**
* **Texto Corregido y Atribución (ES):**
  * Cita: `«En el trabajo de tasación hay que tener tres cosas: ojo y sensibilidad en la apreciación; hay que ver muchas piezas, y saber del mercado del arte.»`
  * Autor: `Dra. Marta Arjona Pérez · Fundadora del Consejo Nacional de Patrimonio Cultural`
* **Texto Propuesto (EN):**
  * Quote: `“In appraisal work, three things are essential: a trained eye and sensitivity in appreciation, examining numerous pieces, and understanding the art market.”`
  * Author: `Dr. Marta Arjona Pérez · Founder of the National Council of Cultural Heritage`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> Claves `"perfil.quote.author"` y `"home.phrase.4"`.
  * `web/plantillas/perfil.template.html` (revisar que el bloque `perfil.quote` no tenga el nombre de Luis como autor).
  * `docs/data/01-estructurado/frases-luis.md`, `copy-home.md`.

---

#### 📌 Punto 21 (Pág. 7 del PDF) — Subtítulo Hero en Perfil Profesional
* **Contexto / Ubicación:** `perfil.html` Hero Subtitle (`perfil.hero.subtitle`).
* **Texto Original (ES):**
  > *"40+ años de trayectoria institucional. 20.000+ obras inventariadas y tasadas. Especialista en autenticación, particiones hereditarias, peritaje judicial y protección del patrimonio cultural."*
* **Instrucción del Padre:** Sustituir "autenticación" por **EXPERTIZAJE, CATALOGACIÓN**.
* **Texto Corregido (ES):**
  > `40+ años de trayectoria institucional. Más de 20.000 obras inventariadas y tasadas. Especialista en expertizaje, catalogación, particiones hereditarias, peritaje judicial y protección del patrimonio cultural.`
* **Texto Propuesto (EN):**
  > `40+ years of institutional career. Over 20,000 artworks and heritage assets inventoried and appraised. Specialist in technical expertise, cataloguing, estate partition, judicial appraisal, and cultural heritage protection.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"perfil.hero.subtitle"` (ES y EN), `"seo.perfil.desc"`.
  * `web/plantillas/perfil.template.html`.
  * `docs/data/01-estructurado/perfil.md`.

---

#### 📌 Puntos 22 & 29 (Pág. 7 y 9 del PDF) — Cargo Institucional Exacto en RNBC
* **Contexto / Ubicación:** Propuesta de valor en `perfil.html` (`perfil.value.text`).
* **Texto Original (ES):**
  > *"...respaldado por 41 años como responsable de aduanas y decomisos aeroportuarios (1988–2024) y 19 años al frente del Registro Nacional de Bienes Culturales de Cuba."*
* **Instrucción del Padre:** Modificar por: *"19 años al frente del DEPARTAMENTO DE REGISTRO E INVENTARIO DEL Registro Nacional de Bienes Culturales DE LA REPÚBLICA DE CUBA."*
* **Texto Corregido (ES):**
  > `Luis Manuel Almeida Luis ejerce el peritaje bajo un principio de cero conflicto de interés: no compra, no vende, ni cobra honorarios porcentuales sobre el valor tasado. Cada dictamen es un juicio técnico autónomo y metodológicamente contrastado, respaldado por 41 años como especialista de aduanas y decomisos aeroportuarios (1988–2024) y 19 años al frente del Departamento de Registro e Inventario del Registro Nacional de Bienes Culturales de la República de Cuba.`
* **Texto Propuesto (EN):**
  > `Luis Manuel Almeida Luis conducts appraisal under strict zero-conflict-of-interest standards: he neither buys, sells, nor charges percentage-based fees on appraised value. Each report is an autonomous and methodologically robust technical opinion, backed by 41 years as an airport customs and border protection specialist (1988–2024) and 19 years heading the Department of Registry and Inventory at the National Registry of Cultural Property of the Republic of Cuba.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"perfil.value.text"` (ES y EN).
  * `web/plantillas/perfil.template.html`.
  * `docs/data/01-estructurado/perfil.md`, `experiencia.md`.
  * `src/context/blocks.js`.

---

#### 📌 Punto 23 (Pág. 7 del PDF) — Área 1 de Especialización en Perfil
* **Contexto / Ubicación:** `perfil.html` Área 1 (`perfil.area.1.title` y `perfil.area.1.desc`).
* **Texto Original (ES):**
  > *"Tasación y Autenticación de Obras de Arte. Análisis estilístico, material, bibliográfico y de procedencia. Dictámenes de autenticidad, fichas catalográficas, valoración económica objetiva y estados de conservación."*
* **Instrucción del Padre:** Cambiar a: *"Tasación y Expertizaje de Obras de Arte"* y *"Dictámenes de TASACIÓN, fichas DE CATALOGACIÓN..."*
* **Texto Corregido (ES):**
  * Título: `Tasación y Expertizaje de Obras de Arte`
  * Descripción: `Análisis estilístico, material, bibliográfico y de procedencia. Dictámenes de tasación, fichas de catalogación, valoración económica objetiva y diagnóstico del estado de conservación.`
* **Texto Propuesto (EN):**
  * Title: `Fine Art Appraisal & Technical Expertise`
  * Description: `Stylistic, material, bibliographic, and provenance analysis. Appraisal reports, technical cataloguing records, objective economic valuations, and condition diagnostics.`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"perfil.area.1.title"` y `"perfil.area.1.desc"` (ES y EN).
  * `web/plantillas/perfil.template.html`.
  * `docs/data/01-estructurado/perfil.md`.

---

#### 📌 Punto 24 (Pág. 7 del PDF) — Área 2 de Especialización en Perfil
* **Contexto / Ubicación:** `perfil.html` Área 2 (`perfil.area.2.desc`).
* **Texto Corregido (ES):**
  > `Perito tasador-partidor en más de 15 liquidaciones hereditarias. Dictámenes con fuerza procesal y auxilio judicial. 41 años en control de frontera y aduanas aeroportuarias (casos emblemáticos: Diego Velázquez, Demétre Chiparus).`
* **Texto Propuesto (EN):**
  > `Partition Appraiser in 15+ estate liquidations. Technical reports with procedural validity and judicial assistance. 41 years in airport customs and border protection (landmark cases: Diego Velázquez, Demétre Chiparus).`
* **Archivos y Claves a Modificar:**
  * `web/assets/i18n-data.js` -> `"perfil.area.2.desc"` (ES y EN).
  * `web/plantillas/perfil.template.html`.

---

#### 📌 Puntos 26 & 27 (Pág. 8 del PDF) — Hitos de Carrera en Perfil Profesional
* **Contexto / Ubicación:** `perfil.html` Evidencias e Hitos (`perfil.evidence.2`, `perfil.evidence.4`, `perfil.evidence.10`).
* **Textos Corregidos (ES):**
  * `perfil.evidence.2`: `1988–2024 — 41 años como Especialista de Aduanas y Decomisos Aeroportuarios; interceptación y expertizaje pericial de la escultura Art Déco de Demétre Chiparus ("La gallinita ciega").`
  * `perfil.evidence.4`: `1999 y 2018–2020 — Campañas de inventario de bienes del patrimonio cultural cubano en embajadas y consulados de 15+ países (España, Italia, Santa Sede, Francia, UNESCO-París, Portugal, Austria, Eslovaquia, Rumania, Serbia, Argelia, Egipto, Líbano, Qatar, Kuwait, Irán y Bolivia).`
  * `perfil.evidence.10`: `2018–2020 — Colaboración técnica con Carabinieri TPC (Italia), IBERMUSEOS, y representación oficial de Cuba en el Foro Cusco (UNESCO / OEI).`
* **Textos Propuestos (EN):**
  * `perfil.evidence.2`: `1988–2024 — 41 years as an Airport Customs and Border Protection Specialist; interception and technical expertise of Demétre Chiparus' Art Déco sculpture ("La gallinita ciega").`
  * `perfil.evidence.4`: `1999 and 2018–2020 — Official inventory campaigns of Cuban cultural heritage assets across embassies and consulates in 15+ countries (Spain, Italy, Holy See, France, UNESCO-Paris, Portugal, Austria, Slovakia, Romania, Serbia, Algeria, Egypt, Lebanon, Qatar, Kuwait, Iran, and Bolivia).`
  * `perfil.evidence.10`: `2018–2020 — Technical collaboration with Italy's Carabinieri TPC, IBERMUSEOS, and official representation of Cuba at the Cusco Forum (UNESCO / OEI).`

---

## ⚙️ 4. GUÍA DE COMPILACIÓN Y VERIFICACIÓN PARA LA FASE DE EJECUCIÓN

Cuando se inicie la sesión de trabajo para aplicar estos cambios en el código y datos, se deberá seguir este orden secuencial estricto:

1. **Paso 1: Edición de Datos Estructurados**
   * Modificar los 9 archivos en `docs/data/01-estructurado/`.
2. **Paso 2: Edición del Diccionario Bilingüe**
   * Modificar `web/assets/i18n-data.js` actualizando las claves en las ramas `es` y `en`.
3. **Paso 3: Edición de Plantillas y Componentes HTML**
   * Actualizar el texto por defecto en español dentro de las etiquetas `<p>`, `<h3>`, `<h4>` en `web/plantillas/*.template.html` y `web/componentes/*.html` asegurando que coincidan con `data-i18n`.
4. **Paso 4: Actualización del Contexto del Asistente IA**
   * Modificar `src/context/blocks.js` y `src/context/keywords.js` para mantener la coherencia doctrinal en las respuestas de Groq.
5. **Paso 5: Compilación Técnica**
   * En terminal:
     ```powershell
     cd web
     node compilar.js
     npx tailwindcss -i ./assets/css/input.css -o ./output.css --minify
     node validar-html.js
     ```
6. **Paso 6: Validación de Integridad**
   * Comprobar que en ninguna página HTML compilada quede la referencia a *Aldo Martínez Malo*, ni la errata *aducas*, ni la frase de Marta Arjona atribuida a Luis, y que el término *expertizaje* y la definición de Rosenberg figuren con absoluta consistencia.

---
*Fin del documento de especificación técnica y optimización de contenido.*
