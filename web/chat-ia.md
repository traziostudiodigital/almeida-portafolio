# 💬 ESPECIFICACIÓN DE DISEÑO: WIDGET DE CHAT IA

El widget de chat IA debe ser una pieza de software a medida, alineada con la identidad visual de "Almeida". No debe utilizar librerías de widgets de chat genéricos ni el diseño visual "burbuja" estándar de la industria.

## 1. ICONO DE DISPARO (Trigger)
- **Concepto:** Representación de nodo/constelación de líneas finas.
- **Forma:** Circular, diámetro compacto (aprox. 48px).
- **Estilo:** Líneas SVG animadas con `stroke-dasharray` para simular un trazado constante y sutil en loop lento.
- **Color:** Paleta definida (`#B08D57` para las líneas sobre fondo `#2E3238` o viceversa según contraste).
- **Comportamiento:** Al pasar el cursor (hover), las líneas deben intensificarse levemente o acelerar su rotación.

## 2. VENTANA DEL CHAT (Interfaz)
- **Estética:** Extensión coherente del portafolio.
- **Paleta:** Fondo principal `#EAE7E2`, bordes y acentos `#B08D57`, texto `#2E3238`.
- **Tipografía:** *Source Serif 4* (peso 300 para texto cuerpo, 600 para títulos/nombres).
- **Elementos UI:** 
    - Separadores de mensajes mediante líneas finas (`1px`), no burbujas.
    - Cero elementos de chat genérico (sin iconos de "emojis", sin burbujas tipo WhatsApp).
- **Header:**
    - Texto explicativo explícito: *"Consulta pericial — IA entrenada con el archivo profesional de Almeida"*.
    - Debe ser claro, institucional y sobrio.

## 3. IDENTIDAD TÉCNICA
- El usuario debe percibirlo como una herramienta de consulta de alto valor, no como un chat de atención al cliente. El tono del mensaje de bienvenida debe ser: *"Consulte información sobre metodologías de tasación, nichos de mercado o historia del arte. Asistente técnico del ecosistema Almeida."*
