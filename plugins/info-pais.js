
const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.sendMessage(m.chat, 'Por favor, proporciona el nombre de un país.', m);
  }

  const countryName = args.join(' ');
  const apiUrl = `https://api.siputzx.my.id/api/tools/countryInfo?name=${countryName}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Asegúrate de que la respuesta tenga la estructura esperada
    if (data && data.status === 'success') {
      const countryInfo = data.data; // Asegúrate de que esta estructura sea correcta según la respuesta de la API
      const infoMessage = `
        *Información sobre ${countryInfo.name}:*
        - Capital: ${countryInfo.capital}
        - Población: ${countryInfo.population}
        - Área: ${countryInfo.area} km²
        - Idioma(s): ${countryInfo.languages.join(', ')}
        - Moneda: ${countryInfo.currencies.map(curr => curr.name).join(', ')}
      `;
      await conn.sendMessage(m.chat, infoMessage, m);
    } else {
      await conn.sendMessage(m.chat, 'No se encontró información sobre ese país.', m);
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, 'Ocurrió un error al obtener la información del país.', m);
  }
};

handler.help = ['infopais <nombre del país>'];
handler.tags = ['info'];
handler.command = /^infopais$/i;

export default handler;