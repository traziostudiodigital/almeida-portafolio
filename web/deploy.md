# 🚀 PROTOCOLO DE DESPLIEGUE — CLOUDFLARE PAGES

Este documento detalla el checklist técnico para la puesta en producción del ecosistema web en la infraestructura de Cloudflare.

## 1. PREPARACIÓN DEL REPOSITORIO (GitHub)
- [ ] **Limpieza:** Asegurar que `.gitignore` contenga `node_modules/`, `.DS_Store`, y archivos de logs.
- [ ] **Estructura:** El repositorio debe tener `/web/` como raíz (o root de publicación configurada en Cloudflare).
- [ ] **Push:** Subir la versión compilada y validada (Fase 5.4 completada).

## 2. CLOUDFLARE PAGES (Build Pipeline)
- [ ] **Conexión:** Vincular repositorio GitHub a Cloudflare Pages.
- [ ] **Configuración de Build:**
    - **Build command:** `node compilar.js`
    - **Build output directory:** `dist` (o directorio especificado en `compilar.js`)
    - **Node version:** Versión LTS actual.
- [ ] **Deploy:** Ejecutar el primer despliegue manual y verificar logs en el dashboard de Cloudflare.

## 3. CONFIGURACIÓN DE DOMINIO PERSONALIZADO
- [ ] **Registro:** En la sección "Custom Domains" de Cloudflare Pages, añadir el dominio comprado en Hostinger.
- [ ] **DNS:**
    - **Opción A (Recomendada):** Cambiar los NameServers en el panel de Hostinger por los proporcionados por Cloudflare.
    - **Opción B (Alternativa):** Apuntar registro CNAME desde Hostinger hacia el endpoint `pages.dev` generado por Cloudflare.
- [ ] **Verificación:** Esperar propagación DNS (generalmente < 60 min).

## 4. INTEGRACIÓN POST-DEPLOY (Sinergia IA)
- [ ] **Workers & KV:** Validar que los scripts del chat IA (Fase 6) tengan los permisos de lectura/escritura correctos hacia los KV Namespaces una vez que el sitio esté bajo el dominio personalizado.
- [ ] **Seguridad:** Activar "Always Use HTTPS" y asegurar reglas de WAF básicas si es necesario.

## 5. VALIDACIÓN FINAL
- [ ] **Certificado SSL:** Confirmar estado "Active" en SSL/TLS.
- [ ] **SEO:** Ejecutar auditoría rápida (Lighthouse/Search Console) para validar que el `sitemap.xml` y `robots.txt` son accesibles desde el dominio real.
