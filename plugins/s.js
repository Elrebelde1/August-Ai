
let handler = async (m, { conn }) => {
    // Obtener el texto del mensaje y dividirlo en palabras
    let texto = m.text.split(' ').slice(1); // Ignorar el primer elemento que es el comando

    // Verificar si hay usuarios mencionados o nombres
    if (texto.length === 0) {
        return conn.sendMessage(m.chat, { text: "¡Por favor proporciona nombres o menciona usuarios para seleccionar!" }, { quoted: m });
    }

    // Seleccionar un nombre al azar de la lista
    const indiceAleatorio = Math.floor(Math.random() * texto.length);
    const seleccionado = texto[indiceAleatorio];

    // Crear el mensaje de respuesta
    const mensaje = `🎉 *Felicidades* 🎉\n\n@${usuario} ha sido seleccionado al azar. ¡Disfruta tu día!`;

    // Enviar el mensaje al chat mencionando al usuario seleccionado
    await conn.sendMessage(m.chat, { text: mensaje, mentions: [@usuario] }, { quoted: m });
}

// Comando para seleccionar
handler.help = ['seleccionar nombre1 nombre2 nombre3 ...'];
handler.tags = ['juegos'];
handler.command = ['seleccionar'];

export default handler;