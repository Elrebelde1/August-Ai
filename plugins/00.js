
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            return m.reply(`❌ Debes proporcionar el nombre de una canción de SoundCloud.\n\nEjemplo: *${usedPrefix + command} nombre_de_la_canción*`);
        }

        const searchQuery = encodeURIComponent(args.join(" "));
        const apiUrl = `https://api.siputzx.my.id/api/s/soundcloud?query=${searchQuery}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('❌ Error en la API.');

        const result = await response.json();
        if (!result.audio) throw new Error('❌ No se encontró el audio.');

        await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });

        await conn.sendMessage(m.chat, {
            audio: { url: result.audio },
            mimetype: 'audio/mpeg',
            fileName: `${result.title || 'Canción'}.mp3`,
            caption: `🎶 *Título:* ${result.title || 'Desconocido'}\n🎤 *Artista:* ${result.artist || 'Desconocido'}`
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error(err);
        m.reply(`❌ Ocurrió un error al procesar la solicitud.`);
    }
};

handler.command = /^soundcloud$/i;
export default handler;