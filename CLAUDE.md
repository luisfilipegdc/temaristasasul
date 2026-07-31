# CLAUDE.md — regras do projeto

Contexto permanente para qualquer agente que trabalhar neste repositório.
Leia também `HANDOFF.md` para o histórico completo e o estado atual.

## O que é este repositório

Site estático de **base de conhecimento da plataforma iônica** (FTD Educação), escrito para
**professores** do **Marista Brasília**. Mantido pela equipe de Tecnologia Educacional (TE).

Arquivo único: `index.html` (HTML + CSS + JS inline) + pasta `img/`.
**Sem build, sem framework, sem dependências.** Publicado na Vercel como site estático.

## Regras inegociáveis

1. **Identidade visual: só azul e branco.** Nada de amarelo, dourado, âmbar ou laranja como cor
   de marca. A única exceção é a cor `--warn` (laranja) usada exclusivamente para marcar o que a
   pessoa **não** deve clicar em um print — nunca como cor decorativa.
2. **É "Marista Brasília"**, não "Rede Marista Brasil". O domínio dos e-mails continua sendo
   `@maristabrasil.org` — isso está certo, não "corrija".
3. **Não é documentação.** É um guia rápido. Se um tópico ficou longo e formal, está errado.
   O alvo é: a pessoa resolve em 30 segundos ou assiste a um vídeo curto.
4. **Dois públicos, sempre atendidos juntos:** quem quer ler (resumo de uma linha + passo a passo)
   e quem quer assistir (espaço de vídeo em todo tópico). Nunca só um dos dois.
5. **Tom sem culpa.** O usuário nunca é o culpado pelo erro. Use "isso acontece com todo mundo",
   "não é nada que você fez", "respira: as turmas não sumiram".
6. **Privacidade em prints:** antes de commitar qualquer imagem, borre e-mails de terceiros,
   códigos de verificação, telefones e qualquer dado de aluno. Use `PIL.ImageFilter.GaussianBlur`.
   Os prints atuais já passaram por isso.
7. **Não invente conteúdo de tela.** Só descreva o que foi confirmado por auditoria na plataforma
   ou por print enviado. Se não sabe, deixe o tópico com o marcador de vídeo/print pendente.

## Convenções de código

- Um `<article class="entry">` por tópico. Precisa de: `id` (link direto), `data-kw`
  (palavras-chave extras para a busca), `.tldr` (resumo de 1 linha), `.time` (tempo estimado).
- Chip `.fmt` **só quando existe mídia extra**: `🖼️ Com imagens` ou `<span class="fmt vid">🎥 Vídeo</span>`.
  Tópico só de texto não leva chip. **Nunca voltar com badge de status interno tipo "Mapeado".**
- Problemas comuns são `<details class="faq">` com o bloco `.resolve` no fim (botão "✓ Resolveu"
  + link para a TE).
- Busca ignora acento e caixa — `data-kw` pode ter as duas grafias.
- Sem `localStorage`/`sessionStorage`. Estado só em memória.
- Respeite `prefers-reduced-motion` (já tratado no CSS).

## Imagem com área de foco (hotspot)

```html
<figure class="shot">
  <div class="shot-frame" data-full="img/arquivo.png">
    <img src="img/arquivo.png" alt="descrição" loading="lazy">
    <button class="hot" style="--x:56%; --y:70%" data-x="56%" data-y="70%" type="button">
      1<span class="tip">Texto do balão</span>
    </button>
  </div>
  <figcaption>Legenda.</figcaption>
</figure>
```

- `--x/--y` (CSS) e `data-x/data-y` (JS) precisam ter **o mesmo valor** — o CSS posiciona o ponto,
  o JS move o holofote. Esquecer um dos dois é o erro mais comum.
- `class="hot warn"` = laranja, para "não clique aqui".
- Conteúdo do botão: número (`1`,`2`,`3`) para tour de tela; `✓` para caminho certo; `✕` para
  caminho errado; `+` para ação alternativa.
- Passar o mouse escurece o resto da imagem; clicar na imagem abre o lightbox.

## Design comportamental aplicado (não remova sem motivo)

Triagem de 3 caminhos no topo (reduz escolha), tempo estimado por tópico (baixa o custo percebido),
barra de progresso de leitura, chip "Mais comum" no erro nº 1 (prova social), botão "✓ Resolveu"
que fecha o ciclo, ação primária destacada no WhatsApp, fechamento positivo no fim da página.

## Comandos úteis

```bash
# QA visual (Chromium já instalado no ambiente Cowork)
node qa.js          # se existir; senão veja HANDOFF.md

# Publicar: só dar push. A Vercel republica sozinha.
git add -A && git commit -m "..." && git push
```
