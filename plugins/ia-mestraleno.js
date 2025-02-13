/* 
- Código Creado Por Jose
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🍇 MISTRAL NEMO AI ]*

import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const username = `${conn.getName(m.sender)}`
    const basePrompt = `Tu nombre es MistralNemo y pareces haber sido creado por Jose XrL. Usarás el idioma Español. Llamarás a las personas por su nombre ${username} y serás amigable con ellos.`

    if (!text) { 
        return conn.reply(m.chat, `🔥 *Ingrese su petición*\n🚩 *Ejemplo de uso:* ${usedPrefix + command} ¿Cómo hacer un avión de papel?`, m, rcanal)
    }
    
    await m.react('💬')
    
    try {
        const query = text
        const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
        const rynnResponse = await axios.get(`https://api.rynn-archive.biz.id/ai/mistral-nemo?text=${encodeURIComponent(prompt)}`)
        
        if (rynnResponse.data.status) {
            const responseMessage = rynnResponse.data.result;
            await conn.reply(m.chat, responseMessage, m, rcanal)
        } else {
            await conn.reply(m.chat, '🌹 No se pudo obtener una respuesta de la API.', m)
        }
    } catch (error) {
        console.error('🔥 Error al obtener la respuesta:', error)
        await conn.reply(m.chat, 'Error: intenta más tarde.', m)
    }
}

handler.help = ['mistralnemo <texto>', 'mistralnem <texto>']
handler.tags = ['ai']
handler.group = false
handler.register = false

handler.command = ['mistralnem', 'mistral', 'mistralnemo']

export default handler