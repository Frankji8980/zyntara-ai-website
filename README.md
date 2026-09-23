# Zyntara AI website

English site for [Zyntara AI](https://zyntaraai.com.au) — Forward Deployed AI Engineering for Australian businesses.

## Stack

- React, ReactDOM, TypeScript, Vite, Tailwind CSS
- **Extra dependency (not in the original single-page spec):** `react-router-dom`, added so the site can be a real multi-page property (Home, Solutions, Industries, Work, Approach, About, Contact)

Lucide is not used.

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Deployment and assistant

Production runs on Vercel with the Vite preset, `npm run build`, and output directory `dist`.
The assistant runs in the Node server function at `api/chat.ts`. Client routes need the SPA fallback; API routes must reach the function.

Configure `OPENAI_API_KEY` and `OPENAI_MODEL` as server environment variables in the hosting project. Copy `.env.example` to `.env.local` for local development. Never use a `VITE_` prefix for secrets or commit `.env.local`.

`npm run dev` includes the local assistant middleware. `npm run preview` previews the static frontend only, without the assistant endpoint. The Netlify and Cloudflare redirect files support frontend routing only; the assistant requires a compatible server deployment there.

After deployment, verify both a direct page URL such as `/industries` and `/api/chat`. A GET to the assistant should return a JSON 405, and a valid POST should return a JSON reply. A platform `FUNCTION_INVOCATION_FAILED` response requires checking function logs; frontend error handling alone does not fix it.
