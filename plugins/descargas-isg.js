
import axios from 'axios';

let handler = async (m, { conn, args }) => {
    // Verificar que se haya proporcionado una URL
    if (!args[0]) {
        return await conn.sendMessage(m.chat, { text: 'Por favor, proporciona una URL de Instagram.' });
    }

    // Construir la URL de la API con la URL de Instagram proporcionada
    const instagramUrl = args[0];
    const apiUrl = `https://archive-ui.tanakadomp.biz.id/download/instagram?url=${encodeURIComponent(instagramUrl)}`;

    try {
        // Obtener datos de la API
        const response = await axios.get(apiUrl);
        
        // Verificar si la respuesta contiene datos
        if (response.data && response.data.url) {
            const downloadLink = response.data.url;

            // Enviar el enlace de descarga al chat
            await conn.sendMessage(m.chat, { text: `Aquí tienes el enlace para descargar el contenido:\n${downloadLink}` });
        } else {
            await conn.sendMessage(m.chat, { text: 'No se encontró contenido para esa URL.' });
        }

        m.react('✅'); // Reacción al mensaje enviado
    } catch (error) {
        console.error('Error al obtener datos de Instagram:', error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al intentar obtener los datos. Por favor verifica la URL.' });
    }
};

handler.command = ['igs']; // Comando para activar el manejador

export default handler;