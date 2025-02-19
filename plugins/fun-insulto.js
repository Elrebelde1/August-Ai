
const insults = [
  "Eres más inútil que un zapato en una pierna de palo.",
  "Tienes el cerebro de un caracol... ¡y sin la concha!",
  "Si fueras un ladrillo, serías el más tonto de la pared.",
  "Eres como un mal chiste, no haces gracia.",
  "Si la ignorancia es felicidad, tú debes ser el más feliz del mundo.",
  "Eres tan brillante como un agujero negro.",
  "Si fueras un vegetal, serías una cebolla... ¡porque siempre haces llorar!",
];

function handler(m) {
  // Elegir un insulto al azar
  const insult = insults[Math.floor(Math.random() * insults.length)];
  
  // Enviar el insulto
  m.reply(insult);
}

handler.help = ['insulto'];
handler.tags = ['fun'];
handler.command = ['insulto'];
handler.group = true;

export default handler;