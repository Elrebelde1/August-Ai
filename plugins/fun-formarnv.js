
const handler = async (m, { conn }) => {
  // Obtener los participantes del grupo
  const participantes = m.groupMetadata.participants.map(participant => participant.id);
  
  // Verificar que haya al menos 2 participantes
  if (participantes.length < 2) {
    return conn.sendMessage(m.chat, { text: "No hay suficientes participantes en el grupo." }, { quoted: m });
  }

  // Seleccionar al azar dos usuarios
  const pareja1 = participantes[Math.floor(Math.random() * participantes.length)];
  const pareja2 = participantes[Math.floor(Math.random() * participantes.length)];

  // Asegurarse de que sean diferentes
  while (pareja1 === pareja2) {
    pareja2 = participantes[Math.floor(Math.random() * participantes.length)];
  }

  // Obtener nombres o números de teléfono de los usuarios seleccionados
  const nombre1 = await conn.getName(pareja1);
  const nombre2 = await conn.getName(pareja2);

  // Crear el mensaje
  const mensaje = `💖 *Estos van a ser novios en 2025* 💖\n\n${nombre1} ❤️ ${nombre2}`;

  // Enviar el mensaje al grupo
  conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.command = /^(formarnv)$/i;
export default handler;