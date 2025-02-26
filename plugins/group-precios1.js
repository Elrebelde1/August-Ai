
// CREADOR DARK - CORE  //

let handler = async (m, { conn }) => {

    await m.react('💫');

    const message = `AQUI ESTAN LOS PRECIOS.\n\n> 1 semana de spma = 1k de diamantes\n> 5 días = 800 diamantes\n> 3 días = 500 diamantes`;

    if (m.isGroup) {
        const imageUrl 'https://qu.ax/Knajw.jpg';

        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: message 
        }, { mimetype: 'image/jpeg' });
    }
};

handler.help = ['precios1'];
handler.tags = ['main'];
handler.command = ['precios1', 'p1', 'precio1'];

export default handler;