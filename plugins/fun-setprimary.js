
import fs from "fs";
import path from "path";

const handler = async (m, { conn, text, usedPrefix, command, isAdmin, isOwner }) => {
  try {
    // Validación: Solo administradores y propietarios pueden usar este comando
    if (!isAdmin && !isOwner) {
      return m.reply("❌ Solo los administradores o el propietario del bot pueden usar este comando.");
    }

    // Validación: Verificar si se proporciona texto para el mensaje principal
    if (!text) {
      return m.reply(
        `❌ Debes proporcionar un mensaje para configurarlo como mensaje principal.\n\nEjemplo: ${usedPrefix + command} Bienvenidos al grupo, respeten las reglas.`
      );
    }

    // Ruta para almacenar mensajes principales
    const filePath = path.resolve("./groupPrimaryMessages.json");

    // Verificar si el archivo existe y cargar mensajes principales
    let primaryMessages = {};
    if (fs.existsSync(filePath)) {
      try {
        primaryMessages = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (e) {
        console.error("⚠️ Error leyendo el archivo JSON:", e.message);
      }
    }

    // Guardar o actualizar el mensaje principal del grupo
    primaryMessages[m.chat] = text;
    fs.writeFileSync(filePath, JSON.stringify(primaryMessages, null, 2));

    m.reply(`✅ *Mensaje Principal* configurado exitosamente:\n\n"${text}"`);
  } catch (error) {
    console.error("❌ Error al configurar el mensaje principal:", error.message);
    m.reply("❌ Hubo un error al configurar el mensaje principal. Por favor, inténtalo nuevamente.");
  }
};

// Comando para ver el mensaje principal del grupo
const handlerViewPrimary = async (m, { conn }) => {
  try {
    const filePath = path.resolve("./groupPrimaryMessages.json");

    // Verificar si existe el archivo y si el grupo tiene un mensaje configurado
    if (!fs.existsSync(filePath)) {
      return m.reply("❗ No hay mensajes principales configurados todavía.");
    }

    const primaryMessages = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const primaryMessage = primaryMessages[m.chat];

    if (!primaryMessage) {
      return m.reply("❗ Este grupo no tiene un mensaje principal configurado.");
    }

    m.reply(`📌 *Mensaje Principal del Grupo:* \n\n"${primaryMessage}"`);
  } catch (error) {
    console.error("❌ Error al mostrar el mensaje principal:", error.message);
    m.reply("❌ Hubo un error al mostrar el mensaje principal. Por favor, inténtalo nuevamente.");
  }
};

// Registro de comandos
handler.command = ["setprimary"];
handlerViewPrimary.command = ["viewprimary"];

export default [handler, handlerViewPrimary];