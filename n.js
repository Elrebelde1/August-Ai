
let handler = async (m, { conn }) => {
    // Aquí puedes agregar tu API para obtener contenido NSFW
    let apiUrl = 'https://delirius-apiofc.vercel.app/nsfw/boobs'; // Reemplaza esto con la URL de tu API
    let response;

    try {
        response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        let data = await response.json();
        let mediaUrl = data.url; // Asegúrate de que este campo coincida con la respuesta de tu API

        let str = 'Aquí tienes el contenido NSFW que pediste. 😉';
        conn.sendFile(m.chat, mediaUrl, 'contenido.jpg', str, m);
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, 'Lo siento, ocurrió un error al intentar obtener el contenido NSFW.', m);
    }
}

handler.help = ['nsfw'];
handler.tags = ['nsfw'];
handler.command = /^nsfw$/i;

export default handler;