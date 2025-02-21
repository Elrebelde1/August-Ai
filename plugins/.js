
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
    const bot = global.db.data.bot[conn.user.jid];
    const chats = bot.chats;
    const privs = chats.privs;
    const groups = chats.groups;
    const chat = m.isGroup ? groups[m.chat] : privs[m.chat];
    
    if (!chat.nsfw && m.isGroup) {
        const resp = '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable nsfw*';
        return conn.sendMessage(m.chat, { text: resp });
    } else {
        let url = global.packmen[Math.floor(Math.random() * global.packmen.length)];
        let resp = '*_🥵 Pack3 🥵_*';
        let q = await conn.sendMessage(m.chat, { image: { url: url }, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true });
        
        await delay(2000); // Espera 2 segundos
        return conn.sendMessage(m.chat, { text: resp }, { quoted: q });
    }
};

handler.help = ['pack3'];
handler.tags = ['internet'];
handler.command = /^(pack3)$/i;

export default handler;

global.packmen = [
    "https://i.imgur.com/TK0qLAu.jpg",
    "https://i.imgur.com/q8lKT40.jpg",
    "https://i.imgur.com/OwWdL9u.jpg",
    
];