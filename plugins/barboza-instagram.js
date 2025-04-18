
import fetch from "node-fetch";

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply("❗️ Debes proporcionar una URL válida de Instagram.");
    }

    const url = args[0];
    const apiEndpoint = `
https://archive-ui.tanakadomp.biz.id/download/instagram?url={encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        if (!data || !data.video || data.video.length === 0) {
            return m.reply("⚠️ No se pudo obtener el video. Verifica que la URL sea correcta.");
        }

        const videoUrl = data.video; // Enlace del video obtenido de la API
        const caption = `🎥 Aquí está tu video de Instagram:\n🔗 ${url}`;

        await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption }, { quoted: m });
    } catch (error) {
        console.error("Error al descargar el video:", error);
        return m.reply("❌ Ocurrió un error al descargar el video. Intenta nuevamente.");
    }
};

handler.command = ['ig'];
handler.help = ['ig <url>'];
handler.tags = ['downloader'];

export default handler;