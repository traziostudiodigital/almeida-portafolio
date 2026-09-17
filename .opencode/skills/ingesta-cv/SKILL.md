# Skill: Ingesta de Datos de Perfil Profesional (CV)

## Descripción:
Este skill define el proceso de convertir información desordenada del perfil profesional de Luis Manuel Almeida Luis en datos estructurados y verificables. El objetivo es preparar esta información para alimentar una web portafolio en inglés y su perfil de LinkedIn, siguiendo un conjunto estricto de reglas de procesamiento y verificación.

## Reglas Obligatorias para Agentes:

1. **FUENTE DE DATOS:**
   - Los archivos `.md` ya convertidos a texto plano residen en `/docs/data/00-raw/`.
   - Estos archivos son la fuente cruda intocable y **nunca deben ser editados directamente** por el agente.

2. **SALIDA ESTRUCTURADA:**
   - El agente debe clasificar y escribir el contenido limpio y estructurado en `/docs/data/01-estructurado/`.
   - Los archivos de salida deben ser los siguientes:
     - `perfil.md`: Contendrá datos personales, resumen profesional y contacto.
     - `experiencia.md`: Detallará cada trabajo (empresa, cargo, fechas inicio-fin, logros con números/hechos concretos, no adjetivos).
     - `certificaciones.md`: Incluirá títulos, cursos y certificados, con institución y fecha.
     - `habilidades.md`: Cada habilidad debe ir acompañada de evidencia (dónde se aplicó, en qué proyecto o contexto). **Prohibido listar habilidades sueltas sin respaldo.**
     - `tarifas-servicios.md`: Información de cobros/tarifas si aplica, para uso interno, no necesariamente pública.

3. **REGLA DE ORO — CERO INVENCIÓN:**
   - Si un dato no está explícito en la fuente (`00-raw`), el agente **NO debe inferirlo, completarlo ni suponerlo**.
   - Debe escribir literalmente: `[FALTA: <descripción de qué falta>]` en el lugar correspondiente.
   - Adicionalmente, el dato faltante debe ser listado al final del archivo bajo un encabezado "## Preguntas pendientes para Luis".

4. **CERO SUPERLATIVOS SIN RESPALDO:**
   - Está prohibido usar palabras como "experto", "excelente", "líder", "extraordinario", a menos que la fuente cite un hecho que lo sostenga (ej. premio, certificación, años exactos, resultado medible).
   - Si la fuente original usa un superlativo sin respaldo, el agente debe marcarlo con `[VERIFICAR: superlativo sin evidencia — "texto original"]` en lugar de reescribirlo.

5. **TRAZABILIDAD:**
   - Cada dato extraído debe indicar de qué archivo fuente provino.
   - Esta indicación debe ser un comentario HTML al final de cada bloque de información.
   - Ejemplo de formato: `<!-- Fuente: CV_Luis_Manuel_Almeida_Luis.md -->`

6. **IDIOMA:**
   - Los archivos generados en `/docs/data/01-estructurado/` deben ser escritos en **español**.
   - La traducción a inglés para la web es una fase posterior y no debe realizarse en este skill.
