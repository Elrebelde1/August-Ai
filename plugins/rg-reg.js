import { createHash } from 'crypto';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    let name2 = conn.getName(m.sender);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/1fx3bv01/file.jpg');

    if (user.registered === true) throw `*⚠️ Ya estás registrado*\n\n¿Quieres volver a registrarte?\n\n💬 Usa este comando para *eliminar tu registro*:\n*${usedPrefix}unreg* <Número de serie>`;
    if (!Reg.test(text)) throw `*⚠️ Formato incorrecto*\n\n📝 Uso del comando: *${usedPrefix + command} nombre.edad*\n💡 Ejemplo : *${usedPrefix + command}* ${name2}.18`;

    let [_, name, splitter, age] = text.match(Reg);
    if (!name) throw '*📝 El nombre no puede estar vacío*';
    if (!age) throw '*📝 La edad no puede estar vacía*';
    if (name.length >= 30) throw '*⚠️ El nombre es demasiado largo*'; 
    age = parseInt(age);
    if (age > 100) throw '*👴🏻 Wow el abuelo quiere jugar con el bot*';
    if (age < 5) throw '*👀 Hay un bebé jsjsj*';

    user.name = name.trim();
    user.age = age;
    user.regTime = + new Date();
    user.registered = true;

    if (!user.limit) user.limit = 0;
    user.limit += 10;

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);
    m.react('📩');

    let regbot = `🗃️ *R E G I S T R A D O* 🗃️\n
💌 *Nombre:* ${name}
📆 *Edad* : ${age} años
🍬 *Dulces añadidos:* 10`;

    // Crear botón de "Menú"
    const buttons = [
        {
            buttonId: `${usedPrefix}menu`,
            buttonText: { displayText: "📜 Menú" },
            type: 1
        }
    ];

    await conn.sendMessage(m.chat, { 
        image: { url: pp }, 
        caption: regbot,
        buttons: buttons,
        viewOnce: true
    }, { quoted: m });
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['verify', 'reg', 'verificar'];

export default handler;