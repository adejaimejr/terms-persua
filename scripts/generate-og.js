#!/usr/bin/env node
// generate-og.js
// Gera src/public/og-image.png (1200x630) usando Puppeteer.
// Roda manualmente quando mudar design ou copy:
//   npm run gen-og
//
// Importante: usa o Puppeteer instalado no projeto pai (Persua_squads/node_modules)
// para nao adicionar 100MB+ de Chromium no Docker build deste subprojeto.

const fs = require('node:fs');
const path = require('node:path');

const PARENT_NODE_MODULES = path.resolve(__dirname, '..', '..', '..', 'node_modules');
let puppeteer;
try {
  puppeteer = require(path.join(PARENT_NODE_MODULES, 'puppeteer'));
} catch (e) {
  console.error('[og] Puppeteer nao encontrado em', PARENT_NODE_MODULES);
  console.error('[og] Instale puppeteer no projeto pai (Persua_squads): cd ../../ && npm i puppeteer');
  process.exit(1);
}

const LOGO_PATH = path.resolve(__dirname, '..', 'src', 'public', 'logo-persua-dark.svg');
const OUT_PATH = path.resolve(__dirname, '..', 'src', 'public', 'og-image.png');

const logoSvgRaw = fs.readFileSync(LOGO_PATH, 'utf8');
const logoDataUri = 'data:image/svg+xml;base64,' + Buffer.from(logoSvgRaw).toString('base64');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px;
      height: 630px;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    body {
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #001335 0%, #0a1e3d 60%, #0d2347 100%);
      color: #ffffff;
      padding: 72px 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,172,124,0.18) 0%, rgba(0,172,124,0) 70%);
      top: -200px;
      right: -200px;
      pointer-events: none;
    }
    .top {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
    }
    .top img {
      height: 56px;
      width: auto;
      display: block;
    }
    .eyebrow {
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #7dd3a8;
      margin-bottom: 28px;
      position: relative;
    }
    h1 {
      font-size: 76px;
      line-height: 1.05;
      font-weight: 700;
      letter-spacing: -1.5px;
      margin-bottom: 28px;
      max-width: 1000px;
      position: relative;
    }
    h1 .accent { color: #7dd3a8; }
    .subtitle {
      font-size: 28px;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.8);
      max-width: 900px;
      font-weight: 400;
      position: relative;
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    .url {
      font-size: 22px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.65);
      letter-spacing: 0.5px;
    }
    .badge {
      display: inline-flex;
      gap: 14px;
      align-items: center;
    }
    .badge-item {
      padding: 10px 18px;
      border: 1px solid rgba(125, 211, 168, 0.35);
      border-radius: 999px;
      font-size: 16px;
      font-weight: 500;
      color: #7dd3a8;
      background: rgba(0, 172, 124, 0.08);
    }
  </style>
</head>
<body>
  <div class="glow"></div>

  <div class="top">
    <img src="${logoDataUri}" alt="Persua">
  </div>

  <div class="middle">
    <div class="eyebrow">Documentos legais</div>
    <h1>Termos, Privacidade e <span class="accent">Subprocessadores</span></h1>
    <p class="subtitle">Os documentos que regem nossa relação com você, reunidos em um lugar só.</p>
  </div>

  <div class="bottom">
    <span class="url">terms.persua.com.br</span>
    <span class="badge">
      <span class="badge-item">LGPD</span>
      <span class="badge-item">Contrato</span>
      <span class="badge-item">Infraestrutura</span>
    </span>
  </div>
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buf = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    fs.writeFileSync(OUT_PATH, buf);
    console.log('[og] gerado:', OUT_PATH, '(', (buf.length / 1024).toFixed(1), 'KB )');
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error('[og] erro:', err);
  process.exit(1);
});
