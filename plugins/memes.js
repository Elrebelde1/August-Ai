
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(`❌ Debes proporcionar un enlace de imagen para generar el meme.\n\nEjemplo: *${usedPrefix + command} https://example.com/image.jpg*`);
    }

    try {
        const imageUrl = encodeURIComponent(args[0]);
        const apiUrl = `https://api.siputzx.my.id/api/m/memgen?link=${imageUrl}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('❌ Error en la API.');

        const result = await response.json();
        if (!result.url) throw new Error('❌ No se pudo generar el meme.');

        await conn.sendMessage(m.chat, { image: { url: result.url }, caption: '🤣 Aquí está tu meme generado.' }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error(error);
        m.reply(`❌ Ocurrió un error al generar el meme.`);
    }
};

handler.command = /^memes$/i;
export default handler;