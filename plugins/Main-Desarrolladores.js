const handler = async (m, { conn }) => {
  let gifUrl = "https://d.uguu.se/NVJRVtjx.jpg";

  let text = `
 ╭────────⚔──────╮  
        DESARROLLADORES  
╰────────⚔──────╯  

🔹 **SOBRE EL BOT:**  
Barboza Bot es una herramienta creada con el objetivo de mejorar la interacción y experiencia de los usuarios en diversas plataformas, ofreciendo funcionalidades avanzadas y soporte constante.

🔹 **CONTACTO DE LOS DESARROLLADORES:**  
╭─────────────────────────╮  
│🏆 **Barboza Bot - Equipo Oficial**  
│  
│📌 **Barboza**: [+58 424 658 2666]  
│
│ 
╰─────────────────────────╯  

🔹 **AGRADECIMIENTOS:**  
Un agradecimiento especial a todos los colaboradores y usuarios que hacen posible la constante evolución de Son Barboza Bot.  

🔹 **¿DUDAS O SUGERENCIAS?**  
No dudes en contactar a cualquiera de los desarrolladores para resolver dudas, enviar sugerencias o reportar problemas.  

`.trim();


  await conn.sendMessage(
    m.chat,
    {
      video: { url: gifUrl },
      gifPlayback: true, 
      caption: text,
      mentions: [m.sender], 
    },
    { quoted: m }
  );
};

handler.command = /^(desarrolladores)$/i; 
export default handler;