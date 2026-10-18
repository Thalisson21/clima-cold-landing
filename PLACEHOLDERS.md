# Clima Cold — conteúdo provisório a substituir antes de publicar

Todo o conteúdo editável está em `src/app/content/site-content.ts`.

| Item | Onde | Situação |
| --- | --- | --- |
| Vídeo do hero (+ quadro de capa) | `HERO.video` → `public/videos/` e `public/images/` | Sem vídeo — exibe fundo provisório animado |
| Número do WhatsApp (`5581999999999`) | `COMPANY.phone` / `COMPANY.phoneLabel` | **Fictício** |
| Razão social | `COMPANY.legalName` | Placeholder |
| E-mail | `COMPANY.email` | Fictício |
| Cidade / região atendida | `COMPANY.location` | Placeholder |
| Instagram / LinkedIn | `COMPANY.instagram` / `COMPANY.linkedin` | Apontam para a home das redes |
| Serviços (3 cards + letreiro) | `SERVICES`, `MARQUEE` | Exemplos de climatização — validar com a empresa |
| História e propósito | `ABOUT.paragraphs` | Placeholder |
| Selo "Desde [ANO]" | `ABOUT.badge` | Placeholder |
| Foto institucional | `ABOUT.image.src` → `public/images/` | Sem imagem |
| Indicadores | `RESULTS` | **Não publicar sem dados verificáveis** |
| Equipe (nomes, cargos, fotos) | `TEAM` → `public/images/equipe/` | Placeholder — exige autorização |
| Depoimentos | `TESTIMONIALS` | Placeholder — apenas reais e autorizados |
| Título / meta description | `src/index.html` | Revisar com o segmento confirmado |
| Logo | `src/app/shared/logo.ts` | Provisório (ícone + tipografia) |

Ao preencher as imagens, defina `photo` / `src` com o caminho público
(ex.: `/images/equipe/joao.webp`) e um `alt` descritivo; o template passa a usar
`NgOptimizedImage` automaticamente.

Quando os dados reais forem inseridos, remova também os selos visíveis de
"provisório/ilustrativo" em `results.ts`, `team.html` e `testimonials.ts`.

## Vídeo do hero

- Formato: MP4 (H.264) e, se possível, também WebM; **sem áudio**; 10–20 s em loop.
- Resolução 1920×1080 (ou 1280×720), idealmente até ~6–8 MB.
- Tomadas com pouco texto na imagem: o conteúdo do site aparece por cima com um véu azul-marinho.
- Gere também um quadro de capa (`poster`) em WebP. Ele aparece enquanto o vídeo carrega e para
  quem ativou "reduzir movimento" no sistema.
- Ao preencher `HERO.video.sources`, o selo "Vídeo institucional em breve" some e o botão de
  pausar/reproduzir aparece automaticamente.
