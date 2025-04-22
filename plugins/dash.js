
   const handler = async (m, { conn }) => {
       if (!m.message.stickerMessage) {
           return m.reply("❌ No has enviado un sticker.");
       }

       const stickerHash = m.message.stickerMessage.fileSha256.toString('base64');
       m.reply(`✅ El hash del sticker es:\n\n${stickerHash}`);
       console.log("Sticker hash:", stickerHash); // También lo muestra en la consola
   };

   handler.command = /^hash$/i;
   export default handler;
