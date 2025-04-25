import fetch from 'node-fetch'

export async function before(m, { conn }) {
let name = '🤖August-Ai⚡'
let imagenes = ["https://qu.ax/Knajw.jpg",
"https://qu.ax/Knajw.jpg",
"https://qu.ax/Knajw.jpg",
"https://qu.ax/Knajw.jpg"]

let icono = imagenes[Math.floor(Math.random() * imagenes.length)]

global.rcanal = {
 contextInfo: {
             isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363377595441592@newsletter",
      serverMessageId: 100,
      newsletterName: name,
   }, 
   externalAdReply: {
    showAdAttribution: true, 
    title: botname, 
    body: textbot, 
    mediaUrl: null, 
    description: null, 
    previewType: "PHOTO", 
    thumbnailUrl: icono, 
    sourceUrl: canal, 
    mediaType: 1, 
    renderLargerThumbnail: false }, 
    }, 
    }


global.icono = [ 
'https://qu.ax/yyCo.jpeg',
'https://qu.ax/yyCo.jpeg',
'https://qu.ax/qJch.jpeg',
'https://qu.ax/qJch.jpeg',
'https://qu.ax/CHRS.jpeg',
'https://qu.ax/CHRS.jpeg',
].getRandom()

        global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./storage/img/catalogo.png'), thumbnail: fs.readFileSync('./storage/img/catalogo.png'), sendEphemeral: true } } }

  // Respuesta con enlace de WhatsApp
  global.rpl = {
    contextInfo: {
      externalAdReply: {
        mediaUrl: group,
        mediaType: 'VIDEO',
        description: 'support group',
        title: packname,
        body: 'grupo de soporte',
        thumbnailUrl: imagen2,
        sourceUrl: group,
      }
    }
  };

 global.fake = {
    contextInfo: {
            isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363377595441592@newsletter",
      serverMessageId: 100,
      newsletterName: name,
    },
    },
  }
}