
handler.tags = ['admin'];
handler.help = ['expulsar *@usuario*'];
handler.command = ['expulsar'];
handler.group = true;

handler.handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('Este comando solo se puede usar en grupos.');
    if (!args[0]) return m.reply('Por favor, menciona a la persona que deseas expulsar.');

    let user = m.mentionedJid[0];
    if (!user) return m.reply('No pude encontrar a esa persona en el grupo.');

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        m.reply(`¡${user} ha sido expulsado del grupo!`);
    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al intentar expulsar a la persona.');
    }
};

export default handler;