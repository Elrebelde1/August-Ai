
import { MessageType } from '@whiskeysockets/baileys';

const songs = [
    { title: "Despacito", artist: "Luis Fonsi", hint: "Es un éxito de 2017 con reguetón." },
    { title: "Shape of You", artist: "Ed Sheeran", hint: "Una canción muy popular de un álbum de 2017." },
    { title: "DÁKITI", artist: "Bad Bunny", hint: "Colaboración con Jhay Cortez, un éxito urbano." },
    { title: "Blinding Lights", artist: "The Weeknd", hint: "Canción que se volvió viral en TikTok." },
    // Agrega más canciones aquí
];

const handler = async (m, { conn }) => {
    try {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        const text = `🎶 Adivina la canción! 🎶\n\n` +
                     `Pista: ${randomSong.hint}\n` +
                     `¿Cuál crees que es el título?`;

        conn.sendMessage(m.chat, { text }, { quoted: m });

        // Aquí puedes agregar lógica para manejar las respuestas y verificar si son correctas.
        const filter = response => response.text.toLowerCase() === randomSong.title.toLowerCase();
        const collector = conn.createMessageCollector(filter, { time: 30000 }); // 30 segundos para responder

        collector.on('collect', (msg) => {
            conn.sendMessage(m.chat, { text: `¡Correcto! La canción es *${randomSong.title}* de ${randomSong.artist}! 🎉` }, { quoted: m });
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                conn.sendMessage(m.chat, { text: `Tiempo agotado! La respuesta correcta era *${randomSong.title}* de ${randomSong.artist}.` }, { quoted: m });
            }
        });

    } catch (e) {
        console.error(e);
    }
};

handler.command = /^(adivinamusica)$/i;
export default handler;