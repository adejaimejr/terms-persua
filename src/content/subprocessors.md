# Subprocessadores

**Status:** Documento público, publicado em terms.persua.com.br/subprocessors
**Versão:** v1.1
**Data:** 2026-10-27
**Mantenedor:** Encarregado de Dados (DPO), contas@persua.com.br

---

A Persua opera com a infraestrutura abaixo. Esta página é mantida atualizada e qualquer mudança relevante é comunicada aos clientes com antecedência razoável.

## Como ler esta lista

- **Finalidade:** o que o subprocessador faz no contexto da Persua.
- **País:** localização principal do tratamento.
- **Base legal:** fundamento da LGPD que autoriza o compartilhamento.
- **Desde:** data em que o subprocessador entrou na operação.

## Lista atual

### 1. Asaas
- Finalidade: gateway de cobrança (boleto, PIX, cartão) e emissão de NFS-e
- País: Brasil
- Base legal: execução de contrato (art. 7º, V, LGPD)
- Desde: 2023

### 2. Assinafy
- Finalidade: assinatura digital e clickwrap das propostas comerciais
- País: Brasil
- Base legal: execução de contrato (art. 7º, V, LGPD) e cumprimento de obrigação legal/regulatória (Lei 14.063/2020)
- Desde: 2026

### 3. Meta Platforms
- Finalidade: APIs oficiais de WhatsApp Business, Instagram Direct e Facebook Messenger
- País: Estados Unidos
- Base legal: execução de contrato (art. 7º, V, LGPD), com transferência internacional baseada em cláusulas contratuais padrão (art. 33)
- Desde: 2023

### 4. OpenAI
- Finalidade 1: modelos de linguagem (GPT) usados em agentes de IA configurados para clientes
- Finalidade 2: medição de anúncios no site (pixel da OpenAI Ads)
- País: Estados Unidos
- Base legal: legítimo interesse do controlador (art. 7º, IX, LGPD), com transferência internacional baseada em cláusulas contratuais padrão (art. 33)
- Desde: 2024

### 5. Anthropic
- Finalidade: modelos de linguagem (Claude) usados em agentes de IA configurados para clientes
- País: Estados Unidos
- Base legal: legítimo interesse do controlador (art. 7º, IX, LGPD), com transferência internacional baseada em cláusulas contratuais padrão (art. 33)
- Desde: 2024

### 6. Hetzner Online
- Finalidade 1: hospedagem dedicada de módulos de integração e automação implementados pela Persua para clientes que contratam o serviço gerenciado (Caminho A). Inclui ERPs do cliente, automações próprias, instâncias de n8n e contêineres Docker provisionados sob demanda
- Aplicabilidade da finalidade 1: só compartilha dados quando o cliente contrata o pacote de implementação Persua. Clientes que optam pela API aberta (Caminho B) operam por conta própria e não dependem desta infraestrutura
- Finalidade 2: hospedagem da API de medição do site persua.com.br
- Aplicabilidade da finalidade 2: independe de contratação do pacote de implementação, pois trata dados de visitantes do site
- País: Alemanha (transferência internacional via cláusulas contratuais padrão, art. 33, LGPD)
- Base legal: execução de contrato (art. 7º, V, LGPD) na finalidade 1 e legítimo interesse (art. 7º, IX, LGPD) na finalidade 2
- Desde: 2023 (finalidade 2: 2026)

### 7. Contabo
- Finalidade: hospedagem dedicada de módulos de integração e automação implementados pela Persua para clientes que contratam o serviço gerenciado (Caminho A). Inclui ERPs do cliente, automações próprias, instâncias de n8n e contêineres Docker provisionados sob demanda
- Aplicabilidade: só compartilha dados quando o cliente contrata o pacote de implementação Persua. Clientes que optam pela API aberta (Caminho B) operam por conta própria e não dependem desta infraestrutura
- País: Alemanha (transferência internacional via cláusulas contratuais padrão, art. 33, LGPD)
- Base legal: execução de contrato (art. 7º, V, LGPD)
- Desde: 2023

### 8. Amazon Web Services (AWS)
- Finalidade: hospedagem de aplicações, banco de dados, mídia
- País: Estados Unidos (regiões US-East-1, US-West-2) e Brasil (sa-east-1)
- Base legal: execução de contrato (art. 7º, V, LGPD), com transferência internacional baseada em cláusulas contratuais padrão (art. 33)
- Desde: 2023

### 9. Hunion.io
- Finalidade: hospedagem de aplicações
- País: Brasil (Belo Horizonte)
- Base legal: execução de contrato (art. 7º, V, LGPD)
- Desde: 2023

### 10. SendGrid (Twilio)
- Finalidade: envio de e-mails transacionais
- País: Estados Unidos (São Francisco)
- Base legal: execução de contrato (art. 7º, V, LGPD), com transferência internacional baseada em cláusulas contratuais padrão (art. 33)
- Desde: 2023

### 11. Supabase
- Finalidade: banco de dados dos leads e dos eventos de medição do site persua.com.br
- País: Estados Unidos (região us-east-2, Ohio)
- Base legal: legítimo interesse (art. 7º, IX, LGPD), com transferência internacional baseada no art. 33
- Desde: 2026

### 12. Cloudflare
- Finalidade: DNS, proteção contra ataques e proxy da API de medição do site
- País: Estados Unidos, com rede global
- Base legal: legítimo interesse (art. 7º, IX, LGPD), com transferência internacional baseada no art. 33
- Desde: 2026

### 13. HostGator
- Finalidade: hospedagem do site institucional persua.com.br
- País: Brasil
- Base legal: legítimo interesse (art. 7º, IX, LGPD)
- Desde: 2026

## Atualizações

Mudanças nesta lista são versionadas. A versão atual e a data ficam sempre no topo. Adições, remoções ou substituições são comunicadas aos clientes pelo canal contas@persua.com.br com antecedência mínima de 15 dias, salvo motivo de força maior.

## Histórico

- v1.1 (2026-10-27): OpenAI ganha a finalidade de medição de anúncios (pixel da OpenAI Ads); Hetzner Online ganha a hospedagem da API de medição do site; entram Supabase, Cloudflare e HostGator. Troca do Encarregado de Dados (DPO) no cabeçalho. Aviso aos clientes com 15 dias de antecedência, pelo contas@persua.com.br.
- v1.0 (2026-04-30): versão publicada em terms.persua.com.br. As próximas mudanças serão registradas neste histórico.
