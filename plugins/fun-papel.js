
let handler = async (m, { text }) => {
  const choices = ['piedra', 'papel', 'tijera'];
  let userChoice = text.toLowerCase();

  if (!choices.includes(userChoice)) {
    return conn.reply(m.chat, 'Por favor elige entre piedra, papel o tijera.', m);
  }

  let botChoice = choices[Math.floor(Math.random() * choices.length)];
  let result;

  if (userChoice === botChoice) {
    result = '¡Es un empate! Nadie gana.';
  } else if (
    (userChoice === 'piedra' && botChoice === 'tijera') ||
    (userChoice === 'papel' && botChoice === 'piedra') ||
    (userChoice === 'tijera' && botChoice === 'papel')
  ) {
    result = `¡Ganaste! Yo elegí ${botChoice}. Te doy 5 monedas y dulces.`;
    // Aquí puedes agregar la lógica para dar monedas y dulces al usuario.
  } else {
    result = `¡Perdiste! Yo elegí ${botChoice}. Mejor suerte la próxima vez.`;
  }

  conn.reply(m.chat, result, m);
};

handler.command = ['jugar', 'piedra', 'papel', 'tijera'];
export default handler;