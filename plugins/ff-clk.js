
import { MessageMedia } from 'whatsapp-web.js';

async function handler(m, { conn }) {
    if (m.body === '.clk') {
        const media = MessageMedia.fromFilePath('https://i.ibb.co/mCKdjQ73/file.jpg'); // Cambia esta ruta por la imagen que deseas enviar

        await conn.sendMessage(m.chat, media, { 
            caption: 'Aquí tienes la imagen que pediste con el comando .clk.' 
        });
    }
}

handler.help = ['clk'];
handler.tags = ['fun'];
handler.command = ['clk'];

export default handler;