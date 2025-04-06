
let handler = async (m, { conn }) => {
    // API para obtener el contenido de pack9
    let apiUrl = 'https://delirius-apiofc.vercel.app/nsfw/boobs'; 
    let response;

    try {
        response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error en la respuesta de la API');

        let data = await response.json();
        let packContent = data; // Ajusta esto si la respuesta tiene un formato diferente

        let str = 'Aquí tienes el pack que solicitaste. 🎉';
        
        // Asegúrate de que 'packContent' sea un array de URLs
        if (Array.isArray(packContent)) {
            for (let item of packContent) {
                conn.sendFile(m.chat, item.url, item.name || 'contenido.jpg', str, m); // Usa un nombre por defecto si no hay nombre
            }
        } else {
            conn.sendMessage(m.chat, 'No se encontró contenido en el pack.', m);
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, 'Lo siento, ocurrió un error al intentar obtener el pack.', m);
    }
}

handler.help = ['pack9'];
handler.tags = ['pack'];
handler.command = /^pack9$/i;

export default handler;