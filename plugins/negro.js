
const handler = async (m, { conn }) => {
  m.reply("el más negro es anuar de .masnegro");
};

handler.command = 'negro', /^(negro|\.negro)$/i;

export default handler;