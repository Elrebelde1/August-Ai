const initHandler = async (m, { conn, usedPrefix }) => {
    const buttons = [
        {
            buttonId: `${usedPrefix}owner`,
            buttonText: { displayText: "👑 Owner" },
            type: 1,
        },
        {
            buttonId: `${usedPrefix}ping`,
            buttonText: { displayText: "🏓 Ping" },
            type: 1,
        },
    ];

    await conn.sendMessage(
        m.chat,
        {
            text: "🔹 Selecciona una opción:",
            buttons: buttons,
            viewOnce: true,
        },
        { quoted: m }
    );
};

initHandler.command = /^init$/i;

export default initHandler;