#!/usr/bin/env node
// sync-content.js
// Copia os MDs canonicos do escritorio virtual (persua/juridico/compliance/)
// para src/content/ deste subprojeto.
//
// Roda manualmente quando os documentos canonicos sao atualizados:
//   npm run sync
//
// O subprojeto e Git separado, entao precisa ter os MDs commitados aqui.
// O canonico continua sendo o single source of truth no escritorio virtual.

const fs = require('node:fs');
const path = require('node:path');

const CANONICO_BASE = path.resolve(__dirname, '..', '..', '..', 'persua', 'juridico', 'compliance');

const MAPPINGS = [
  {
    src: path.join(CANONICO_BASE, 'termos_publicos', 'terms-of-use_v1.0.md'),
    dst: path.resolve(__dirname, '..', 'src', 'content', 'terms-of-use.md'),
  },
  {
    src: path.join(CANONICO_BASE, 'termos_publicos', 'privacy-policy_v1.0.md'),
    dst: path.resolve(__dirname, '..', 'src', 'content', 'privacy-policy.md'),
  },
  {
    src: path.join(CANONICO_BASE, 'subprocessadores.md'),
    dst: path.resolve(__dirname, '..', 'src', 'content', 'subprocessors.md'),
  },
];

let ok = true;
for (const { src, dst } of MAPPINGS) {
  if (!fs.existsSync(src)) {
    console.error(`[sync] FALTA canonico: ${src}`);
    ok = false;
    continue;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  console.log(`[sync] ${path.basename(src)} -> src/content/${path.basename(dst)}`);
}

if (!ok) {
  console.error('[sync] Sync incompleto. Rodando fora do escritorio virtual?');
  process.exit(1);
}
console.log('[sync] OK');
