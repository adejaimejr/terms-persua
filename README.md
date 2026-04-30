# terms-persua

Site estatico para `terms.persua.com.br`. Hospeda os documentos legais publicos da Persua: Termos de Uso, Politica de Privacidade e lista de Subprocessadores.

## URLs publicas

- `/` (home com cards dos 3 documentos)
- `/terms-of-use`
- `/privacy-policy`
- `/subprocessors`

## Stack

- Node 20 (build) + `marked` para converter Markdown em HTML
- nginx:alpine (runtime, serve `dist/`)
- Multi-stage Dockerfile, deploy via Dokploy com autodeploy on push

## Estrutura

```
.
├── build.js                 gera dist/*.html a partir de src/content/*.md
├── scripts/sync-content.js  copia MDs canonicos do escritorio virtual
├── src/
│   ├── content/             3 MDs (gerados pelo sync, commitados aqui)
│   ├── templates/           home.html + doc.html
│   ├── styles/style.css     CSS (cores Persua: navy + verde)
│   └── public/              logo, favicon
├── dist/                    saida do build (gitignored)
├── Dockerfile               build multi-stage
├── nginx.conf               server estatico
└── docker-compose.yml       opcional, para teste local
```

## Source of truth do conteudo

Os 3 MDs em `src/content/` sao **copias** dos canonicos do escritorio virtual:

- `terms-of-use.md` <- `persua/juridico/compliance/termos_publicos/terms-of-use_v1.0.md`
- `privacy-policy.md` <- `persua/juridico/compliance/termos_publicos/privacy-policy_v0.3.md`
- `subprocessors.md` <- `persua/juridico/compliance/subprocessadores.md`

O canonico continua sendo a fonte unica. Este repo sincroniza via `npm run sync` e commita.

## SOP, atualizar conteudo

1. Editar o MD canonico no escritorio virtual (`persua/juridico/compliance/...`).
2. Bumpar versao + data no header do canonico.
3. Aprovar com CEO + advogado conforme processo juridico.
4. No subprojeto:
   ```bash
   cd _tools/terms
   npm run sync     # copia canonicos para src/content/
   npm run build    # gera dist/ local pra revisar
   ```
5. Conferir o HTML gerado em `dist/*.html`.
6. Commit + push:
   ```bash
   git add src/content
   git commit -m "content: bump <doc> v<x>"
   git push
   ```
7. Dokploy detecta push, faz rebuild + redeploy automatico.
8. Validar `terms.persua.com.br/<slug>` em janela anonima.

## Comandos

```bash
npm install            # instalar marked
npm run sync           # copiar MDs canonicos
npm run build          # gerar dist/
npm run dev            # build + servir local em :4040
npm run gen-og         # regerar src/public/og-image.png (1200x630)
```

## Open Graph (preview no WhatsApp, Facebook, LinkedIn)

A imagem `src/public/og-image.png` (1200x630) aparece quando o link e compartilhado em redes sociais e WhatsApp. As meta tags estao em `src/templates/home.html` e `src/templates/doc.html`.

Para atualizar:

```bash
# 1. Edita o HTML/CSS inline dentro de scripts/generate-og.js
# 2. Regera:
npm run gen-og
# 3. Confere o PNG visualmente
# 4. Commit + push
git add src/public/og-image.png
git commit -m "update: og image"
git push
```

Apos atualizar, se o link ja foi compartilhado, force refresh do cache no Facebook Debugger:
`https://developers.facebook.com/tools/debug/?q=https://terms.persua.com.br/`

Padrao reusavel para outros projetos Persua: ver memory `feedback_og_preview_pattern.md`.

O script `generate-og.js` reusa o Puppeteer instalado no projeto pai (`Persua_squads/node_modules/puppeteer`) para nao adicionar 100MB+ de Chromium no Docker build deste subprojeto.

## Deploy local com Docker

```bash
docker compose up --build
# abre em http://localhost:8081
```

## Deploy producao (Dokploy)

Application no Dokploy:
- **Provider:** GitHub, repo `adejaimejr/terms-persua`, branch `main`
- **Build Type:** Dockerfile (path `Dockerfile`)
- **Domain:** `terms.persua.com.br`, HTTPS, certResolver `letsencryptresolver`, container port `80`
- **Trigger:** On Push (autodeploy)

Pre-req DNS:
```
Tipo: A
Host: terms
Valor: <IP_DO_VPS_DOKPLOY>
TTL: 300
```

Validar pos-deploy:
```bash
curl -I https://terms.persua.com.br
curl -I https://terms.persua.com.br/terms-of-use
curl -I https://terms.persua.com.br/privacy-policy
curl -I https://terms.persua.com.br/subprocessors
```

## Versionamento

Versao do documento aparece no proprio cabecalho do MD canonico (`Versao: vX.Y`). O subprojeto nao versiona separadamente, segue a versao do canonico que sincronizou por ultimo.

Ao publicar uma nova versao com mudanca relevante, comunicar clientes vigentes conforme SOP em `persua/juridico/CLAUDE.md`.

## Referencias

- Repo do escritorio virtual (privado, source of truth dos canonicos): `adejaime/Persua_squads`
- Outro subprojeto deployado via Dokploy (referencia): `_tools/docmost/` (docs.persua.com.br)
- ADR-001 sobre concat de aceite formal: `persua/juridico/contratos/_template/_adr/001-pdf-concat-aceite-formal.md`
