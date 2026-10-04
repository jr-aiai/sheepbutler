# sheepbutler

Personal remote MCP server, used from the Claude apps (claude.ai custom connector).
Runs on Cloudflare Workers; login is via Google and restricted to a single account.

## Layout

- `src/index.ts` — MCP server (`PersonalMCP` Durable Object) + OAuth provider wiring
- `src/google-handler.ts` — Google login and owner check (`ALLOWED_GOOGLE_EMAIL`)
- `src/tools/` — tools, one module per feature area

## Secrets

Set with `npx wrangler secret put <NAME>` (and in `.dev.vars` for local dev, see `.dev.vars.example`):

- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth client (web application)
- `COOKIE_ENCRYPTION_KEY` — random string, e.g. `openssl rand -hex 32`
- `ALLOWED_GOOGLE_EMAIL` — the only account allowed to log in

## Development

```sh
npm install
npm run dev         # http://localhost:8788
npm run type-check
npm run deploy
```
