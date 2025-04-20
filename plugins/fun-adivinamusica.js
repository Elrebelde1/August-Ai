
import fetch from 'node-fetch';

const musicGame = {}; // Objeto para almacenar los juegos activos

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) {
      throw `❌ Por favor envía el comando junto con un enlace de YouTube.\nEjemplo: *${usedPrefix}${command} https://www.youtube.com/watch?v=dQw4w9WgXcQ*`;
    }

    const videoUrl = args[0];
    if (!/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(videoUrl)) {
      throw `❌ El enlace proporcionado no parece ser válido. Por favor, envía un enlace válido de YouTube.`;
    }

    const encodedUrl = encodeURIComponent(videoUrl);
    const primaryAPI = `https://mahiru-shiina.vercel.app/download/ytmp3?url=${encodedUrl}`;
    const backupAPI = `https://api.vreden.my.id/api/ytmp3?url=${encodedUrl}`;

    let json = null;

    // Intentar la API primaria
    try {
      const res = await fetch(primaryAPI);
      if (!res.ok) throw new Error('Error en la API primaria.');
      json = await res.json();
    } catch (err) {
      console.warn('API primaria falló, intentando la API de respaldo...');
      const resBackup = await fetch(backupAPI);
      if (!resBackup.ok) throw new Error('Error en la API de respaldo.');
      json = await resBackup.json();
    }

    const { title, audio_url } = json.result || {};
    if (!audio_url || !title) throw '❌ No se pudo obtener el audio de la API.';

    // Guardar la respuesta correcta
    musicGame[m.sender] = {
      answer: title.toLowerCase(), // Solo el título como respuesta correcta
      timeout: setTimeout(() => {
        m.reply(`⏰ ¡Tiempo agotado! La respuesta correcta era: *${title}*.`);
        delete musicGame[m.sender];
      }, 30000), // 30 segundos para responder
    };

    // Enviar el fragmento de música al usuario
    await conn.sendMessage(m.chat, {
      audio: { url: audio_url },
      mimetype: 'audio/mpeg',
      ptt: true, // Enviar como nota de voz
      caption: `🎵 *Adivina la canción* 🎵

🎤 ¿Puedes identificar el título de esta canción?

⏳ *Tienes 30 segundos* para responder escribiendo en el chat.`,
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Ocurrió un error:\n${err.message || err}`);
  }
};

// Manejar respuestas de los usuarios
handler.before = async (m, { conn }) => {
  if (musicGame[m.sender]) {
    const game = musicGame[m.sender];
    if (m.text.toLowerCase().includes(game.answer)) {
      clearTimeout(game.timeout); // Limpiar el tiempo
      delete musicGame[m.sender]; // Finalizar el juego
      return m.reply(`✅ ¡Correcto! Era *${game.answer}*.\n🎉 ¡Bien hecho!`);
    } else {
      return m.reply('❌ ¡Incorrecto! Sigue intentándolo...');
    }
  }
};

// Configuración del comando
handler.help = ['adivinamusica <enlace-de-youtube>'];
handler.tags = ['juegos'];
handler.command = /^adivinamusica$/i;

export default handler;