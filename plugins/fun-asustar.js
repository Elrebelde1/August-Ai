
const asustarHandler = async (m, { conn, usedPrefix }) => {
    const user = m.mentionedJid[0]; // Obtener el ID del usuario mencionado

    if (!user) {
        return conn.sendMessage(m.chat, "⚠️ Debes mencionar a un usuario para asustar.", { quoted: m });
    }

    const mensaje = "⚠️ *ATENCIÓN* ⚠️ Tu cuenta de WhatsApp ha sido hackeada, despídete.";
    
    await conn.sendMessage(user, {
        text: mensaje,
        mentions: [user], // Mencionar al usuario en el mensaje
    });

    conn.sendMessage(m.chat, `He asustado a @${user.split('@')[0]}!`, { quoted: m, mentions: [user] });
};

asustarHandler.command = /^asustar$/i;

export default asustarHandler;