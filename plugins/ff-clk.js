
import { MessageMedia } from 'whatsapp-web.js';

async function handler(m, { conn }) {
    if (m.body === '.clk') {
        const media = await MessageMedia.fromUrl('https://i.ibb.co/mCKdjQ73/file.jpg'); // URL de la imagen

        await conn.sendMessage(m.chat, media, { 
            caption: 'Aquí tienes la imagen que pediste con el comando .clk.' 
        });
    }
}

handler.help = ['clk'];
handler.tags = ['fun'];
handler.command = ['clk'];

export default handler;