# 📐 Sistema y Lógica de Cotización Pericial — Luis Manuel Almeida Luis
> **Archivo:** `/cotizador/logica-cotizacion.md`  
> **Rol / Agente:** Arquitecto del Cotizador (`cotizador.md`)  
> **Estado:** Documento base para implementación del cotizador / calculadora.  
> **Fuentes de verdad:** `/docs/data/01-estructurado/nichos-servicio.md`, `/context/tarifario_base.md`, `/docs/data/01-estructurado/tarifas-servicios.md`.

---

## 1. Principios Rectores y Marco Ético

1. **Independencia Pericial y Cero Vinculación al Valor Tasado:**  
   En cumplimiento estricto del código deontológico pericial internacional (y documentado en `tarifario_base.md`), los honorarios por tasación, catalogación y dictamen pericial **no deben calcularse como porcentaje del valor económico final estimado del bien**. Esto garantiza imparcialidad ante tribunales, aseguradoras, notarios y herederos.  
   *(Excepción única: servicios exclusivos de intermediación o gestión de venta/subasta, si Luis confirma su prestación).*

2. **Desglose Bipartito Obligatorio:**  
   Todo presupuesto formal generado por el sistema debe separar explícitamente:
   - **Honorarios Profesionales:** Retribución por conocimiento pericial, análisis técnico, tiempo de investigación y emisión del informe.
   - **Gastos Operativos Reembolsables (a coste):** Viáticos de desplazamiento, pruebas analíticas de laboratorio, adquisición de consultas documentales en bases de datos de subastas, o mensajería segura.

3. **Transparencia en Moneda y Condiciones:**  
   La cotización debe permitir selección multimoneda (EUR / USD) y explicitar el esquema de liquidación contractual (anticipo de provisión de fondos y liquidación final).

---

## 2. Modelos de Cobro y Algoritmo de Cálculo

El cotizador admite 4 modalidades periciales estándar más 1 modalidad comercial optativa:

### 2.1. Modalidades de Cobro

| Modalidad | Unidad Base | Rango Referencia Mercado | Aplicación Recomendada |
| :--- | :--- | :--- | :--- |
| **M1: Por Hora** | Horas efectivas estimadas ($H$) | 125 €/h – 450 €/h *(típico: 150 – 250 €/h)* | Investigaciones complejas, archivo histórico, litigios con volumen incierto. Mínimo: 3 horas. |
| **M2: Por Pieza / Obra** | Número de bienes ($N$) | 200 € – 300 €+ por pieza | Valoraciones de 1 a 5 piezas aisladas, certificados rápidos. |
| **M3: Por Expediente / Dictamen** | Tipo de informe formal cerrado ($I$) | Ej. 1.200 € / $ (base según alcance) | Herencias familiares, donaciones a museos, expedientes judiciales. |
| **M4: Por Proyecto / Colección** | Presupuesto integral tasado a medida ($C$) | Presupuesto personalizado / paquete | Colecciones completas, inventarios institucionales o diplomáticos. |
| **M5: Intermediación en Venta** *(Optativa)* | % sobre precio de remate o venta | 10% – 15% sobre precio final | Asesoría en colocación en subastas o venta privada. |

---

### 2.2. Algoritmo Matemático General

El precio total de la cotización ($P_{\text{total}}$) se calcula mediante la fórmula:

$$P_{\text{total}} = \left( \text{Honorarios Base} \times F_{\text{formalidad}} \times F_{\text{complejidad}} \times F_{\text{urgencia}} \times F_{\text{volumen}} \right) + G_{\text{reembolsables}}$$

Donde:

#### A. Cálculo de Honorarios Base según Modalidad:
- **Si M1 (Por Horas - Investigaciones Periciales):**  
  $$\text{Honorarios Base} = \max(H_{\text{estimadas}}, H_{\text{mínimo}}) \times T_{\text{hora}}$$  
  *(Parámetros propios confirmados: $H_{\text{mínimo}} = 3\text{h}$; $T_{\text{hora}} = \mathbf{125\text{ EUR/h}}$ dinámico según caso y cliente; Fuente: Respuestas.md, R 1.1)*

- **Si M2 (Consultas Puntuales Sencillas / Por Obra Rápida):**  
  $$\text{Honorarios Base} = N_{\text{piezas}} \times T_{\text{pieza}}$$  
  *(Parámetros propios confirmados: $T_{\text{pieza}} = \mathbf{50\text{ USD}}$ para consultas sencillas/puntuales; Fuente: Respuestas.md, R 1.2)*

- **Si M3 (Por Dictamen / Expediente Completo de Herencias o Judicatura):**  
  $$\text{Honorarios Base} = T_{\text{expediente\_base}}$$  
  *(Parámetros propios confirmados: Tarifado por horas de investigación previa + dictamen técnico partidor; Fuente: Respuestas.md, R 1.3 y 3.1)*

- **Si M4 (Por Proyecto / Gran Inventario Institucional o Colección):**  
  $$\text{Honorarios Base} = T_{\text{jornada}} \times \text{Días} + \text{Tarifa Ficha Catálogo} \times N$$  
  *(Ajustado según alcance del lote e investigación; Fuente: Respuestas.md, R 1.1)*

---

## 3. Matriz de Variables y Factores de Ponderación ($F$)

### 3.1. Factor de Formalidad y Nivel de Responsabilidad ($F_{\text{formalidad}}$)

| Nivel de Entregable | Descripción y Alcance | Factor Multiplicador | Estado Parámetro |
| :--- | :--- | :---: | :--- |
| **1. Dictamen / Informe Verbal** | Consulta técnica preliminar sin emisión de documento vinculante ni firma oficial. | **0.60** | Propuesto en `tarifas_config.json` |
| **2. Certificado de Tasación Simple** | Documento breve de 1-2 páginas para seguros o inventario doméstico básico. | **1.00** *(Base)* | Parámetro estándar de referencia |
| **3. Dictamen Pericial Oficial Completo** | Dossier técnico con análisis de soporte, técnica, estado de conservación, bibliografía, procedencia y valor de mercado. | **1.50** | Propuesto en `tarifas_config.json` |
| **4. Dictamen Judicial / Testifical** | Informe pericial ratificable ante tribunales y notarías con responsabilidad legal y civil. | **2.00** | Propuesto en `tarifas_config.json` |

---

### 3.2. Factor de Complejidad Técnica y Tipología del Bien ($F_{\text{complejidad}}$)

| Tipología del Bien | Nivel de Dificultad Investigativa | Factor Multiplicador | Estado Parámetro |
| :--- | :--- | :---: | :--- |
| **A. Arte Contemporáneo / Firma Registrada** | Obra con autor identificado, registro vivo o catálogo razonado accesible. | **1.00** *(Base)* | Parámetro estándar de referencia |
| **B. Vanguardia Cubana / Arte Moderno** | Obras de autores históricos con alta incidencia de falsificaciones (ej. Peláez, Cabrera Moreno, Portocarrero, Darié). Requiere análisis estilístico profundo y cotejo de trazabilidad. | **1.30** | Propuesto en `tarifas_config.json` |
| **C. Manuscritos Históricos y Fondos Documentales** | Documentos de archivo, cartas, manuscritos literarios y firma histórica (ej. Loynaz, Carpentier, Casal). Exige análisis paleográfico y de tintas/papel. | **1.40** | Propuesto en `tarifas_config.json` |
| **D. Bienes Arqueológicos y Subacuáticos** | Pecios, numismática colonial, piezas coloniales o precolombinas sin catálogo directo. | **1.50** | Propuesto en `tarifas_config.json` |
| **E. Atribución Incierta / Anónimo Antiguo** | Obra de autor no identificado o escuela antigua con necesidad de rastreo histórico y comparativas de laboratorio. | **1.60** | Propuesto en `tarifas_config.json` |

---

### 3.3. Factor de Volumen / Escala de Lote ($F_{\text{volumen}}$)

Para estructurar la cotización en lotes de múltiples piezas (evitando precios lineales desproporcionados sin inventar porcentajes):

| Cantidad de Obras ($N$) | Ajuste sobre Tarifa Unitaria por Pieza | Estado Parámetro |
| :---: | :---: | :--- |
| **1 a 3 piezas** | 100% de la tarifa (Factor base: **1.00**) | Parámetro estándar de referencia |
| **4 a 10 piezas** | 90% de la tarifa (Factor: **0.90**) | Propuesto en `tarifas_config.json` |
| **11 a 30 piezas** | 80% de la tarifa (Factor: **0.80**) | Propuesto en `tarifas_config.json` |
| **> 30 piezas / Gran Colección** | Cotización por Proyecto / Jornada de trabajo (Modalidad M4) | A cotizar bajo presupuesto a medida |

---

### 3.4. Factor de Urgencia y Plazo de Entrega ($F_{\text{urgencia}}$)

| Plazo de Entrega | Plazo Típico | Factor Multiplicador | Estado Parámetro |
| :--- | :--- | :---: | :--- |
| **Estándar** | 10 a 15 días hábiles | **1.00** *(Base)* | Parámetro estándar de referencia |
| **Prioritario** | 5 a 7 días hábiles | **1.20** | Propuesto en `tarifas_config.json` |
| **Urgente / Judicial** | 48 a 72 horas | **1.50** | Propuesto en `tarifas_config.json` |
| **Exprés / Inmediato** | 24 horas (según viabilidad técnica) | **2.00** | Propuesto en `tarifas_config.json` |

---

### 3.5. Gastos Operativos Reembolsables ($G_{\text{reembolsables}}$)

Los gastos no son honorarios; se presupuestan como estimación previa y se liquidan a coste justificado:

1. **Desplazamiento e Inspección In Situ:**
   - Desplazamiento local (La Habana / Radio urbano): Tarifa fija de visita **50 EUR/USD** (Propuesta).
   - Desplazamiento interprovincial o internacional: Billetes de transporte + alojamiento + dietas diarias + tiempo de traslado facturado a coste de desplazamiento.
   - Dieta diaria: **40 (Nacional) / 80 (Internacional)** (Propuesta).
   - Hora de desplazamiento: **25 EUR/h** (Propuesta).
2. **Consultas Técnicas y Acceso a Bases de Datos:**
   - Adquisición de extractos de bases internacionales (Artnet, Artprice, Invaluable) o catálogos específicos si el caso lo exige (a coste real).
3. **Análisis Científicos Externos:**
   - Pruebas físico-químicas de laboratorio (pigmentos, rayos X, reflectografía, datación), contratadas con centros especializados a solicitud del cliente (a coste real).

---

## 4. Matriz de Aplicación por Nichos de Servicio

Cruzando la lógica matemática con los 4 nichos estructurados en `docs/data/01-estructurado/nichos-servicio.md`:

### Nicho 1: Repartición y tasación de herencias
- **Descripción:** Valoración de bienes muebles y obras de arte en procesos sucesorios y legales.
- **Modalidad Recomendada:** M3 (Por Expediente) o M2 (Por Pieza con escala de volumen).
- **Tipología de Entregable:** Nivel 3 o 4 (Dictamen pericial con valor de liquidación/adjudicación y partición equitativa).
- **Variables Críticas:**
  - Número de herederos y nivel de litigiosidad.
  - Inventario heterogéneo (combinación de pintura, mobiliario, platería, documentos).
  - Mediación y reuniones de presentación pericial a las partes.

### Nicho 2: Tasación de bienes y precios varios
- **Descripción:** Valoración de colecciones estatales, institucionales y bienes de alto valor patrimonial (incluye inventarios diplomáticos y bienes arqueológicos).
- **Modalidad Recomendada:** M4 (Por Proyecto / Jornadas periciales).
- **Tipología de Entregable:** Nivel 3 (Fichas técnicas catalogadas según normas de inventario patrimonial internacional).
- **Variables Críticas:**
  - Ubicación geográfica y dispersión de sedes (desplazamientos múltiples).
  - Tipología de bienes de alta protección (Grado de Valor I, pecios y bienes arqueológicos).
  - Nivel de seguridad y protocolos institucionales requeridos.

### Nicho 3: Peritaje y tasación de bienes de personalidades de la cultura cubana
- **Descripción:** Inventario y valoración de colecciones privadas pertenecientes a figuras prominentes de la cultura.
- **Modalidad Recomendada:** M1 (Por Horas de investigación) + M2 (Por Pieza catalogada).
- **Tipología de Entregable:** Nivel 3 (Dictamen pericial con estudio de procedencia y trazabilidad de custodia).
- **Variables Críticas:**
  - Rareza del material y necesidad de compulsa con archivos históricos.
  - Obras de vanguardia con alta exigencia de autentificación.
  - Cláusula de confidencialidad estricta para herederos o coleccionistas privados.

### Nicho 4: Conferencias y colaboración institucional sobre tráfico ilícito de bienes culturales
- **Descripción:** Asesoría, docencia y representación internacional en materia de protección del patrimonio y lucha contra el tráfico ilegal.
- **Modalidad Recomendada:** M1 (Tarifa por hora de consultoría) o Tarifa por Jornada / Conferencia.
- **Tipología de Entregable:** Informes técnicos de riesgo patrimonial, dictámenes de exportación/importación, ponencias periciales.
- **Variables Críticas:**
  - Formato docente / taller institucional vs. peritaje de decomiso / aduanas.
  - Organismo solicitante (museos, policía patrimonial, fundaciones culturales).

---

## 5. Estructura de la Hoja de Encargo / Presupuesto Formal (Entregable al Cliente)

El motor del cotizador debe estructurar la salida en un documento profesional con las siguientes secciones obligatorias:

1. **Cabecera Profesional:**
   - Nombre: Luis Manuel Almeida Luis (Perito Tasador y Valuador de Bienes de Alto Valor).
   - Datos del cliente / solicitante (o representante legal).
   - Fecha de emisión y código único de presupuesto pericial.
2. **Objeto del Encargo Pericial:**
   - Descripción de la/s obra/s o bienes a examinar (título, autor atribuido, técnica, dimensiones).
   - Finalidad declarada del dictamen (herencia, seguro, tasación de mercado, donación, compraventa).
3. **Metodología y Alcance:**
   - Examen organoléptico in situ / análisis de laboratorio / compulsa documental.
   - Nivel de formalidad del informe pericial.
4. **Desglose Económico Detallado:**
   - Honorarios Profesionales Periciales: $X.XX$ (EUR/USD).
   - Estimación de Gastos Operativos Reembolsables: $Y.YY$ (EUR/USD).
   - Subtotal e Impuestos/Retenciones aplicables: $Z.ZZ$ (EUR/USD).
   - **Total Presupuesto:** $P_{\text{total}}$ (EUR/USD).
5. **Condiciones de Ejecución y Pago:**
   - Provisión de fondos / Anticipo inicial: **50%** al firmar la aceptación del encargo *(Referencia de mercado: 50%–60%; Fuente: Cobro o Tarifa 2.md)*.
   - Liquidación final: **50%** contra entrega y firma formal del dictamen/informe *(Fuente: Cobro o Tarifa 2.md)*.
    - Plazo de entrega estimado desde la recepción del anticipo e inspección del bien.
    - Validez de la oferta: **30 días** (Propuesto en `tarifas_config.json`).
6. **Cláusula Ética y de Imparcialidad:**
   - Declaración expresa de no tener interés económico o de parentesco con las partes ni con el valor final asignado.

---

## 6. Lista de Parámetros Propios Confirmados por Luis Manuel Almeida Luis

1. **Tarifas Base Propias:**
   - **Tarifa hora base:** $125\text{ EUR/h}$ (dinámica por complejidad y tipo de cliente/juicio/herencia).
   - **Consulta puntual rápida:** $50\text{ USD}$ (casos sencillos).
   - **Determinación de honorarios:** Basada en horas/tiempo de investigación y complejidad (nunca por % sobre el valor de la obra).
2. **Moneda y Facturación:**
   - Multi-moneda internacional: **EUR / USD** (según el cliente). Cero transacciones en MLC.
3. **Servicio de Intermediación Comercial:**
   - **10% de comisión** en gestiones privadas directas de compra/venta entre partes.
   - **Regla del Cotizador:** La intermediación es un servicio privado y **no se incluye en la calculadora web pública**, operando esta 100% como perito tasador independiente.
4. **Viáticos y Desplazamientos:**
   - Disponibilidad total de viaje nacional e internacional a coste de viáticos/gastos reembolsables contenidos en la liquidación del cliente.
