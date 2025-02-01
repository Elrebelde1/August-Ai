let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    // Verificar si el usuario ya ha reclamado su recompensa hoy
    let hoy = new Date().toLocaleDateString();
    if (user.ultimoReclamo === hoy) {
        return m.reply("🚫 Ya has reclamado tus 100 dulces hoy. ¡Vuelve mañana!");
    }

    // Sumar 100 dulces al usuario
    user.dulces += 100;
    
    // Actualizar la fecha del último reclamo
    user.ultimoReclamo = hoy;

    // Respuesta al usuario
    await m.reply(`🎉 ¡Has reclamado tus 100 dulces diarios! Ahora tienes ${user.dulces} dulces.`);
}

handler.help = ['reclamarDiario'];
handler.tags = ['economía'];
handler.command = ['reclamarDiario'];

export default handler;