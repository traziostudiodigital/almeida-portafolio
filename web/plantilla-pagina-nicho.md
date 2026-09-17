# 📐 PLANTILLA MAESTRA DE PÁGINAS DE NICHO — LUIS MANUEL ALMEIDA LUIS
> **Documento:** Especificación Arquitectónica y Dirección de Arte B2B para Páginas de Especialización.
> **Destino:** Ecosistema Web Estático (`/web/`).
> **Rol:** CTO & Director de Arte B2B (Autoridad Editorial, Máximo Rendimiento, Cero Invención).

---

## 🏛️ 1. Principios de Dirección de Arte y Reglas Arquitectónicas

1. **Techo Estricto de 6 Bloques:**
   - Ninguna página de nicho superará jamás los 6 bloques especificados. La densidad informativa debe resolverse mediante síntesis clínica y concisión técnica, nunca añadiendo secciones decorativas superfluas.
2. **Alternancia Rítmica de Animación (Scroll-Reveal L/R):**
   - Para generar un dinamismo editorial de lectura pausada sin saturar al usuario, los bloques alternan la dirección de entrada del texto vía `IntersectionObserver`:
     - **Bloque 1 (Hero):** Reveal Left / Fade sutil.
     - **Bloque 2 (El Problema):** Reveal Right.
     - **Bloque 3 (Alcance del Servicio):** Reveal Left.
     - **Bloque 4 (Evidencia / Credibilidad):** Reveal Right.
     - **Bloque 5 (Pull-Quote):** Reveal Left (o foco central con líneas progresivas superior/inferior).
     - **Bloque 6 (CTA + Interlinking):** Reveal Right.
3. **Condicionalidad Estricta del Bloque 4 (Evidencia):**
   - Este bloque es el **único opcional** de la arquitectura. Se activa **únicamente** si existen hechos, cifras, nombres propios o expedientes documentados formalmente en `/docs/data/01-estructurado/`. Si en algún momento una especialidad carece de trazabilidad documental, el bloque se elimina por completo; queda terminantemente prohibido rellenar con adjetivos o generalidades de marketing.
4. **Correspondencia Tipográfica y Paleta Inmutable:**
   - **Fondo:** `#EAE7E2` (`bg-[#EAE7E2]` / `bg-fondo`).
   - **Texto Principal:** `#2E3238` (`text-[#2E3238]` / `text-base`).
   - **Acento Metálico:** `#B08D57` (`text-[#B08D57]`, `border-[#B08D57]`, `bg-[#B08D57]` / `color-acento`).
    - **Tipografía Base:** *Source Serif 4* (`font-base`) en pesos 300 (light/labels), 400 (cuerpo) y 600 (titulares).
   - **Tipografía de Marca:** *Alex Brush* (`font-marca`) restringida estrictamente al wordmark *"Almeida"* en el header de navegación y pie legal.
   - **Geometría:** Radios rectilíneos rigurosos (`rounded-none` o `rounded-sm` de máximo 2px). Cero bordes redondeados tipo botón moderno.

---

## 🧱 2. Anatomía de los 6 Bloques Homologados

```
┌────────────────────────────────────────────────────────┐
│ 1. HERO DE NICHO (Breadcrumb + H1 + Subtítulo)         │ [Reveal Left]
├────────────────────────────────────────────────────────┤
│ 2. EL PROBLEMA (Etiqueta + Línea Fina + Texto Dolor)   │ [Reveal Right]
├────────────────────────────────────────────────────────┤
│ 3. ALCANCE DEL SERVICIO (Grid 3–5 tarjetas técnicas)   │ [Reveal Left]
│    ───────────────── [Línea Fina 1px #B08D57] ──────── │
├────────────────────────────────────────────────────────┤
│ 4. EVIDENCIA Y CREDIBILIDAD (Casos/hechos documentados)│ [Reveal Right]
├────────────────────────────────────────────────────────┤
│ 5. PULL-QUOTE (Cita textual Luis + Líneas B2B)         │ [Center / Reveal Left]
├────────────────────────────────────────────────────────┤
│ 6. CTA CONTEXTUAL + INTERLINKING (2 Nichos Hermanos)   │ [Reveal Right]
└────────────────────────────────────────────────────────┘
```

### Especificación Detallada por Bloque:

#### Bloque 1: HERO DE NICHO
- **Propósito:** Situar el contexto disciplinar de inmediato y proveer retorno fluido a la home.
- **Elementos UI:**
  - *Breadcrumb:* `Inicio / [Nombre del Nicho]` (tipografía en `text-xs uppercase tracking-widest text-[#2E3238]/60 font-light`).
   - *H1 Editorial:* Titular formal en `Source Serif 4` semibold (`text-3xl md:text-5xl text-[#2E3238] leading-tight font-base`).
   - *Subtítulo de Posicionamiento:* Frase concisa de autoridad en `Source Serif 4` regular (`text-lg md:text-xl text-[#2E3238]/85 mt-4 max-w-3xl leading-relaxed font-base`).
- **Clases Base:** `pt-28 pb-12 px-6 md:px-12 max-w-5xl mx-auto`.
- **Comportamiento:** `data-reveal="left"`.

#### Bloque 2: EL PROBLEMA (Encuadre del Dolor)
- **Propósito:** Conectar con la vulnerabilidad, incertidumbre o riesgo legal/económico del contratante.
- **Formato:** Bloque de texto sintético de 2 a 4 líneas de alta densidad reflexiva. Sin dramatismos comerciales; tono clínico, sereno y asertivo.
- **Elementos UI:**
  - *Etiqueta:* `EL PROBLEMA` o `EL DESAFÍO` (tipografía `text-xs uppercase tracking-widest text-[#B08D57] font-light`).
  - *Línea Horizontal:* Divisor de 1px en color `#B08D57` al 35% de opacidad (`h-px w-16 bg-[#B08D57]/35`).
  - *Texto:* En itálica (`text-lg md:text-xl text-[#2E3238]/90 font-base leading-relaxed italic`).
- **Clases Base:** `py-10 px-6 md:px-12 max-w-4xl mx-auto`.
- **Comportamiento:** `data-reveal="right"`.

#### Bloque 3: ALCANCE DEL SERVICIO
- **Propósito:** Desglosar con rigor pericial qué incluye técnicamente la intervención (qué dictamen se emite, qué protocolo se sigue).
- **Formato:** Grid editorial de 3 a 5 tarjetas cortas (nunca párrafos largos indivisibles).
- **Clases Tarjeta:** `border border-[#2E3238]/15 bg-[#EAE7E2] p-6 md:p-8 backdrop-blur-[2px] transition-all duration-300 hover:border-[#B08D57] rounded-sm`.
- **Elemento Divisor de Cierre:** Línea progresiva animada SVG o `div` separador de 1px en color `#B08D57` al 35% de opacidad (`h-px w-full max-w-2xl mx-auto bg-[#B08D57]/35 my-16 line-draw`).
- **Comportamiento:** `data-reveal="left"`.

#### Bloque 4: EVIDENCIA / CREDIBILIDAD (Bloque Condicional)
- **Propósito:** Justificar la pericia mediante trazabilidad documental pura (cero afirmaciones vacías).
- **Formato:** Lista estructurada de hitos institucionales, fechas, autores evaluados o cifras históricas avaladas en `01-estructurado/`.
- **Clases Base:** `py-12 px-6 md:px-12 max-w-4xl mx-auto bg-[#2E3238]/[0.03] border border-[#2E3238]/10 p-8 rounded-sm`.
- **Formato:** Lista estructurada de hitos institucionales, fechas, autores evaluados o cifras históricas avaladas en `01-estructurado/`, presentada con numeración tipo 'exhibit' (`01 —`, `02 —`, etc.).
- **Comportamiento:** `data-reveal="right"`. *(Omitir por completo si el nicho carece de respaldo)*.

#### Bloque 5: PULL-QUOTE (Voz del Perito)
- **Propósito:** Anclar el principio ético de Luis Manuel Almeida con impacto visual de catálogo de arte.
- **Formato:** Cita textual corta enmarcada entre dos líneas finas paralelas de 1px en color oro envejecido (`#B08D57`). Tipografía destacada, cursiva editorial, centrada o con sangría deliberada.
- **Clases Base:** `py-12 my-12 px-6 max-w-3xl mx-auto text-center border-y border-[#B08D57]/40 text-xl md:text-2xl font-base italic text-[#2E3238] leading-relaxed`.
- **Fuente:** `/docs/data/01-estructurado/frases-luis.md`.
- **Comportamiento:** `data-reveal="left"`.

#### Bloque 6: CTA CONTEXTUAL + INTERLINKING
- **Propósito:** Canalizar la conversión formal y permitir la exploración cruzada entre nichos afines.
- **Elementos UI:**
  - *Acción Principal:* Botón hacia Consulta Confidencial (WhatsApp con mensaje pre-estructurado contextual al nicho + Formulario formal de Hoja de Encargo).
  - *Clases Botón:* `inline-block border border-[#2E3238] bg-[#2E3238] text-[#EAE7E2] px-8 py-3 text-sm uppercase tracking-wider font-light transition-colors duration-300 hover:bg-[#B08D57] hover:border-[#B08D57] rounded-sm`.
  - *Interlinking Cruzado:* Exactamente **2 enlaces a nichos relacionados**, presentados bajo un epígrafe sutil (*"Especialidades Relacionadas"*). Cada enlace incluirá una flecha vectorial fina en SVG inline (`<svg class="w-4 h-4 text-[#B08D57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg>`) en color acento.
  - *Clases Interlinking:* `flex flex-col sm:flex-row gap-6 justify-center mt-12 pt-8 border-t border-[#2E3238]/10 text-sm font-base`.
- **Comportamiento:** `data-reveal="right"`.

---

## 🗂️ 3. Aplicación de la Plantilla a los 6 Nichos Oficiales

Alineados estrictamente con la taxonomía maestra de `nichos-servicio.md` y `copy-editorial-nichos.md`:

---

### 🏛️ Nicho 1: Coleccionistas Privados y Particulares
- **Archivo URL:** `coleccionistas-particulares.html`
- **Prioridad:** 1 (Nicho Principal)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 1), `copy-editorial-nichos.md` (Sec. 1), `seo-keywords.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Coleccionistas Privados*<br>- **H1:** Peritaje y Tasación de Arte para Coleccionistas Privados<br>- **Subtítulo:** Dictámenes técnicos independientes de autenticidad, catalogación y valoración económica para propietarios, coleccionistas e inversionistas de obras de arte y bienes de alto valor. | `copy-editorial-nichos.md` |
| **2. El Problema** | Adquirir o custodiar arte sin un dictamen pericial independiente expone al propietario a la falsificación, la sobrevaloración especulativa y la indefensión jurídica en transacciones comerciales o sucesorias. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Dictamen Técnico de Autenticidad:* Análisis estilístico, material y de procedencia.<br>2. *Ficha Técnica Catalográfica:* Descripción razonada bajo estándares internacionales.<br>3. *Informe de Valoración Económica:* Estimación objetiva de mercado y cotización real.<br>4. *Informe de Estado de Conservación:* Diagnóstico de soporte, pigmentos y estabilidad. | `copy-editorial-nichos.md`, líneas 31-36 |
| **4. Evidencia** | - Más de **20.000 obras de arte y bienes patrimoniales** catalogados y tasados.<br>- Catalogación de colecciones de maestros: René Portocarrero (1988), Fayad Jamís (1988), Sandú Darié (1993), Luis Alberto Quintero (1999), Gilma Madera, Marta Jiménez y Armando Suárez del Villar.<br>- Tasación de bienes excepcionales del Patrimonio Cultural clasificados como Grado de Valor I (2005). | `nichos-servicio.md`, líneas 12-15 |
| **5. Pull-Quote** | *"En el peritaje de arte, la independencia no es una postura ética negociable; es la única garantía de que el dictamen no responda al interés de quien compra ni de quien vende."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, soy coleccionista/propietario de obras de arte y deseo solicitar una consulta confidencial sobre peritaje y tasación."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Herederos y Sucesiones Patrimoniales* (`herencias-sucesiones.html`)<br>  2. *Aseguradoras y Family Offices* (`aseguradoras-family-offices.html`) | `copy-editorial-nichos.md`, líneas 38-42 |

---

### 🎓 Nicho 2: Docencia Universitaria y Formación Especializada
- **Archivo URL:** `docencia-conferencias.html`
- **Prioridad:** 2 (Formación & Academia de Élite)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 2), `copy-editorial-nichos.md` (Sec. 3), `experiencia.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Docencia Universitaria y Formación*<br>- **H1:** Docencia Universitaria, Cursos y Conferencias Especializadas<br>- **Subtítulo:** Programas académicos de posgrado, conferencias magistrales y capacitación técnica para universidades, museos, aduanas e instituciones del patrimonio cultural. | `copy-editorial-nichos.md` |
| **2. El Problema** | La falta de formación técnica rigurosa en tasación y peritaje propicia errores críticos en la salvaguarda patrimonial, la detección de réplicas y el control aduanero frente al tráfico ilícito internacional. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Cátedras y Módulos Universitarios:* Formación de pregrado y posgrado en tasación y mercado del arte.<br>2. *Seminarios de Tráfico Ilícito:* Protocolos de control, autenticación y decomiso de bienes culturales.<br>3. *Conferencias Magistrales:* Disertaciones especializadas para museos, academias e institutos.<br>4. *Capacitación a Cuerpos Especializados:* Formación para inspectores de aduanas, policías y custodios de colecciones. | `copy-editorial-nichos.md` |
| **4. Evidencia** | - Más de **25 años de docencia universitaria activa** (Profesor Auxiliar en ISA, Universidad de La Habana y Colegio Universitario San Gerónimo).<br>- Cursos internacionales: Fundación de Museos Nacionales e IPC (Venezuela), Universidad de Panamá, IBERMUSEOS (Costa Rica).<br>- Conferencia bilateral sobre Tráfico Ilícito con el cuerpo de **Carabinieri TPC** de Italia (2018).<br>- Artículos especializados en la revista *Cultura y Desarrollo* de la UNESCO (2013). | `nichos-servicio.md`, líneas 24-28 |
| **5. Pull-Quote** | *"El conocimiento pericial solo adquiere su verdadero sentido cuando se transmite; enseñar a mirar una obra es la primera trinchera contra la pérdida del patrimonio."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, represento a una institución académica/cultural y deseo consultar la disponibilidad para cursos, seminarios o conferencias especializadas."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Coleccionistas Privados y Particulares* (`coleccionistas-particulares.html`)<br>  2. *Arqueología Subacuática y Pecios Históricos* (`patrimonio-subacuatico.html`) | `copy-editorial-nichos.md` |

---

### 📜 Nicho 3: Herederos y Sucesiones Patrimoniales
- **Archivo URL:** `herencias-sucesiones.html`
- **Prioridad:** 3 (Liquidación Testamentaria y Familiar)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 3), `copy-editorial-nichos.md` (Sec. 2), `habilidades-inferidas.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Herederos y Sucesiones*<br>- **H1:** Tasación Pericial de Arte para Herencias y Sucesiones<br>- **Subtítulo:** Inventario técnico y avalúo independiente de obras de arte y bienes patrimoniales para procesos de declaración de herencia, testamentaría y partición notarial o fiscal. | `copy-editorial-nichos.md` |
| **2. El Problema** | La partición hereditaria de bienes artísticos genera disputas familiares severas y desajustes fiscales ante Notaría o Hacienda si no media una valoración técnica ecuánime y matemáticamente inatacable. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Inventario Descriptivo Razonado:* Catalogación exhaustiva de la masa patrimonial a transmitir.<br>2. *Avalúo Oficial Fiscal y Notarial:* Determinación de valores para liquidación del impuesto de sucesiones.<br>3. *Propuesta Técnica de Lotes Equitativos:* División imparcial del caudal relicto preservando la integridad del acervo.<br>4. *Mediación Pericial Confidencial:* Asesoría técnica neutra para prevenir litigios hereditarios. | `copy-editorial-nichos.md`, líneas 94-98 |
| **4. Evidencia** | - Más de **15 procesos de liquidación hereditaria** y partición ejecutados con función pericial.<br>- Caudales hereditarios históricos gestionados: Servando Cabrera Moreno (1992), Amelia Peláez del Casal (2003), Dulce María Loynaz —Premio Cervantes— (1997 y 2006), Alejo Carpentier —Premio Cervantes— y Lilia Esteban (2006), Alfredo Guevara —fundador del ICAIC— (2014) y Aldo Martínez Malo. | `nichos-servicio.md`, líneas 37-40 |
| **5. Pull-Quote** | *"En una sucesión, el perito no solo tasa objetos materiales; establece un terreno de certidumbre indiscutible donde la equidad familiar prevalece sobre el conflicto."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, gestiono/soy heredero de un proceso de sucesión con obras de arte o bienes patrimoniales y necesito una tasación pericial confidencial."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Abogados, Notarios y Albaceas* (`abogados-notarios.html`)<br>  2. *Coleccionistas Privados y Particulares* (`coleccionistas-particulares.html`) | `copy-editorial-nichos.md`, líneas 100-104 |

---

### ⚖️ Nicho 4: Abogados, Notarios y Albaceas
- **Archivo URL:** `abogados-notarios.html`
- **Prioridad:** 4 (Ámbito Jurídico y Procesal)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 4), `copy-editorial-nichos.md` (Sec. 4), `certificaciones.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Abogados, Notarios y Albaceas*<br>- **H1:** Dictámenes Periciales de Arte para Abogados y Notarios<br>- **Subtítulo:** Informes técnicos periciales con fuerza probatoria para procesos judiciales, cuadernos particionales, litigios de propiedad, liquidaciones de bienes y auxilio notarial. | `copy-editorial-nichos.md` |
| **2. El Problema** | En sede judicial o notarial, un informe pericial carente de fundamentación metodológica rigurosa es fácilmente impugnado por la contraparte, viciando el proceso o causando indefensión patrimonial al cliente. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Dictamen Pericial Judicial:* Documento procesal técnico estructurado con cadena de custodia documental.<br>2. *Función de Perito Tasador-Partidor:* Confección del cuaderno particional con fundamentación económica objetiva.<br>3. *Peritaje en Decomisos y Fraudes:* Certificación técnica en procedimientos aduaneros, litigios de propiedad o tráfico ilícito.<br>4. *Ratificación Pericial:* Sostenimiento y defensa formal del informe técnico ante la autoridad competente. | `copy-editorial-nichos.md` |
| **4. Evidencia** | - Perito responsable en aduanas y decomisos aeroportuarios (1988–2024), con dictámenes ratificados procesalmente (e.g., Caso Diego Velázquez, 1984; Caso Escultura Demétre Chiparus).<br>- Representación internacional de Cuba en el Foro Cusco (UNESCO / OEI, 2020) sobre cooperación jurídica contra el tráfico ilícito.<br>- Asesor pericial de la Dirección de Patrimonio Cultural en normativas de valoración oficial. | `nichos-servicio.md`, líneas 49-52 |
| **5. Pull-Quote** | *"Un dictamen pericial emitido para el ámbito procesal debe resistir la impugnación más rigurosa: cada conclusión debe estar sustentada en el método científico y documental, nunca en la conjetura."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, soy letrado/notario y requiero un dictamen pericial técnico independiente para un procedimiento legal en curso."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Herederos y Sucesiones Patrimoniales* (`herencias-sucesiones.html`)<br>  2. *Aseguradoras y Family Offices* (`aseguradoras-family-offices.html`) | `copy-editorial-nichos.md` |

---

### 🛡️ Nicho 5: Aseguradoras y Family Offices
- **Archivo URL:** `aseguradoras-family-offices.html`
- **Prioridad:** 5 (Mercado Internacional & Gestión Patrimonial)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 5), `copy-editorial-nichos.md` (Sec. 5), `experiencia.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Aseguradoras y Family Offices*<br>- **H1:** Tasación Pericial de Arte para Aseguradoras y Family Offices<br>- **Subtítulo:** Dictámenes técnicos de valor asegurable, auditoría pericial de colecciones corporativas y liquidación de siniestros bajo metodología pericial internacional. | `copy-editorial-nichos.md` |
| **2. El Problema** | Pólizas de seguro suscritas sobre valoraciones desactualizadas o estimaciones empíricas derivan en infra-aseguramiento ruinoso o litigios interminables entre asegurador y asegurado ante un siniestro o daño parcial. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Determinación de Valor Asegurable:* Cálculo estricto de valor de reposición vs. valor de mercado real.<br>2. *Auditoría Pericial de Colecciones:* Inventario técnico, estado de conservación y blindaje documental de acervos corporativos.<br>3. *Peritaje de Siniestros y Daños:* Evaluación de depreciación material, costes de restauración y pérdida de valor comercial tras siniestro.<br>4. *Informes Técnicos Bilingües:* Documentación homologada para brokers internacionales y comités de riesgo. | `copy-editorial-nichos.md` |
| **4. Evidencia** | - Metodología pericial con validez internacional fundamentada en la escuela del Dr. Alex J. Rosenberg (expresidente de la *Appraisers Association of America*).<br>- Campañas de inventario, catalogación y tasación de bienes estatales en embajadas y consulados de **más de 15 países** en Europa, Oriente Medio, África y Sudamérica (1999 y 2018). | `nichos-servicio.md`, líneas 61-63 |
| **5. Pull-Quote** | *"En la gestión de grandes patrimonios, valorar no es especular con lo que alguien pagaría mañana, sino calcular con exactitud lo que cuesta restaurar o reponer un bien en su mercado legítimo."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, represento a una entidad aseguradora/family office y deseo consultar sobre valoración de pólizas o auditoría de colección."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Coleccionistas Privados y Particulares* (`coleccionistas-particulares.html`)<br>  2. *Abogados, Notarios y Albaceas* (`abogados-notarios.html`) | `copy-editorial-nichos.md` |

---

### ⚓ Nicho 6: Arqueología Subacuática y Pecios Históricos
- **Archivo URL:** `patrimonio-subacuatico.html`
- **Prioridad:** 6 (Patrimonio Sumergido Singular)
- **Fuentes de Datos:** `nichos-servicio.md` (Sec. 6), `copy-editorial-nichos.md` (Sec. 6), `experiencia.md`.

| Bloque | Contenido Estructurado / Datos Verificados | Fuente / Código |
| :--- | :--- | :--- |
| **1. Hero** | - **Breadcrumb:** *Inicio / Patrimonio Subacuático y Pecios*<br>- **H1:** Peritaje y Tasación de Bienes de Arqueología Subacuática<br>- **Subtítulo:** Catalogación técnica, autenticación y dictámenes de significación patrimonial para artefactos históricos procedentes de pecios coloniales y contextos sumergidos. | `copy-editorial-nichos.md` |
| **2. El Problema** | Los bienes rescatados de pecios marinos presentan alteraciones físicas severas y vacíos documentales extremos; sin peritaje arqueológico homologado, corren el riesgo de ser expoliados, descontextualizados o catalogados erróneamente. | Síntesis clínica de `nichos-servicio.md` |
| **3. Alcance (Grid)** | 1. *Catalogación de Artefactos Sumergidos:* Registro material, tipológico y dimensional de metales, cerámicas y elementos náuticos.<br>2. *Dictamen de Autenticidad Histórica:* Correlación documental con derroteros coloniales y registros de archivo marítimo.<br>3. *Evaluación de Estado de Conservación:* Diagnóstico de corrosión salina, concreciones marinas y estabilidad química del soporte.<br>4. *Tasación de Significación Patrimonial:* Valoración basada en la rareza arqueológica, unicidad y contexto histórico del yacimiento. | `copy-editorial-nichos.md` |
| **5. Evidencia** | - Peritaje, valoración técnica y catalogación integral de artefactos y evidencias arqueológicas de los pecios coloniales *"Palemón"* y *"Nuestra Señora de las Mercedes"*, así como de yacimientos de la costa cubana (2001–2004).<br>- Aplicación de protocolos periciales y catalográficos técnicos terrestres adaptados a la singularidad de la evidencia subacuática. | `nichos-servicio.md`, líneas 72-74 |
| **5. Pull-Quote** | *"Un objeto rescatado del mar no es un tesoro comercial; es un documento histórico sumergido que exige un rigor pericial quirúrgico para revelar su verdadera procedencia."* | `frases-luis.md` (*Placeholder validado temporalmente*) |
| **6. CTA & Enlaces** | - **CTA:** WhatsApp (*"Hola, represento a una entidad patrimonial/institución científica y deseo consultar sobre peritaje y catalogación de bienes subacuáticos."*) + Formulario.<br>- **Interlinking Relacionado (2):**<br>  1. *Docencia Universitaria y Formación* (`docencia-conferencias.html`)<br>  2. *Coleccionistas Privados y Particulares* (`coleccionistas-particulares.html`) | `copy-editorial-nichos.md` |

---

## 🎨 4. Clases CSS Homologadas y Correspondencia Visual (Tailwind CLI)

Para garantizar consistencia visual absoluta entre los 6 archivos HTML resultantes y evitar divergencias de maquetación, los bloques deben compartir obligatoriamente estas clases utilitarias:

```html
<!-- BLOQUE 1: HERO DE NICHO (Reveal Left) -->
<section class="pt-28 pb-12 px-6 md:px-12 max-w-5xl mx-auto opacity-0 transition-all duration-700 ease-out" data-reveal="left">
  <nav class="text-xs uppercase tracking-widest text-[#2E3238]/60 font-light mb-6">
    <a href="index.html" class="hover:text-[#B08D57] transition-colors duration-200">Inicio</a>
    <span class="mx-2 text-[#B08D57] font-normal">/</span>
    <span class="text-[#2E3238] font-normal">[Nombre del Nicho]</span>
  </nav>
  <h1 class="text-3xl sm:text-4xl md:text-5xl font-base font-semibold text-[#2E3238] leading-tight mb-4">
    [H1 del Nicho]
  </h1>
  <p class="text-lg md:text-xl font-base text-[#2E3238]/85 max-w-3xl leading-relaxed">
    [Subtítulo de Posicionamiento]
  </p>
</section>

<!-- BLOQUE 2: EL PROBLEMA (Reveal Right) -->
<section class="py-10 px-6 md:px-12 max-w-4xl mx-auto opacity-0 transition-all duration-700 ease-out" data-reveal="right">
  <h2 class="text-xs uppercase tracking-widest text-[#B08D57] font-light mb-2">
    El Problema
  </h2>
  <div class="h-px w-16 bg-[#B08D57]/35 mb-6"></div>
  <p class="text-lg md:text-xl font-base text-[#2E3238]/90 leading-relaxed italic">
    [Texto del Problema — 2 a 4 líneas máximo]
  </p>
</section>

<!-- BLOQUE 3: ALCANCE DEL SERVICIO (Reveal Left) -->
<section class="py-12 px-6 md:px-12 max-w-5xl mx-auto opacity-0 transition-all duration-700 ease-out" data-reveal="left">
  <h2 class="text-xs uppercase tracking-widest text-[#B08D57] font-light mb-8">
    Alcance Técnico del Servicio
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Repetir 3 a 4 tarjetas homogéneas -->
    <div class="border border-[#2E3238]/15 bg-[#EAE7E2] p-6 md:p-8 backdrop-blur-[2px] transition-all duration-300 hover:border-[#B08D57] rounded-sm">
      <h3 class="text-lg font-base font-semibold text-[#2E3238] mb-2">[Título del Servicio]</h3>
      <p class="text-sm font-base text-[#2E3238]/80 leading-relaxed">[Descripción concisa del entregable]</p>
    </div>
  </div>
  
  <!-- Divisor Fino de Acento Pericial (Línea Progresiva) -->
  <div class="h-px w-full max-w-2xl mx-auto bg-[#B08D57]/35 my-16 line-draw"></div>
</section>

<!-- BLOQUE 4: EVIDENCIA / CREDIBILIDAD (Reveal Right — Condicional) -->
<section class="py-12 px-6 md:px-12 max-w-4xl mx-auto opacity-0 transition-all duration-700 ease-out" data-reveal="right">
  <div class="bg-[#2E3238]/[0.03] border border-[#2E3238]/10 p-8 md:p-10 rounded-sm">
    <h2 class="text-xs uppercase tracking-widest text-[#B08D57] font-light mb-6">
      Trayectoria y Casos Verificados
    </h2>
    <ul class="space-y-4 text-sm md:text-base font-base text-[#2E3238]/85 leading-relaxed">
      <!-- Ítems con numeración 'exhibit' -->
      <li class="flex items-start gap-3">
        <span class="text-[#B08D57] font-semibold select-none">01 —</span>
        <span>[Hito o Caso Documentado con Fecha e Institución]</span>
      </li>
    </ul>
  </div>
</section>

<!-- BLOQUE 5: PULL-QUOTE (Reveal Left / Center Focus) -->
<section class="py-12 my-12 px-6 max-w-3xl mx-auto text-center border-y border-[#B08D57]/40 opacity-0 transition-all duration-700 ease-out" data-reveal="left">
  <blockquote class="text-xl md:text-2xl font-base italic text-[#2E3238] leading-relaxed">
    "[Cita Textual de Luis Manuel Almeida]"
  </blockquote>
  <cite class="block mt-4 text-xs uppercase tracking-widest text-[#B08D57] font-light not-italic">
    Luis Manuel Almeida Luis · Perito Tasador
  </cite>
</section>

<!-- BLOQUE 6: CTA CONTEXTUAL + INTERLINKING (Reveal Right) -->
<section class="pt-8 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-center opacity-0 transition-all duration-700 ease-out" data-reveal="right">
  <h2 class="text-2xl font-base font-semibold text-[#2E3238] mb-4">
    Iniciar Consulta Confidencial
  </h2>
  <p class="text-sm font-base text-[#2E3238]/75 max-w-lg mx-auto mb-8 leading-relaxed">
    Estricto Secreto Profesional · Sin Compromiso
  </p>
  
  <!-- Acciones Primarias -->
  <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <a href="#" class="inline-block border border-[#2E3238] bg-[#2E3238] text-[#EAE7E2] px-8 py-3 text-xs uppercase tracking-widest font-light transition-colors duration-300 hover:bg-[#B08D57] hover:border-[#B08D57] rounded-sm whatsapp-btn" data-i18n-whatsapp="[nicho_key].cta.whatsapp">
      WhatsApp Inmediato
    </a>
    <a href="#contacto" class="inline-block border border-[#2E3238]/30 bg-transparent text-[#2E3238] px-8 py-3 text-xs uppercase tracking-widest font-light transition-colors duration-300 hover:border-[#B08D57] hover:text-[#B08D57] rounded-sm">
      Hoja de Encargo
    </a>
  </div>

  <!-- Interlinking Cruzado: 2 Nichos Hermanos -->
  <div class="mt-16 pt-10 border-t border-[#2E3238]/10">
    <span class="text-xs uppercase tracking-widest text-[#2E3238]/50 font-light block mb-6">
      Especialidades Relacionadas
    </span>
    <div class="flex flex-col sm:flex-row gap-6 justify-center text-sm font-base">
      <a href="[url-nicho-rel-1].html" class="group text-[#2E3238] hover:text-[#B08D57] transition-colors flex items-center justify-center gap-2">
        <svg class="w-4 h-4 text-[#B08D57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg>
        <span class="border-b border-transparent group-hover:border-[#B08D57] transition-all">[Nombre Nicho Relacionado 1]</span>
      </a>
      <a href="[url-nicho-rel-2].html" class="group text-[#2E3238] hover:text-[#B08D57] transition-colors flex items-center justify-center gap-2">
        <svg class="w-4 h-4 text-[#B08D57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg>
        <span class="border-b border-transparent group-hover:border-[#B08D57] transition-all">[Nombre Nicho Relacionado 2]</span>
      </a>
    </div>
  </div>
</section>
```

---

## 🧭 5. Matriz de Interlinking Contextual entre Nichos

Para potenciar la autoridad semántica, reducir la tasa de rebote y orientar al usuario B2B hacia servicios complementarios, se establece la siguiente malla bidireccional cerrada:

```
[Coleccionistas (1)] ───────────────► [Herencias (3)]
        ▲                                     ▲
        │                                     │
        ▼                                     ▼
[Aseguradoras (5)]  ◄───────────────► [Abogados (4)]
        ▲                                     ▲
        │                                     │
        ▼                                     ▼
 [Docencia (2)]    ◄───────────────► [Subacuático (6)]
```

| Nicho Origen | Nicho Hermano A | Nicho Hermano B | Lógica B2B del Enlace |
| :--- | :--- | :--- | :--- |
| **1. Coleccionistas** | Herederos y Sucesiones (3) | Aseguradoras & Family Offices (5) | Quien colecciona arte eventualmente planifica su sucesión patrimonial o requiere asegurar sus piezas. |
| **2. Docencia** | Coleccionistas Privados (1) | Arqueología Subacuática (6) | La autoridad académica conduce naturalmente a la tasación privada de obras y a la especialización arqueológica. |
| **3. Herencias** | Abogados, Notarios y Albaceas (4) | Coleccionistas Privados (1) | Los herederos requieren obligatoriamente auxilio legal/notarial y frecuentemente se convierten en nuevos coleccionistas. |
| **4. Abogados** | Herederos y Sucesiones (3) | Aseguradoras & Family Offices (5) | Los litigios suelen derivar de particiones sucesorias o de discrepancias con liquidadores de seguros. |
| **5. Aseguradoras** | Coleccionistas Privados (1) | Abogados, Notarios y Albaceas (4) | Las pólizas amparan colecciones privadas y sus siniestros exigen defensa pericial procesal. |
| **6. Arqueología Subacuática** | Docencia Universitaria (2) | Coleccionistas Privados (1) | La investigación subacuática se apoya en la docencia de patrimonio y dialoga con colecciones históricas. |

---

## 🔍 6. Diagnóstico Técnico y Dictamen de Dirección de Arte (CTO Review)

### Dictamen de Idoneidad:
La estructura de 6 bloques propuesta es **óptima, equilibrada y comercialmente implacable**. Transforma cada página de nicho en un dictamen técnico en sí mismo, desterrando el típico layout de agencia publicitaria con fotos de stock y eslóganes vacíos.

### Puntos Fuertes Detectados:
1. **Ritmo de Lectura Natural:** El paso de *Problema* → *Alcance técnico* → *Prueba documental* → *Reflexión ética (Pull-quote)* → *Contacto contextual* imita con exactitud el ciclo de consulta de un despacho pericial de alto standing.
2. **Eficiencia en Tokens y Código:** Al fijar esta plantilla única, los 6 archivos HTML se reducen a variaciones de datos sobre una estructura atómica idéntica. Se puede generar una sola cápsula base y alimentar con `i18n-data.js` o incluir en el compilador.
3. **Escudo de Trazabilidad:** El Bloque 4 actúa como filtro antifraude. En nuestro caso, los 6 nichos cuentan con evidencia demostrable en `01-estructurado/`.

### Recomendaciones de Pulido Fino (Previo a Tirar Código):
1. **Tratamiento del Pull-Quote (Bloque 5):** Mantener de forma provisional los textos asignados con el marcador de revisión hasta que David transcriba las citas orales grabadas con Luis Manuel Almeida en `frases-luis.md`.
2. **Respaldo en Móviles del Scroll-Reveal:** En conexiones móviles lentas o pantallas táctiles de baja gama, el `IntersectionObserver` debe tener un fallback automático: si la pantalla tiene menos de 640px o si `prefers-reduced-motion: reduce` está activo, todas las clases de opacidad 0 deben convertirse a `opacity-100` y `transform-none` instantáneo para evitar pantallas en blanco accidentales.
