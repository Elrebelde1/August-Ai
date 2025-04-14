
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `💸 No se encontró ningún prefijo. Por favor, escribe un prefijo.\n> *Ejemplo: ${usedPrefix + command} !*`;

  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

  // Mensaje de confirmación
  let successMessage = `✅️ Prefijo actualizado con éxito. Prefijo actual: ${text}`;

  await conn.fakeReply(m.chat, successMessage, '0@s.whatsapp.net', '✨ PREFIJO NUEVO ✨');
};

handler.help = ['prefix'].map(v => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;