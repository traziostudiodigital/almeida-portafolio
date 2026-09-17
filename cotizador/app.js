const CONFIG_PATH = 'tarifas_config.json';
const CURRENCY_SYMBOLS = { EUR: '€', USD: '$' };

let config = null;
let cotizacionData = {
  cliente: { nombre: '', documento: '', direccion: '', contacto: '' },
  moneda: 'EUR',
  nicho: '',
  modalidad: 'M1',
  numeroObras: 1,
  horasEstimadas: 0,
  valorPiezas: 0,
  formalidad: 'certificado_simple',
  complejidad: 'contemporaneo',
  urgencia: 'estandar',
  visitaLocal: true,
  gastosExtras: 0,
  notasParticulares: []
};

async function cargarConfiguracion() {
  try {
    const response = await fetch(CONFIG_PATH);
    if (!response.ok) throw new Error('No se pudo cargar tarifas_config.json');
    config = await response.json();
    cotizacionData.moneda = config.configuracion_economica.moneda_defecto;
    inicializarFormularioDesdeInput();
    renderizarSelects();
    actualizarResumen();
  } catch (error) {
    console.error('Error cargando configuración:', error);
    mostrarMensajeError('Error al cargar la configuración de tarifas.');
  }
}

function obtenerIdFechaPersonalizada() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const ano = hoy.getFullYear();
  return `${dia} de ${mesNombre(hoy.getMonth())} de ${ano}`;
}

function mesNombre(mes) {
  const nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return nombres[mes];
}

function renderizarSelects() {
  if (!config) return;
  
  const nichoSelect = document.getElementById('nicho-servicio');
  if (nichoSelect) {
    nichoSelect.innerHTML = '<option value="">Seleccionar nicho...</option>' + config.nichos_servicio.map(n => 
      `<option value="${n.id}">${n.nombre}</option>`
    ).join('');
  }

  // Modalidad se define en HTML, pero actualizamos por si acaso
  const modalidadSelect = document.getElementById('modalidad');
  if (modalidadSelect) {
    modalidadSelect.innerHTML = `
      <option value="M1">M1: Por Horas</option>
      <option value="M2">M2: Por Pieza</option>
      <option value="M3">M3: Por Expediente</option>
      <option value="M4">M4: Por Proyecto</option>
    `;
  }

  // Factores de ponderación desde config
  const factorSelects = [
    { id: 'formalidad', data: config.factores_ponderacion.formalidad },
    { id: 'complejidad', data: config.factores_ponderacion.complejidad },
    { id: 'urgencia', data: config.factores_ponderacion.urgencia }
  ];
  
  factorSelects.forEach(({ id, data }) => {
    const sel = document.getElementById(id);
    if (sel && Array.isArray(data)) {
      sel.innerHTML = '<option value="">Seleccionar...</option>' + data.map(c => 
        `<option value="${c.id}">${c.etiqueta} (x${c.factor})</option>`
      ).join('');
    }
  });
}

function inicializarFormularioDesdeInput() {
  document.getElementById('cliente-nombre-input').value = '';
  document.getElementById('cliente-doc-input').value = '';
  document.getElementById('cliente-direccion-input').value = '';
  document.getElementById('cliente-contacto-input').value = '';
  document.getElementById('horasEstimadas').value = '';
  document.getElementById('numero-obras').value = '1';
  document.getElementById('valorPiezas').value = '';
  document.getElementById('gastos-extras').value = '';
  document.getElementById('notas-particulares').value = '';
  document.getElementById('visita-local').checked = true;
}

function leerDatosFormulario() {
  if (!config) return;
  
  cotizacionData.cliente.nombre = document.getElementById('cliente-nombre-input').value;
  cotizacionData.cliente.documento = document.getElementById('cliente-doc-input').value;
  cotizacionData.cliente.direccion = document.getElementById('cliente-direccion-input').value;
  cotizacionData.cliente.contacto = document.getElementById('cliente-contacto-input').value;
  cotizacionData.moneda = document.getElementById('moneda-select').value;
  cotizacionData.modalidad = document.getElementById('modalidad').value || 'M1';
  cotizacionData.numeroObras = parseInt(document.getElementById('numero-obras').value) || 1;
  cotizacionData.horasEstimadas = parseFloat(document.getElementById('horasEstimadas').value) || 0;
  cotizacionData.valorPiezas = parseFloat(document.getElementById('valorPiezas').value) || 0;
  cotizacionData.formalidad = document.getElementById('formalidad').value;
  cotizacionData.complejidad = document.getElementById('complejidad').value;
  cotizacionData.urgencia = document.getElementById('urgencia').value;
  cotizacionData.visitaLocal = document.getElementById('visita-local').checked;
  cotizacionData.gastosExtras = parseFloat(document.getElementById('gastos-extras').value) || 0;
  
  // Notas particulares - dividir por líneas
  const notasText = document.getElementById('notas-particulares')?.value || '';
  cotizacionData.notasParticulares = notasText.split('\n').map(n => n.trim()).filter(n => n.length > 0);
}

function calcularHonorariosBase() {
  const t = config.tarifas_base;
  let base = 0;

  switch (cotizacionData.modalidad) {
    case 'M1':
      const horas = Math.max(cotizacionData.horasEstimadas, t.minimo_horas_investigacion);
      base = horas * t.hora_pericial;
      break;
    case 'M2':
      base = cotizacionData.valorPiezas * t.consulta_puntual_usd;
      break;
    case 'M3':
      base = t.hora_pericial * 8;
      break;
    case 'M4':
      base = t.hora_pericial * 16;
      break;
  }
  return base;
}

function calcularFactorPorcentual(arr, id) {
  const item = arr.find(x => x.id === id);
  return item ? item.factor : 1;
}

function calcularFactorVolumen(cantidad) {
  const v = config.factores_ponderacion.volumen;
  for (const f of v) {
    if (cantidad >= f.limite_min && cantidad <= f.limite_max) return f.factor_ajuste;
  }
  return 1;
}

function calcularGastosReembolsables() {
  let gastos = 0;
  if (cotizacionData.visitaLocal) {
    gastos += config.gastos_reembolsables.visita_local_fija;
  }
  gastos += cotizacionData.gastosExtras || 0;
  return gastos;
}

function calcularPresupuesto() {
  if (!config) return { honorarios: 0, gastos: 0, total: 0 };

  const F_formalidad = calcularFactorPorcentual(config.factores_ponderacion.formalidad, cotizacionData.formalidad);
  const F_complejidad = calcularFactorPorcentual(config.factores_ponderacion.complejidad, cotizacionData.complejidad);
  const F_urguencia = calcularFactorPorcentual(config.factores_ponderacion.urgencia, cotizacionData.urgencia);
  const F_volumen = calcularFactorVolumen(cotizacionData.numeroObras);

  const honorariosBase = calcularHonorariosBase();
  const honorarios = honorariosBase * F_formalidad * F_complejidad * F_urguencia * F_volumen;
  const gastos = calcularGastosReembolsables();
  const total = honorarios + gastos;

  return { honorarios, gastos, total, F_formalidad, F_complejidad, F_urguencia, F_volumen };
}

function actualizarResumen() {
  leerDatosFormulario();
  const calc = calcularPresupuesto();
  const simbolo = CURRENCY_SYMBOLS[cotizacionData.moneda] || '€';
  const provisionFondos = config.configuracion_economica.provision_fondos_porcentaje;

  const totalDisplay = document.getElementById('total-display');
  if (totalDisplay) {
    totalDisplay.textContent = `${calc.total.toFixed(2)} ${simbolo}`;
  }

  document.getElementById('cuadro-total-general').textContent = `${calc.total.toFixed(2)} ${simbolo}`;
  document.getElementById('monto-provision-inicial').textContent = `${(calc.total * provisionFondos / 100).toFixed(2)} ${simbolo}`;
  document.getElementById('monto-provision-final').textContent = `${(calc.total * (100 - provisionFondos) / 100).toFixed(2)} ${simbolo}`;
  document.getElementById('meta-moneda').textContent = cotizacionData.moneda;
  document.getElementById('meta-fecha-emision').textContent = obtenerIdFechaPersonalizada();
}

function generarDocumento() {
  leerDatosFormulario();
  const calc = calcularPresupuesto();
  const simbolo = CURRENCY_SYMBOLS[cotizacionData.moneda] || '€';
  const provisionFondos = config.configuracion_economica.provision_fondos_porcentaje;

  document.getElementById('cuadro-total-general').textContent = `${calc.total.toFixed(2)} ${simbolo}`;
  document.getElementById('monto-provision-inicial').textContent = `${(calc.total * provisionFondos / 100).toFixed(2)} ${simbolo}`;
  document.getElementById('monto-provision-final').textContent = `${(calc.total * (100 - provisionFondos) / 100).toFixed(2)} ${simbolo}`;
  document.getElementById('meta-fecha-emision').textContent = obtenerIdFechaPersonalizada();
  document.getElementById('meta-moneda').textContent = cotizacionData.moneda;

  const expedienteEl = document.getElementById('expediente-id');
  if (expedienteEl) expedienteEl.textContent = generarCodigosInternacionales();

  document.getElementById('cliente-nombre').textContent = cotizacionData.cliente.nombre || '[Nombre del Cliente]';
  document.getElementById('cliente-doc').textContent = cotizacionData.cliente.documento || '[Documento]';
  document.getElementById('cliente-direccion').textContent = cotizacionData.cliente.direccion || '[Dirección]';
  document.getElementById('cliente-contacto').textContent = cotizacionData.cliente.contacto || '[Contacto]';

  // Actualizar notas particulares en el PDF
  const listaNotas = document.getElementById('lista-notas-particulares');
  if (listaNotas) {
    if (cotizacionData.notasParticulares.length > 0) {
      listaNotas.innerHTML = cotizacionData.notasParticulares.map(n => `<li>${escapeHtml(n)}</li>`).join('');
    } else if (config && config.plantilla_notas_predeterminadas) {
      listaNotas.innerHTML = config.plantilla_notas_predeterminadas.map(n => `<li>${escapeHtml(n)}</li>`).join('');
    }
  }
}

function generarCodigosInternacionales() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `EXP-${año}-${mes}${dia}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&' + '#39;');
}

function mostrarMensajeError(mensaje) {
  let errorDiv = document.getElementById('error-container');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-container';
    errorDiv.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #c00; color: #fff; padding: 12px; text-align: center; z-index: 10000; font-family: var(--font-main);';
    document.body.prepend(errorDiv);
  }
  errorDiv.textContent = mensaje;
  setTimeout(() => { errorDiv.remove(); }, 5000);
}

function generarCSV() {
  leerDatosFormulario();
  const calc = calcularPresupuesto();
  const rows = [
    ['Código Expediente', generarCodigosInternacionales()],
    ['Fecha Emisión', obtenerIdFechaPersonalizada()],
    ['Cliente', cotizacionData.cliente.nombre],
    ['Documento', cotizacionData.cliente.documento],
    ['Nicho Servicio', document.getElementById('nicho-servicio').value || 'N/A'],
    ['Modalidad', cotizacionData.modalidad],
    ['Moneda', cotizacionData.moneda],
    ['Honorarios', calc.honorarios.toFixed(2)],
    ['Gastos', calc.gastos.toFixed(2)],
    ['Total', calc.total.toFixed(2)],
    ['Provisión 50%', (calc.total * 0.5).toFixed(2)],
    ['Factor Formalidad', calc.F_formalidad],
    ['Factor Complejidad', calc.F_complejidad],
    ['Factor Urgencia', calc.F_urguencia],
    ['Factor Volumen', calc.F_volumen]
  ];

  let csv = 'Campo;Valor\n';
  rows.forEach(r => csv += `${r[0]};${r[1]}\n`);
  return csv;
}

function exportarCSV() {
  const csv = generarCSV();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `presupuesto_${generarCodigosInternacionales()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportarExcel() {
  leerDatosFormulario();
  const calc = calcularPresupuesto();
  const html = `
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <style>
        table { border-collapse: collapse; font-family: Arial, sans-serif; }
        td { border: 1px solid #000; padding: 8px; }
      </style>
    </head>
    <body>
      <table>
        <tr><td><b>CÓDIGO PRESUPUESTO</b></td><td>${generarCodigosInternacionales()}</td></tr>
        <tr><td><b>FECHA</b></td><td>${obtenerIdFechaPersonalizada()}</td></tr>
        <tr><td><b>CLIENTE</b></td><td>${cotizacionData.cliente.nombre}</td></tr>
        <tr><td><b>MODALIDAD</b></td><td>${cotizacionData.modalidad}</td></tr>
        <tr><td><b>TOTAL HONORARIOS</b></td><td>${calc.honorarios.toFixed(2)} ${cotizacionData.moneda}</td></tr>
        <tr><td><b>TOTAL GASTOS</b></td><td>${calc.gastos.toFixed(2)} ${cotizacionData.moneda}</td></tr>
        <tr><td><b>TOTAL GENERAL</b></td><td>${calc.total.toFixed(2)} ${cotizacionData.moneda}</td></tr>
      </table>
    </body>
    </html>
  `;
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `presupuesto_${generarCodigosInternacionales()}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}

function reiniciarFormulario() {
  document.getElementById('cliente-nombre-input').value = '';
  document.getElementById('cliente-doc-input').value = '';
  document.getElementById('cliente-direccion-input').value = '';
  document.getElementById('cliente-contacto-input').value = '';
  document.getElementById('horasEstimadas').value = '';
  document.getElementById('numero-obras').value = '1';
  document.getElementById('valorPiezas').value = '';
  document.getElementById('gastos-extras').value = '';
  document.getElementById('notas-particulares').value = '';
  document.getElementById('visita-local').checked = true;
  document.getElementById('modalidad').value = 'M1';
  document.getElementById('formalidad').value = config.factores_ponderacion.formalidad[0]?.id || 'certificado_simple';
  document.getElementById('complejidad').value = config.factores_ponderacion.complejidad[0]?.id || 'contemporaneo';
  document.getElementById('urgencia').value = config.factores_ponderacion.urgencia[0]?.id || 'estandar';
  document.getElementById('moneda-select').value = config.configuracion_economica.moneda_defecto;
  
  document.getElementById('seccion-horas').style.display = 'block';
  document.getElementById('seccion-piezas').style.display = 'none';
  document.getElementById('cotizador-forms').style.display = 'block';
  document.querySelector('.document-wrapper').style.display = 'none';
  document.querySelector('.toolbar-container').style.display = 'flex';
  
  actualizarResumen();
}

function mostrarDocumento() {
  generarDocumento();
  document.getElementById('cotizador-forms').style.display = 'none';
  document.querySelector('.document-wrapper').style.display = 'block';
  document.querySelector('.toolbar-container').style.display = 'none';
}

function inicializarEventos() {
  document.getElementById('moneda-select').addEventListener('change', () => actualizarResumen());
  
  document.getElementById('modalidad').addEventListener('change', e => {
    document.getElementById('seccion-horas').style.display = e.target.value === 'M1' ? 'flex' : 'none';
    document.getElementById('seccion-piezas').style.display = e.target.value === 'M2' ? 'block' : 'none';
    actualizarResumen();
  });
  
  ['horasEstimadas', 'numero-obras', 'valorPiezas', 'formalidad', 'complejidad', 'urgencia', 'gastos-extras', 'notas-particulares'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => actualizarResumen());
  });
  
  document.getElementById('visita-local')?.addEventListener('change', () => actualizarResumen());
  document.getElementById('nicho-servicio')?.addEventListener('change', () => actualizarResumen());

  document.getElementById('cuadro-total-general')?.addEventListener('dblclick', e => {
    e.preventDefault();
    cotizadorApp.generarDocumento();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarConfiguracion();
  inicializarEventos();
});

window.cotizadorApp = {
  calcularPresupuesto,
  generarCSV,
  exportarCSV,
  exportarExcel,
  generarDocumento,
  mostrarDocumento,
  reiniciar: reiniciarFormulario
};