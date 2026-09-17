/**
 * assets/i18n-core.js
 * Motor ultraligero de traducción por atributos data-i18n.
 * Siguiendo la Subfase 5.3.1 del Roadmap y las directrices de ARCHITECTURE.md.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.i18nCore = {})));
})(this, (function (exports) {
    'use strict';

    // Asumir que i18n-data.js ha sido cargado previamente y expone window.i18nData
    var i18nData = typeof window !== 'undefined' && window.i18nData ? window.i18nData : {};

    var i18nCore = {
        // Idioma actual (es por defecto, puede sobreescribirse con localStorage o navigator)
        currentLang: navigator.language.startsWith('es') ? 'es' : 'en',

        // Inicializar la traducción al cargar el DOM
        init: function () {
            // Sobreescribir idioma si está guardado en localStorage
            var storedLang = localStorage.getItem('lm-almeida-lang');
            if (storedLang && ['es', 'en'].includes(storedLang)) {
                this.currentLang = storedLang;
            }

            // Traducir todos los elementos con data-i18n
            this.translateAll();

            // Actualizar atributo lang del <html> para SEO y accesibilidad
            document.documentElement.lang = this.currentLang;

            // Escuchar cambios de idioma (por ejemplo, desde el selector de idioma)
            this.setupLanguageSwitcher();
        },

        // Traducir un elemento individual basado en su clave data-i18n
        translateElement: function (element) {
            var key = element.getAttribute('data-i18n');
            if (!key) return;

            // Matiz diferenciado para el Nicho #5 (Aseguradoras/Family Offices)
            // Si la clave es de nicho 5, aplicamos lógica especial si es necesario.
            // Por ahora, detectamos el contexto a través de una función de resolución.
            var value = this.resolveContent(key);
            
            if (value !== undefined) {
                // Si el valor contiene placeholders como {year}, reemplazar
                var translated = this.replacePlaceholders(value);
                element.innerHTML = translated;
            } else {
                // En desarrollo, mostrar la clave faltante para depuración
                console.warn('[i18n] Clave no encontrada: "' + key + '" en idioma "' + this.currentLang + '"');
                element.innerHTML = '[' + key + ']';
            }
        },

        // Resolución de contenido con manejo especial para matices de nicho
        resolveContent: function (key) {
            // i18n-data.js usa claves planas con puntos literales (ej. "home.h1"),
            // por lo que se busca directamente y no como ruta anidada.
            var dict = i18nData[this.currentLang];
            var content = dict ? dict[key] : undefined;

            // Matiz para Nicho #5: Si estamos en EN y es una clave específica de ese nicho
            // que requiere un tono comercial más directo.
            if (this.currentLang === 'en' && key === 'n5.cta.whatsapp') {
                // Aquí aplicamos el matiz solicitado: énfasis comercial en EN
                return "Hello, I represent an insurance company/family office and require an expert valuation of an art collection or high-value assets.";
            }

            return content;
        },

        // Traducir todos los elementos con data-i18n en el documento
        translateAll: function () {
            document.querySelectorAll('[data-i18n]').forEach(function (el) {
                this.translateElement(el);
            }.bind(this));
        },

        // Obtener valor anidado usando notación de punto
        getNestedValue: function (obj, path) {
            return path.split('.').reduce(function (xs, x) {
                return (xs && xs[x] !== undefined) ? xs[x] : undefined;
            }, obj);
        },

        // Reemplazar placeholders simples como {year} con el año actual
        replacePlaceholders: function (str) {
            return str.replace(/\{year\}/g, new Date().getFullYear());
        },

        // Cambiar el idioma y volver a traducir
        setLang: function (lang) {
            if (!['es', 'en'].includes(lang)) return;
            this.currentLang = lang;
            localStorage.setItem('lm-almeida-lang', lang);
            document.documentElement.lang = lang;
            this.translateAll();
        },

        // Alternar entre es y en
        toggleLang: function () {
            this.setLang(this.currentLang === 'es' ? 'en' : 'es');
        },

        // Configurar los selectors de idioma (botones) para cambiar idioma
        setupLanguageSwitcher: function () {
            var switches = document.querySelectorAll('[data-i18n="nav.lang"], #language-switcher, #language-switcher-mobile');
            switches.forEach(function (btn) {
                btn.removeEventListener('click', this.handleLangClick); // evitar duplicados
                btn.addEventListener('click', this.handleLangClick.bind(this));
            }.bind(this));
        },

        // Handler para clicks en el selector de idioma
        handleLangClick: function () {
            this.toggleLang();
            // El texto se actualizará automáticamente por translateAll
        }
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            i18nCore.init();
        });
    } else {
        i18nCore.init();
    }

    // Exportar para uso en otros módulos (opcional)
    exports.init = i18nCore.init;
    exports.setLang = i18nCore.setLang;
    exports.toggleLang = i18nCore.toggleLang;
    exports.translateAll = i18nCore.translateAll;

    return exports;
}));