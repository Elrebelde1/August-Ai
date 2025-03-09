
import { MessageMedia } from 'whatsapp-web.js';

async function handler(m, { conn }) {
    if (m.body === '.clk') {
        const link = 'https://tu-enlace-aqui.com'; // Agrega tu enlace aquí
        const media = MessageMedia.fromFilePath('https://i.ibb.co/mCKdjQ73/file.jpg'); // Cambia la ruta a tu imagen

        await conn.sendMessage(m.chat, media, { 
            caption: `Aquí tienes el enlace que solicitaste: ${link}` 
        });
    }
}

handler.help = ['clk'];
handler.tags = ['ff'];
handler.command = ['clk'];

export default handler;
```
