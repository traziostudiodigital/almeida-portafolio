---
name: estructura-sitio
description: Auditor de arquitectura de información y estructura de navegación para el ecosistema web.
mode: all
model: litellm-local/gemini-35-c4
---

# Estructura del Sitio Web — Luis Manuel Almeida Luis

Este documento define la arquitectura de información, la estructura de páginas y la interacción del ecosistema web para Luis Manuel Almeida Luis, siguiendo estrictamente los principios de un portal B2B de máxima autoridad pericial (editorial, sobrio, performante).

---

## 🏛️ 1. Principios Arquitectónicos Fundamentales

1. **Home (Hero Interactivo — Viewport Único Sin Scroll):**
   - El Home se despliega en una sola pantalla fija (`100vh` / `h-screen`), **sin scroll vertical**.
   - Integra el Wordmark *"Almeida"* en tipografía *Alex Brush*, el recurso de cursor-líneas con frases rotativas (desktop), y un **Selector Interactivo Multitarea** (diseño flexible de paneles o carrusel en arco, detallado en la **Sección 5**) para navegar directamente hacia las páginas de nicho, complementado con un footer mínimo de una sola línea.
2. **Páginas de Nicho Independientes (Con Scroll Editorial Completo):**
   - Cada nicho de especialización cuenta con su propio archivo HTML independiente (URL propia, estructura semántica completa, scroll vertical).
   - Cada página de nicho posee metadatos únicos (`<title>`, `<meta name="description">`, `canonical`) y bloque `Schema.org` específico para posicionamiento orgánico B2B.
   - Aplican el paquete de scroll-reveal lateral alternado y líneas separadoras de acento que se dibujan progresivamente.
3. **Módulo Cotizador Desacoplado:**
   - La herramienta de cotización pericial (`/cotizador/`) es un sistema autónomo de uso interno/privado. **No se menciona, no se enlaza ni se referencia en ningún punto del sitio web público.**
4. **Canales de Contacto Directo:**
   - **WhatsApp Directo:** Enlace rápido asistido con mensajes pre-estructurados según el nicho de procedencia.
   - **Formulario al Correo Electrónico:** Formulario formal de encargo confidencial para solicitud de peritajes y dictámenes.
   - *(El asistente/chat IA queda reservado como fase futura de evaluación, inactivo en el copy actual).*

---

## 🧭 2. Mapa del Sitio y Jerarquía de Páginas

```
                              ┌────────────────────────────────────────┐
                             │       HOME (index.html)                │
                             │  Viewport Fijo 100vh — Cero Scroll     │
                             │  Hero + Wordmark + Nav Bilingüe        │
                             └───────────────────┬────────────────────┘
                                                 │
      ┌───────────────┬───────────────┬──────────┴────┬───────────────┬───────────────┐
      ▼               ▼               ▼               ▼               ▼               ▼
[Nicho 1]         [Nicho 2]       [Nicho 3]       [Nicho 4]       [Nicho 5]       [Nicho 6]
coleccionistas.   docencia.       herencias.      abogados.       aseguradoras.   subacuatico.
html              html            html            html            html            html
```

### Detalle de Páginas (Orden de Prioridad Comercial):

| Archivo | Nicho / Propósito | Audiencia Primaria | Tipo de Scroll / Interacción |
| :--- | :--- | :--- | :--- |
| `index.html` | **Home / Portal Principal** | Todo visitante | Viewport fijo 100vh (sin scroll). Selector de 7 paneles. |
| `coleccionistas-particulares.html` | **Nicho 1: Coleccionistas y Particulares** | Propietarios que desean tasar, autenticar o vender obras de arte / antigüedades. | Scroll editorial. Prioridad Máxima. |
| `docencia-conferencias.html` | **Nicho 2: Docencia Universitaria y Formación Especializada** | Universidades, museos, aduanas, cuerpos policiales e instituciones culturales. | Scroll editorial. |
| `herencias-sucesiones.html` | **Nicho 3: Herederos y Sucesiones Patrimoniales** | Familias, herederos en liquidación o trámites ante Hacienda / Notaría. | Scroll editorial. |
| `abogados-notarios.html` | **Nicho 4: Abogados, Notarios y Albaceas** | Despachos legales, juzgados y administradores judiciales. | Scroll editorial. |
| `aseguradoras-family-offices.html` | **Nicho 5: Aseguradoras y Family Offices (Mercado Internacional)** | Compañías de seguros internacionales, tasadores extranjeros, gestores de patrimonio. | Scroll editorial. |
| `patrimonio-subacuatico.html` | **Nicho 6: Arqueología Subacuática y Pecios Históricos** | Instituciones científicas, museos marítimos, entidades patrimoniales. | Scroll editorial. |

---

## 📱 3. Navegación y Menú Móvil

- **Jerarquía Visual:** Los enlaces deben seguir estrictamente el orden de prioridad definido (1 al 6).
- **Header Desktop:**
  - Wordmark *"Almeida"* en `Alex Brush` (con fallback de texto seguro en `Source Serif 4`).
  - Menú de navegación desplegable sobrio (*Especialidades / Nichos*).
  - **Tratamiento Nicho #1:** El enlace a "Coleccionistas y Particulares" puede usar un peso tipográfico sutilmente mayor (`font-semibold` / weight 600) para destacar como área principal.
  - Selector bilingüe (*ES / EN*).
  - CTA formal hacia Contacto (*"Consulta Confidencial"*).
- **Menú Móvil:**
  - **Overlay a pantalla completa** (`fixed inset-0 z-50 bg-[#EAE7E2]`), sin dropdown flotante ni acordeón genérico comprimido.
  - Cabecera con Wordmark *"Almeida"* en `Alex Brush` y botón de cierre fino (`✕`).
  - Desglose de los 6 nichos en lista vertical (prioridad 1 a 6) con tipografía editorial `Source Serif 4`, espaciado amplio y transiciones sutiles.
  - Selector de idioma y accesos directos a WhatsApp y Formulario al pie del overlay.

---

## 📂 4. Convención de Archivos y Componentes

Siguiendo `docs/ARCHITECTURE.md`:
- `/plantillas/`:
  - `index.template.html` (Home viewport fijo)
  - `nicho-coleccionistas.template.html`
  - `nicho-herencias.template.html`
  - `nicho-docencia.template.html`
  - `nicho-abogados.template.html`
  - `nicho-aseguradoras.template.html`
  - `nicho-subacuatico.template.html`
- `/componentes/`:
  - `nav-header.html`
  - `hero-home.html` (con canvas/cursor-líneas)
  - `nicho-hero.html`
  - `nicho-metodologia.html`
  - `nicho-casos.html`
  - `form-contacto.html`
  - `footer.html`
- `/assets/`:
  - `i18n-data.js` (diccionario estructurado ES/EN con etiquetas `data-i18n`)
  - `i18n-core.js` (motor de cambio de idioma)
  - `cursor-hero.js` (cursor-líneas + rotación de frases en Home)
  - `scroll-reveal.js` (IntersectionObserver para páginas de nicho)

---

## 🎨 5. Especificación Detallada del Hero/Selector Interactivo (Home)

El Hero del Home funciona como un **selector interactivo de paneles expandibles** (inspirado en el patrón de kiosco digital de museo o editorial) con el objetivo de presentar de forma inmediata tanto el perfil del perito como sus áreas clave de especialización, sin requerir scroll vertical (`100vh`).

### 🧩 A. Flexibilidad en la Disposición y Geometría
Aunque la propuesta base plantea un diseño de **paneles verticales expandibles**, se reconoce la necesidad de mantener flexibilidad en el layout final. Durante la fase de desarrollo, se evaluará cuál de las siguientes opciones ofrece la mejor armonía visual y experiencia de usuario (UX):
1. **Paneles Verticales Expandibles (Baseline):** Columnas de ancho variable que crecen horizontalmente al activarse.
2. **Selector Semicircular / En Arco:** Un carrusel de transición curva tipo dial editorial o abanico de catálogo físico, que rota sutilmente al interactuar.
3. **Selector Horizontal / Galería Flotante:** Paneles horizontales o tarjetas con transiciones fluidas de elevación.

*Nota:* Independientemente de la forma geométrica final, la lógica de interacción, el tratamiento de las imágenes y la distribución del contenido se regirán bajo los mismos principios aquí definidos.

---

### 🏛️ B. Estructura y Distribución de Paneles (7 Paneles)
Para reflejar la jerarquía visual y comercial solicitada, el selector constará de **7 paneles independientes**:
1. **Panel 1 (Retrato & Perfil):** Introducción fija del perito.
2. **Panel 2 (Nicho 1):** Coleccionistas particulares (Foco principal).
3. **Panel 3 (Nicho 2):** Docencia y conferencias.
4. **Panel 4 (Nicho 3):** Herencias y sucesiones.
5. **Panel 5 (Nicho 4):** Abogados y notarios.
6. **Panel 6 (Nicho 5):** Aseguradoras y family offices (Mercado internacional).
7. **Panel 7 (Nicho 6):** Patrimonio subacuático.

---

### ⚙️ C. Comportamiento y Estados de Interacción

1. **Estado Inicial (On Load):**
   - El **Panel 2 (Coleccionistas particulares)** se muestra **expandido por defecto** al cargar la página, permitiendo que el primer impacto visual comunique el nicho principal de negocio.

2. **Estado Colapsado (Inactivo):**
   - El panel muestra únicamente el título orientador.
   - Tipografía: `Source Serif 4`, peso light (300).
   - Orientación del texto: Vertical o adaptada según layout geométrico.

3. **Estado Expandido (Hover o Foco de Auto-rotación):**
   - El panel activo incrementa su dimensión fluídamente.
   - Revela imagen duotono y micro-copy (1-2 líneas).

4. **Lógica de Auto-rotación Interactiva (Jerarquía por Tiempos):**
   - El selector rota automáticamente con pesos de tiempo desiguales para enfatizar el nicho principal:
     - **Panel Nicho #1 (Coleccionistas):** Permanece expandido **8 segundos**.
     - **Resto de Paneles:** Permanecen expandidos **5 a 6 segundos**.
   - **Pausa de Hover:** Se pausa al detectar el cursor.
   - **Reactivación:** Retoma tras 8 segundos de inactividad del cursor.

5. **Nicho #5 (Aseguradoras - Matiz i18n):**
   - Dado su enfoque internacional, el copy en la versión EN tendrá mayor énfasis comercial, mientras que en la versión ES será más descriptivo de la trayectoria en el extranjero.

6. **Comportamiento en Dispositivos Móviles (Mobile):**
   - Paneles apilados verticalmente.
   - Interacción por `tap/click`. Sin auto-rotación.

7. **Interacción con el Cursor-Líneas Independiente:**
   - Solo visible sobre fondos libres del Home. Se oculta al pasar sobre los paneles.

---

### 📐 D. Footer Mínimo del Home (Viewport Fijo)

A diferencia del footer detallado y con scroll que implementan las páginas de nicho, el Home cuenta con un footer de **una sola línea delgada**:
- Ubicado al pie del viewport fijo, justo debajo del selector de paneles.
- Contenido minimalista: Wordmark discreto en `Source Serif 4` light, año actual e indicación de derechos de propiedad.
- Altura y diseño extremadamente reducidos para garantizar que el selector ocupe el máximo espacio de pantalla vertical útil sin provocar scrollbars.

---

### 🔧 E. Configuración Recomendada de Tailwind CSS
Para soportar el comportamiento dinámico del selector sin sobrecargar los archivos de estilos CSS puros, se sugieren las siguientes utilidades de soporte:

```javascript
// Adiciones recomendadas para tailwind.config.js si se implementa el diseño baseline vertical
module.exports = {
  theme: {
    extend: {
      flexGrow: {
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
      },
      transitionProperty: {
        'width': 'width',
        'flex': 'flex, flex-grow',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.writing-mode-vertical': {
          'writing-mode': 'vertical-rl',
        },
        '.text-orientation-mixed': {
          'text-orientation': 'mixed',
        },
      }
      addUtilities(newUtilities)
    }
  ]
}
```
