
import fetch from 'node-fetch';

// Diccionario de banderas y sus respectivos países
const banderas = {
    "🇺🇸": "Estados Unidos",
    "🇬🇧": "Reino Unido",
    "🇫🇷": "Francia",
    "🇩🇪": "Alemania",
    "🇯🇵": "Japón",
    // Agrega más banderas y países según lo desees
};

let handler = async (m, { conn }) => {
    let bandera = Object.keys(banderas)[Math.floor(Math.random() * Object.keys(banderas).length)];
    let pais = banderas[bandera];

    // Enviar la bandera al usuario
    await conn.sendMessage(m.chat, { text: `Adivina el país de esta bandera: ${bandera}` });

    // Esperar respuesta del usuario
    const filter = response => response.key.remoteJid === m.chat && response.key.fromMe === false;
    
    conn.on('message', async (response) => {
        if (filter(response)) {
            let respuesta_usuario = response.message.conversation;

            // Verificar respuesta
            if (respuesta_usuario.toLowerCase() === pais.toLowerCase()) {
                await conn.sendMessage(m.chat, { text: `¡Correcto! Has ganado 1000 exp.` });
                // Aquí puedes agregar el código para otorgar experiencia al usuario
                global.db.data.users[m.sender].exp += 1000; // Asegúrate de que el sistema de usuarios esté configurado
            } else {
                await conn.sendMessage(m.chat, { text: `Incorrecto. La respuesta correcta era ${pais}.` });
            }
        }
    });
}

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = /^adivinabandera$/i;

export default handler;