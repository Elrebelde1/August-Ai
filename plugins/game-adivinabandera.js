
import fs from 'fs';
import fetch from 'node-fetch';

let timeout = 5000; // Tiempo en milisegundos
let poin = 10000; // Puntos que se ganan al acertar

let handler = async (m, { conn, usedPrefix }) => {
    const apiUrl = 'https://api-kasu.onrender.com/api/game/bandera?apikey=79242cc3';
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    
    if (id in conn.tekateki) {
        return conn.reply(m.chat, 'Todavía hay un juego sin terminar!', conn.tekateki[id][0]);
    }
    
    let textos = `
ⷮ *Adivina el nombre de la bandera de la foto*
*Nota: Pusimos 2 minutos para poder visualizar la imagen bien ya que está borrosa, estamos mejorando eso, en muy poco tiempo estará lista con foto HD.*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo!
`.trim();

    // Enviar la imagen de la bandera
    conn.tekateki[id] = [
        await conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m),
        data.answer.toLowerCase(), // Respuesta correcta
        poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) {
                await conn.reply(m.chat, '¡Se acabó el tiempo! Intenta resolver de nuevo.', conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }
        }, timeout)
    ];
}

// Comandos para el handler
handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i;

export default handler;