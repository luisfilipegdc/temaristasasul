# CLAUDE.md — regras do projeto

Contexto permanente para qualquer agente que trabalhar neste repositório.
Leia também `HANDOFF.md` para o histórico completo e o estado atual.

## O que é este repositório

Site estático de **base de conhecimento das plataformas** usadas pelos **professores** do
**Marista Brasília**. Mantido pela equipe de Tecnologia Educacional (TE).

**Sem build, sem framework, sem dependências.** Publicado na Vercel como site estático.

### Estrutura

```
index.html          triagem: "Quer ajuda em qual plataforma?" — é o link que se divulga
ionica.html         guia da iônica (FTD) — completo, CSS e JS inline próprios
conecta.html        Marista Conecta — em construção
evolucional.html    Evolucional — em construção
assets/base.css     tokens de cor + shell (topbar, hero, contatos) das páginas menores
assets/plataforma.css  extras das páginas em construção
assets/tema.js      alternador de tema compartilhado
img/                prints da iônica
```

O fluxo é sempre: **link → escolher a plataforma → cair no guia certo.**

A `ionica.html` é a página grande e já validada; ela **mantém o CSS/JS inline dela** e não usa
`assets/base.css`. Não vale a pena migrar só por simetria — se for mexer, mexa por um motivo.
Quando `conecta`/`evolucional` ganharem conteúdo de verdade, elas seguem o padrão da iônica.

`vercel.json` tem `cleanUrls: true`, então os links são **sem `.html`** (`href="ionica"`).

**Links antigos:** antes da triagem, a iônica era a raiz — existem links por aí como
`/#login` e `/#problemas`. O `index.html` tem uma lista das âncoras da iônica e redireciona
esses acessos para `ionica#<âncora>`. **Se criar uma âncora nova na iônica, acrescente na
lista** (`ancorasIonica`, no script do `index.html`).

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
   Vale para plataforma inteira: **Marista Conecta e Evolucional não foram auditados**, então as
   páginas deles não afirmam nada sobre como funcionam — só assumem que o guia está sendo montado
   e oferecem o contato da TE.
8. **Nunca um beco sem saída.** Toda página, mesmo em construção, termina com uma saída real:
   o WhatsApp de quem cuida do segmento. Página que só diz "em breve" está errada.

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
- **Não use `transform:scale` no `.hot`.** O balão é filho do botão e seria escalado junto —
  o texto aumenta e vaza a borda da imagem. O "crescer no hover" é por `width/height`.
- **O `.shot-frame` não pode ter `overflow:hidden`**, senão o balão é cortado. O arredondamento
  fica no `img` e no `.spot` via `border-radius:inherit`.
- O balão se posiciona sozinho no JS: vira para baixo se não couber acima e desliza na
  horizontal para não sair da tela. Não posicione à mão.

## Como a dica na imagem funciona (não quebre isso)

Existe **uma seleção por figura**, com três entradas para ela — o ponto na imagem, o item da
legenda e o ponto dentro da imagem ampliada. Nunca dois mecanismos concorrentes.

- **Ponto que parece botão tem que agir como botão.** Já foi tentado deixá-lo com
  `pointer-events:none` no celular: o toque atravessava e abria o lightbox, e a leitura correta
  do usuário foi "está quebrado". Se for tornar o ponto inerte de novo, tire o visual de botão.
- **Tocar no ponto seleciona a dica e NÃO amplia** (`stopPropagation`). Ampliar é o botão
  "⤢ Ampliar a imagem" ou o clique na imagem fora de um ponto.
- **A seleção por clique fica travada** (`travado`). Passar o mouse é só prévia. Sem isso, a
  rolagem que traz o alvo para a tela move a página sob o cursor, dispara `mouseleave` e apaga
  a seleção no mesmo instante em que ela nasce — já aconteceu.
- **O botão de ampliar fica FORA da imagem.** Sobreposto, ele tapava pontos (o nº 4 da home e
  o ✓ do login, em 4 larguras).
- **Na imagem ampliada os pontos são clonados** com as mesmas porcentagens, e a dica aparece
  numa barra abaixo da imagem — nunca em balão, que corta. É a única superfície onde o print
  fica grande o bastante para a dica valer alguma coisa no celular.

## Legenda tocável (celular e impressão)

Abaixo de 640px — e também na impressão — o balão do hotspot é substituído por uma **legenda
tocável abaixo da imagem** (`.shot-legend`), montada **por JS a partir dos próprios hotspots**.
Não existe HTML duplicado: o texto vem do `.tip` e a marca vem do conteúdo do botão.

Motivo: no celular não há hover, o alvo de 30px fica minúsculo e dois pontos próximos se
sobrepõem (as posições são percentuais, então encolhem junto com a imagem). No papel, hover
não existe. Nos dois casos o texto do balão simplesmente não chegava na pessoa.

Por isso, abaixo de 640px o ponto vira **âncora visual** (`pointer-events:none`) — quem comanda
é a legenda, e o toque na imagem abre o lightbox. **Se adicionar um hotspot, não precisa fazer
nada:** a legenda se monta sozinha.

## Design comportamental aplicado (não remova sem motivo)

Triagem de 3 caminhos no topo (reduz escolha), tempo estimado por tópico (baixa o custo percebido),
barra de progresso de leitura, chip "Mais comum" no erro nº 1 (prova social), botão "✓ Resolveu"
que fecha o ciclo, ação primária destacada no WhatsApp, fechamento positivo no fim da página.

No celular, a mesma lógica aplicada à fricção de toque (não remova):

- **Alvo de toque de 44px** nas ações que fecham ciclo ("✓ Resolveu", "falar com a TE", WhatsApp,
  links de vídeo). Alvo pequeno = erro de toque = desistência.
- **Legenda no lugar do balão** — texto sempre inteiro, um item por vez, com destaque de seleção.
- **Nada de alvo fantasma:** o "#" de link do tópico era invisível (`opacity:0`, só aparecia no
  hover) mas continuava clicável. No celular ele aparece.
- **Sem zoom automático do iOS:** `#search` tem `font-size:16px` no celular. Abaixo disso o
  Safari dá zoom ao focar e desalinha a página inteira.
- **Texto adapta ao dispositivo:** "passe o mouse"/"clique" viram "toque" em tela de toque.
- **Nada pode vazar na horizontal.** URLs longas quebram (`overflow-wrap:anywhere`) e as colunas
  do grid levam `min-width:0` — sem isso a página inteira desloca e corta o texto na lateral.

## Comandos úteis

```bash
# QA visual (Chromium já instalado no ambiente Cowork)
node qa.js          # se existir; senão veja HANDOFF.md

# Publicar: só dar push. A Vercel republica sozinha.
git add -A && git commit -m "..." && git push
```
