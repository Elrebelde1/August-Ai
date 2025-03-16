
const handler = async (m, {conn}) => { 
   try {
       // Lista de enlaces de imágenes de Mbappé
       const mbappeImages = [
           'https://qu.ax/mzmai.jpg',  // Reemplaza con tus enlaces
           'https://qu.ax/WerXK.jpg',
           'https://qu.ax/aGGaf.jpg',
           // Agrega más enlaces según lo desees
       ];

       // Comando para mostrar la imagen de Mbappé
       if (m.body === '.mbappé') {
           for (let url of mbappeImages) {
               await conn.sendMessage(m.chat, {image: {url: url}, caption: "Aquí está otra foto de Mbappé!"});
           }
       }
   } catch (e) { 
       console.error(e); 
   } 
}; 

handler.command = /^(mbappe)$/i; 
export default handler;