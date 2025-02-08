
let handler = async (m, { conn }) => {
    // Verificar si el mensaje es en un grupo
    if (!m.isGroup) {
        return conn.sendMessage(m.chat, { text: "Este comando solo se puede usar en grupos." }, { quoted: m });
    }

    // Obtener la lista de miembros del grupo
    let miembros = await conn.getGroupMembers(m.chat);
    
    // Filtrar para evitar que el bot sea seleccionado
    miembros = miembros.filter(member => member.id !== m.sender);

    // Si no hay más miembros para seleccionar
    if (miembros.length === 0) {
        return conn.sendMessage(m.chat, { text: "No hay suficientes miembros en el grupo para seleccionar." }, { quoted: m });
    }

    // Seleccionar un miembro al azar
    const indiceAleatorio = Math.floor(Math.random() * miembros.length);
    const seleccionado = miembros[indiceAleatorio];

    // Crear el mensaje
    const mensaje = `🗣️ *ATENCION*🎉\n\n@${seleccionado.id.split('@')[0]} has sido seleccionado *Agust AI.*`;

    // Enviamos el mensaje al chat mencionando al usuario seleccionado
    await conn.sendMessage(m.chat, { text: mensaje, mentions: [seleccionado.id] }, { quoted: m });
}

handler.help = ['seleccionar'];
handler.tags = ['juegos'];
handler.command = ['seleccionar'];

export default handler;