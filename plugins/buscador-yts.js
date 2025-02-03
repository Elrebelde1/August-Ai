
var handler = async (m, { text, conn, args, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, '🔎 Por favor, ingresa una búsqueda de Youtube.', m);

    conn.reply(m.chat, wait, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: dev,
                previewType: 0,
                thumbnail: icons,
                sourceUrl: channel
            }
        }
    });

    try {
        let results = await yts(text);
        let tes = results.all;

        if (tes.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);

        let teks = tes.map(v => {
            if (v.type === 'video') {
                return `✦ Resultados de la búsqueda para *<${text}>*\n\n> ☁️ Título » *${v.title}*\n> 🔔 Canal » *${v.author.name}*\n> 🕝 Duración » *${v.timestamp}*\n> 📆 Subido » *${v.ago}*\n> 👀 Vistas » *${v.views}*\n> 🔗 Enlace » ${v.url}`;
            }
        }).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n');

        conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Ocurrió un error al buscar.', m);
    }
};