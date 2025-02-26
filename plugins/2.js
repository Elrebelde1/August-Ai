import fetch from 'node-fetch';

// Variables globales para almacenar el estado
let sessions = new Map();

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Obtener o crear sesión para este chat
    let session = sessions.get(m.chat) || {
        videos: [],
        currentIndex: 0,
        query: text || ''  // Almacenar la consulta actual
    };

    if (command === 'tkscroll') {
        // Validar que el usuario ingrese un texto para buscar
        if (!text) {
            return conn.reply(m.chat, `❌ Escribe lo que quieres buscar\nEjemplo: ${usedPrefix}tkscroll bailes`, m);
        }

        // Reiniciar la sesión para la nueva búsqueda
        session = {
            videos: [],
            currentIndex: 0,
            query: text // Guardar la nueva consulta
        };
        sessions.set(m.chat, session);

        try {
            // Llamar a la API con la búsqueda del usuario
            const response = await fetch(`https://api.agatz.xyz/api/tiktoksearch?message=${encodeURIComponent(text)}`);
            const data = await response.json();

            // Validar que la API devolvió un resultado válido
            if (data.status !== 200 || !data.data) {
                return conn.reply(m.chat, '❌ No se encontraron videos', m);
            }

            // Guardar el primer video en la sesión
            session.videos.push(data.data);
            sessions.set(m.chat, session);

            // Enviar el primer video con los botones de navegación
            return await sendVideoWithButtons(session, m, conn);
        } catch (error) {
            console.error(error);
            return conn.reply(m.chat, '❌ Error al buscar videos', m);
        }
    }

    if (command === 'tkseguir') {
        // Verificar que haya videos en la sesión
        if (!session.videos.length) {
            return conn.reply(m.chat, '❌ Primero usa .tkscroll para buscar videos', m);
        }

        // Consultar la API para obtener un nuevo video con la misma búsqueda
        try {
            const response = await fetch(`https://api.agatz.xyz/api/tiktoksearch?message=${encodeURIComponent(session.query)}`);
            const data = await response.json();

            // Validar que la API devolvió un resultado válido
            if (data.status !== 200 || !data.data) {
                return conn.reply(m.chat, '❌ No hay más videos disponibles', m);
            }

            // Agregar el nuevo video a la lista de la sesión
            session.videos.push(data.data);
            session.currentIndex++;
            sessions.set(m.chat, session);

            // Enviar el nuevo video con los botones
            return await sendVideoWithButtons(session, m, conn);
        } catch (error) {
            console.error(error);
            return conn.reply(m.chat, '❌ Error al obtener más videos', m);
        }
    }

    if (command === 'tkatras') {
        // Verificar que haya videos en la sesión
        if (!session.videos.length) {
            return conn.reply(m.chat, '❌ Primero usa .tkscroll para buscar videos', m);
        }

        // Navegar al video anterior si existe
        if (session.currentIndex > 0) {
            session.currentIndex--;
            return await sendVideoWithButtons(session, m, conn);
        } else {
            return conn.reply(m.chat, '❌ Ya estás en el primer video', m);
        }
    }
};

// Función para enviar un video con botones
async function sendVideoWithButtons(session, m, conn) {
    const video = session.videos[session.currentIndex];

    const caption = `
🎥 *Video ${session.currentIndex + 1} de ${session.videos.length}*
━━━━━━━━━━━━━━━━
> Título: ${video.title || 'Sin título'}
> _*©Prohibido La Copia, Código Oficial De MediaHub™*_
`.trim();

    try {
        // Enviar el video con los botones de navegación
        await conn.sendMessage(
            m.chat,
            {
                video: { url: video.no_watermark },
                caption: caption,
                buttons: [
                    { buttonId: '.tkatras', buttonText: { displayText: 'Video Anterior' }, type: 1 },
                    { buttonId: '.tkseguir', buttonText: { displayText: 'Siguiente Video}, type: 1 }
                ],
                viewOnce: true
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al enviar el video', m);
    }
}

handler.help = [
    'tkscroll <búsqueda>',
    'tkseguir',
    'tkatras'
];
handler.tags = ['downloader', 'tools'];
handler.command = /^(tkscroll|tkseguir|tkatras)$/i;

export default handler;