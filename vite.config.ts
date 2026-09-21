import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  createAssistantReply,
  normaliseMessages,
} from './server/assistant'

function localAssistantApi(apiKey: string, model: string): Plugin {
  return {
    name: 'local-assistant-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        const chunks: Uint8Array[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json')

          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
            const messages = normaliseMessages(body.messages)

            if (!messages.length || messages.at(-1)?.role !== 'user') {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'A user message is required.' }))
              return
            }

            if (!apiKey) {
              res.statusCode = 503
              res.end(JSON.stringify({ error: 'Assistant is not configured.' }))
              return
            }

            const reply = await createAssistantReply({
              apiKey,
              model,
              messages,
              page: typeof body.page === 'string' ? body.page.slice(0, 120) : undefined,
            })

            res.statusCode = 200
            res.end(JSON.stringify({ reply }))
          } catch (error) {
            console.error('Local assistant request failed', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'The assistant is temporarily unavailable.' }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      localAssistantApi(
        env.OPENAI_API_KEY,
        env.OPENAI_MODEL || 'gpt-5.6-luna',
      ),
    ],
  }
})
