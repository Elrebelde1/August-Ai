
let handler = async (m) => {
    const videos = [
        'https://qu.ax/kZlnj.mp4',
    ];

    // Elegir un video aleatorio
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    // Enviar el video varias veces
    for (let i = 0; i < 3; i++) { // Cambia 3 por el número de veces que desees
        await conn.sendMessage(m.chat, { video: { url: randomVideo }, caption: "¡Aquí tienes un video para disfrutar!" }, { quoted: m });
    }
}

handler.help = ['videoxxx'];
handler.tags = ['diversión'];
handler.command = ['videoxxx'];

export default handler;