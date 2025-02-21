
import { createHash } from 'crypto';

const Reg = /\|?(.*?)([.|+] *?)(\d+)([.|+] *?)([MFNO])?$/i;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => './src/avatar_contact.png');

  if (user.registered) throw `✳️ ${mssg.regIsOn}\n\n${usedPrefix}unreg <sn>`;

  const te = `✳️ ${mssg.useCmd}: *${usedPrefix + command} ${mssg.name}+${mssg.age}+${mssg.gender}* 📌 Ejemplo: *${usedPrefix + command}* Fz+17+M\n\n◉ ${mssg.genderList}: *- M* = ${mssg.man}, *- F* = ${mssg.woman}, *- N* = ${mssg.other};`;

  if (!Reg.test(text)) throw te;

  const [_, name, , ageStr, , gen] = text.match(Reg);
  if (!name || !ageStr) throw te;

  name = name.trim();
  if (name.length >= 30) throw `✳️ ${mssg.nameMax}`;

  const age = parseInt(ageStr);
  if (age > 60) throw `👴🏻 ${mssg.oldReg}`;
  if (age < 10) throw '🚼 Vaya a ver la vaca lola';

  const genStr = gen ? 
    gen.toUpperCase() === 'M' ? `🙆🏻‍♂️ ${mssg.man}` :
    gen.toUpperCase() === 'F' ? `🤵🏻‍♀️ ${mssg.woman}` :
    gen.toUpperCase() === 'N' ? `⚧ ${mssg.other}` : null : null;

  if (!genStr) throw `✳️ ${mssg.genderList}: M, F o N\n\n*- M* = ${mssg.man}\n*- F* = ${mssg.woman}\n*- N* = ${mssg.other};`;

  user.name = name;
  user.age = age;
  user.genero = genStr;
  user.regTime = Date.now();
  user.coin += 8400;

  const sn = createHash('md5').update(m.sender).digest('hex');

  const regi =
`┌─「 *${mssg.regOn.toUpperCase()}* 」─
│ *${mssg.name}:* ${name}
│ *${mssg.age}:* ${age}
│ *${mssg.gender}:* ${genStr}
│ *${mssg.numSn}:*
${sn}
└──────────────

\\\⏍ Como bono por tu registro, se te han añadido 8400 coins 🪙 a tu cuenta de banco 🏦\\\`;

  conn.sendFile(m.chat, pp, 'img.jpg', regi, m);
};

handler.help = ['reg'].map(v => `${v} <nombre.edad.género>`);
handler.tags = ['rg'];
handler.command = ['verify', 'reg', 'register', 'registrar', 'verificar'];

export default handler;