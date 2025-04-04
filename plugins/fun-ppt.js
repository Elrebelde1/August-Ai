// Global variable to store active games
let activeGames = new Map();

const gameHandler = async (m, { conn, command, args, usedPrefix }) => {
    if (args.length === 0) {
        // Activar el juego y mostrar botones para elegir
        activeGames.set(m.chat, true);

        const caption = `
🎮 *¡Juego activado!*
Selecciona tu jugada presionando un botón:
        `.trim();

        const buttons = [
            {
                buttonId: `${usedPrefix}game piedra`,
                buttonText: { displayText: "🪨 Piedra" },
                type: 1
            },
            {
                buttonId: `${usedPrefix}game papel`,
                buttonText: { displayText: "📄 Papel" },
                type: 1
            },
            {
                buttonId: `${usedPrefix}game tijera`,
                buttonText: { displayText: "✂️ Tijera" },
                type: 1
            }
        ];

        await conn.sendMessage(
            m.chat,
            {
                text: caption,
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );
        return;
    }

    if (!activeGames.get(m.chat)) {
        return conn.reply(m.chat, `⚠️ Primero activa el juego con *${usedPrefix}game*`, m);
    }

    let choices = ['piedra', 'papel', 'tijera'];
    let userChoice = args[0]?.toLowerCase();

    if (!choices.includes(userChoice)) {
        return conn.reply(m.chat, `❌ Elige una opción válida`, m);
    }

    let botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = getResult(userChoice, botChoice);

    const caption = `
🤖 *El bot eligió*: ${botChoice.toUpperCase()}
🙋‍♂️ *Tú elegiste*: ${userChoice.toUpperCase()}
📌 *Resultado*: ${result}
`.trim();

    const buttons = [
        {
            buttonId: `${usedPrefix}game`,
            buttonText: { displayText: "🔄 Nuevo Juego" },
            type: 1
        }
    ];

    await conn.sendMessage(
        m.chat,
        {
            text: caption,
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );

    activeGames.delete(m.chat); // Terminar la partida
};

function getResult(user, bot) {
    if (user === bot) return "🤝 ¡Empate!";
    if (
        (user === 'piedra' && bot === 'tijera') ||
        (user === 'papel' && bot === 'piedra') ||
        (user === 'tijera' && bot === 'papel')
    ) {
        return "🎉 ¡Ganaste!";
    }
    return "😢 Perdiste...";
}

gameHandler.help = ['game'];
gameHandler.tags = ['game'];
gameHandler.command = /^(game)$/i;

export default gameHandler;