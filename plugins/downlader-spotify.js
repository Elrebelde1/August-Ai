import axios from 'axios';
import fs from 'fs';

let isSpotifyProcessing = false;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para buscar música en Spotify
const searchSpotify = async (query, maxRetries = 2) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const apiUrl = `https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl, { timeout: 10000 });

      if (response.data?.status && response.data.data?.length > 0) {
        return response.data.data[0];
      }
    } catch (error) {
      console.error(`❌ Error en intento ${attempt + 1} al buscar en Spotify:`, error.message);
      if (attempt < maxRetries - 1) await wait(12000);
    }
    attempt++;
  }
  return null;
};

// Función para obtener el enlace de descarga
const fetchSpotifyDownloadLink = async (trackUrl, maxRetries = 2) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const apiUrl = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(trackUrl)}`;
      const response = await axios.get(apiUrl, { timeout: 10000 });

      if (response.data?.status === 200 && response.data.result?.music) {
        return response.data.result;
      }
    } catch (error) {
      console.error(`❌ Error en intento ${attempt + 1} al obtener enlace de descarga:`, error.message);
      if (attempt < maxRetries - 1) await wait(12000);
    }
    attempt++;
  }
  return null;
};

let spotifyDownloader = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) {
    let example = `${usedPrefix}${command} Twice`;
    return conn.sendMessage(
      m.chat,
      { text: `❗ *Ingresa el nombre de una canción o artista de Spotify.*\n\n*Ejemplo:* ${example}` },
      { quoted: m }
    );
  }

  if (isSpotifyProcessing) {
    return conn.sendMessage(
      m.chat,
      { text: `❗ *Ya hay una solicitud en proceso. Espera a que termine antes de enviar otra.*` },
      { quoted: m }
    );
  }
  isSpotifyProcessing = true;

  const reactionMessage = await conn.sendMessage(
    m.chat,
    { text: `🔍 *Ok Buscando Tu Música En Spotify😉...*` },
    { quoted: m }
  );
  await conn.sendMessage(
    m.chat,
    { react: { text: '🎵', key: reactionMessage.key } },
    { quoted: m }
  );

  try {
    // Buscar la canción en Spotify
    const trackInfo = await searchSpotify(text);

    if (!trackInfo) {
      await conn.sendMessage(m.chat, { react: { text: '🔴', key: reactionMessage.key } }, { quoted: m });
      throw new Error("No se encontró la canción en Spotify.");
    }

    // Enviar la información de la canción primero
    const trackDetails = `⌘━─━─≪𓄂*Spotify*𝄢─━─━⌘
🎵 *Título:* ${trackInfo.title}
🎤 *Artista:* ${trackInfo.artist}
💽 *Álbum:* ${trackInfo.album}
⏳ *Duración:* ${trackInfo.duration}
🔥 *Popularidad:* ${trackInfo.popularity}
📅 *Fecha de publicación:* ${trackInfo.publish}

> _* Prohibido la copia, Código Oficial de MediaHub™*_`;

    await conn.sendMessage(m.chat, {
      image: { url: trackInfo.image },
      caption: trackDetails,
    });

    // Obtener el enlace de descarga
    const downloadInfo = await fetchSpotifyDownloadLink(trackInfo.url);

    if (!downloadInfo || !downloadInfo.music) {
      await conn.sendMessage(m.chat, { react: { text: '🔴', key: reactionMessage.key } }, { quoted: m });
      throw new Error("No se pudo obtener el enlace de descarga de la canción.");
    }

    await conn.sendMessage(m.chat, { react: { text: '🟢', key: reactionMessage.key } }, { quoted: m });

    // Enviar el audio descargado
    const payload = {
      audio: { url: downloadInfo.music },
      mimetype: 'audio/mpeg',
      fileName: `${downloadInfo.title}.mp3`,
      caption: `> _* Prohibido la copia, Código Oficial de MediaHub™*_`,
      ptt: false,
      thumbnail: fs.readFileSync('./media/icon-all.jpg')
    };

    await conn.sendMessage(m.chat, payload, { quoted: m });

  } catch (error) {
    console.error("❌ Error:", error);
    await conn.sendMessage(
      m.chat,
      { text: `❌ *Ocurrió un error:*\n${error.message || "Error desconocido"}` },
      { quoted: m }
    );
  } finally {
    isSpotifyProcessing = false;
  }
};

spotifyDownloader.command = /^(spotify|spotdl)$/i;
export default spotifyDownloader;