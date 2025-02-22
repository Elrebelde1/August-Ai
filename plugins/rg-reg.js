import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🧑‍💻 YA ESTAS REGISTRADO.\n\n*¿QUIERES HACERLO DE NUEVO?*\n\nUSE ESTE COMANDO PARA ELIMINAR SU REGISTRO.\n*${usedPrefix}unreg* <Número de serie>`)
  if (!Reg.test(text)) return m.reply(`⚡ 𝐅𝐎𝐑𝐌𝐀𝐓𝐎 𝐈𝐍𝐂𝐎𝐑𝐄𝐂𝐓𝐎.\n\nUSO 𝐃𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎: *${usedPrefix + command} 𝑵𝑶𝑴𝑩𝑹𝑬.𝑬𝑫𝑨𝑫*\n𝑬𝑱𝑬𝑴𝑷𝑳𝑶 : *${usedPrefix + command} ${name2}.16*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('👻 𝑬𝑳 𝑵𝑶𝑴𝑩𝑹𝑬 𝑵𝑶 𝑷𝑼𝑬𝑫𝑬 𝑬𝑺𝑻𝑨𝑹 𝑽𝑨𝑪𝑰𝑶.')
  if (!age) return m.reply('👻 𝑳𝑨 𝑬𝑫𝑨𝑫 𝑵𝑶 𝑷𝑼𝑬𝑫𝑬 𝑬𝑺𝑻𝑨𝑹 𝑽𝑨𝑪𝑰𝑨.')
  if (name.length >= 100) return m.reply('🫥 𝑬𝑳 𝑵𝑶𝑴𝑩𝑹𝑬 𝑬𝑺𝑻𝑨 𝑴𝑼𝒀 𝑳𝑨𝑹𝑮𝑶.' )
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 𝑾𝑶𝑾 𝑬𝑳 𝑨𝑩𝑼𝑬𝑳𝑶 𝑸𝑼𝑰𝑬𝑹𝑬 𝑱𝑼𝑮𝑨𝑹 𝑨𝑳 𝑩𝑶𝑻.')
  if (age < 5) return m.reply('🚼 𝑬𝑳 𝑩𝑬𝑩𝑬 𝑸𝑼𝑰𝑬𝑹𝑬 𝑱𝑼𝑮𝑨𝑹 𝑱𝑨𝑱𝑨. ')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch(`https://qu.ax/OQNSn.jpg`)).buffer()
  let txt = ` –  *Bienvenido A August-Ai*\n\n`
      txt += `╔  👤  *NOMBRE* : ${name}\n`
      txt += `╠  💎  *EDAD* : ${age} años\n`
await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
await m.react('✅')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler