let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD }}, "participant": "0@s.whatsapp.net" }
let pp = combobr.getRandom()
const cat = '_K,kelly,Nairi y Luna_🎮\n\n» 𝘾𝙊𝙈𝘽𝙊 𝘿𝙀 𝙃𝘼𝘽𝙄𝙇𝙄𝘿𝘼𝘿𝙀𝙎
𝘽𝙍-𝘾𝙇𝘼𝙎𝙄𝙁𝙄𝘾𝘼𝙏𝙊𝙍𝙄𝘼 🌍'

await conn.sendMessage(m.chat, { caption: cat }, { quoted: fkontak });

handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(combobr)$/i

export default handler