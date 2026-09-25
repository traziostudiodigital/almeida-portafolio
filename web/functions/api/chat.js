/**
 * Cloudflare Pages Function: /api/chat
 * Asistente Virtual Pericial - Ecosistema Luis Manuel Almeida Luis
 * Implementación real con Groq + KV + Detección de Nicho
 */

const ALLOWED_ORIGINS = [
  'https://almeidatasacion.com',
  'https://www.almeidatasacion.com'
];

const DAILY_CAP = 600;
const KV_KEY_PREFIX = 'chat_count:';
const KV_TTL_SECONDS = 90000; // ~25 hours
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const MAX_TOKENS = 400;
const TEMPERATURE = 0.3;

function getCorsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  };
}

function getI18nMessage(key, lang) {
  const messages = {
    es: {
      'chat.daily_limit_msg': 'El asistente ha alcanzado su capacidad de consulta por hoy. Para atención inmediata, escriba a luisluisalmeida58@gmail.com.',
      'chat.error_msg': 'No se pudo conectar con el servicio pericial. Inténtelo nuevamente o contacte directamente por los canales oficiales.',
      'chat.session_limit_msg': 'Para profundizar en su consulta, le invitamos a escribir directamente a luisluisalmeida58@gmail.com para una evaluación confidencial.'
    },
    en: {
      'chat.daily_limit_msg': 'The assistant has reached its daily consultation capacity. For immediate assistance, write to luisluisalmeida58@gmail.com.',
      'chat.error_msg': 'Could not connect to the appraisal service. Please try again or reach out directly through official channels.',
      'chat.session_limit_msg': 'To explore your inquiry further, we invite you to write directly to luisluisalmeida58@gmail.com for a confidential evaluation.'
    }
  };
  return messages[lang]?.[key] || messages.es[key] || key;
}

// CONTEXT_BLOCKS - Placeholders vacíos (se llenarán posteriormente según indicaciones)
const CONTEXT_BLOCKS = {
  perfil: { 
    es: `Luis Manuel Almeida Luis es Especialista en Patrimonio Cultural y Tasación de Obras de Arte, con más de 40 años de trayectoria institucional en Cuba e Iberoamérica. Ha inventariado y tasado más de 20.000 obras de arte y bienes patrimoniales a lo largo de su carrera.\n\nFue responsable de aduanas y decomisos aeroportuarios (1988–2024, 41 años) y Jefe del Departamento de Registro e Inventario del Registro Nacional de Bienes Culturales de Cuba durante 19 años. Ejerce el peritaje bajo un principio estricto de cero conflicto de interés: no compra ni vende obras de arte, ni cobra honorarios como porcentaje del valor tasado.\n\nProfesor Auxiliar con más de 25 años de docencia universitaria activa en la Universidad de las Artes (ISA), la Universidad de La Habana y el Colegio Universitario San Gerónimo. Coautor de dos capítulos en el libro "Tasación de Obras de Arte" del Dr. Alex J. Rosenberg (Fundación Ludwig / Consejo Nacional de Patrimonio Cultural, 2010). Publicó en la Revista Cultura y Desarrollo de la UNESCO (2013).\n\nHa colaborado con los Carabinieri TPC de Italia, la red IBERMUSEOS, y representó a Cuba en el Foro Cusco (UNESCO/OEI, 2020). Condecorado con la Distinción por la Cultura Cubana (2006), máxima distinción del Ministerio de Cultura.\n\nAtiende seis áreas de especialidad: Coleccionistas Privados, Herencias y Sucesiones, Docencia y Conferencias, Abogados y Notarios, Aseguradoras y Family Offices, y Patrimonio Arqueológico Subacuático.\n\nCómo trabaja: 1) Consulta inicial confidencial del caso, 2) Evaluación técnica preliminar de documentación o fotografías, 3) Propuesta de alcance, honorarios y plazo, 4) Entrega del dictamen pericial firmado con fundamentación metodológica.\n\nSi la consulta requiere más detalle del disponible aquí, orienta al usuario a explorar la especialidad correspondiente en el sitio o a escribir por correo electrónico para una consulta confidencial.`,
    en: `Luis Manuel Almeida Luis is a Specialist in Cultural Heritage and Fine Art Appraisal with over 40 years of institutional experience in Cuba and Ibero-America. He has inventoried and appraised over 20,000 works of art and heritage assets throughout his career.\n\nHe served as airport customs and seizures specialist (1988–2024, 41 years) and Head of the Inventory and Registry Department at Cuba's National Registry of Cultural Assets for 19 years. He practices appraisal under a strict zero-conflict-of-interest principle: he neither buys nor sells works of art, nor charges fees as a percentage of the appraised value.\n\nAssociate Professor with more than 25 years of active university teaching at the University of the Arts (ISA), the University of Havana, and San Gerónimo University College. Co-author of two chapters in Dr. Alex J. Rosenberg's reference textbook "Fine Art Appraisal" (Ludwig Foundation / National Council of Cultural Heritage, 2010). Published in UNESCO's Cultura y Desarrollo journal (2013).\n\nHe has collaborated with Italy's Carabinieri TPC, IBERMUSEOS, and represented Cuba at the Cusco Forum (UNESCO/OEI, 2020). Awarded the Distinction for Cuban Culture (2006), the highest award conferred by the Ministry of Culture.\n\nHe serves six areas of expertise: Private Collectors, Estates & Inheritance, Teaching & Lectures, Lawyers & Notaries, Insurers & Family Offices, and Underwater Archaeological Heritage.\n\nHow we work: 1) Confidential initial consultation, 2) Preliminary technical evaluation of documentation or photographs, 3) Proposal of scope, fees, and timeline, 4) Delivery of signed technical appraisal report with required methodological grounding.\n\nFor inquiries requiring greater technical detail, please explore the corresponding specialty on our site or write directly by email for a confidential evaluation.`
  },
  n1: { 
    es: `Especialidad: Peritaje y Tasación de Arte para Coleccionistas Privados.\n\nPara quién: propietarios, coleccionistas e inversionistas de obras de arte y bienes de alto valor que necesitan autenticar, catalogar o valorar una pieza.\n\nPrincipio clave: cero conflicto de interés — Luis Manuel Almeida no compra ni vende obras de arte, ni cobra sobre el valor tasado. Cada dictamen es un juicio técnico independiente.\n\nServicios: dictamen técnico de autenticidad (análisis estilístico, material, bibliográfico e histórico de procedencia); ficha técnica catalográfica; informe pericial de valoración económico basado en cotización de mercado y subastas contrastadas; informe de estado de conservación.\n\nCasos documentados: inventario de las colecciones de René Portocarrero (1988), Fayad Jamís (1988), Sandú Darié (1993) y Luis Alberto Quintero (1999); tasación de bienes del Patrimonio Cultural Cubano clasificados Grado de Valor I (2005).\n\nCuándo aplica: adquisición, custodia, venta o aseguramiento de una pieza donde se necesita despejar dudas de autenticidad o determinar su valor real de mercado.`,
    en: `Specialty: Fine Art Appraisal & Authentication for Private Collectors.\n\nFor whom: Art owners, collectors, and investors of high-value assets who need to authenticate, catalog, or value a piece.\n\nKey principle: Zero conflict of interest — Luis Manuel Almeida neither buys nor sells works of art, nor charges fees as a percentage of the appraised value. Each opinion is an independent technical judgment.\n\nServices: Technical authentication appraisal (stylistic, material, bibliographic, and historical provenance analysis); catalographic technical record; economic valuation appraisal report based on real market quotation and verified international auctions; condition report.\n\nDocumented cases: Inventory and cataloguing of the collections of René Portocarrero (1988), Fayad Jamís (1988), Sandú Darié (1993), and Luis Alberto Quintero (1999); appraisal of exceptional assets of Cuban Cultural Heritage classified as Grade I Value (2005).\n\nWhen it applies: Acquisition, custody, sale, or insurance of a piece where authenticity doubts must be cleared or its real market value determined.`
  },
  n2: { 
    es: `Especialidad: Tasación Pericial de Arte para Herencias y Sucesiones.\n\nPara quién: herederos, albaceas y familias que gestionan la partición de obras de arte o bienes patrimoniales en un proceso de declaración de herencia, testamentaría o partición notarial/fiscal.\n\nRol: Perito Tasador-Partidor — combina el análisis técnico del bien con la mediación necesaria para una distribución equitativa entre herederos. Más de 15 procesos de liquidación hereditaria ejecutados, bajo estricto secreto profesional.\n\nServicios: informe pericial de avalúo para fines fiscales y notariales; inventario descriptivo razonado con valores objetivos conforme a legislación fiscal; propuesta técnica de partición equitativa de lotes homogéneos en valor; mediación pericial confidencial para evitar conflictos judiciales entre coherederos.\n\nCasos documentados (históricos): Servando Cabrera Moreno (1992), Amelia Peláez del Casal (2003), Dulce María Loynaz (1997/2006), Alejo Carpentier (2006), Alfredo Guevara Valdés (2014).\n\nCuándo aplica: cuando existe desacuerdo o riesgo de disputa entre herederos sobre el valor de bienes artísticos, o se requiere un avalúo formal para Notaría o Hacienda.`,
    en: `Specialty: Estate & Inheritance Art Appraisal Services.\n\nFor whom: Heirs, executors, and families managing the partition of works of art or heritage assets in inheritance declarations, probate, and notarial/tax partition processes.\n\nRole: Partition Appraiser (Perito Tasador-Partidor) — combines technical asset analysis with the mediation required for an equitable distribution among heirs. More than 15 estate liquidation processes executed under strict professional secrecy.\n\nServices: Appraisal report for tax and notarial purposes; reasoned descriptive inventory with objective values according to fiscal legislation; technical proposal for equitable lot partition of homogeneous value; confidential peritial mediation to avoid judicial conflicts among co-heirs.\n\nDocumented cases (historical): Servando Cabrera Moreno (1992), Amelia Peláez del Casal (2003), Dulce María Loynaz (1997/2006), Alejo Carpentier (2006), Alfredo Luis Guevara Valdés (2014).\n\nWhen it applies: When disagreement or risk of dispute exists among heirs regarding the value of artistic assets, or when a formal appraisal is required for Notary or Tax Authority proceedings.`
  },
  n3: { 
    es: `Especialidad: Perito Tasador de Arte para Litigios, Sucesiones y Notarías.\n\nPara quién: abogados, notarios y bufetes que requieren un dictamen con fuerza procesal en litigios civiles, juicios sucesorios, liquidaciones conyugales o disolución de patrimonios.\n\nRespaldo: 41 años como responsable de aduanas y decomisos aeroportuarios (1988–2024), con dictámenes ratificados en sede judicial. Representó a Cuba en el Foro Cusco (UNESCO/OEI, 2020) sobre cooperación jurídica contra el tráfico ilícito.\n\nServicios: dictámenes periciales judiciales estructurados metodológicamente; informes de expertisaje técnico con cadena de custodia documental; ratificación pericial de los dictámenes ante la autoridad competente.\n\nCasos documentados: Caso Diego Velázquez (1984, dictamen conjunto con la Dra. Marta Arjona, CNPC); Caso Escultura Demétre Chiparus ("La gallinita ciega").\n\nPrecisión importante: no se ofrece la función de "testigo experto en estrado" (Expert Witness) como rol específico no documentado; el servicio verificado es la ratificación pericial ante la autoridad competente.\n\nCuándo aplica: cuando un caso judicial o notarial requiere un dictamen técnico capaz de resistir impugnación de la contraparte.`,
    en: `Specialty: Forensic Art Appraiser for Litigation, Probate & Notarial Proceedings.\n\nFor whom: Lawyers, notaries, and law firms requiring a judicial-grade report with procedural force in civil litigation, probate proceedings, marital dissolutions, and estate divisions.\n\nBacking: 41 years as specialist responsible for airport customs and cultural property seizures (1988–2024), with findings ratified before judicial authority. Represented Cuba at the Cusco Forum (UNESCO/OEI, 2020) on legal cooperation against illicit trafficking.\n\nServices: Judicial appraisal reports methodologically structured for court proceedings; technical expert examination reports with documented chain of custody; formal ratification of appraisal findings before the competent authority.\n\nDocumented cases: Diego Velázquez Case (1984, joint opinion with Dr. Marta Arjona, CNPC); Demétre Chiparus Sculpture Case ("La gallinita ciega").\n\nImportant precision: The role of "Expert Witness" on the stand is not claimed as an unverified function; the documented and verified service is formal ratification of appraisal findings before the competent authority.\n\nWhen it applies: When a judicial or notarial case requires a technical report capable of withstanding impeachment by opposing counsel.`
  },
  n4: { 
    es: `Especialidad: Valoración de Arte para Aseguradoras y Family Offices.\n\nPara quién: aseguradoras, family offices y el mercado internacional de alto patrimonio que necesitan determinar valor asegurable, auditar colecciones o peritar siniestros.\n\nRespaldo metodológico: escuela del Dr. Alex J. Rosenberg, expresidente de la Appraisers Association of America. Aplicado en campañas de inventario y tasación de bienes estatales en embajadas de más de 15 países (Europa, Oriente Medio, África, Sudamérica; 1999 y 2018).\n\nServicios: auditoría de colecciones corporativas y familiares; determinación de valor de reposición para pólizas de Fine Art Insurance; peritaje de daños en siniestros (depreciación material, costes de restauración); informes técnicos bilingües (ES/EN) para comités de riesgo y reaseguro.\n\nCuándo aplica: suscripción o renovación de una póliza de arte, auditoría periódica de una colección, o peritaje tras un siniestro con daño parcial o total.`,
    en: `Specialty: Fine Art Valuation for Insurers & Family Offices.\n\nFor whom: Insurers, family offices, and the international high-net-worth market needing to determine insurable value, audit collections, or appraise insurance claims.\n\nMethodological backing: School of Dr. Alex J. Rosenberg, former president of the Appraisers Association of America. Applied in inventory and appraisal campaigns of state-owned assets at embassies in more than 15 countries (Europe, Middle East, Africa, South America; 1999 and 2018).\n\nServices: Corporate and family collection audits; determination of replacement value for Fine Art Insurance policies; claims damage appraisal (material depreciation, technical restoration costs); bilingual technical reports (ES/EN) for risk committees and reinsurance.\n\nWhen it applies: Subscription or renewal of a fine art insurance policy, periodic audit of a collection, or claims appraisal following total or partial damage.`
  },
  n5: { 
    es: `Especialidad: Docencia, Conferencias y Formación en Tasación de Arte y Patrimonio.\n\nPara quién: universidades, museos, aduanas, cuerpos policiales e instituciones del patrimonio cultural que buscan formación académica o capacitación técnica.\n\nTrayectoria: más de 25 años de docencia universitaria activa (Universidad de las Artes ISA, Universidad de La Habana, Colegio San Gerónimo). Cursos internacionales en Venezuela, Panamá y Costa Rica. Conferencia conjunta con los Carabinieri TPC de Italia (2018). Coautor del libro de referencia de Rosenberg.\n\nServicios: módulos académicos universitarios sobre valoración y tasación; conferencias magistrales especializadas; talleres de prevención del tráfico ilícito de bienes culturales; protocolos de tasación y reconocimiento de antigüedades para aduanas e inspectores.\n\nModalidad, duración e idioma (español/inglés) se coordinan según la disponibilidad y necesidad de cada institución.\n\nCuándo aplica: una institución académica o cultural necesita capacitación formal en tasación, autenticación o prevención del tráfico ilícito.`,
    en: `Specialty: Teaching, Lectures & Training in Fine Art & Heritage Appraisal.\n\nFor whom: Universities, museums, customs authorities, law enforcement, and cultural heritage institutions seeking academic training or technical capacity building.\n\nBackground: More than 25 years of active university teaching (University of the Arts ISA, University of Havana, San Gerónimo University College). International courses in Venezuela, Panama, and Costa Rica. Joint lecture with Italy's Carabinieri TPC unit (2018). Co-author of Dr. Rosenberg's reference textbook.\n\nServices: University academic modules on valuation and appraisal; specialized keynote lectures; workshops on prevention of illicit trafficking of cultural property; appraisal protocols and antique-recognition training for customs and inspectors.\n\nFormat, duration, and language (Spanish/English) are coordinated according to the availability and requirements of each institution.\n\nWhen it applies: When an academic or cultural institution requires formal training in fine art appraisal, authentication, or prevention of illicit trafficking.`
  },
  n6: { 
    es: `Especialidad: Peritaje de Patrimonio Arqueológico Subacuático.\n\nPara quién: museos, entidades científicas e instituciones patrimoniales que requieren catalogación, autenticación o tasación de artefactos recuperados de pecios coloniales o yacimientos arqueológicos marinos.\n\nMetodología: los mismos protocolos periciales y catalográficos técnicos de bienes terrestres, ajustando la escala de valoración a la significación histórico-patrimonial y singularidad de cada pieza sumergida.\n\nServicios: informes periciales arqueológicos (registro material, tipológico y fotográfico); fichas catalográficas de bienes sumergidos; dictámenes de autenticidad e importancia histórica; valoración de significación patrimonial (no comercial).\n\nCasos documentados: pecios coloniales "Palemón" y "Nuestra Señora de las Mercedes" (2001–2004).\n\nCuándo aplica: hallazgo o investigación de artefactos recuperados de un naufragio o yacimiento arqueológico subacuático que requiere catalogación técnica formal.`,
    en: `Specialty: Underwater Archaeological Heritage Appraisal.\n\nFor whom: Museums, scientific entities, and heritage institutions requiring cataloguing, authentication, or valuation of artifacts recovered from colonial shipwrecks or marine archaeological sites.\n\nMethodology: Same technical appraisal and cataloguing protocols as terrestrial assets, adjusting the valuation scale to the historical-heritage significance and uniqueness of each submerged piece.\n\nServices: Archaeological appraisal reports (material, typological, and photographic recording); cataloguing records for submerged assets; authenticity and historical significance opinions; non-commercial heritage significance valuation.\n\nDocumented cases: Colonial shipwrecks "Palemón" and "Nuestra Señora de las Mercedes" (2001–2004).\n\nWhen it applies: Discovery or research of artifacts recovered from a shipwreck or underwater archaeological site requiring formal technical cataloguing.`
  }
};

const NICHE_KEYWORDS = {
  n1: {
    es: ['coleccionista', 'particular', 'autenticidad', 'catalogación', 'valoración', 'obra', 'pintura', 'escultura', 'inversión', 'adquirir', 'comprar', 'vender', 'certificado'],
    en: ['collector', 'private', 'authentication', 'cataloguing', 'valuation', 'artwork', 'painting', 'sculpture', 'investment', 'acquire', 'buy', 'sell', 'certificate']
  },
  n2: {
    es: ['herencia', 'sucesión', 'heredero', 'partición', 'testamento', 'caudal relicto', 'notaría', 'hacienda', 'fiscal', 'liquidación', 'reparto', 'legítima'],
    en: ['inheritance', 'estate', 'heir', 'partition', 'will', 'probate', 'notary', 'tax', 'liquidation', 'distribution', 'legacy']
  },
  n3: {
    es: ['abogado', 'notario', 'litigio', 'judicial', 'procesal', 'perito partidor', 'auxilio judicial', 'impugnación', 'demanda', 'juicio', 'sede judicial', 'ratificación'],
    en: ['lawyer', 'notary', 'litigation', 'judicial', 'procedural', 'expert', 'judicial assistance', 'impeachment', 'lawsuit', 'trial', 'ratification']
  },
  n4: {
    es: ['aseguradora', 'family office', 'póliza', 'seguro', 'siniestro', 'valor asegurable', 'reposición', 'auditoría', 'colección corporativa', 'broker', 'reaseguro', 'comité de riesgo'],
    en: ['insurer', 'family office', 'policy', 'insurance', 'claim', 'insurable value', 'replacement', 'audit', 'corporate collection', 'broker', 'reinsurance', 'risk committee']
  },
  n5: {
    es: ['docencia', 'conferencia', 'formación', 'universidad', 'museo', 'académico', 'curso', 'diplomado', 'taller', 'enseñanza', 'capacitación', 'estudiante', 'profesor'],
    en: ['teaching', 'lecture', 'training', 'university', 'museum', 'academic', 'course', 'diploma', 'workshop', 'education', 'student', 'professor']
  },
  n6: {
    es: ['subacuático', 'pecio', 'arqueología', 'sumergido', 'mercedes', 'palemón', 'yacimientos', 'marino', 'bajo agua', 'naufragio', 'artefacto', 'arqueológico'],
    en: ['underwater', 'shipwreck', 'archaeology', 'submerged', 'mercedes', 'palemon', 'sites', 'marine', 'underwater', 'wreck', 'artifact', 'archaeological']
  }
};

function detectNiche(lastUserMessage, lang = 'es') {
  const text = (lastUserMessage || '').toLowerCase();
  const scores = {};

  for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS)) {
    const langKeywords = keywords[lang] || keywords.es;
    let count = 0;
    for (const kw of langKeywords) {
      if (text.includes(kw.toLowerCase())) count++;
    }
    if (count > 0) scores[niche] = count;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (sorted.length >= 2 && sorted[0][1] > 0 && sorted[1][1] > 0) {
    return [sorted[0][0], sorted[1][0]];
  }
  if (sorted.length >= 1 && sorted[0][1] > 0) {
    return [sorted[0][0]];
  }
  return ['perfil'];
}

function buildSystemPrompt(detectedNiches, lang) {
  const isEn = lang === 'en';

  const toneInstruction = isEn
    ? 'You are a senior art appraisal expert. Tone: formal, clinical, sober. No marketing adjectives. Neutral English (no regionalisms).'
    : 'Eres un perito tasador senior de arte. Tono: formal, clínico, sobrio. Sin adjetivos de marketing. Español neutro sin argentinismos.';

  const zeroInventionRule = isEn
    ? 'ZERO INVENTION RULE: Never invent data outside the provided CONTEXT. If information is not in the context, state that it is not available in the technical archive.'
    : 'REGLA DE CERO INVENCIÓN: Nunca inventes datos fuera del CONTEXTO proporcionado. Si la información no está en el contexto, indica que no consta en el archivo técnico.';

  const closingRule = isEn
    ? 'CLOSING RULE: Naturally invite the user to write by email for a confidential evaluation. Never sound like a marketing CTA or tech support. Never mention WhatsApp.'
    : 'REGLA DE CIERRE: Invita naturalmente a escribir por correo para evaluación confidencial. Nunca suenes a CTA de marketing ni soporte técnico. Nunca menciones WhatsApp.';

  const contextBlocks = detectedNiches
    .map(n => CONTEXT_BLOCKS[n]?.[lang] || '')
    .filter(Boolean)
    .join('\n\n---\n\n');

  return `${toneInstruction}\n\n${zeroInventionRule}\n\n${closingRule}\n\n=== CONTEXTO TÉCNICO ===\n${contextBlocks}`;
}

async function callGroq(messages, systemPrompt, apiKey) {
  const payload = {
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE
  };

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 429) {
      throw { status: 429, message: 'Rate limited', data: errorData };
    }
    throw { status: response.status, message: errorData.error?.message || 'Groq API error', data: errorData };
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function checkDailyCounter(env, lang) {
  const today = new Date().toISOString().split('T')[0];
  const key = `${KV_KEY_PREFIX}${today}`;
  const count = parseInt(await env.CHAT_KV.get(key) || '0', 10);

  if (count >= DAILY_CAP) {
    const msg = getI18nMessage('chat.daily_limit_msg', lang);
    return { limitReached: true, response: msg, key, count };
  }
  return { limitReached: false, key, count };
}

async function incrementDailyCounter(env, key) {
  const newCount = parseInt(await env.CHAT_KV.get(key) || '0', 10) + 1;
  await env.CHAT_KV.put(key, String(newCount), { expirationTtl: KV_TTL_SECONDS });
  return newCount;
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('Origin') || '';
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin)
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await request.json().catch(() => ({}));
    const messages = body.messages || [];
    const lang = (body.lang || 'es').toLowerCase();
    const validLang = ['es', 'en'].includes(lang) ? lang : 'es';

    if (!messages.length) {
      return new Response(
        JSON.stringify({ success: false, error: 'Mensaje requerido' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Último mensaje del usuario
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) {
      return new Response(
        JSON.stringify({ success: false, error: 'No se encontró mensaje de usuario' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Verificar límite diario ANTES de llamar a Groq
    const dailyCheck = await checkDailyCounter(env, validLang);
    if (dailyCheck.limitReached) {
      return new Response(
        JSON.stringify({ success: true, response: dailyCheck.response, limitReached: true }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Detectar nicho(s) por keywords en último mensaje user
    const detectedNiches = detectNiche(lastUserMessage.content, validLang);

    // 3. Construir system prompt dinámico
    const systemPrompt = buildSystemPrompt(detectedNiches, validLang);

    // 4. Llamar a Groq
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[Chat API] GROQ_API_KEY no configurada');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuración de servidor incompleta' }),
        { status: 500, headers: corsHeaders }
      );
    }

    let groqResponse;
    try {
      groqResponse = await callGroq(messages, systemPrompt, apiKey);
    } catch (groqErr) {
      if (groqErr.status === 429) {
        const msg = getI18nMessage('chat.error_msg', validLang);
        return new Response(
          JSON.stringify({ success: true, response: msg, limitReached: true }),
          { status: 200, headers: corsHeaders }
        );
      }
      console.error('[Chat API] Error Groq:', groqErr);
      throw groqErr;
    }

    // 5. Incrementar contador KV SOLO tras éxito
    await incrementDailyCounter(env, dailyCheck.key);

    // 6. Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true, response: groqResponse }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('[Chat API] Error interno:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error interno al procesar la solicitud.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}