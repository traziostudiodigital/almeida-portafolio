const fs = require('fs');
const path = require('path');

const WEB_DIR = __dirname;
const htmlFiles = fs.readdirSync(WEB_DIR).filter(f => f.endsWith('.html'));

let issuesCount = 0;

console.log('=== AUDITORÍA ESTRUCTURAL Y DE SINTAXIS HTML5 ===\n');

htmlFiles.forEach(file => {
  const filePath = path.join(WEB_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const warnings = [];

  // 1. Verificar si quedaron includes sin procesar
  if (content.includes('@@include')) {
    errors.push('Directiva @@include sin procesar detectada');
  }

  // 2. Verificar DOCTYPE, html, head, body
  if (!content.includes('<!DOCTYPE html>')) errors.push('Falta <!DOCTYPE html>');
  if (!content.includes('<html')) errors.push('Falta etiqueta <html>');
  if (!content.includes('</html>')) errors.push('Falta cierre </html>');
  if (!content.includes('<head>')) errors.push('Falta <head>');
  if (!content.includes('</head>')) errors.push('Falta </head>');
  if (!content.includes('<body')) errors.push('Falta <body>');
  if (!content.includes('</body>')) errors.push('Falta </body>');

  // 3. Meta tags esenciales
  if (!content.includes('charset="UTF-8"') && !content.includes("charset='UTF-8'") && !content.includes('charset=UTF-8')) {
    errors.push('Falta meta charset');
  }
  if (!content.includes('name="viewport"')) {
    errors.push('Falta meta viewport');
  }
  if (!content.includes('<title')) {
    errors.push('Falta etiqueta <title>');
  }
  if (!content.includes('name="description"')) {
    warnings.push('No se encontró meta description (evaluar si aplica)');
  }

  // 4. H1 check
  const h1Matches = content.match(/<h1[\s>]/g) || [];
  if (h1Matches.length === 0) {
    warnings.push('No contiene etiqueta <h1>');
  } else if (h1Matches.length > 1) {
    warnings.push(`Contiene más de un <h1> (${h1Matches.length} encontrados)`);
  }

  // 5. Duplicados de ID
  const idRegex = /\sid=["']([^"']+)["']/g;
  const ids = {};
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    const id = match[1];
    ids[id] = (ids[id] || 0) + 1;
  }
  Object.keys(ids).forEach(id => {
    if (ids[id] > 1) {
      errors.push(`ID duplicado en el documento: #${id} (${ids[id]} veces)`);
    }
  });

  // 6. Balanceo de etiquetas principales
  const tagsToCheck = ['main', 'header', 'footer', 'nav', 'form', 'section', 'article', 'script'];
  tagsToCheck.forEach(tag => {
    const opens = (content.match(new RegExp('<' + tag + '[\\s>]', 'g')) || []).length;
    const closes = (content.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    if (opens !== closes) {
      errors.push(`Etiqueta <${tag}> desbalanceada: ${opens} aperturas vs ${closes} cierres`);
    }
  });

  // 7. Atributos alt en imágenes
  const imgRegex = /<img\b(?![^>]*\balt=)[^>]*>/gi;
  const imgsWithoutAlt = content.match(imgRegex) || [];
  if (imgsWithoutAlt.length > 0) {
    warnings.push(`${imgsWithoutAlt.length} etiqueta(s) <img> sin atributo alt`);
  }

  // Imprimir resultado del archivo
  if (errors.length === 0 && warnings.length === 0) {
    console.log(`✓ ${file.padEnd(35)} [OK - Impecable]`);
  } else {
    console.log(`⚠ ${file.padEnd(35)} [Requiere atención]`);
    errors.forEach(e => { console.log(`   ❌ ERROR: ${e}`); issuesCount++; });
    warnings.forEach(w => { console.log(`   ⚠️  WARN:  ${w}`); });
  }
});

console.log(`\nTotal de errores bloqueantes detectados: ${issuesCount}`);
