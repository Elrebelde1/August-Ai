
let handler = async (m, { conn }) => {
    // Lista de participantes
    const participantes = ['Agust', 'Juan', 'María', 'Luisa', 'Carlos']; // Puedes agregar más nombres aquí

    // Seleccionar un participante al azar
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const seleccionado = participantes[indiceAleatorio];

    // Crear el mensaje
    const mensaje = `🎉 *Felicidades* 🎉\n\n@${seleccionado} has sido seleccionado por Agust AI. ¡Disfruta tu día!`;

    // Enviamos el mensaje al chat
    await conn.sendMessage(m.chat, { text: mensaje, mentions: [seleccionado + '@s.whatsapp.net'] }, { quoted: m });
}

handler.help = ['seleccionar'];
handler.tags = ['juegos'];
handler.command = ['seleccionar'];

export default handler;