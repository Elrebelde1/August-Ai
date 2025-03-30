import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'No se detectó un archivo válido';
  const media = await q.download();
  try {
    const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    const link = await (isTele ? uploadImage : uploadFile)(media);
    await conn.sendFile(m.chat, link, '', '© Prohibido la copia, Código Oficial de MediaHub™', m);
  } catch (e) {
    console.log(e);
  }
}

handler.help = ['ver'];
handler.tags = ['herramientas'];
handler.command = /^(ver)$/i;
export default handler;