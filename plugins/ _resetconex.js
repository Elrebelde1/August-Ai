const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import("@whiskeysockets/baileys");
import qrcode from "qrcode";
import nodeCache from "node-cache";
import fs from "fs/promises";
import path from "path";
import pino from "pino";
import util from "util";
import * as ws from "ws";
const { child, spawn, exec } = await import("child_process");
const { CONNECTING } = ws;
import chalk from 'chalk';
import { makeWASocket } from "../lib/simple.js";
import pLimit from 'p-limit'; 
if (!global.conns || !Array.isArray(global.conns)) {
  global.conns = [];
}

const limit = 100;
const concurrencyLimit = pLimit(5);

async function resetSesi(carpeta) {
  try {
    const SBF = await fs.readdir('./' + carpeta);
    await Promise.all(SBF.map(async (folder) => {
      if (global.conns.length >= limit) {
        console.log(chalk.cyan(`🌙 Límite de ${limit} subbots alcanzado.`));
        return;
      }
      return concurrencyLimit(async () => {
        const folderPath = `./${carpeta}/${folder}`;
        const stats = await fs.stat(folderPath);
        if (!stats.isDirectory()) return;

        const { state, saveCreds } = await useMultiFileAuthState(folderPath);
        const { version } = await fetchLatestBaileysVersion();

        const connectionOptions = {
          version,
          keepAliveIntervalMs: 30000,
          printQRInTerminal: false,
          logger: pino({ level: "fatal" }),
          auth: state,
          browser: [`Crow`, "Opera", "4.1.0"],
        };

        let conn = makeWASocket(connectionOptions);
        conn.isInit = false;
        let isInit = true;

        let RCA = 0;
        async function connectionUpdate(update) {
          const { connection, lastDisconnect, isNewLogin } = update;
          if (isNewLogin) conn.isInit = true;
          
          const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
          if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
            const i = global.conns.indexOf(conn);
            if (i >= 0) {
              global.conns.splice(i, 1);
            }
          }

          if (connection === "open") {
            conn.uptime = new Date();
            conn.isInit = true;
            global.conns.push(conn);
            console.log(chalk.blue(`🪐 Subbot ${folder} conectado exitosamente.`));
          }

          if (connection === 'close' || connection === 'error') {
            RCA++;
            let waitTime = [1000, 2000, 3000, 5000, 10000][Math.min(RCA - 1, 4)];

            setTimeout(async () => {
              try {
                conn.ws.close();
                conn.ev.removeAllListeners();
                conn = makeWASocket(connectionOptions);
                conn.handler = handler.handler.bind(conn);
                conn.connectionUpdate = connectionUpdate.bind(conn);
                conn.credsUpdate = saveCreds.bind(conn, true);
                conn.ev.on('messages.upsert', conn.handler);
                conn.ev.on('connection.update', conn.connectionUpdate);
                conn.ev.on('creds.update', conn.credsUpdate);
                await creloadHandler(false);
              } catch (error) {
                console.log(chalk.red('Error durante la reconexión:', error));    
              }
            }, waitTime);
          }

          if (code === DisconnectReason.loggedOut) {
            try {
              await fs.rm(folderPath, { recursive: true });
              console.log(chalk.yellow(`🍂 Carpeta de credenciales eliminada para el subbot ${folder}.`));
            } catch (e) {
              console.error(chalk.red('Error al eliminar carpeta:', e));
            }
          }
        }

        let handler = await import("../handler.js");
        let creloadHandler = async function (restatConn) {
          try {
            const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
            if (Handler && Object.keys(Handler).length) handler = Handler;
          } catch (e) {
            console.error(e);
          }
          if (restatConn) {
            try {
              conn.ws.close();
            } catch {}
            conn.ev.removeAllListeners();
            conn = makeWASocket(connectionOptions);
            isInit = true;
          }
          if (!isInit) {
            conn.ev.off("messages.upsert", conn.handler);
            conn.ev.off("connection.update", conn.connectionUpdate);
            conn.ev.off('creds.update', conn.credsUpdate);
          }
          conn.handler = handler.handler.bind(conn);
          conn.connectionUpdate = connectionUpdate.bind(conn);
          conn.credsUpdate = saveCreds.bind(conn, true);
          conn.ev.on("messages.upsert", conn.handler);
          conn.ev.on("connection.update", conn.connectionUpdate);
          conn.ev.on("creds.update", conn.credsUpdate);
          isInit = false;
          return true;
        };

        await creloadHandler(false);
      });
    }));
  } catch (error) {
    console.error(chalk.red('Error en al conectar los subbots :', error));
  }
}

await resetSesi("Sesiones/Subbots");