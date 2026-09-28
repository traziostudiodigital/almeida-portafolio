/**
 * Context Blocks for the AI Assistant
 * CONTEXT_BLOCKS - Placeholders vacíos (se llenarán posteriormente según indicaciones)
 * Se exportan para ser usados por el Worker de chat.
 */

export const CONTEXT_BLOCKS = {
perfil: { 
     es: `Luis Manuel Almeida Luis es Especialista en Patrimonio Cultural y Tasación de Obras de Arte, con más de 40 años de trayectoria institucional en Cuba e Iberoamérica. Ha inventariado y tasado más de 20.000 obras de arte y bienes patrimoniales a lo largo de su carrera, incluyendo inventarios de colecciones de maestros como René Portocarrero, Fayad Jamís, Sandú Darié, Luis Alberto Quintero, Servando Cabrera Moreno y Amelia Peláez del Casal.

 Fue especialista de aduanas y decomisos aeroportuarios (1988–2024, 41 años) y Jefe del Departamento de Registro e Inventario del Registro Nacional de Bienes Culturales de la República de Cuba durante 19 años. Ejerce el peritaje bajo un principio estricto de independencia y cero conflicto de interés: no compra ni vende obras de arte, ni cobra honorarios como porcentaje del valor tasado.

 Profesor Auxiliar Adjunto con más de 25 años de docencia universitaria ininterrumpida en la Universidad de las Artes (ISA), la Universidad de La Habana y el Colegio Universitario San Gerónimo de La Habana. Es Licenciado en Filosofía por la Universidad de La Habana (1982) y ha recibido formación especializada en Arte Virreinal (España, 1999), en el Simposio sobre Metodología de la Enseñanza de la Tasación impartido por el Dr. Alex J. Rosenberg (Universidad de New York, enero 1999), y en cursos sobre prevención del tráfico ilícito de bienes culturales (Antigua Guatemala, 2008). Coautor de dos capítulos en el libro "Tasación de Obras de Arte" del Dr. Alex J. Rosenberg (Fundación Ludwig / Consejo Nacional de Patrimonio Cultural, 2010): "La enseñanza de la Tasación en Cuba" (páginas 151-153) y "Algunas consideraciones sobre la Tasación en la esfera del patrimonio cultural" (páginas 154-155). Ha publicado en la Revista Cultura y Desarrollo de la UNESCO (Número 10, 2013): "El Valor de las Obras de Arte" (páginas 9-11) y "Control en las aduanas cubanas" (páginas 70-73).

 Ha colaborado con los Carabinieri TPC de Italia, la red IBERMUSEOS, y representó a Cuba en el Foro Cusco (UNESCO/OEI, 2020). Condecorado con la Distinción por la Cultura Cubana (2006), máxima distinción del Ministerio de Cultura.

 Actualmente mantiene vínculos institucionales activos como Especialista en Patrimonio Fílmico del ICAIC (desde enero 2024) y Especialista/Asesor en el CODEMA / Consejo Nacional de las Artes Plásticas (desde enero 2026).

 Atiende seis áreas de especialidad: Coleccionistas Privados, Herencias y Sucesiones, Docencia y Conferencias, Abogados y Notarios, Aseguradoras y Family Offices, y Patrimonio Arqueológico Subacuático.

 Cómo trabaja: 1) Consulta inicial confidencial del caso, 2) Evaluación técnica preliminar de documentación (incluyendo procedencia y fotografías de la pieza), 3) Propuesta de alcance, honorarios y plazo, 4) Entrega del dictamen pericial firmado con fundamentación metodológica.

 Si la consulta requiere más detalle del disponible aquí, orienta al usuario a explorar la especialidad correspondiente en el sitio o a escribir por correo electrónico para una consulta confidencial.`,
 en: `Luis Manuel Almeida Luis is a Specialist in Cultural Heritage and Fine Art Appraisal with over 40 years of institutional experience in Cuba and Ibero-America. He has inventoried and appraised over 20,000 works of art and heritage assets throughout his career, including inventories of collections of masters such as René Portocarrero, Fayad Jamís, Sandú Darié, Luis Alberto Quintero, Servando Cabrera Moreno, and Amelia Peláez del Casal.

 He served as an airport customs and border protection specialist (1988–2024, 41 years) and Head of the Department of Registry and Inventory at the National Registry of Cultural Property of the Republic of Cuba for 19 years. He practices appraisal under a strict zero-conflict-of-interest principle: he neither buys nor sells works of art, nor charges fees as a percentage of the appraised value.

 He is an Adjunct Associate Professor with over 25 years of uninterrupted university teaching at the University of the Arts (ISA), the University of Havana, and San Gerónimo University College of Havana. He holds a Bachelor's degree in Philosophy from the University of Havana (1982) and has received specialized training in Virreinal Art (Spain, 1999), in the Symposium on Teaching Methodology in Appraisal delivered by Dr. Alex J. Rosenberg (New York University, January 1999), and in courses on prevention of illicit trafficking of cultural property (Antigua Guatemala, 2008). He is co-author of two chapters in Dr. Alex J. Rosenberg's reference textbook "Tasación de Obras de Arte" (Ludwig Foundation / National Council of Cultural Heritage, 2010): "The Teaching of Appraisal in Cuba" (pages 151-153) and "Some Considerations on Appraisal in the Sphere of Cultural Heritage" (pages 154-155). He has published in UNESCO's Cultura y Desarrollo journal (Volume 10, 2013): "The Value of Works of Art" (pages 9-11) and "Control in Cuban Customs" (pages 70-73).

 He has collaborated with Italy's Carabinieri TPC, IBERMUSEOS, and represented Cuba at the Cusco Forum (UNESCO/OEI, 2020). Awarded the Distinction for Cuban Culture (2006), the highest award conferred by the Ministry of Culture.

 He currently maintains active institutional affiliations as Specialist in Cinematic Heritage at the ICAIC (since January 2024) and Specialist/Advisor at CODEMA / National Council of Plastic Arts (CNAP, since January 2026).

 He serves six areas of expertise: Private Collectors, Estates & Inheritance, Teaching & Lectures, Lawyers & Notaries, Insurers & Family Offices, and Underwater Archaeological Heritage.

 How we work: 1) Confidential initial consultation, 2) Preliminary technical evaluation of documentation (including provenance and high-resolution photographs), 3) Proposal of scope, fees, and timeline, 4) Delivery of signed technical appraisal report with required methodological grounding.

 For inquiries requiring greater technical detail, please explore the corresponding specialty on our site or write directly by email for a confidential evaluation.`
  },
n1: { 
      es: `Especialidad: Peritaje y Tasación de Arte para Coleccionistas Privados y Propietarios de Bienes de Alto Valor.
 
  Para quién: Este servicio está diseñado para **personas naturales, coleccionistas y agentes del mercado del arte** que poseen obras de arte, colecciones privadas o bienes culturales de alto valor. Se atiende la necesidad de realizar un expertizaje, catalogación y tasación con rigor y respaldo documental.

Principio clave: Luis Manuel Almeida Luis ejerce el peritaje bajo un estricto **principio de independencia y cero conflicto de interés**: no compra ni vende obras de arte y sus honorarios no se vinculan como porcentaje del valor tasado. Cada dictamen es un juicio técnico independiente y objetivo, fundamentado en una trayectoria de más de 40 años en el sector.
 
  Servicios periciales específicos:
  - **Dictamen técnico de expertizaje**: Incluye un análisis estilístico, material, bibliográfico y un estudio histórico-documental de procedencia para verificar la autoría y catalogación del bien.
  - **Ficha técnica de catalogación**: Documentación razonada del bien siguiendo directivas y normas internacionales de inventario patrimonial.
  - **Informe pericial de tasación y valoración económica**: Tasación fundamentada en el método de comparación de datos de mercado, considerando el precio máximo pagado por una obra de arte en un mercado abierto y legal.
  - **Informe de estado de conservación**: Diagnóstico descriptivo de la estabilidad física, daños y sugerencias técnicas de conservación preventiva.

 Casos documentados de relevancia incluyen el inventario y catalogación de colecciones de maestros como René Portocarrero (1988), Fayad Jamís (1988), Sandú Darié (1993) y Luis Alberto Quintero (1999); así como inventarios de los bienes de Gilma Madera, Marta Jiménez y Armando Suárez del Villar. Destaca también el inventario, expertizaje y catalogación de obras y fondos patrimoniales de Servando Cabrera Moreno y Amelia Peláez del Casal. Además, la tasación de bienes excepcionales del Patrimonio Cultural Cubano clasificados con el **Grado de Valor I (2005)**, la máxima distinción patrimonial, subraya la capacidad para manejar piezas de singular importancia.

 Cuándo aplica: Estos servicios son cruciales en procesos de **adquisición, custodia, venta, aseguramiento o planificación patrimonial** de una pieza. Son aplicables cuando se necesita determinar el valor real de mercado, preparar documentación para donaciones benéficas o en la planificación sucesoria para evitar conflictos. <!-- Fuente: nichos-servicio.md, Nicho 1; copy-editorial-nichos.md, Nicho 1; experiencia.md; perfil.md -->`,
en: `Specialty: Fine Art Expertise, Cataloguing & Appraisal for Private Collectors.
 
  For whom: This service is designed for **individuals, private collectors, and art market professionals** who possess works of art, private collections, or high-value cultural assets. It addresses the need to obtain expertise, cataloguing, and appraisal reports with rigor and documented backing.
 
  Key principle: Luis Manuel Almeida Luis practices appraisal under a strict **principle of independence and zero-conflict-of-interest**: he neither buys nor sells works of art, nor accepts contingency fees based on appraised value. Each report is an independent and objective technical judgment, founded on over 40 years of experience in the sector.
 
  Specific appraisal services:
  - **Technical Expertise Opinion**: Includes stylistic, material, bibliographic, and provenance analysis to establish authorship and technical cataloguing.
  - **Technical Cataloguing Record**: Reasoned description of the asset in accordance with international heritage and inventory documentation standards.
  - **Appraisal and Economic Valuation Report**: Valuation grounded in the market data comparison method, taking into account the highest price paid for a work of art in an open and lawful market.
  - **Condition Report**: Descriptive diagnosis of physical stability, damage, and technical conservation preventive suggestions.

 Documented cases of relevance include the inventory and cataloguing of collections by masters such as René Portocarrero (1988), Fayad Jamís (1988), Sandú Darié (1993), and Luis Alberto Quintero (1999); as well as inventories of the estates of Gilma Madera, Marta Jiménez, and Armando Suárez del Villar. Also notable is the inventory, technical expertise, and cataloguing of estate collections and artworks by Servando Cabrera Moreno and Amelia Peláez del Casal. Additionally, the appraisal of exceptional assets of Cuban Cultural Heritage classified as **Grade I Value (2005)**, the highest patrimonial distinction, underscores the capacity to handle pieces of singular importance.

 When it applies: These services are crucial in processes of **acquisition, custody, sale, insurance, or patrimonial planning** of a piece. They are applicable when the true market value needs to be determined, documentation prepared for charitable donations, or in estate planning to avoid conflicts. <!-- Source: nichos-servicio.md, Nicho 1; copy-editorial-nichos.md, Nicho 1; experiencia.md; perfil.md -->`
  },
n2: { 
      es: `Especialidad: Docencia, Conferencias y Formación en Tasación de Arte y Patrimonio.
 
  Para quién: Este servicio está dirigido a **universidades, academias de arte, museos, instituciones culturales, aduanas, cuerpos policiales e inspectores de patrimonio** que buscan capacitación técnica formal o formación de posgrado especializada en tasación de arte, reconocimiento de antigüedades y prevención del tráfico ilícito de bienes culturales.

 Rol del Perito Tasador-Partidor: Luis Manuel Almeida Luis actúa como **Perito Tasador-Partidor**, una habilidad específica que combina el análisis técnico detallado del bien con la mediación necesaria para una distribución justa y equitativa entre los herederos. A lo largo de su carrera, ha ejecutado más de 15 procesos de liquidación hereditaria, manteniendo un estricto secreto profesional sobre las particiones familiares y testamentarías privadas que, por su naturaleza, no admiten difusión pública. <!-- Fuente: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; habilidades-inferidas.md, punto 1 -->

Trayectoria y Respaldo Académico: Con más de 25 años de labor docente universitaria ininterrumpida, Luis Manuel Almeida Luis ejerce como Profesor Auxiliar en la Universidad de las Artes (ISA, desde 2001), la Universidad de La Habana (desde 2001) e imparte conferencias especializadas en el Colegio Universitario San Gerónimo de La Habana (desde 2012). Su labor como educador se fundamenta en su rol de continuador y coautor junto a su mentor, el Dr. Alex J. Rosenberg, y se respalda con condecoraciones de máximo rango como la Distinción por la Cultura Cubana (2006). Su producción intelectual incluye la publicación de artículos académicos de referencia internacional indexados por la UNESCO y libros de texto especializados.
 
  Servicios académicos y de formación:
  - **Módulos académicos universitarios**: Programas de estudio de pregrado y posgrado sobre valoración, tasación científica e historia del mercado del arte, diseñados para restauradores, museólogos e historiadores del arte.
  - **Conferencias magistrales especializadas**: Charlas académicas sobre autenticación de pintura colonial, reconocimiento estilístico (Art Nouveau, Art Déco y vanguardia cubana) e historia de las artes decorativas.
  - **Talleres de prevención del tráfico ilícito**: Seminarios de capacitación técnica y protocolos de control en frontera para especialistas de aduanas, inspectores y fuerzas de seguridad.
  - **Protocolos de reconocimiento y documentación de antigüedades**: Formación metodológica para catalogar y registrar bienes patrimoniales en sistemas de museos institucionales.

 Casos documentados de docencia e investigación:
  - **Cursos y diplomados internacionales**: Impartición de programas de tasación de obras de arte en la Fundación de Museos Nacionales de Caracas (Venezuela, 2007), IARTES e IPC (Caracas, 2010), la Universidad de Panamá (2015), y el programa de capacitación regional IBERMUSEOS (Costa Rica, 2018).
  - **Colaboración con Carabinieri TPC de Italia (2018)**: Conferencia e intercambio técnico conjunto sobre control de frontera y recuperación de bienes culturales robados, celebrada en la Oficina del Historiador de La Habana (16-20 de abril de 2018).
  - **Publicaciones UNESCO (2013)**: Dos artículos académicos independientes en la Revista "Cultura y Desarrollo" de la UNESCO (No. 10, 2013) sobre "El Valor de las Obras de Arte" (páginas 9-11) y "Control en las aduanas cubanas" (páginas 70-73).
  - **Coautoría de libro (2010)**: Autor de los textos técnicos "La enseñanza de la Tasación en Cuba" (páginas 151-153) y "Algunas consideraciones sobre la Tasación en la esfera del patrimonio cultural" (páginas 154-155) en la obra colectiva "Tasación de Obras de Arte" junto al Dr. Alex J. Rosenberg (Fundación Ludwig/CNPC). <!-- Fuente: nichos-servicio.md, Nicho 2; copy-editorial-nichos.md, Nicho 2; experiencia.md; certificaciones.md -->

 Cuándo aplica: Este servicio es indispensable cuando existe **desacuerdo o riesgo de disputa** entre herederos sobre el valor de bienes artísticos o patrimoniales. También se requiere cuando se necesita un **avalúo formal** para Notaría, Hacienda, o en cualquier situación jurídica donde la valoración objetiva de un patrimonio artístico sea fundamental para la resolución del caso. <!-- Fuente: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; experiencia.md -->`,
en: `Specialty: Fine Art Valuation for Insurers & Family Offices.
 
  For whom: Fine Art insurance companies, reinsurers, family offices, wealth management firms, and the international high-net-worth (HNW/UHNW) market requiring objective appraisals with global validity for risk coverage, art asset audits, or post-claim adjustments.
 
  Methodological Backing: The professional practice of Luis Manuel Almeida Luis is methodologically aligned with the highest international standards, grounded in the school of Dr. Alex J. Rosenberg (1919–2022), former president of the Appraisers Association of America (AAA) and Doctor Honoris Causa of the ISA in Havana. Almeida participated in the "Symposium on Teaching Methodology in Appraisal" at New York University (January, 1999) and solidified this academic connection as a co-author of two chapters in Rosenberg's reference textbook "Tasación de Obras de Arte" (2010). This strict methodological foundation allows him to issue technical appraisal reports suitable for risk committees and global financial entities.
 
  Specific appraisal services:
  - **Corporate & family collection audits**: Technical and cataloguing examinations to inventory and verify the existence, authenticity, and integrity of corporate art portfolios or private family estates.
  - **Replacement insurable value determination**: Valuation opinions for the underwriting or renewal of Fine Art insurance policies, technically distinguishing between fair market value and replacement costs.
  - **Claims damage & partial loss appraisal**: Assessment of material depreciation of artworks affected by claims, estimation of specialized restoration costs, and technical reports for the settlement of insurance claims.
  - **Bilingual technical reporting (ES/EN)**: Technical structuring of expert reports suitable for submission to reinsurance committees and international firms.

 Documented cases of significance:
  - **Diplomatic Art Collection Inventories (1999 and 2018)**: Systematic inventory, cataloguing, and technical appraisal of cultural heritage assets at embassies and diplomatic missions in more than 15 countries across Europe, the Middle East, Africa, and South America, including Spain (Madrid, Barcelona, Santiago, Canary Islands), Italy, the Holy See, France (including UNESCO-Paris), Portugal, Austria, Slovakia, Romania, Serbia, Algeria, Egypt, Lebanon, Qatar, Kuwait, Iran, and Bolivia.

 When it applies: This service is essential when **disagreement or risk of dispute** exists among heirs regarding the value of artistic or heritage assets. It is also required when a **formal appraisal** is needed for Notary or Tax Authority proceedings, or any legal scenario where an objective valuation of artistic patrimony is necessary for final settlement. <!-- Source: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; experiencia.md -->`
  },
n3: { 
      es: `Especialidad: Tasación Pericial de Arte para Herencias y Sucesiones Patrimoniales.
 
  Para quién: Este servicio está dirigido a **herederos, albaceas y familias** que se encuentran en el proceso de gestionar la partición de obras de arte, colecciones o bienes patrimoniales. Se aplica en situaciones de declaración de herencia, testamentaría, y procesos de partición notarial o fiscal, buscando garantizar la equidad y evitar conflictos o subvaloraciones.

 Respaldo y Trayectoria: Luis Manuel Almeida Luis cuenta con el respaldo técnico de 41 años de servicio activo en el Registro Nacional de Bienes Culturales, desempeñándose como especialista responsable de aduanas y decomisos aeroportuarios en la frontera de Cuba (1988–2024) y Jefe del Departamento de Registro e Inventario durante 19 años. Sus dictámenes han sido ratificados en sede judicial en múltiples ocasiones, garantizando una sólida metodología que resiste impugnaciones y auditorías legales de contraparte. Su desempeño profesional independiente se alinea con la ética y el rigor técnico demostrados en su representación oficial de la República de Cuba en foros jurídicos internacionales.

Rol del Perito Tasador-Partidor: Luis Manuel Almeida Luis actúa como **Perito Tasador-Partidor**, una habilidad específica que combina el análisis técnico detallado del bien con la mediación necesaria para una distribución justa y equitativa entre los herederos. A lo largo de su carrera, ha ejecutado más de 15 procesos de liquidación hereditaria, manteniendo un estricto secreto profesional sobre las particiones familiares y testamentarías privadas que, por su naturaleza, no admiten difusión pública. <!-- Fuente: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; habilidades-inferidas.md, punto 1 -->
 
  Servicios periciales específicos:
  - **Informe pericial de avalúo**: Elaboración de informes de valoración para fines fiscales y notariales, proporcionando un análisis técnico riguroso y una justificación metodológica sólida del valor.
  - **Inventario descriptivo razonado**: Creación de un inventario detallado de los bienes, incluyendo descripciones técnicas, estado de conservación y elementos de identificación cruciales.
  - **Propuesta técnica de partición equitativa de lotes**: Desarrollo de propuestas para la distribución equitativa de los bienes o lotes homogéneos en valor, facilitando acuerdos entre coherederos.
  - **Mediación pericial confidencial**: Asesoramiento y mediación expertos para resolver desacuerdos sobre el valor de bienes artísticos, previniendo así posibles conflictos judiciales.

Casos documentados de relevancia histórica incluyen la gestión de los caudales hereditarios de figuras cumbres de la cultura como Servando Cabrera Moreno (1992), Amelia Peláez del Casal (2003), Dulce María Loynaz (Premio Cervantes, 1997 y sus manuscritos en 2006), Alejo Carpentier (Premio Cervantes) y Lilia Esteban (2006), y Alfredo Luis Guevara Valdés (fundador del ICAIC, 2014), además de la gestión del patrimonio de Aldo Martínez Malo y otras testamentarías privadas reservadas.

 Cuándo aplica: Este servicio es indispensable cuando existe **desacuerdo o riesgo de disputa** entre herederos sobre el valor de bienes artísticos o patrimoniales. También se requiere cuando se necesita un **avalúo formal** para Notaría, Hacienda, o en cualquier situación jurídica donde la valoración objetiva de un patrimonio artístico sea fundamental para la resolución del caso. <!-- Fuente: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; experiencia.md -->`,
en: `Specialty: Estate & Inheritance Art Appraisal Services.
 
  For whom: This service is aimed at **heirs, executors, and families** who are in the process of managing the partition of works of art, collections, or heritage assets. It applies directly to inheritance declarations, probate proceedings, and notarial or tax-related partition processes, seeking to ensure complete fairness and prevent family disputes or undervaluation of assets.
 
  Role of the Partition Appraiser: Luis Manuel Almeida Luis acts as a **Partition Appraiser (Perito Tasador-Partidor)**, a specialized function that combines detailed technical asset analysis with the sensitive mediation required for an equitable distribution among heirs. Over his career, he has executed more than 15 estate liquidation processes, maintaining strict professional confidentiality and discretion over private family estates and testamentary matters that, by their nature, do not admit public disclosure. <!-- Source: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; habilidades-inferidas.md, punto 1 -->
 
  Specific appraisal services:
  - **Appraisal reports for tax and probate**: Preparation of formal valuation reports for tax and notarial purposes, providing rigorous technical analysis and sound methodological justification of the appraised values.
  - **Reasoned descriptive inventory**: Compilation of a detailed inventory of cultural goods, including complete physical and catalographic descriptions, conservation status, and key provenance markers.
  - **Technical proposal for equitable lot partition**: Development of technical proposals for the division of assets into homogeneous lots of equal value, facilitating consensual agreements among co-heirs.
  - **Confidential expert mediation**: Specialized technical mediation to resolve discrepancies regarding the valuation of artistic assets, helping avoid protracted judicial conflicts.

Documented cases of historical relevance include managing the hereditary estates of major figures of Cuban and Latin American culture, such as Servando Cabrera Moreno (1992), Amelia Peláez del Casal (2003), Dulce María Loynaz (Cervantes Prize laureate, 1997 and her poetic manuscripts in 2006), Alejo Carpentier (Cervantes Prize laureate) and Lilia Esteban (2006), and Alfredo Luis Guevara Valdés (founder of ICAIC, 2014), in addition to the estate of Aldo Martínez Malo and other private testamentary processes held under strict professional secrecy.

 When it applies: This service is essential when **disagreement or risk of dispute** exists among heirs regarding the value of artistic or heritage assets. It is also required when a **formal appraisal** is needed for Notary or Tax Authority proceedings, or any legal scenario where an objective valuation of artistic patrimony is necessary for final settlement. <!-- Source: nichos-servicio.md, Nicho 3; copy-editorial-nichos.md, Nicho 3; experiencia.md -->`
  },
n4: { 
      es: `Especialidad: Perito Tasador de Arte para Litigios, Sucesiones y Notarías.
 
  Para quién: Abogados, notarios, albaceas y bufetes legales que requieren un dictamen pericial de alta fuerza probatoria y auxilio judicial en litigios civiles, juicios sucesorios complejos, disputas de propiedad, liquidaciones conyugales o disolución de patrimonios.
 
  Respaldo y Trayectoria: Luis Manuel Almeida Luis cuenta con el respaldo técnico de 41 años de servicio activo en el Registro Nacional de Bienes Culturales, desempeñándose como especialista responsable de aduanas y decomisos aeroportuarios en la frontera de Cuba (1988–2024) y Jefe del Departamento de Registro e Inventario durante 19 años. Sus dictámenes han sido ratificados en sede judicial en múltiples ocasiones, garantizando una sólida metodología que resiste impugnaciones y auditorías legales de contraparte. Su desempeño profesional independiente se alinea con la ética y el rigor técnico demostrados en su representación oficial de la República de Cuba en foros jurídicos internacionales.

Servicios periciales específicos:
  - **Dictámenes periciales judiciales**: Informes de valoración y autenticación estructurados con la metodología científica exigida por los tribunales y órganos de justicia.
  - **Informes de expertisaje técnico con cadena de custodia**: Documentación exhaustiva que garantiza la trazabilidad legal y física de la pieza desde su examen hasta la entrega del informe final.
  - **Ratificación pericial ante la autoridad competente**: Comparecencia formal ante jueces, notarios y tribunales para fundamentar y defender técnicamente el dictamen emitido.

Casos documentados de relevancia:
  - **Caso Diego Velázquez (1984)**: Interceptación en frontera aeroportuaria de una pintura del maestro Velázquez que intentaba ser extraída ilegalmente del país. Tras el examen pericial conjunto realizado con la Dra. Marta Arjona (Presidenta del Consejo Nacional de Patrimonio Cultural), se confirmó su autenticidad y que pertenecía al inventario del Museo Nacional de Bellas Artes, restituyéndose exitosamente a la colección estatal (en este caso, el perito contaba con 9 años de experiencia técnica).
  - **Caso Escultura Demétre Chiparus**: Detección, peritaje y expertisaje aeroportuario de la escultura Art Déco en bronce, mármol y marfil titulada "La gallinita ciega", intentada exportar de manera clandestina e indocumentada. Fue recuperada para uso público institucional.
  - **Representación en el Foro Cusco (UNESCO/OEI, 2020)**: Representante técnico de Cuba en el diálogo regional sobre cooperación internacional y marcos jurídicos contra el tráfico ilícito de bienes culturales.

 Precisión técnica legal: De acuerdo con los marcos normativos aplicados en su trayectoria, no se ofrece la función anglosajona de "Expert Witness" en estrado libre, sino el servicio formalmente documentado de ratificación pericial del dictamen técnico ante la autoridad competente e instructores del caso. <!-- Fuente: nichos-servicio.md, Nicho 4; copy-editorial-nichos.md, Nicho 4; experiencia.md; Respuestas.md, Bloque 4.5 -->`,
en: `Specialty: Forensic Art Appraiser for Litigation, Probate & Notarial Proceedings.
 
  For whom: Law firms, lawyers, notaries, and executors requiring high-grade judicial appraisal reports and expert technical assistance in civil litigation, complex probate proceedings, property disputes, marital dissolutions, or asset divisions.
 
  Backing & Standing: Luis Manuel Almeida Luis possesses the technical backing of 41 years of active service at Cuba's National Registry of Cultural Assets, serving as the specialist responsible for airport customs and cultural property seizures (1988–2024) and Head of the Inventory and Registry Department for 19 years. His findings and expert appraisals have been repeatedly ratified before judicial authorities, ensuring a solid, proven methodology capable of withstanding opposing counsel's cross-examinations and legal audits. His independent expert function is exercised with the same technical rigor and ethics shown during his official representation of Cuba in international legal forums.
 
  Specific appraisal services:
  - **Judicial appraisal reports**: Comprehensive valuation and authentication reports structured according to the rigorous scientific methodology required by courts of law.
  - **Technical expert examination reports with chain of custody**: Complete documentation guaranteeing the physical and legal traceability of the artwork from initial inspection to final delivery.
  - **Formal ratification of findings before the competent authority**: Formal appearance before judges, notaries, and tribunals to technically substantiate and ratify the issued appraisal report.

Important legal precision: In accordance with his documented professional trajectory, the role of an anglo-style "Expert Witness" on the stand is not claimed; the verified and documented service is the formal ratification of the technical appraisal report before the competent judicial or notarial authority. <!-- Source: nichos-servicio.md, Nicho 4; copy-editorial-nichos.md, Nicho 4; experiencia.md; Respuestas.md, Bloque 4.5 -->`
  },
n5: { 
      es: `Especialidad: Valoración de Arte para Aseguradoras y Family Offices.
 
  Para quién: Compañías de seguros de arte (Fine Art Insurance), reaseguradoras, family offices, firmas de gestión patrimonial y el mercado internacional de alto patrimonio neto (HNW/UHNW) que necesitan avalúos objetivos con validez global para la cobertura de riesgos, auditoría de activos artísticos o peritajes post-siniestro.

 Trayectoria y Respaldo Académico: Con más de 25 años de labor docente universitaria ininterrumpida, Luis Manuel Almeida Luis ejerce como Profesor Auxiliar en la Universidad de las Artes (ISA, desde 2001), la Universidad de La Habana (desde 2001) e imparte conferencias especializadas en el Colegio Universitario San Gerónimo de La Habana (desde 2012). Su labor como educador se fundamenta en su rol de continuador y coautor junto a su mentor, el Dr. Alex J. Rosenberg, y se respalda con condecoraciones de máximo rango como la Distinción por la Cultura Cubana (2006). Su producción intelectual incluye la publicación de artículos académicos de referencia internacional indexados por la UNESCO y libros de texto especializados.

 Servicios académicos y de formación:
 - **Módulos académicos universitarios**: Programas de estudio de pregrado y posgrado sobre valoración, tasación científica e historia del mercado del arte, diseñados para restauradores, museólogos e historiadores del arte.
 - **Conferencias magistrales especializadas**: Charlas académicas sobre autenticación de pintura colonial, reconocimiento estilístico (Art Nouveau, Art Déco y vanguardia cubana) e historia de las artes decorativas.
 - **Talleres de prevención del tráfico ilícito**: Seminarios de capacitación técnica y protocolos de control en frontera para especialistas de aduanas, inspectores y fuerzas de seguridad.
 - **Protocolos de reconocimiento y documentación de antigüedades**: Formación metodológica para catalogar y registrar bienes patrimoniales en sistemas de museos institucionales.

 Casos documentados de docencia e investigación:
 - **Cursos y diplomados internacionales**: Impartición de programas de tasación de obras de arte en la Fundación de Museos Nacionales de Caracas (Venezuela, 2007), IARTES e IPC (Caracas, 2010), la Universidad de Panamá (2015), y el programa de capacitación regional IBERMUSEOS (Costa Rica, 2018).
 - **Colaboración con Carabinieri TPC de Italia (2018)**: Conferencia e intercambio técnico conjunto sobre control de frontera y recuperación de bienes culturales robados, celebrada en la Oficina del Historiador de La Habana (16-20 de abril de 2018).
 - **Publicaciones UNESCO (2013)**: Dos artículos académicos independientes en la Revista "Cultura y Desarrollo" de la UNESCO (No. 10, 2013) sobre "El Valor de las Obras de Arte" (páginas 9-11) y "Control en las aduanas cubanas" (páginas 70-73).
 Cuándo aplica: Este servicio es clave al contratar pólizas Fine Art, realizar auditorías patrimoniales periódicas o requerir un dictamen independiente para resolver disputas de cobertura tras un siniestro material. <!-- Fuente: nichos-servicio.md, Nicho 5; copy-editorial-nichos.md, Nicho 5; experiencia.md; certificaciones.md -->`,
    en: `Specialty: Teaching, Lectures & Training in Fine Art & Heritage Appraisal.

 For whom: Universities, art academies, museums, cultural institutions, customs authorities, law enforcement agencies, and heritage inspectors seeking formal technical training or specialized postgraduate education in fine art appraisal, antique recognition, and the prevention of illicit trafficking of cultural property.

 Background & Academic Backing: With over 25 years of uninterrupted university teaching, Luis Manuel Almeida Luis serves as an Associate Professor at the University of the Arts (ISA, since 2001), the University of Havana (since 2001), and delivers specialized lectures at the San Gerónimo University College of Havana (since 2012). His academic practice is built on his role as a collaborator and co-author alongside his mentor, Dr. Alex J. Rosenberg, and is backed by top-level state awards such as the Distinction for Cuban Culture (2006). His intellectual production includes publishing reference articles indexed by UNESCO and specialized academic textbooks.

 Academic and training services:
 - **University academic modules**: Undergraduate and postgraduate curricula covering scientific valuation, appraisal methodologies, and art market history, tailored for conservators, museologists, and art historians.
 - **Specialized keynote lectures**: High-level academic presentations on colonial painting authentication, stylistic identification (Art Nouveau, Art Déco, and Cuban avant-garde), and decorative arts history.
 - **Illicit trafficking prevention workshops**: Technical capacity-building seminars and border-control protocols designed for customs officers, inspectors, and security forces.
 - **Antique recognition and registration protocols**: Methodological training for cataloguing, documenting, and registering heritage assets within institutional museum systems.

 Documented cases of teaching and research:
 - **International courses and diplomas**: Fine art appraisal courses taught at the Fundación de Museos Nacionales of Caracas (Venezuela, 2007), IARTES and IPC (Caracas, 2010), the University of Panama (2015), and the IBERMUSEOS regional training program (Costa Rica, 2018).
 - **Collaboration with Italy's Carabinieri TPC (2018)**: Joint conference and technical exchange on border control and recovery of stolen cultural property, held at the Office of the Historian of Havana (April 16-20, 2018).
 - **UNESCO publications (2013)**: Two independent academic papers published in UNESCO's "Cultura y Desarrollo" journal (No. 10, 2013) on "The Value of Works of Art" (pages 9-11) and "Control in Cuban Customs" (pages 70-73).
 When it applies: This service is essential when underwriting Fine Art insurance, conducting periodic asset audits, or requiring an independent expert opinion to resolve coverage disputes following material damage. <!-- Source: nichos-servicio.md, Nicho 5; copy-editorial-nichos.md, Nicho 5; experiencia.md; certificaciones.md -->
  },
  n6: { 
    es: `Especialidad: Peritaje de Patrimonio Arqueológico Subacuático y Pecios Históricos.

 Para quién: Museos, instituciones científicas, universidades, centros de investigación, departamentos de arqueología y entidades patrimoniales que requieren la catalogación técnica, autenticación o valoración técnico-patrimonial de artefactos y cargamentos históricos recuperados de pecios coloniales o yacimientos arqueológicos marinos.

 Metodología y Enfoque Técnico: Luis Manuel Almeida Luis aplica a la evidencia sumergida los mismos rigurosos protocolos periciales y catalográficos técnicos de control que rigen los bienes culturales en contexto terrestre. La diferencia metodológica clave radica en ajustar de manera precisa la escala de valoración a la extraordinaria significación histórico-patrimonial, la rareza extrema y la singularidad de cada pieza recuperada bajo el agua, considerando factores como el estado de conservación afectado por el medio marino, el proceso de estabilización y la procedencia documentada del pecio. Se excluye expresamente de sus áreas de interés la numismática marina comercial, concentrando su labor estrictamente en la catalogación científica y el dictamen del valor histórico-patrimonial de objetos de uso cotidiano, instrumental de navegación, armamento y elementos estructurales sumergidos.

 Servicios periciales específicos:
 - **Informes periciales arqueológicos**: Registro exhaustivo tipológico, material, dimensional y fotográfico de los bienes arqueológicos recuperados para conformar expedientes técnicos de control institucional.
 - **Fichas catalográficas de bienes sumergidos**: Documentación pormenorizada de la procedencia, datación estimada y adscripción cultural de las piezas, integrándolas en los sistemas de registro y documentación patrimonial oficiales.
 - **Dictámenes de autenticidad e importancia histórica**: Estudios periciales para certificar la filiación temporal y estilística de cargamentos de barcos coloniales, evaluando su relevancia dentro de las rutas comerciales de navegación histórica.
 - **Valoración de significación patrimonial**: Análisis técnico-patrimonial independiente de colecciones subacuáticas completas o artefactos individuales para uso museístico, docente o científico (enfocado en el valor patrimonial no comercial).

 Casos documentados de relevancia:
 - **Pecios Coloniales (periodo 2001–2004)**: Peritaje integral, documentación técnica, catalogación y valoración patrimonial de los artefactos e instrumentos recuperados de los pecios de la época colonial "Palemón" y "Nuestra Señora de las Mercedes", además de trabajos de asesoría extendidos a otros yacimientos arqueológicos marinos descubiertos en el mismo periodo.

 Cuándo aplica: Este servicio es fundamental ante el hallazgo de restos de naufragios, expediciones científicas autorizadas que requieren el registro formal de bienes arqueológicos marinos, o cuando una institución pública necesita inventariar con rigor científico una colección de bienes subacuáticos recuperados. <!-- Fuente: nichos-servicio.md, Nicho 6; copy-editorial-nichos.md, Nicho 6; experiencia.md; Respuestas.md, Bloque 3.2 -->`,
    en: `Specialty: Underwater Archaeological Heritage & Historic Shipwrecks Appraisal.

 For whom: Museums, scientific entities, universities, research centers, archaeological departments, and heritage institutions requiring the technical cataloguing, authentication, or technical-patrimonial valuation of historical artifacts and cargoes recovered from colonial shipwrecks or marine archaeological sites.

 Methodology & Technical Approach: Luis Manuel Almeida Luis applies to submerged evidence the same rigorous expert and cataloguing protocols that govern terrestrial cultural property. The key methodological difference lies in precisely adjusting the valuation scale to the extraordinary historical-heritage significance, extreme rarity, and uniqueness of each piece recovered underwater. This takes into account factors such as the conservation state affected by the marine environment, the conservation stabilization process, and the shipwreck's documented provenance. Commercial marine numismatics are expressly excluded from his areas of focus, concentrating his work strictly on the scientific cataloguing and appraisal of the historic-cultural value of daily-use objects, navigational instruments, weaponry, and submerged structural elements.

 Specific appraisal services:
 - **Archaeological appraisal reports**: Comprehensive typological, material, dimensional, and photographic recording of recovered archaeological assets to compile technical files for institutional control.
 - **Catalographic records for submerged assets**: Detailed documentation of the provenance, estimated dating, and cultural affiliation of the pieces, integrating them into official registry systems.
 - **Authenticity & historical significance opinions**: Expert studies to certify the temporal and stylistic affiliation of colonial ship cargo, evaluating their relevance within historical trade and navigation routes.
 - **Heritage significance valuation**: Independent technical-heritage analysis of complete underwater collections or individual artifacts for museum, educational, or scientific purposes (focused on non-commercial heritage value).

 Documented cases of significance:
 - **Colonial Shipwrecks (2001–2004 period)**: Comprehensive appraisal, technical documentation, cataloguing, and heritage valuation of artifacts and instruments recovered from the colonial-era shipwrecks "Palemón" and "Nuestra Señora de las Mercedes," alongside advisory work extended to other marine archaeological sites discovered during the same period.

    When it applies: This service is essential upon the discovery of shipwreck remains, authorized scientific expeditions requiring the formal registration of marine archaeological assets, or when a public institution needs to inventory a collection of recovered underwater goods with scientific rigor. <!-- Source: nichos-servicio.md, Nicho 6; copy-editorial-nichos.md, Nicho 6; experience.md; Respuestas.md, Bloque 3.2 -->`
  }
};