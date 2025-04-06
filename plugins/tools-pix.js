
import fetch from 'node-fetch';

var handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '🚫 Por favor, proporciona una descripción para generar la imagen.', m);
    }

    const description = args.join(' '); // Unir los argumentos para formar la descripción

    try {
        await conn.reply(m.chat, '⏳ Generando tu imagen, por favor espera...', m);

        const imageURL = await generateImage(description);

        if (imageURL) {
            await conn.sendFile(m.chat, imageURL, 'imagen.png', '🎉 Aquí tienes tu imagen generada:', m);
        } else {
            return conn.reply(m.chat, "⚠️ No se pudo generar la imagen.", m);
        }
    } catch (error) {
        return conn.reply(m.chat, `⚠️ Error: ${error.message}`, m); // Corregido el uso de comillas
    }
};

handler.help = ['pixai'].map((v) => v + ' *<descripción>*');
handler.tags = ['generación'];
handler.command = ['pixai'];
handler.group = true;
handler.register = true;

export default handler;

async function generateImage(description) {
    const apiUrl = `https://archive-ui.tanakadomp.biz.id/maker/text2img?text=${encodeURIComponent(description)}`; // Corregido el uso de comillas

    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // Cambié a GET ya que parece que no necesitas un cuerpo
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Verifica si la respuesta es válida
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.statusText}`); // Corregido el formato
        }

        const data = await response.json();

        if (data && data.image_url) {
            return data.image_url; // Asegúrate de que esta propiedad sea correcta según la respuesta de tu API
        } else {
            throw new Error('No se pudo obtener la URL de la imagen.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}