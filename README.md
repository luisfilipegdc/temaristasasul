# Base de Conhecimento — Iônica | Marista Brasília

Guia rápido da plataforma **iônica** (FTD) para professores, mantido pela Tecnologia Educacional do Marista Brasília.

Site estático: um único `index.html` + a pasta `img/`. Sem build, sem dependências.

## Publicar na Vercel

1. Suba estes arquivos para o repositório no GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New… → Project** → importe o repositório.
3. Framework Preset: **Other**. Build Command: deixe vazio. Output Directory: deixe vazio (raiz).
4. **Deploy**. A cada `git push` na branch principal a Vercel republica sozinha.

## Estrutura

```
index.html          página completa (HTML + CSS + JS inline)
img/                capturas de tela usadas nos passo a passo
vercel.json         cache das imagens e URLs limpas
```

## Como adicionar um tópico novo

Copie um bloco `<article class="entry">` e ajuste:

- `id` — usado no link direto (`#meu-topico`)
- `data-kw` — palavras-chave extras para a busca (sem acento também funciona)
- `.tldr` — o resumo de uma linha (é o que a maioria vai ler)
- `.time` — tempo estimado de leitura
- `.fmt` — chip opcional: `🖼️ Com imagens` ou `<span class="fmt vid">🎥 Vídeo</span>`

## Como adicionar uma imagem com áreas de foco

1. Salve o print em `img/` (PNG, largura ~1360px).
2. Use este bloco:

```html
<figure class="shot">
  <div class="shot-frame" data-full="img/meu-print.png">
    <img src="img/meu-print.png" alt="descrição da tela" loading="lazy">
    <button class="hot" style="--x:56%; --y:70%" data-x="56%" data-y="70%" type="button">
      1<span class="tip">Texto que aparece ao passar o mouse</span>
    </button>
  </div>
  <figcaption>Legenda da imagem.</figcaption>
</figure>
```

- `--x` / `--y` e `data-x` / `data-y` são a posição do ponto **em porcentagem** da imagem (os dois pares precisam ter o mesmo valor).
- Use `class="hot warn"` para marcar em laranja algo que a pessoa **não** deve clicar.
- Passar o mouse no ponto escurece o resto da imagem (holofote); clicar na imagem amplia.

## Cuidados com privacidade

Antes de subir qualquer print, **borre**: e-mails de terceiros, códigos de verificação, telefones e dados de alunos. Os prints atuais já passaram por isso.

## Atalhos da página

- `/` foca a busca · `Esc` limpa
- Clique no `#` de um tópico copia o link direto dele
- Botão **Imprimir** gera uma versão limpa em PDF (abre todos os tópicos automaticamente)
