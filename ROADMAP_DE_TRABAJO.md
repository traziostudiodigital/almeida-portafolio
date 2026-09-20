# 🗺️ ROADMAP DE TRABAJO — LUIS MANUEL ALMEIDA LUIS
> **Proyecto:** Ecosistema Digital Profesional, Cotizador de Servicios y Portafolio Web.
> **Titular:** Luis Manuel Almeida Luis (Perito Tasador y Valuador de Obras de Arte y Bienes de Alto Valor).
> **Metodología:** Desarrollo por fases aisladas, trabajo continuo en distintos chats para optimizar consumo de tokens y presupuesto.

---

## 📊 RESUMEN DE OBJETIVOS GLOBALES

1. **Fase 1 (Organización de Contenido y Método de Cotización):** Estructurar la propuesta de valor, hoja de vida, catálogo de servicios de tasación y el algoritmo/lógica para cotizar sus servicios de peritaje. (COMPLETADA)
2. **Fase 2 (Herramienta Cotizadora de Servicios):** Crear una calculadora o herramienta interactiva local (HTML/JS) para presupuestos periciales y exportación en PDF. (EN DESARROLLO / TRABAJANDO A LA PAR)
3. **Fase 3 (SEO Semántico, Agentes y Skills de Revisión):** Actualizar metadatos, estructurar Schema.org con habilidades validadas y configurar agentes locales automatizados para auditar el contenido web. (PENDIENTE / INICIANDO AHORA)
4. **Fase 4 (Base Narrativa, Copywriting y Arquitectura Web):** Redactar y estructurar la base bilingüe de la Landing Page bajo las reglas de `docs/ARCHITECTURE.md`. (PENDIENTE)
5. **Fase 5 (Desarrollo y Maquetación Modular de la Web):** Construir la web estática por componentes reutilizables mediante HTML5, Tailwind CLI y Vanilla JS. (PENDIENTE)
6. **Fase 6 (LinkedIn - Copy & Optimización):** Optimizar y estructurar el perfil profesional B2B en LinkedIn como canal secundario de atracción. (PENDIENTE)

---

## 🧱 ESTRUCTURA MODULAR DEL PROYECTO

Para optimizar el desarrollo y la gestión de recursos, el ecosistema se divide en **4 módulos independientes**. Cada módulo se trabaja, se versiona y se despliega de forma autónoma, aunque todos comparten como fuente única de verdad los datos de `/docs/data/01-estructurado/`.

1. **Módulo de Datos (`/docs/data/`):** Gestión de la identidad profesional (perfil, biografía, servicios, nichos). Gestionado por el agente `ingestor.md`.
2. **Módulo Cotizador (`/cotizador/`):** Sistema y algoritmo de cotización para servicios de peritaje y tasación.
3. **Módulo Web (`/web/`):** Landing page portafolio pública. Sigue la arquitectura de `docs/ARCHITECTURE.md` (HTML5 + Tailwind CLI + Vanilla JS).
4. **Módulo LinkedIn (`/linkedin/`):** Copy y estrategia para el perfil profesional de LinkedIn.

---

## 🚦 ESTADO ACTUAL POR FASES

| Fase / Subfase | Estado | Descripción |
| :--- | :---: | :--- |
| **Fase 0: Saneamiento & Limpieza de Espacio** | 🟢 **COMPLETADA** | Eliminado material ajeno. Conservada arquitectura estática en `docs/ARCHITECTURE.md`. Extraído tarifario base en `context/tarifario_base.md`. |
| **Fase 1: Definición de Perfil, Servicios & Algoritmo de Cotización** | 🟢 **COMPLETADA** | Volcadas y consolidadas las respuestas de Luis (`Revisar/Respuestas.md`) en `01-estructurado/` (perfil, experiencia, certificaciones, tarifas, nichos, habilidades y CVs ES/EN) y `/cotizador/logica-cotizacion.md`. Cero `[FALTA]` residuales. |
| **Fase 2: Cotizador / Calculadora de Presupuestos** | 🟡 En Pausa / A la Par | Subfases 2.1, 2.2 y 2.3 completadas. Quedan pendientes pruebas de simulación y empaquetado autónomo (`.bat`). |
| **Fase 3: SEO Semántico, Agentes y Skills de Revisión** | 🟢 **COMPLETADA** | Actualizado Schema.org/SEO con habilidades confirmadas y configurados los agentes locales de auditoría web (`perito-strategist` y `web-architect`). |
| **Fase 4: Base Narrativa, Copywriting y Arquitectura Web** | 🟡 **EN CURSO** | Subfase 4.1 alineada y documentada (Identidad visual, arquitectura Home 100vh sin scroll + 6 nichos independientes). Preparando copys bilingües. |
| **Fase 5: Desarrollo y Maquetación de la Web** | ⚪ Pendiente | Construcción de componentes y compilación (HTML5 + Tailwind CLI + Vanilla JS). |
| **Fase 6: LinkedIn - Copy & Optimización** | ⚪ Pendiente | Estrategia de marca personal y perfil optimizado B2B (Capa 6). |

---

## 🧠 GUÍA DE ASIGNACIÓN DE MODELOS (Protocolo de Gestión de Tokens)
> **Nota:** Esta tabla sirve como referencia para determinar qué modelo utilizar en cada tarea del Checklist. No es una lista de tareas, sino una guía de recursos para optimizar el consumo de tokens y asegurar la calidad.

| Capa | Agente / Tarea | Riesgo si falla | Modelo recomendado | Motivo |
|:---:|:---|:---|:---|:---|
| **0** | Detección de info ya existente | Medio | **Sonnet** | Requiere leer y cruzar TODO `00-raw` + `01-estructurado`. |
| **1** | `ingestor.md` (Fuentes de verdad) | **Alto** | **Sonnet** | La base de todo el ecosistema; cero invención permitida. |
| **2** | `extractor-habilidades.md` | Alto | **Sonnet** | Exige juicio fino de qué es inferible sin inventar. |
| **3** | `cv-moderno.md` | Alto | **Sonnet** | Adaptación bilingüe técnica precisa. |
| **4** | `cotizador.md` → Lógica de cotización | Medio | Gemini Flash + Sonnet | Matriz de variables; el riesgo ético lo valida Sonnet. |
| **4.1** | Cotizador: Esquema Configuración | Bajo | Flash / Llama / Gemini | Estructuración mecánica de parámetros. |
| **4.2** | Cotizador: Plantilla PDF Web | Medio | **Sonnet** | Maquetación editorial fina. |
| **4.3** | Cotizador: Motor JS | **Alto** | **Sonnet** / GPT-4o | Precisión matemática y lógica de estado JS. |
| **4.4** | Cotizador: Integración y Pruebas | Bajo-Medio | Flash / Llama | Simulación de casos de uso y validación. |
| **5** | `seo-estrategia.md` → Keywords/Schema | Bajo-Medio | Flash + Sonnet | Generación repetitiva; Sonnet valida datos. |
| **6** | Copy de LinkedIn | Bajo | Flash / Llama | Texto iterativo y ágil. |
| **7.0** | Infraestructura Web & Compilación Node | Medio | Flash 3.0 / 3.5 | Scripting mecánico y configuración de entorno. |
| **7.1** | Páginas Complementarias & Legal | Bajo-Medio | Gemini Flash 3.x | Estructuras estandarizadas. |
| **7.2** | Maquetación HTML (Cápsulas) | Bajo | Gemini Flash 3.x | Maquetación repetitiva de componentes. |
| **7.3** | Módulos Vanilla JS | Medio-Alto | DeepSeek v4 | Precisión en lógica DOM y eventos. |
| **7.4** | Ensamblaje Completo y Pruebas | Medio | Gemini Flash 3.8 | Consolidación y pruebas de flujo. |
| **7.5** | Auditoría Estética y Control Final | **Alto** | **Sonnet** | **Obligatorio:** Pulido de lujo y autoridad B2B. |

---

## 📋 CHECKLIST DETALLADO POR FASE
> Esta es la **fuente única de verdad** para el progreso de ejecución del proyecto.


### ✅ Fase 0: Saneamiento y Estructuración Inicial — COMPLETADA
- [x] Limpiar carpeta `Exportacion/` con datos antiguos.
- [x] Mover `ARCHITECTURE.md` a `docs/ARCHITECTURE.md`.
- [x] Extraer información de los documentos Word (`COBRO O TARIFA 2.docx` e `ICOBRO DEL SERVICIO EJEMPLO.docx`) hacia `context/tarifario_base.md`.
- [x] Crear este `ROADMAP_DE_TRABAJO.md` centralizado.

---

### ✅ Fase 1: Perfil Profesional & Lógica de Cotización — COMPLETADA
- [x] **Subfase 1.1 — Ficha de Perfil Profesional Inicial:** Ejecutado el agente `ingestor.md`. Generados en `01-estructurado/`: `perfil.md`, `experiencia.md`, `certificaciones.md`, `habilidades.md`, `tarifas-servicios.md`.
- [x] **Subfase 1.2 — Levantamiento de Respuestas:** Respuestas resueltas por Luis Manuel Almeida (`Revisar/Respuestas.md`).
- [x] **Subfase 1.3 — Consolidación de Base de Datos Estructurada:** Volcadas las respuestas y actualizados archivos de datos y `logica-cotizacion.md`.
- [x] **Subfase 1.4 — Cierre de Fase 1:** Auditoría de consistencia y Cero Invención en la fuente de verdad definitiva completada.

---

### ⏳ Fase 2: Herramienta Cotizadora de Servicios (Aplicación Web Local HTML + JS) — TRABAJANDO A LA PAR
- [x] **Subfase 2.1 — Modelo de Datos y Configuración de Tarifas (`/cotizador/tarifas_config.json`):** COMPLETADO.
- [x] **Subfase 2.2 — Plantilla Maestra del Entregable PDF / Hoja de Encargo (`/cotizador/cotizador.html`):** COMPLETADO.
- [x] **Subfase 2.3 — Motor de Cálculo Interactivo (`/cotizador/app.js`):** COMPLETADO.
- [ ] **Subfase 2.4 — Empaquetado Autónomo, Portabilidad y Test con Caso Real:** Dejar la carpeta `/cotizador/` 100% autocontenida y crear el lanzador `.bat`.
- [ ] **Subfase 2.5 — Auditoría Técnica y Refinamiento (Claude Sonnet):** Puntos de control obligatorios de precisión matemática, media print, terminología e inyección.

---

### ✅ Fase 3: SEO Semántico, Agentes y Skills de Revisión — COMPLETADA
- [x] **Subfase 3.1 — Actualización de Schema.org y SEO (Capa 5):**
  - Integradas formalmente las 6 Habilidades Inferidas y Confirmadas por Luis en el bloque `knowsAbout` del Schema JSON-LD de `seo-keywords.md` para potenciar la autoridad semántica de la web.
- [x] **Subfase 3.2 — Configuración de Agentes y Skills de Auditoría Web:**
  - Creados los agentes `.opencode/agent/perito-strategist.md` (auditor de copy, tono pericial, cero invención) y `.opencode/agent/web-architect.md` (auditor de HTML5 semántico, Tailwind CLI, Vanilla JS e i18n bajo `docs/ARCHITECTURE.md`).

---

### ⏳ Fase 4: Base Narrativa, Copywriting, SEO de Nichos y Arquitectura Web — EN CURSO
- [x] **Subfase 4.1 — Arquitectura de Información e Identidad Visual Consolidada:**
  - Consolidada en `.opencode/agents/identidad-visual.md` la tipografía definitiva (*Alex Brush* para wordmark "Almeida", *Source Serif 4* con pesos 300/400/600 para contenido) y el paquete de 5 animaciones (cursor-líneas + frases rotativas en Home, scroll-reveal lateral alternado, líneas que se dibujan, imagen asentamiento y hover de links).
  - Creado `/docs/data/01-estructurado/frases-luis.md` para alimentar las frases rotativas del Home.
  - Consolidada en `.opencode/agents/estructura-sitio.md` la arquitectura: Home en viewport único de 100vh sin scroll + 6 páginas de nicho independientes con scroll editorial completo. Cotizador 100% desacoplado y canales de contacto confirmados (WhatsApp + Formulario).
  - Reestructurado `/docs/data/01-estructurado/nichos-servicio.md` con la taxonomía y jerarquía de 6 nichos en su orden definitivo de prioridad.
- [x] **Subfase 4.2 — Sincronización SEO y Metadatos de los 6 Nichos (`seo-keywords.md`):**
  - Sincronizado `docs/data/01-estructurado/seo-keywords.md` con la taxonomía real de los 6 nichos:
    1. Coleccionistas privados y particulares (`coleccionistas-particulares.html`)
    2. Herederos y sucesiones patrimoniales (`herencias-sucesiones.html`)
    3. Docencia universitaria y formación especializada (`docencia-conferencias.html`)
    4. Abogados, notarios y albaceas (`abogados-notarios.html`)
    5. Aseguradoras y Family Offices (`aseguradoras-family-offices.html`)
    6. Arqueología subacuática y pecios históricos (`patrimonio-subacuatico.html`)
  - Definidas keywords long-tail bilingües (ES / EN) y mapeados `<title>` (estrictamente ≤ 60 caracteres) y `<meta description>` (estrictamente ≤ 155 caracteres) con presencia de marca (*Almeida* o *Luis M. Almeida*) y conteos reales Unicode auditados. Eliminada toda contradicción conceptual con el rol en estrado.
- [x] **Subfase 4.3 — Copywriting Editorial de los 6 Nichos (ES / EN):**
  - Redactado `/docs/data/01-estructurado/copy-editorial-nichos.md` con el contenido editorial bilingüe completo de las 6 páginas de nicho: Hero (H1 + subtítulo), Propuesta de Valor y Ética Pericial, Casos Documentados (nombres, fechas e instituciones trazables) y Servicios Periciales Específicos, cerrando cada bloque con CTA + mensaje pre-estructurado de WhatsApp y Formulario.
  - Aplicada regla de Cero Invención (100% trazable a `nichos-servicio.md`, `perfil.md`, `experiencia.md`, `certificaciones.md`, `habilidades.md`, `habilidades-inferidas.md`), cero superlativos vacíos y precisión jurídica en el Nicho 4 (se evita el término no verificado "Expert Witness"/comparecencia en estrado, sustituido por "ratificación pericial ante la autoridad competente").
- [x] **Subfase 4.4 — Copywriting del Home (Viewport 100vh Sin Scroll):**
  - Redactado `/docs/data/01-estructurado/copy-home.md` con el H1/subtítulo de marca, cabecera de navegación, los 7 paneles del Selector Interactivo (Retrato + 6 Nichos, en versión comprimida de 1-2 líneas trazable a `copy-editorial-nichos.md`), el modal/CTA global *Consulta Confidencial* (WhatsApp + Formulario) y el footer mínimo de una línea. Todo bilingüe (ES/EN).
  - Resuelto el `[FALTA: Confirmar credencial definitiva con Luis]` del Panel 1 en `estructura-sitio.md`, usando el dato ya verificado "+40 años de trayectoria pericial" (`perfil.md`).
  - **Sincronización de frases completada:** Sustituidas las 4 frases placeholder por las 5 frases definitivas (Rosenberg, Almeida, Arjona, Leal) en `frases-luis.md`, `i18n-data.js` y el componente de cursor. COMPLETADA.
- [x] **Subfase 4.5 — Consolidación del Glosario Bilingüe i18n (`assets/i18n-data.js`):**
  - Estructuración del archivo JSON/JS definitivo con claves `data-i18n` para todo el ecosistema (Home + 6 páginas de nicho). COMPLETADA.
- [x] **Subfase 4.6 — Especificación de Plantilla Maestra de Páginas de Nicho (`web/plantilla-pagina-nicho.md`):**
  - Documentada la plantilla única reutilizable de 6 bloques fijos para las 6 especialidades: 1. Hero con breadcrumb, 2. El Problema (dolor 2-4 líneas), 3. Alcance del Servicio (grid 3-5 tarjetas + divisor de línea fina), 4. Evidencia / Credibilidad (bloque condicional según trazabilidad real), 5. Pull-Quote (cita textual de Luis con líneas paralelas de acento), 6. CTA Contextual + Interlinking (2 nichos hermanos por página).
  - Mapeo completo de fuentes de datos de `01-estructurado/`, alternancia rítmica de scroll-reveal (L/R) y correspondencia de clases utilitarias de Tailwind CLI homologadas. COMPLETADA.

---

### ⏳ Fase 5: Desarrollo, Infraestructura y Maquetación Modular de la Web (/web/)
> **Directriz CTO:** Desarrollo estático ultra-performante (HTML5 + Tailwind CLI + Vanilla JS), estructurado en cápsulas aisladas de máximo 200-300 líneas para optimizar contexto de IA, con compilación local Node.js (`node compilar.js`). Repositorio limpio listo para sincronización con GitHub.

#### 🏗️ Subfase 5.0 — Infraestructura del Entorno Web y Repositorio (`/web/`)
- [x] **5.0.1 (Estructura de Carpetas & Git Readiness):** Inicializado `/web/` con subdirectorios `/web/plantillas/`, `/web/componentes/`, `/web/assets/` (css, js, img, fonts, icons), `/web/docs/` y archivo `.gitignore` estricto (ignorando `node_modules/`, temporales, etc.).
- [x] **5.0.2 (Entorno Node.js & Tailwind CLI Local):** Configurado `package.json` con scripts de desarrollo y producción (`build`, `dev`, `compile`), `tailwind.config.js` extendido con paleta de marca (`#EAE7E2`, `#2E3238`, `#B08D57`), tipografías (*Alex Brush*, *Source Serif 4*) y utilidades de paneles interactivos. Creados archivos `input.css`, `styles.css`, `animations.css` y el motor de compilación `compilar.js`.
- [x] **5.0.3 (Motor de Compilación Estática `compilar.js`):** Script modular refactorizado con soporte para watch mode, manejo de errores y watchers para plantillas, componentes y CSS.
- [ ] **5.0.4 (Arquitectura CSS Modular):** Crear `input.css` con `@import 'styles.css'` (variables `:root`, resets, utilidades base) y `@import 'animations.css'` (keyframes de cursor, scroll-reveal, líneas progresivas).

#### 📄 Subfase 5.1 — Especificación y Diseño de Páginas Complementarias y Flujos Transversales — COMPLETADA
> **Regla de Jerarquía Visual B2B:** El orden de todos los listados y menús debe ser: 1. Coleccionistas, 2. Docencia, 3. Herencias, 4. Abogados, 5. Aseguradoras, 6. Patrimonio Subacuático.
> **Especificación Maestra:** Consolidada en `web/docs/especificacion-paginas-complementarias.md`.
- [x] **5.1.1 (Página de Error 404 Bilingüe `404.html`):** Especificado diseño on-brand sobrio (fondo `#EAE7E2`, texto `#2E3238`), encabezado editorial, enlaces rápidos a Home y a los 6 nichos en jerarquía B2B, meta tag `noindex, nofollow`.
- [x] **5.1.2 (Páginas Legales B2B & Privacidad GDPR):**
  - `aviso-legal.html`: Identificación profesional de Luis Manuel Almeida, titularidad, propiedad intelectual y límites de responsabilidad técnica.
  - `privacidad.html`: Política clara GDPR-friendly sobre el tratamiento de datos confidenciales enviados mediante el formulario de contacto (cero cesión a terceros, retención mínima para trámite de encargo).
  - *Decisión Analítica Cookieless:* Integración de analítica ligera sin cookies ni rastreo invasivo (Cloudflare Web Analytics / GoatCounter free tier), eliminando la necesidad legal de banner de cookies molesto.
- [x] **5.1.3 (Flujo del Formulario de Contacto & Página de Confirmación):**
  - Integración de endpoint estático gratuito (Formspree / Web3Forms / FormSubmit) con validación HTML5 nativa en cliente.
  - `gracias.html` (página de confirmación post-envío bilingüe con botón de regreso y `noindex`).
  - Fallback automático por script o enlace `mailto:` directo ante cualquier fallo de red o API.
- [x] **5.1.4 (Set de Favicon y Open Graph):**
  - Generación de favicons con la "A" caligráfica en *Alex Brush* (16x16, 32x32, `apple-touch-icon.png`, `site.webmanifest`).
  - Imagen Open Graph (`og-image.webp`, 1200x630px) con paleta oficial y rutas absolutas para WhatsApp, LinkedIn y redes.
- [x] **5.1.5 (Accesibilidad Web & Navegación por Teclado):**
  - Enlace *Skip to content* (`sr-only focus:not-sr-only`).
  - Outline de foco visible y elegante en color acento `#B08D57` (`focus-visible:ring-2 focus-visible:ring-[#B08D57]`).
  - Atributos `aria-label`, `aria-expanded` y soporte de teclado (`Tab`, `Enter`, `Escape`) en el Selector Interactivo y Menú Móvil.
- [x] **5.1.6 (SEO Técnico & Rastreo):**
  - Creado `web/robots.txt` con directivas de rastreo e indicación del sitemap.
  - Creado `web/sitemap.xml` con las 7 URLs públicas (Home + 6 nichos) con `<lastmod>`, `<changefreq>`, `<priority>` yhreflang bilingüe.
  - Mapeo de enlaces cruzados (interlinking) contextual entre nichos complementarios y retorno fluido al Home.

#### 🧩 Subfase 5.2 — Maquetación de Componentes Atómicos (Cápsulas HTML) — COMPLETADA
- [x] **5.2.1 (Cápsula Core UI):**
  - `nav-header.html`: Wordmark en Alex Brush, menú desplegable (Orden Prioridad 1-6), tratamiento `font-semibold` en Nicho #1.
  - `nav-mobile-overlay.html`: Overlay pantalla completa (`fixed inset-0 z-50 bg-[#EAE7E2]`), navegación vertical y cierre `✕`.
  - `footer-home.html`: Footer mínimo de una sola línea para el Home 100vh.
  - `footer-nicho.html`: Footer editorial completo con mapa del sitio, datos legales, contacto e i18n.
  - `modal-contacto.html`: Modal accesible con enlaces directos a WhatsApp y anclaje a Formulario.
- [x] **5.2.2 (Cápsula Home - Hero & Selector Interactivo):**
  - `hero-home.html`: Viewport fijo `100vh` sin scroll vertical.
  - `selector-paneles.html`: Contenedor flex dinámico de 7 paneles (Retrato + 6 Nichos en prioridad 1-6). Nicho #1 expandido por defecto.
  - `canvas-cursor.html`: Capa z-index inferior para líneas finas y frase rotativa en desktop.
- [x] **5.2.3 (Cápsula Páginas de Nicho — 6 Bloques Homologados):**
  - `nicho-hero.html`: Bloque 1 (Breadcrumb superior, H1, subtítulo de posicionamiento, reveal left).
  - `nicho-problema.html`: Bloque 2 (Encuadre del dolor del cliente en 2-4 líneas, borde lateral `#B08D57`, reveal right).
  - `nicho-alcance.html`: Bloque 3 (Grid 3-5 tarjetas técnicas de servicio + divisor fino progresivo, reveal left).
  - `nicho-evidencia.html`: Bloque 4 (Casos periciales documentados e instituciones verificadas, condicional, reveal right).
  - `nicho-pullquote.html`: Bloque 5 (Cita textual de Luis entre líneas finas superior/inferior `#B08D57`, reveal left/center).
  - `nicho-cta-interlinking.html`: Bloque 6 (Llamado a consulta confidencial WhatsApp/Formulario + 2 nichos relacionados, reveal right).
- [x] **5.2.4 (Cápsula Formularios y Páginas Complementarias):**
  - `form-encargo.html`: Formulario formal de encargo pericial confidencial.
  - `contenido-404.html`, `contenido-gracias.html`, `contenido-legal.html`, `contenido-privacidad.html`.

#### ⚡ Subfase 5.3 — Motores de Comportamiento e Interacción (Vanilla JS Modular)
- [x] **5.3.1 (`i18n-core.js`):** Motor ultraligero de traducción por atributos `data-i18n`. Matiz diferenciado para Nicho #5 (ES vs EN). COMPLETADO.
- [x] **5.3.2 (`cursor-hero.js`):** Script de cursor-líneas con interpolación y rotación de frases cada 6s (actualizado a 5 frases numeradas).
- [x] **5.3.3 (`selector-paneles.js`):** Lógica de paneles. Auto-rotación jerárquica (8s Nicho #1 / 5-6s otros). Pausa al hover.
- [x] **5.3.4 (`scroll-reveal.js`):** IntersectionObserver para entrada lateral de textos, revelado de imágenes y dibujo de líneas SVG.
  - [x] **5.3.5 (`app.js`):** Inicialización global, control de apertura/cierre de menú móvil con bloqueo de scroll, gestión de modal y validación de formulario.

#### 🧪 Subfase 5.4 — Integración, Auditoría Técnica y Pre-Lanzamiento
> **Regla de Ejecución:** Para garantizar calidad editorial y técnica, esta subfase se divide en auditorías de "Modelo Flash" (mecánicas/técnicas) y "Modelo Sonnet" (estéticas/editoriales).

- [x] **5.4.0 — Generación de Activos Visuales (Favicons/OG Image):** Creación de archivos faltantes (favicons en SVG y set de 7 thumbnails OG bilingües en WebP) y asociación en las plantillas HTML siguiendo la paleta de marca. COMPLETADA.
    - *Modelo:* Gemini 3.8/3.7 Flash.
    - *Archivos:* `web/assets/icons/`, `web/assets/img/`.
- [x] **5.4.1 — Validación de Build, Rendimiento y Sintaxis:** Ejecución de `node compilar.js`, validación de peso total de bundles (<50kb) y auditoría de sintaxis HTML5/W3C. COMPLETADA.
    - *Modelo:* Gemini 3.8/3.7 Flash.
    - *Archivos:* `web/compilar.js`, `web/tailwind.config.js`, `web/assets/css/input.css`.
- [x] **5.4.2 — Auditoría de Arquitectura, Cobertura i18n y JS Modular:** Verificación de tamaño de componentes (<300 líneas), validación de 100% de tags `data-i18n` y auditoría de scripts modulares (DOMContentLoaded/Event Delegation). COMPLETADA.
    - *Modelo:* Gemini 3.8/3.7 Flash.
    - *Archivos:* `web/assets/i18n-data.js`, `web/assets/i18n-core.js`, `web/componentes/*.html`.
- [x] **5.4.3 — Auditoría Editorial y "Cero Invención" (Perito Strategist):** Auditoría quirúrgica del contenido compilado contra fuentes de verdad.COMPLETADA.
    - *Modelo:* **Claude 3.5 / 3.7 Sonnet (Obligatorio).**
    - *Archivos:* `docs/data/01-estructurado/copy-editorial-nichos.md`, `docs/data/01-estructurado/copy-home.md`, `web/assets/i18n-data.js`.
    - *Prompt:* *"Audita el diccionario `web/assets/i18n-data.js` contra `copy-editorial-nichos.md` y `copy-home.md`. Verifica que no existan discrepancias terminológicas, que se respete la regla de Cero Invención en los casos periciales citados y que no haya adjetivos vacíos de marketing."*
- [x] **5.4.4 — Auditoría de Refinamiento Estético, UX y CSS (Web Architect):** Inspección de acabado premium, coherencia de animaciones (sin zoom invasivo, bordes rectilíneos) y cumplimiento de jerarquía tipográfica.COMPLETADA.
    - *Modelo:* **Claude 3.5 / 3.7 Sonnet (Obligatorio).**
    - *Archivos:* `web/assets/css/styles.css`, `web/assets/css/animations.css`, `web/componentes/selector-paneles.html`, `web/componentes/nav-header.html`.
    - *Prompt:* *"Revisa las hojas de estilo y componentes clave para asegurar un acabado editorial premium digno de una firma internacional de tasación. Confirma que no haya estilos inline, que las transiciones respeten `prefers-reduced-motion` y que el layout 100vh del Home y nichos tengan ritmo visual impecable."*
- [x] **5.4.5 — Checklist Pre-Despliegue y SEO Técnico:** Validación final de `robots.txt`, `sitemap.xml`, canonicals y Open Graph en URLs absolutas.
    - *Modelo:* Gemini 3.8/3.6 Flash.
    - *Archivos:* `web/robots.txt`, `web/sitemap.xml`, `web/plantillas/index.template.html`.

### 🚀 Fase 5.5: Deploy y Dominio en Cloudflare

> **Estrategia de Despliegue:** Se despliega primero en la URL de vista previa gratuita de Cloudflare (`almeida-portafolio.pages.dev`) para auditar la web en vivo y corregir errores de CSS/responsive desde móviles reales. Una vez pulida, se vincula el dominio definitivo `almeidatasacion.com`.

- [x] **5.5.1 — Inicialización de Git Local y Repositorio GitHub:**
  - `[IA]`: Verificación y ajuste de `.gitignore` (para excluir `node_modules/`, temporales, logs y archivos del sistema). Inicialización de Git en local, creación del primer commit y configuración de rama principal `main`.
  - `[Usuario]`: Crear repositorio privado/público en la cuenta de GitHub (`dalmeida.cu@gmail.com`) y copiar la URL remota.
  - `[IA]`: Vincular el remoto y realizar el primer `git push origin main`.

- [x] **5.5.2 — Configuración y Primer Despliegue en Cloudflare Pages (`.pages.dev`):**
  - `[Usuario]`: Entrar al Dashboard de Cloudflare con la cuenta habitual, ir a **Workers & Pages > Create > Pages > Connect to Git** y seleccionar el repositorio `almeida-portafolio`.
  - `[Usuario / Configuración]`: Establecer parámetros de compilación:
    - **Root Directory:** `web`
    - **Build Command:** `node compilar.js` (o `npm run build`)
    - **Build Output Directory:** `.` (o la raíz del módulo `/web/`)
  - `[IA / Usuario]`: Desplegar la primera build y verificar la URL de vista previa asignada (`almeida-portafolio.pages.dev`).

- [ ] **5.5.3 — Depuración Visual, Ajustes de CSS y Nueva Página de Perfil:**
  - `[IA]`: **Optimización de Tarjetas (Bolas) del Home:**
    - Corregir el recorte y centrado del texto en las 6 tarjetas orgánicas del Home. Solucionar el problema de que el texto de la primera tarjeta ("Coleccionistas y Particulares") se vea cortado o apretado en ciertas resoluciones, y asegurar que el resto de las tarjetas (que muestran solo un fragmento corto e invitan a pasar el cursor) tengan un ritmo visual perfecto y armónico.
  - `[IA]`: **Micro-mejoras Estéticas en Móvil:**
    - Añadir un degradado sutil de desvanecimiento lateral en el carrusel de tarjetas móvil (`.cluster-grid::after`) para sugerir visualmente que hay más elementos deslizando hacia la derecha.
    - Incrementar a un límite de 4 líneas el texto resumen de la primera tarjeta en formato móvil para dar mayor peso de entrada al nicho de Coleccionistas.
  - `[IA]`: **Nueva Página de Autoridad "Mi perfil" (`perfil.html`):**
    - **Propósito:** Mostrar las credenciales completas de Luis Manuel Almeida Luis (basado en `cv-moderno-es.md` y `cv-moderno-en.md`) bajo la misma estética editorial de 6 bloques.
    - **Estructura de Bloques:**
      - *Bloque 1 (Hero):* Presentación de Luis M. Almeida con su foto institucional, título y un subtítulo de trayectoria pericial de +40 años.
      - *Bloque 2 (El Problema/Enfoque):* "El valor de la idoneidad: en el peritaje no hay espacio para la conjetura, cada credencial debe ser trazable e independiente."
      - *Bloque 3 (Áreas Técnicas):* Grid de especialidades (derivadas de las 10 áreas del currículum consolidado).
      - *Bloque 4 (Evidencia de Autoridad):* Lista 'exhibit' de logros (20.000 obras registradas, 15 procesos sucesorios de grandes figuras, cooperación con Carabinieri e IBERMUSEOS, conferencias en 15 países).
      - *Bloque 5 (Pull-Quote):* Cita ética destacada sobre la responsabilidad intelectual de proteger el patrimonio.
      - *Bloque 6 (Interlinking cruzado):* Enlaces hacia las 6 especialidades ordenadas en jerarquía oficial B2B (1-6).
    - **Integración y Enrutamiento:**
      - Añadir el enlace "Mi perfil" en el menú del Header (`nav-header.html`), posicionado estratégicamente al final de las especialidades, pero con un estilo más centrado, discreto o sutilmente diferenciado (ej: mayor espacio o peso tipográfico fino).
      - Actualizar `nav-mobile-overlay.html`, `footer-home.html`, `footer-nicho.html` y el `sitemap.xml` / `robots.txt` para incluir la nueva URL de perfil.
  - `[IA + Usuario]`: Cada cambio subido a GitHub con `git push` compilará automáticamente en Cloudflare Pages en ~15 segundos.

- [ ] **5.5.4 — Vinculación del Dominio Definitivo (`almeidatasacion.com`) y DNS:**
  - `[Usuario]`: En Cloudflare Pages, ir a **Custom Domains > Set up a custom domain** e ingresar `almeidatasacion.com`.
  - `[Usuario]`: En el panel del registrador (Hostinger), cambiar los NameServers (servidores de nombres) por los dos indicados por Cloudflare.
  - `[IA / Usuario]`: Verificación del estado SSL/TLS (Certificado Universal HTTPS activo), purga inicial de caché y confirmación de redirecciones relativas/absolutas del sitio.

- [ ] **5.5.5 — Implementación e Infraestructura del Widget Chat IA (Cloudflare Worker & KV):**
  - `[IA]`: Desarrollo del widget a medida según especificaciones de `web/chat-ia.md` (disparador SVG de líneas animadas `#B08D57`, ventana `#EAE7E2`, estilo sin burbujas genéricas, tipografía *Source Serif 4* y mensaje institucional pericial).
  - `[IA / Usuario]`: Creación del Cloudflare Worker y Namespace en Workers KV para almacenar la base de conocimiento pericial de Luis y conectar la API de respuestas.

- [ ] **5.5.6 — Auditoría Final, Créditos y Experiencia Móvil:**
  - `[IA]`: Inclusión y verificación del footer estándar en todas las páginas complementarias (incluyendo crédito a *Trazio Studio*).
  - `[IA + Usuario]`: Auditoría final de rendimiento (Lighthouse), SEO técnico (`sitemap.xml` y `robots.txt` en dominio real) y verificación de experiencia táctil/móvil al 100%.

---

### ⏳ Fase 6: LinkedIn - Copy & Optimización
- [ ] **Subfase 6.1 — Redacción de Titular y Acerca De:** Crear contenido de alto impacto y bilingüe para el perfil profesional de Luis como canal complementario.
