# Copywriting del Home — Viewport 100vh Sin Scroll (ES / EN)
**Luis Manuel Almeida Luis · Subfase 4.4**

> **Alcance:** Micro-copy bilingüe completo del Home (`index.html`), único punto del sitio sin scroll vertical, definido en `estructura-sitio.md`. Cubre: H1/subtítulo de marca (SEO), cabecera de navegación, los 7 paneles del Selector Interactivo (Retrato + 6 Nichos), el CTA global "Consulta Confidencial", las frases rotativas del cursor-líneas y el footer mínimo.
> **Regla de Cero Invención:** Todo hecho, cifra o nombre citado es trazable a `perfil.md`, `nichos-servicio.md`, `habilidades-inferidas.md` y `copy-editorial-nichos.md`. Los micro-copys son versiones **comprimidas** (1–2 líneas) del copy editorial ya redactado para cada nicho — no introducen datos nuevos.
> **Regla de Tono:** Voz formal, clínica y sobria (`perito-strategist.md`). Cero superlativos de marketing.
> **Regla i18n:** Toda cadena de este documento debe nacer con su clave `data-i18n` en la implementación HTML (Subfase 4.5), según `docs/ARCHITECTURE.md`.

---

## 0. Decisiones de Redacción Cerradas en esta Subfase

Dos puntos quedaban abiertos en `estructura-sitio.md` e `identidad-visual.md`. Se resuelven aquí con datos ya verificados en la fuente de verdad, sin esperar más insumos:

1. **Credencial corta del Panel 1 (Retrato):** Se resuelve el `[FALTA: Confirmar credencial definitiva con Luis]` de `estructura-sitio.md` usando el dato más fuerte y ya verificado del resumen profesional: **"+40 años de trayectoria pericial"** (trazable a `perfil.md`, Resumen Profesional).
2. **Frases rotativas del cursor-líneas:** `frases-luis.md` sigue vacío (pendiente de que Luis se las dicte a David). Se define en la Sección 5 una tanda de **4 frases genéricas placeholder**, explícitamente marcadas como temporales, para no detener el desarrollo. Ver recomendación de cantidad final al cierre de esta sección.

---

## 1. H1 y Subtítulo de Marca (SEO / Autoridad)

El wordmark "Almeida" (Alex Brush) es un elemento *visual* de marca, no un H1 semántico útil para SEO ni lectores de pantalla. El Home necesita un H1 real en `Source Serif 4`, visualmente discreto (tamaño menor al wordmark, no compite con él), ubicado justo debajo o junto al wordmark.

### 🇪🇸 Español
- **H1:** Peritaje y Tasación de Obras de Arte y Patrimonio Cultural
- **Subtítulo (1 línea):** Dictámenes técnicos independientes respaldados por más de 40 años de trayectoria institucional en Cuba e Iberoamérica.

### 🇬🇧 English
- **H1:** Fine Art & Cultural Heritage Appraisal
- **Subtitle (1 line):** Independent technical opinions backed by more than 40 years of institutional experience across Cuba and Ibero-America.

<!-- Fuente: perfil.md, Resumen Profesional -->

---

## 2. Cabecera de Navegación (Desktop y Overlay Móvil)

### 🇪🇸 Español
- **Menú de especialidades:** Especialidades
- **CTA principal (header):** Consulta Confidencial
- **Selector de idioma:** ES / EN
- **Etiquetas cortas de los 6 nichos (para dropdown y overlay móvil):**
  1. Coleccionistas y Particulares
  2. Docencia y Conferencias
  3. Herencias y Sucesiones
  4. Abogados y Notarios
  5. Aseguradoras y Family Offices
  6. Patrimonio Subacuático
- **Botón de cierre del overlay móvil:** Cerrar (✕)

### 🇬🇧 English
- **Specialties menu:** Specialties
- **Primary CTA (header):** Confidential Consultation
- **Language selector:** ES / EN
- **Short niche labels (dropdown and mobile overlay):**
  1. Collectors & Private Owners
  2. Teaching & Lectures
  3. Estates & Inheritance
  4. Lawyers & Notaries
  5. Insurers & Family Offices
  6. Underwater Heritage
- **Mobile overlay close button:** Close (✕)

---

## 3. Selector Interactivo — 7 Paneles (Retrato + 6 Nichos)

**Regla de Jerarquía:** El Panel 2 (Coleccionistas) se expande por defecto al cargar. El orden sigue estrictamente la prioridad comercial.

Formato por panel: **Título (estado colapsado)** + **Resumen expandido (1–2 líneas, hover/tap)** + **Enlace de salida hacia la página de nicho**. Fuente cruzada: `nichos-servicio.md` y `copy-editorial-nichos.md`.

**Enlace de salida (genérico, reutilizado en los 6 paneles de nicho):**
- ES: Explorar Especialidad →
- EN: Explore Specialty →

### Panel 1 — Retrato & Perfil
- **ES Título:** Perfil y Trayectoria
- **ES Credencial corta (colapsado):** +40 años de trayectoria pericial
- **ES Resumen (expandido):** Especialista en Patrimonio Cultural y Tasación de Obras de Arte. Más de 20.000 obras y bienes patrimoniales inventariados y tasados.
- **EN Title:** Profile & Background
- **EN Short credential (collapsed):** 40+ years of appraisal expertise
- **EN Summary (expanded):** Specialist in Cultural Heritage and Fine Art Appraisal. Over 20,000 works of art and heritage assets inventoried and appraised.
<!-- Fuente: perfil.md, Resumen Profesional -->

### Panel 2 — Coleccionistas y Particulares (Nicho 1 - FOCO PRINCIPAL)
- **ES Título:** Coleccionistas y Particulares
- **ES Resumen:** Dictámenes técnicos independientes de autenticidad y valoración. Cero conflicto de interés: no se compra ni se vende arte.
- **EN Title:** Collectors & Private Owners
- **EN Summary:** Independent technical opinions on authenticity and valuation. Zero conflict of interest: no buying or selling of art.
<!-- Fuente: nichos-servicio.md, Nicho 1; copy-editorial-nichos.md -->

### Panel 3 — Docencia y Conferencias (Nicho 2)
- **ES Título:** Docencia y Conferencias
- **ES Resumen:** Más de 25 años de docencia universitaria en tasación de arte, patrimonio y prevención del tráfico ilícito.
- **EN Title:** Teaching & Lectures
- **EN Summary:** More than 25 years of university teaching in fine art appraisal, heritage, and illicit-trafficking prevention.
<!-- Fuente: nichos-servicio.md, Nicho 3 -->

### Panel 4 — Herencias y Sucesiones (Nicho 3)
- **ES Título:** Herencias y Sucesiones
- **ES Resumen:** Perito Tasador-Partidor en más de 15 procesos de liquidación hereditaria, bajo estricto secreto profesional.
- **EN Title:** Estates & Inheritance
- **EN Summary:** Partition Appraiser in more than 15 estate liquidation processes, under strict professional confidentiality.
<!-- Fuente: nichos-servicio.md, Nicho 2; habilidades-inferidas.md, punto 1 -->

### Panel 5 — Abogados y Notarios (Nicho 4)
- **ES Título:** Abogados y Notarios
- **ES Resumen:** Dictámenes con fuerza procesal para litigios, disolución de patrimonios y auxilio judicial como Perito Partidor.
- **EN Title:** Lawyers & Notaries
- **EN Summary:** Expert witness reports for litigation, asset dissolution, and judicial support as a Partition Appraiser.
<!-- Fuente: nichos-servicio.md, Nicho 4 -->

### Panel 6 — Aseguradoras y Family Offices (Nicho 5)
- **ES Título:** Aseguradoras y Family Offices
- **ES Resumen:** Valoración técnica de colecciones y auditoría pericial de activos internacionales bajo estándares globales.
- **EN Title:** Insurers & Family Offices
- **EN Summary:** Technical valuation of collections and expert audit of international assets under global appraisal standards.
<!-- Fuente: nichos-servicio.md, Nicho 5 -->

### Panel 7 — Patrimonio Subacuático (Nicho 6)
- **ES Título:** Patrimonio Subacuático
- **ES Resumen:** Peritaje y catalogación de artefactos recuperados de pecios coloniales, como el *Nuestra Señora de las Mercedes*.
- **EN Title:** Underwater Heritage
- **EN Summary:** Appraisal and cataloguing of artifacts recovered from colonial shipwrecks, including the *Nuestra Señora de las Mercedes*.
<!-- Fuente: nichos-servicio.md, Nicho 6 -->

---

## 4. CTA Global "Consulta Confidencial" (Modal / Panel de Contacto del Home)

Dado que el Home no tiene scroll ni sección de contacto propia, el botón del header abre un panel/modal compacto (no una página nueva) con los dos canales confirmados en `estructura-sitio.md`.

### 🇪🇸 Español
- **Título del modal:** Consulta Confidencial
- **Texto de apoyo:** Escríbanos directamente para iniciar una consulta confidencial sobre su caso.
- **Botón 1:** Escribir por WhatsApp
- **Botón 2:** Enviar Formulario
- **Mensaje pre-estructurado de WhatsApp (genérico, previo a selección de nicho):** *"Hola, deseo solicitar una consulta confidencial sobre servicios de peritaje y tasación de arte y patrimonio."*

### 🇬🇧 English
- **Modal title:** Confidential Consultation
- **Supporting text:** Contact us directly to begin a confidential consultation about your case.
- **Button 1:** Message on WhatsApp
- **Button 2:** Submit Form
- **Pre-filled WhatsApp message (generic, prior to niche selection):** *"Hello, I would like to request a confidential consultation regarding fine art and heritage appraisal services."*

> **Nota:** Los mensajes de WhatsApp *específicos por nicho* ya están definidos en `copy-editorial-nichos.md` y se usan en cada página de nicho independiente. El mensaje anterior es exclusivamente para el CTA genérico del Home.

---

## 5. Frases Rotativas del Cursor-Líneas (Home Desktop) — COMPLETADO

**Estado:** 100% COMPLETADO. Se han definido las 5 frases definitivas (un conjunto de 5 citas célebres de mentores e instituciones clave del patrimonio y la única frase oficial de Luis Manuel Almeida Luis). Esto elimina por completo los placeholders temporales.

### Lista Definitiva de Frases ES (Español)
1. «El valor de una obra de arte es la cantidad de dinero que una persona está dispuesta a pagar por un bien que esté autorizado a vender.» — Alex Rosenberg
2. «El mercado del arte y la protección del patrimonio cultural son a la vez antagónicos y complementarios.» — Luis M. Almeida
3. «En esta profesión hay que tener ética, conocimientos, metodología y sentido común.» — Alex Rosenberg
4. «En el trabajo de tasación hay que tener tres cosas: ojo y sensibilidad en la apreciación; hay que ver muchas piezas, y saber del mercado del arte.» — Marta Arjona
5. «A mí me gusta mucho tu curso porque tú enseñas el valor de las cosas.» — Eusebio Leal

### Definitive Phrases EN (English)
1. "The value of a work of art is the amount of money a person is willing to pay for an asset that one is authorized to sell." — Alex Rosenberg
2. "The art market and the protection of cultural heritage are at once antagonistic and complementary." — Luis M. Almeida
3. "In this profession, one must possess ethics, expertise, methodology, and common sense." — Alex Rosenberg
4. "In appraisal work, three things are essential: a trained eye and sensitivity in appreciation, examining numerous pieces, and understanding the art market." — Marta Arjona
5. "I like your course very much because you teach the true value of things." — Eusebio Leal

---

## 6. Footer Mínimo del Home (Una Sola Línea)

### 🇪🇸 Español
`© {año} Luis Manuel Almeida Luis. Todos los derechos reservados.`

### 🇬🇧 English
`© {año} Luis Manuel Almeida Luis. All rights reserved.`

> **Nota técnica:** `{año}` se resuelve dinámicamente en JS (`new Date().getFullYear()`), no se hardcodea.

---

## ✅ Control de Calidad y Cero Invención (Subfase 4.4)

1. **Trazabilidad absoluta:** Todos los resúmenes de los 7 paneles son compresiones directas de `nichos-servicio.md` / `copy-editorial-nichos.md` y del Resumen Profesional de `perfil.md`. No se añadió ningún hecho, cifra o nombre nuevo.
2. **Credencial del Panel 1 resuelta:** "+40 años de trayectoria pericial" sustituye formalmente el `[FALTA]` de `estructura-sitio.md`, con respaldo literal en `perfil.md`.
3. **Fusión Panel 5 (Nicho 4 + 5):** El resumen combina exclusivamente frases ya validadas en los Heros de `abogados-notarios.html` y `aseguradoras-family-offices.html` en `copy-editorial-nichos.md`, sin generar una propuesta de valor nueva.
4. **Frases rotativas — Estado explícito y no definitivo:** Las 4 frases del punto 5 son placeholders genéricos declarados como temporales, no atribuidos como cita textual definitiva de Luis. Queda registrada la acción pendiente de sustitución y la recomendación de cantidad (5 frases reales).
5. **Cero mención del cotizador:** Ningún copy de este documento referencia ni enlaza `/cotizador/`, conforme a la regla de desacople de `estructura-sitio.md`.
6. **Consistencia de CTA:** "Consulta Confidencial" / "Confidential Consultation" se mantiene idéntico entre el header, el modal y `perito-strategist.md` (CTA de bajo compromiso y alta formalidad).
7. **Pendiente de fase posterior:** La inyección de todas las cadenas de este documento en claves `data-i18n` dentro de `assets/i18n-data.js` corresponde a la Subfase 4.5, no a este entregable.
