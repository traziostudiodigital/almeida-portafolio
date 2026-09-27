/**
 * I18N Messages for AI Assistant
 * Mensajes i18n para el chat backend (Worker)
 */

export const I18N_MESSAGES = {
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

/**
 * Helper function to get i18n message
 * @param {string} key - The message key
 * @param {string} lang - The language ('es' or 'en')
 * @returns {string} The translated message
 */
export function getI18nMessage(key, lang) {
  const langMessages = I18N_MESSAGES[lang];
  const fallbackMessages = I18N_MESSAGES.es;
  
  return langMessages?.[key] || fallbackMessages?.[key] || key;
}