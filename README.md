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

## Deploy (recommended)

Do **not** treat GitHub Pages as the long-term host. `BrowserRouter` needs a server-side SPA fallback, and GitHub Pages is brittle for that.

Connect this GitHub repository to one of:

- [Vercel](https://vercel.com) — `vercel.json` already rewrites all routes to `index.html`
- [Cloudflare Pages](https://pages.cloudflare.com) — `public/_redirects` is included
- [Netlify](https://netlify.com) — `netlify.toml` is included

Then attach the custom domain `zyntaraai.com.au` in that platform.

Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
