#!/usr/bin/env node
// build.js
// Le os 3 MDs em src/content/, aplica o template doc.html, copia a home,
// gera dist/ pronto para o nginx servir.

const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://terms.persua.com.br';

const PAGES = [
  {
    slug: 'terms-of-use',
    file: 'terms-of-use.md',
    title: 'Termos de Uso',
    description: 'Termos de Uso da Persua. Regras de uso da plataforma, planos, pagamentos e cancelamento.',
  },
  {
    slug: 'privacy-policy',
    file: 'privacy-policy.md',
    title: 'Política de Privacidade',
    description: 'Política de Privacidade da Persua. Como coletamos, usamos e protegemos dados pessoais.',
  },
  {
    slug: 'subprocessors',
    file: 'subprocessors.md',
    title: 'Subprocessadores',
    description: 'Lista pública de subprocessadores da Persua, com finalidade e localização.',
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function copyTree(src, dst) {
  if (!fs.existsSync(src)) return;
  ensureDir(dst);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sFile = path.join(src, entry.name);
    const dFile = path.join(dst, entry.name);
    if (entry.isDirectory()) copyTree(sFile, dFile);
    else fs.copyFileSync(sFile, dFile);
  }
}

function renderTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) return vars[key];
    return '';
  });
}

function build() {
  // Limpar dist
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);

  const homeTpl = fs.readFileSync(path.join(SRC, 'templates', 'home.html'), 'utf8');
  const docTpl = fs.readFileSync(path.join(SRC, 'templates', 'doc.html'), 'utf8');

  // Configurar marked
  marked.setOptions({
    breaks: false,
    gfm: true,
    headerIds: true,
  });

  // Home
  fs.writeFileSync(path.join(DIST, 'index.html'), homeTpl);
  console.log('[build] dist/index.html');

  // Paginas
  for (const page of PAGES) {
    const mdPath = path.join(SRC, 'content', page.file);
    if (!fs.existsSync(mdPath)) {
      console.error(`[build] FALTA conteudo: ${mdPath}. Rode "npm run sync" antes.`);
      process.exit(1);
    }
    const md = fs.readFileSync(mdPath, 'utf8');
    const html = marked.parse(md);
    const out = renderTemplate(docTpl, {
      TITLE: page.title,
      DESCRIPTION: page.description,
      CONTENT: html,
      URL: `${SITE_URL}/${page.slug}`,
    });
    fs.writeFileSync(path.join(DIST, `${page.slug}.html`), out);
    console.log(`[build] dist/${page.slug}.html`);
  }

  // CSS
  copyFile(path.join(SRC, 'styles', 'style.css'), path.join(DIST, 'style.css'));
  console.log('[build] dist/style.css');

  // Public assets (logo, favicon)
  copyTree(path.join(SRC, 'public'), DIST);
  console.log('[build] dist/* (assets de src/public)');

  console.log('[build] OK');
}

build();
