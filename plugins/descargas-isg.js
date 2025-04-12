
let handler = async (m, { conn, args, usedPrefix, command }) => {
    const url = args[0];
    
    if (!url) return m.reply(`❌ Uso correcto del comando:\n${usedPrefix + command} <url_instagram>`);
    if (!/^https?:\/\/(www\.)?instagram\.com\/.+$/.test(url)) return m.reply("❌ Por favor, proporciona una URL válida de Instagram.");

    try {
        // Aquí puedes integrar tu API para descargar el video
        // Ejemplo de lógica básica para conectarte a tu API
        const apiResponse = await fetch(`https://archive-ui.tanakadomp.biz.id/download/instagram?url=$(url)}`);
        if (!apiResponse.ok) throw new Error("Hubo un problema con la API.");

        const { videoUrl, title } = await apiResponse.json();
        if (!videoUrl) throw new Error("No se encontró un video para la URL proporcionada.");

        const caption = `🎥 Video descargado de Instagram\n📝 Título: ${title || "Sin título"}\n🔗 URL original: ${url}`;
        await conn.sendFile(m.chat, videoUrl, "video.mp4", caption, m);

    } catch (error) {
        m.reply(`❌ Error al descargar el video: ${error.message}`);
    }
};

handler.help = [".igs"];
handler.tags = ["descargas"];
handler.command = /^igs$/i;

export default handler;