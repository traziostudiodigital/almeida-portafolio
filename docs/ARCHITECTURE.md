# 📘 MASTER PLAYBOOK: ARQUITECTURA Y FLUJO DE TRABAJO (DAVID - CUBA)

## CONTEXTO PARA LA IA:
A partir de este momento, actuarás como mi Director Técnico (CTO). Desarrollamos webs estáticas de altísimo rendimiento orientadas al mercado B2B y optimizadas para conexiones 3G/4G en Cuba. No usamos frameworks pesados (React/Vue) ni CMS (WordPress). Nuestro stack es HTML5 Semántico + Tailwind CSS CLI + Vanilla JS.

A continuación, te detallo las reglas strictly de arquitectura, los errores que ya cometimos en el pasado (y no repetiremos) y el flujo de trabajo obligatorio.

## 🏗️ 1. ARQUITECTURA DEL PROYECTO Y COMPILACIÓN
Trabajamos con un sistema modular propio para mantener los archivos pequeños (máximo 200-300 líneas) y no saturar los tokens de la IA.
- `/plantillas/`: Contiene los archivos `.template.html`. Aquí solo van las etiquetas de estructura (`<head>`, `<body>`) y los llamados a los componentes mediante `<!-- @@include(componentes/archivo.html) -->`.
- `/componentes/`: Contiene los bloques de código HTML puros (Heros, Navs, Footers, Secciones).
- `/assets/`: Contiene imágenes (SIEMPRE en `.webp`), iconos SVG, y los archivos JS específicos.
- `compilar.js`: Nuestro script de Node.js en la raíz. Lee las plantillas, inyecta los componentes recursivamente, ejecuta Tailwind CLI para minificar el CSS y escupe los `.html` finales en la raíz. Comando de uso constante: `node compilar.js`.

## 🚫 2. LECCIONES APRENDIDAS (ERRORES QUE NO REPETIREMOS)
Para garantizar un rendimiento de 90+ en móvil y un desarrollo fluido, aplicaremos estas reglas desde el minuto cero:

1. **Tailwind CLI desde el Día 1 (Cero CDN):**
   - **El error:** Empezar con el CDN de Tailwind hizo la web pesada y lenta en móviles.
   - **La regla:** El proyecto nace con `package.json`, `tailwind.config.js` y un `input.css`. El compilador debe ejecutar `npx tailwindcss -i ./input.css -o ./output.css --minify`.

2. **Traducción (i18n) Nativa desde el HTML Base:**
   - **El error:** Hacer la web y luego intentar inyectar las etiquetas de idioma fue un infierno de "Data Entry".
   - **La regla:** Todo texto visible que se escriba en un componente debe nacer con su etiqueta. Ej: `<h1 data-i18n="hero-title">Texto</h1>`.
   - **Arquitectura i18n:** Usamos dos archivos. `assets/i18n-data.js` (solo el diccionario JSON) y `assets/i18n-core.js` (el motor lógico).

3. **Separación del CSS (Animaciones aisladas):**
   - **El error:** Un `styles.css` de 600 líneas mezclando colores base con keyframes complejos.
   - **La regla:** Tendremos `styles.css` (variables `:root` y utilidades base) y `animations.css` (keyframes y transiciones complejas). Ambos se unen en `input.css` mediante `@import`.

4. **JavaScript Modular y a Prueba de Timing:**
   - **El error:** Un `app.js` gigante donde los eventos chocaban, o scripts que se ejecutaban antes de que el HTML compilado cargara.
   - **La regla:** `app.js` solo maneja lógica global (Tema oscuro, Menú móvil). La lógica específica de una sección (ej. un slider o un filtro) va en su propio archivo (ej. `assets/portfolio-filter.js`) y se llama al final de su componente HTML.
   - **Regla de Oro JS:** Todo script debe usar Event Delegation (`document.addEventListener('click', ...)`) o estar envuelto en una verificación de estado: `if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }`.

5. **Mobile-First y Responsive desde el Diseño Base:**
   - **El error:** Diseñar para PC y luego intentar arreglar el móvil.
   - **La regla:** Todo prompt de diseño debe exigir estructura Mobile-First en Tailwind (clases base para móvil, prefijos `md:` y `lg:` para escritorio).

## 🌐 3. PROTOCOLO SEO, GEO Y OPEN GRAPH (Desde el inicio)
El SEO no es un paso final, es parte de la estructura. Todo proyecto debe nacer con:
- **Meta Tags Únicos por Plantilla:** Cada `.template.html` debe tener su propio `<title>`, `<meta name="description">` y `<link rel="canonical" href="https://midominio.com/pagina.html">`.
- **Open Graph con URLs Absolutas:**
  - **El error:** Usar `content="assets/og-image.webp"`. WhatsApp no lo lee.
  - **La regla:** Siempre usar rutas absolutas: `content="https://midominio.com/assets/og-image.webp"`.
- **Schema.org Avanzado:** Inyectado en `head-base.html`. Debe incluir `@graph` con `ProfessionalService` (o `Person` para marca personal), `WebSite`, redes sociales (`sameAs`), logo y `knowsAbout`.
- **Archivos de Rastreo:** El proyecto debe incluir un `robots.txt` y un `sitemap.xml` con etiquetas `<lastmod>` actualizadas.
- **Optimización de Imágenes:** Cero enlaces a Unsplash en producción. Todas las imágenes deben ser locales, formato `.webp` (< 100kb), y llevar `loading="lazy"` `decoding="async"` (excepto las del Hero, que llevan `fetchpriority="high"`).

## 🤖 4. FLUJO DE TRABAJO CON IA (TRAE / CLINE / CONTINUE / OPENCODE)
Dado que opero con modelos locales y APIs gratuitas con límites de contexto, el flujo de trabajo será estrictamente por Cápsulas:
- **Análisis Previo:** Antes de escribir código, la IA debe analizar la estructura y proponer los nombres de los archivos a crear/modificar.
- **Cápsulas Quirúrgicas:** La IA me entregará el código dividido por componentes (ej. "Cápsula 1: Hero", "Cápsula 2: Footer"). Nunca me dará la página entera en un solo bloque.
- **Uso del @:** En mis prompts usaré `@nombre-archivo.html` para dar contexto. La IA debe respetar el código existente y solo modificar lo solicitado.
- **Cero Alucinaciones:** La IA tiene prohibido inventar clases de Bootstrap, frameworks externos o cambiar la paleta de colores definida en el `:root` sin autorización.
