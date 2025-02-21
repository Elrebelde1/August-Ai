
import { createHash } from 'crypto';

let mssg = {
  regIsOn: 'El usuario ya está registrado',
  useCmd: 'Uso del comando',
  name: 'Nombre',
  age: 'Edad',
  gender: 'Género',
  man: 'Hombre',
  woman: 'Mujer',
  other: 'Otro',
  genderList: 'Lista de géneros',
  nameMax: 'El nombre es demasiado largo',
  oldReg: 'La edad es demasiado alta',
  regOn: 'Registro realizado correctamente',
  numSn: 'Número de serie'
};

let Reg = /\|?(.*)([.|+] *?)([0-9]*)([.|+] *?)([MFNO])?$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './avatar_contact.png');

  if (user.registered === true) throw `✳️ ${mssg.regIsOn}\n\n${usedPrefix}unreg <sn>`;

  let te = `✳️ ${mssg.useCmd}: *${usedPrefix + command} ${mssg.name}+${mssg.age}+${mssg.gender}* 📌 Ejemplo: *${usedPrefix + command}* Fz+17+M\n\n◉ ${mssg.genderList}: *- M* = ${mssg.man}, *- F* = ${mssg.woman}, *- N* = ${mssg.other}`;

  if (!Reg.test(text)) throw te;

  let [_, name, splitter, age, splitter2, gen] = text.match(Reg);
  if (!name) throw te;
  if (!age) throw te;

  name = name.trim();
  if (name.length >= 30) throw `✳️ ${mssg.nameMax}`;

  age = parseInt(age);
  if (age > 60) throw `👴🏻 ${mssg.oldReg}`;
  if (age < 10) throw '🚼 Vaya a ver la vaca lola';

  let genStr;
  if (gen) {
    genStr = gen.toUpperCase() === 'M' ? `🙆🏻‍♂️ ${mssg.man}` :
             gen.toUpperCase() === 'F' ? `🤵🏻‍♀️ ${mssg.woman}` :
             gen.toUpperCase() === 'N' ? `⚧ ${mssg.other}` : null;
  }

  if (!genStr) throw `✳️ ${mssg.genderList}: M, F o N\n\n*- M* = ${mssg.man}\n*- F* = ${mssg.woman}\n*- N* = ${mssg.other}`;

  user.name = name;
  user.age = age;
  user.genero = genStr;
  user.regTime = +new Date();
  user.coin += 8400;

  let sn = createHash('md5').update(m.sender).digest('hex');

  let regi =
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

handler.help = ['reg'].map(v => v + ' <nombre.edad.género>');
handler.tags = ['rg'];
handler.command = ['verify', 'reg', 'register', 'registrar', 'verificar'];

export default handler;