
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `❀ Ingresa un texto para hablar con chatgpt4`, m)
    
try {
let api = await axios.get(`https://mahiru-shiina.vercel.app/docs/api/ai/chatgpt4?text=${text}`)
let json = await api.data

m.reply(json.answer)
} catch (error) {
console.error(error)    
}}

HS.command = ['gpt4', 'chatgpt4']

export default HS