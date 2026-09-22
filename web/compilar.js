const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const WEB_DIR = __dirname;
const COMPONENTES_DIR = path.join(WEB_DIR, 'componentes');
const PLANTILLAS_DIR = path.join(WEB_DIR, 'plantillas');

function getTemplateFiles() {
  if (!fs.existsSync(PLANTILLAS_DIR)) {
    console.warn('Carpeta de plantillas no existe');
    return [];
  }
  const files = fs.readdirSync(PLANTILLAS_DIR).filter(f => f.endsWith('.template.html'));
  return files;
}

function readComponent(componentPath) {
  if (fs.existsSync(componentPath)) {
    return fs.readFileSync(componentPath, 'utf8');
  }
  console.warn(`Componente no encontrado: ${componentPath}`);
  return '';
}

function processIncludes(content) {
  const includeRegex = /<!-- @@include\(\s*([^\s,\)]+)(?:\s*,\s*(\{[\s\S]*?\}))?\s*\) -->/g;
  
  // Procesamiento recursivo mediante replace con callback
  return content.replace(includeRegex, (match, filePath, jsonArgs) => {
    const componentPath = path.join(COMPONENTES_DIR, filePath.trim());
    let componentContent = readComponent(componentPath);
    
    if (jsonArgs) {
      try {
        const params = JSON.parse(jsonArgs);
        for (const [key, val] of Object.entries(params)) {
          const varRegex = new RegExp(`@@${key}`, 'g');
          componentContent = componentContent.replace(varRegex, val);
        }
      } catch (e) {
        console.warn(`Error parseando argumentos para ${filePath}:`, e.message);
      }
    }
    
    // Si el componente tiene sus propios includes, los procesamos recursivamente
    return processIncludes(componentContent);
  });
}

function compileTailwind(signal) {
  return new Promise((resolve, reject) => {
    const cmd = 'npx tailwindcss -i ./assets/css/input.css -o ./output.css --minify';
    
    if (signal === 'watch') {
      const child = exec(cmd, { cwd: WEB_DIR });
      
      child.stdout.on('data', (data) => {
        console.log(`[Tailwind] ${data}`);
      });
      
      child.stderr.on('data', (data) => {
        console.error(`[Tailwind Error] ${data}`);
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          console.log('Tailwind CSS compilado correctamente');
        }
        resolve();
      });
      
      // Para watch mode, resolvemos inmediatamente
      resolve();
    } else {
      exec(cmd, { cwd: WEB_DIR }, (error, stdout, stderr) => {
        if (error) {
          console.error('Error compilando Tailwind:', stderr);
          reject(error);
          return;
        }
        console.log('Tailwind CSS compilado correctamente');
        resolve();
      });
    }
  });
}

async function compileTemplates() {
  const templates = getTemplateFiles();
  
  if (templates.length === 0) {
    console.log('No se encontraron plantillas para compilar');
    return;
  }
  
  for (const templateFile of templates) {
    try {
      const templatePath = path.join(PLANTILLAS_DIR, templateFile);
      const content = fs.readFileSync(templatePath, 'utf8');
      const processed = processIncludes(content);
      
      const outputFile = path.join(WEB_DIR, templateFile.replace('.template.html', '.html'));
      fs.writeFileSync(outputFile, processed);
      
      console.log(`✓ Compilado: ${templateFile} -> ${path.basename(outputFile)}`);
    } catch (err) {
      console.error(`Error procesando ${templateFile}:`, err.message);
    }
  }
  
  await compileTailwind();
  console.log('Compilación completada');
}

// Manejo de argumentos
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

if (isWatchMode) {
  console.log('Modo Watch activado...');
  
  // Watcher para plantillas
  fs.watch(PLANTILLAS_DIR, (eventType, filename) => {
    if (filename && filename.endsWith('.template.html')) {
      console.log(`\n[Watch] Archivo modificado: ${filename}`);
      compileTemplates().catch(console.error);
    }
  });
  
  // Watcher para componentes
  fs.watch(COMPONENTES_DIR, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
      console.log(`\n[Watch] Componente modificado: ${filename}`);
      compileTemplates().catch(console.error);
    }
  });
  
  // Watcher para CSS
  fs.watch(path.join(WEB_DIR, 'assets', 'css'), (eventType, filename) => {
    if (filename && (filename.endsWith('.css') || filename.endsWith('.js'))) {
      console.log(`\n[Watch] Archivo CSS modificado: ${filename}`);
      compileTailwind().catch(console.error);
    }
  });
  
  // Compilación inicial
  compileTemplates().catch(err => {
    console.error('Error en compilación inicial:', err);
    process.exit(1);
  });
} else {
  compileTemplates().catch(err => {
    console.error('Error en compilación:', err);
    process.exit(1);
  });
}