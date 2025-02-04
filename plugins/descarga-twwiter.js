
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, '🚩 Ingresa el texto que deseas buscar en Twitter.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Minecraft`, m, rcanal);
  }
  await m.react('🕓');

  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(text)}`);

    if (response.data && Array.isArray(response.data.result)) {
      const results = response.data.result;
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          let tweet = results[i];
          let txt = '`乂  T W I T T E R  -  B U S Q U E D A`\n\n';
          txt += `    ✩  *Usuario* : ${tweet.user}\n`;
          txt += `    ✩  *Perfil* : ${tweet.profile}\n`;
          txt += `    ✩  *Publicación* : ${tweet.post}\n`;
          txt += `    ✩  *Enlace* : ${tweet.user_link}\n\n`;
          txt += `    ✩  *Imagen* : ${tweet.profile}`;

          let imge = tweet.profile;
        
        await conn.sendMessage(m.chat, { image: { url: imge }, caption: txt }, { quoted: m });
        }
        await m.react('✅');
      } else {
        await m.react('✖️');
        await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda en Twitter.', m);
      }
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos de la API de Twitter.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['search'];
handler.help = ['twittersearch *<texto>*'];
handler.command = ['twittersearch', 'tsearch'];
handler.register = true;

export default handler;