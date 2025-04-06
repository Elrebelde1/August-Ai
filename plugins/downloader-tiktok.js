
import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '🚫 Por favor, ingresa un enlace de TikTok.', m);
    }

    try {
        await conn.reply(m.chat, '⏳ Espere un momento, estoy descargando su video...', m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "⚠️ Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", '🎉 Aquí tienes ฅ^•ﻌ•^ฅ', m);
        } else {
            return conn.reply(m.chat, "⚠️ No se pudo descargar.", m);
        }
    } catch (error) {
        return conn.reply(m.chat, `⚠️ Error: ${error.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.group = true;
handler.register = true;

export default handler;

async function tiktokdl(url) {
    const tikwm = `https://archive-ui.tanakadomp.biz.id/download/tiktok?url=${encodeURIComponent(url)}`;
    let response = await (await fetch(tikwm)).json();
    return response;
}