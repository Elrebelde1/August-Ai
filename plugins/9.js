
let handler = async (m, { conn }) => {
    // Aquí puedes agregar tu API para obtener el contenido de pack9
    let apiUrl = 'https://delirius-apiofc.vercel.app/nsfw/boobs'; // Reemplaza esto con la URL de tu API
    let response;

    try {
        response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        let data = await response.json();
        let packContent = data.pack; // Asegúrate de que este campo coincida con la respuesta de tu API

        let str = 'Aquí tienes el pack que solicitaste. 🎉';
        for (let item of packContent) {
            conn.sendFile(m.chat, item.url, item.name, str, m); // Cambia item.url y item.name según la estructura de tu API
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