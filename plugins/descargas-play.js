import fetch from "node-fetch";
import yts from "yt-search";
import os from "os";
import { promises as fs } from "fs";

// Función para manejar reintentos de solicitudes
const fetchWithRetries = async (url, maxRetries = 2) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.status === 200 && data.result && data.result.download && data.result.download.url) {
        return data.result;
      }
    } catch (error) {
      console.error(`Error en el intento ${attempt + 1}:`, error.message);
    }
    attempt++;
  }
  throw new Error("No se pudo obtener una respuesta válida después de varios intentos.");
};

// Función para decodificar Base64
const decodeBase64 = (encoded) => Buffer.from(encoded, "base64").toString("utf-8");

// Función para verificar espacio libre en el disco
const checkDiskSpace = (threshold = 100 * 1024 * 1024) => {
  const freeSpace = os.freemem(); // Espacio libre en bytes
  if (freeSpace < threshold) {
    throw new Error("Espacio insuficiente en el disco para procesar la solicitud.");
  }
};

// Función para limpiar archivos temporales
const clearTempFiles = async () => {
  const tempDir = "/tmp";
  try {
    const files = await fs.readdir(tempDir);
    for (const file of files) {
      await fs.unlink(`${tempDir}/${file}`);
    }
    console.log("Archivos temporales eliminados.");
  } catch (error) {
    console.error("Error al limpiar archivos temporales:", error.message);
  }
};

// URL de la API codificada en Base64
const encodedApiUrl = "aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDM=";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `❗ *Por favor ingresa un término de búsqueda para encontrar la música.*\n\n*Ejemplo:* ${usedPrefix}play No llores más`,
    });
  }

  // Mensaje inicial indicando que Barboza Bot Ai está buscando la música
  const key = await conn.sendMessage(m.chat, {
    text: `⌘━─━─≪ *BARBOZA BOT AI* ≫─━─━⌘\n\n🔎 *Buscando la música, por favor espera...*`,
  });

  try {
    // Verificar espacio en disco
    checkDiskSpace();

    // Limpiar archivos temporales antes de continuar
    await clearTempFiles();

    // Realizar búsqueda en YouTube
    const searchResults = await yts(text);
    if (!searchResults || !searchResults.videos.length) {
      throw new Error("No se encontraron resultados en YouTube.");
    }

    // Seleccionar el primer resultado
    const video = searchResults.videos[0];
    const { title, timestamp: duration, views, author, ago, url: videoUrl } = video;

    // Decodificar la URL de la API
    const apiUrl = decodeBase64(encodedApiUrl) + `?url=${encodeURIComponent(videoUrl)}`;

    // Intentar obtener datos con reintentos
    const apiData = await fetchWithRetries(apiUrl);

    const { metadata, download } = apiData;
    const { url: downloadUrl } = download;

    // Descripción personalizada para el comando .play
    const descriptionVideo = `⌘━─━─≪ *BARBOZA BOT AI* ≫─━─━⌘\n★ *Título:* ${metadata.title}\n★ *Subido:* ${metadata.ago || "Desconocido"}\n★ *Duración:* ${metadata.duration.timestamp}\n★ *Vistas:* ${metadata.views.toLocaleString()}\n★ *Autor:* ${metadata.author.name}\n★ *URL:* ${metadata.url}\n⌘━━─≪ Power By Barboza Bot Ai ≫─━━⌘\n\n> _*Barboza Bot Ai está enviando su archivo, por favor espere..._*`;

    // Actualizar mensaje inicial con la información específica
    await conn.sendMessage(m.chat, { text: descriptionVideo, edit: key });

    // Enviar archivo como audio
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl },
        mimetype: "audio/mpeg",
        fileName: `${metadata.title}.mp3`,
        caption: "🎶 Música obtenida desde Barboza Bot Ai",
      },
      { quoted: m }
    );

    // Limpiar archivos temporales después de la operación
    await clearTempFiles();
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    await conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error al intentar procesar tu solicitud:*\n${error.message || "Error desconocido"}`,
      edit: key,
    });
  }
};

handler.command = /^play$/i;

export default handler;