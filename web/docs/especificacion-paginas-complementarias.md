# 📐 ESPECIFICACIÓN TÉCNICA Y DISEÑO DE PÁGINAS COMPLEMENTARIAS Y FLUJOS TRANSVERSALES (SUBFASE 5.1) — LUIS MANUEL ALMEIDA LUIS

> **Documento:** Especificación Arquitectónica y Dirección Técnica B2B para Páginas Complementarias, Legal, SEO Técnico y Accesibilidad.
> **Destino:** Ecosistema Web Estático (`/web/`).
> **Rol:** CTO & Web Architect (Autoridad Editorial, Máximo Rendimiento 3G/4G, Cero Invención).

---

## 🏛️ 1. Visión General y Jerarquía B2B

La Subfase 5.1 establece la infraestructura de páginas secundarias, privacidad, confirmación de contacto, asset de favicons/OG y metadatos de rastreo SEO técnico.

### ⚖️ Regla de Jerarquía Visual B2B Invariable
Cualquier menú, listado o bloque de navegación que enumere los nichos de especialización dentro de estas páginas complementarias **debe seguir estrictamente la taxonomía oficial en este orden**:
1. Coleccionistas Privados y Particulares (`coleccionistas-particulares.html`)
2. Docencia Universitaria y Formación Especializada (`docencia-conferencias.html`)
3. Herederos y Sucesiones Patrimoniales (`herencias-sucesiones.html`)
4. Abogados, Notarios y Albaceas (`abogados-notarios.html`)
5. Aseguradoras y Family Offices (`aseguradoras-family-offices.html`)
6. Arqueología Subacuática y Pecios Históricos (`patrimonio-subacuatico.html`)

---

## 📄 2. ESPECIFICACIONES POR COMPONENTE (5.1.1 — 5.1.6)

---

### 🚫 5.1.1 — Página de Error 404 Bilingüe (`404.html`)

- **Propósito:** Ofrecer una salida limpia, sobria y orientada a la navegación pericial ante URLs rotas o inexistentes.
- **Indexación:** `<meta name="robots" content="noindex, nofollow">`.
- **Diseño & Paleta:** 
  - Fondo: `#EAE7E2` (`bg-[#EAE7E2]`)
  - Texto: `#2E3238` (`text-[#2E3238]`)
  - Acento: `#B08D57` (`text-[#B08D57]`, `border-[#B08D57]`)
  - Tipografía: *Source Serif 4* para el cuerpo/titulares, *Alex Brush* para el wordmark "Almeida".
- **Estructura Editorial:**
  - **Header Mínimo:** Wordmark *Almeida* + Selector de idioma (ES/EN).
  - **Hero 404:** 
    - Código numérico sutil: `404` (`text-6xl font-light text-[#B08D57]/60 tracking-widest`).
    - Titular ES: *"Documento o página no encontrada"* / EN: *"Document or page not found"*.
    - Mensaje ES: *"El recurso solicitado no se encuentra disponible o ha sido reubicado. Le invitamos a explorar nuestras áreas de especialización pericial."* / EN: *"The requested resource is unavailable or has been relocated. We invite you to explore our expert appraisal specializations."*
  - **Malla de Acceso Directo (Jerarquía 1-6):**
    - Enlace destacado a Inicio (`index.html`).
    - Grid 2x3 o lista ordenada con los 6 nichos en prioridad oficial.
  - **Footer Mínimo:** Derechos reservados y contacto directo (`luisluisalmeida58@gmail.com`).

---

### ⚖️ 5.1.2 — Páginas Legales B2B & Privacidad GDPR (`aviso-legal.html` y `privacidad.html`)

#### 1. Aviso Legal (`aviso-legal.html`)
- **Indexación:** `<meta name="robots" content="noindex, follow">`.
- **Datos Verificados del Titular (Cero Invención):**
  - **Titular:** Luis Manuel Almeida Luis.
  - **Título / Rol:** Especialista en Patrimonio Cultural y Tasación de Obras de Arte.
  - **Ubicación / Domicilio:** La Habana, Cuba.
  - **Correo electrónico de contacto:** `luisluisalmeida58@gmail.com`.
  - **Nota:** El contacto se realiza principalmente por correo electrónico.
- **Cláusulas Principales:**
  1. *Propiedad Intelectual:* Los textos, metodologías y contenidos de este sitio son propiedad exclusiva de Luis Manuel Almeida Luis. Prohibida la reproducción total o parcial sin autorización.
  2. *Naturaleza Informativa de la Web:* Los contenidos presentados revisten carácter informativo sobre los servicios de tasación y peritaje. Ningún contenido web constituye por sí solo un dictamen formal.
  3. *Carácter Oficial del Entregable:* La validez técnica y probatoria de una tasación requiere la firma y emisión formal de una Hoja de Encargo / Dictamen Pericial debidamente suscrito.
  4. *Limitación de Responsabilidad:* El titular no se hace responsable del uso indebido o interpretaciones no autorizadas de las informaciones contenidas en la plataforma.

#### 2. Política de Privacidad & Protección de Datos (`privacidad.html`)
- **Indexación:** `<meta name="robots" content="noindex, follow">`.
- **Principios GDPR B2B & Confidencialidad:**
  1. *Confidencialidad Absoluta:* La información suministrada sobre piezas de arte, acervos familiares o colecciones privadas se tratará bajo estricto secreto profesional pericial.
  2. *Cero Cesión a Terceros:* Los datos recopilados mediante formulario o comunicación directa nunca serán vendidos, alquilados ni transferidos a ninguna entidad externa.
  3. *Uso Exclusivo:* Los datos recogidos (nombre, correo, teléfono, descripción del encargo) se emplearán únicamente para la evaluación preliminar y comunicación del presupuesto/encargo pericial.
  4. *Retención Mínima:* Los datos se conservarán exclusivamente el tiempo indispensable para procesar la solicitud o cumplir exigencias legales y procesales.
  5. *Derechos del Usuario:* Posibilidad de solicitar rectificación o eliminación de sus datos de contacto enviando un correo a `luisluisalmeida58@gmail.com`.

#### 3. Estrategia de Analítica Cookieless (Cero Banner de Cookies)
- **Implementación:** Se adopta un motor de analítica ligera **sin cookies ni rastreo personal** (ej. Cloudflare Web Analytics / GoatCounter free tier).
- **Ventaja Técnica & UX:** Al no depositar cookies de seguimiento publicitario ni almacenar IPs de forma persistente, el ecosistema **carece legalmente de la necesidad de mostrar molestos banners o popups de cookies**, garantizando una experiencia visual de lujo, pulcra e ininterrumpida desde el primer segundo de carga.

---

### 📩 5.1.3 — Flujo del Formulario de Contacto & Página de Confirmación (`gracias.html`)

#### 1. Formulario Formal de Encargo (`form-encargo.html` / Modal)
- **Endpoint Gratuito Integrado:** Soporte para Formspree / Web3Forms / FormSubmit con envío vía `POST` codificado en UTF-8.
- **Campos del Formulario:**
  - `nombre` (input text, required)
  - `email` (input email, required)
  - `telefono` (input tel, optional)
  - `nicho_interes` (select / radio buttons con los 6 nichos en orden 1-6)
  - `mensaje` (textarea, required)
  - `_gotcha` / honeypot (input text oculto anti-spam)
- **Validación Client-Side Nativa:** Atributos HTML5 (`required`, `pattern`, `minlength`) con mensajes custom vía JS.
- **Fallback Automático (Cero Pérdida de Contacto):** Si la API del endpoint estático falla o la conexión 3G interrumpe la petición `fetch`, un script de contingencia abre un enlace mailto directo con los datos precargados:
  `mailto:luisluisalmeida58@gmail.com?subject=Consulta%20Pericial&body=...`

#### 2. Página de Confirmación Post-Envío (`gracias.html`)
- **Indexación:** `<meta name="robots" content="noindex, nofollow">`.
- **Mensaje Bilingüe:**
  - Titular ES: *"Consulta Recibida con Éxito"* / EN: *"Inquiry Received Successfully"*.
  - Subtítulo ES: *"Gracias por contactar. Su solicitud será evaluada con la más absoluta confidencialidad pericial en un plazo máximo de 24-48 horas hábiles."* / EN: *"Thank you for reaching out. Your request will be evaluated under strict appraisal confidentiality within 24-48 business hours."*
- **Acciones Post-Envío:**
   - Botón principal: Regresar al Inicio (`index.html`).
   - Botón secundario: Contacto urgente mediante correo electrónico (luisluisalmeida58@gmail.com).

---

### 🎨 5.1.4 — Set de Favicon y Open Graph

#### 1. Set de Favicons On-Brand
- **Estilo Visual:** Monograma con la "A" estilizada en tipografía *Alex Brush* / acento metálico `#B08D57` sobre fondo `#2E3238` o transparente.
- **Especificación de Archivos:**
  - `/assets/icons/favicon.ico` (multi-resolución 16x16, 32x32)
  - `/assets/icons/favicon.svg` (vectorial escalable)
  - `/assets/icons/icon-192.png` y `/assets/icons/icon-512.png`
  - `/assets/icons/apple-touch-icon.png` (180x180px)
  - `/site.webmanifest` (Manifiesto PWA/Web App)

#### 2. Open Graph & Twitter Cards (`og-image.webp`)
- **Especificación:**
  - Imagen `og-image.webp` (1200x630px), comprimida en WebP local (< 80 KB).
  - Fondo `#EAE7E2` con marco sutil `#2E3238`, monograma "Almeida", titulación *"Luis Manuel Almeida | Perito Tasador de Arte y Bienes Culturales"*.
- **Rutas Absolutas Estrictas (Meta Tags):**
  - `og:image` -> `https://almeidatasacion.com/assets/img/og-image.webp`
  - `twitter:image` -> `https://almeidatasacion.com/assets/img/og-image.webp`

---

### ♿ 5.1.5 — Accesibilidad Web & Navegación por Teclado

- **Skip to Content:** 
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B08D57] focus:text-white focus:text-sm font-base tracking-wider uppercase rounded-sm transition-all">
    Saltar al contenido principal / Skip to main content
  </a>
  ```
- **Outline de Foco Visible (Focus Ring):**
  - Ningún elemento interactivo (`<a>`, `<button>`, `<input>`, `<select>`) tendrá `outline: none` sin sustituto.
  - Clases Tailwind homologadas: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAE7E2]`.
- **Atributos ARIA y Semántica Keyboard:**
  - Selector Interactivo de Nichos y Menú Móvil: uso estricto de `aria-expanded="false/true"`, `aria-label`, `aria-controls` y soporte para teclas `Escape` (cerrar menú/modal), `Tab` (navegación secuencial) y `Enter` / `Space` (activación).

---

### 🌐 5.1.6 — SEO Técnico & Rastreo (`robots.txt` y `sitemap.xml`)

#### 1. `robots.txt`
```txt
# robots.txt para almeidatasacion.com
User-agent: *
Allow: /
Disallow: /404.html
Disallow: /gracias.html
Disallow: /aviso-legal.html
Disallow: /privacidad.html

Sitemap: https://almeidatasacion.com/sitemap.xml
```

#### 2. `sitemap.xml` (7 URLs Principales + Canonicals)
Declara únicamente las 7 páginas públicas principales con prioridad SEO auditada:
- `index.html` (priority 1.0)
- `coleccionistas-particulares.html` (priority 0.9)
- `docencia-conferencias.html` (priority 0.8)
- `herencias-sucesiones.html` (priority 0.8)
- `abogados-notarios.html` (priority 0.8)
- `aseguradoras-family-offices.html` (priority 0.8)
- `patrimonio-subacuatico.html` (priority 0.8)

---

### 🦶 5.1.7 — Footer Estándar y Créditos (`footer-estandar.html`)
- **Uso:** Todas las páginas del ecosistema, EXCEPTO el Home (que utiliza `footer-home.html`).
- **Estructura Editorial:**
  - Bloque de navegación (Mapa de sitio) con enlace a Home y los 6 nichos (jerarquía oficial 1-6).
  - Bloque de datos legales: Aviso Legal, Política de Privacidad, Contacto.
  - **Línea de Crédito:** Línea final discreta en `Source Serif 4`, peso `300`, tamaño `xs` (`text-xs font-light tracking-wide`): 
    *"Desarrollado por Trazio Studio"* (Enlace a `traziostudio.com`, con subrayado que se dibuja mediante CSS progresivo en hover).
- **Visual:** Sutil, discreto, sin competencia visual con el contenido pericial.

## 🛠️ 3. RECOMENDACIONES DE MODELOS IA Y ESTRATEGIA DE DELEGACIÓN

Para no saturar modelos costosos ni agotar presupuestos/tokens en la ejecución de las subfases restantes de la Fase 5, se define el siguiente protocolo de modelos:

| Subfase | Tarea Concreta | Complejidad / Riesgo | Modelo Recomendado | Notas & Puntos de Atención |
| :--- | :--- | :---: | :--- | :--- |
| **5.1** | Páginas Complementarias (`404`, Legal, Gracias, SEO Técnico) | **Bajo-Medio** | **Gemini Flash (3.1 Lite / 3.5 / 3.6)** | Generación HTML/XML/manifest basada en esta especificación. Estructuras legales predecibles y HTML limpio. |
| **5.2** | Maquetación de Cápsulas HTML (`/componentes/` y `/plantillas/`) | **Bajo-Medio** | **Gemini Flash (2.5 / 3.5 / 3.7)** | Maquetación HTML5 + Tailwind CLI repetitiva. Rápida y económica. Mantener tags `data-i18n`. |
| **5.3** | Módulos Vanilla JS (`i18n-core`, `cursor-hero`, `selector-paneles`, `scroll-reveal`) | **Medio-Alto** | **Laguna xs21 / DeepSeek v4 / Nemotron** (o GPT-4o / Claude si requiere precisión DOM) | Lógica de eventos, timing, IntersectionObserver y rotación. **Atención:** Evitar memory leaks en watchers y asegurar fallback mobile. |
| **5.4** | Ensamblaje, Tests 3G/4G y Audit Final | **Alto** | **Claude Sonnet (Obligatorio)** | Auditoría de compilación, rendimiento, accesibilidad y Cero Invención visual/editorial antes de producción. |

---
