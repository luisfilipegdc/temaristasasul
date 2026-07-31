# HANDOFF — Base de Conhecimento Iônica | Marista Brasília

Documento de passagem de contexto. Se você é um agente assumindo este projeto agora, leia isto
inteiro **e** o `CLAUDE.md` antes de mexer em qualquer coisa.

Data do handoff: **31/07/2026**
Responsável: **Luis Filipe Gomes de Carvalho** — Tecnologia Educacional, Anos Finais
`luis.gomes@maristabrasil.org` · WhatsApp +55 61 9178-4413

---

## 1. O que foi pedido e como o projeto evoluiu

O pedido inicial foi "um tutorial da plataforma iônica/Estuda, algo tecnológico e diferente".
Ao longo da conversa o escopo mudou várias vezes até chegar no formato atual. A ordem importa,
porque cada virada descartou uma decisão anterior:

1. **Início** — tutorial do Estuda.com (configurar prova, adicionar questões, Adaptações
   Inteligentes) a partir de dois vídeos do YouTube e de um artigo da Central de Ajuda da Estuda.
   Foram entregues três formatos: HTML, Word e PowerPoint. **Esses arquivos estão em
   `docs/materiais-estuda/`** e continuam válidos como material de apoio do módulo Avaliações.
2. **Primeira virada** — o histórico do chamado CITSmart 644161 (professoras com usuário
   inativado automaticamente) foi retirado do material público. Era assunto interno, não tutorial.
   O tema sobreviveu apenas como um item genérico em "Deu problema?" ("usuário aparece inativo"),
   sem citar nomes nem número de chamado.
3. **Segunda virada** — o alvo passou a ser um **guia de professor**, no espírito da Central de
   Ajuda da Estuda, mas "mais prático, mais rápido e direto, com vídeo curto".
4. **Terceira virada (a definitiva)** — o alvo passou a ser uma **base de conhecimento da iônica**
   (não do Estuda), cobrindo a plataforma inteira desde o login, com erros comuns e soluções
   simples. O Estuda virou **um dos módulos** dentro dela.
5. **Auditoria** — foi feita uma auditoria navegando na plataforma logada como professor no
   Colégio Marista de Brasília. O resultado está consolidado na seção 3 deste documento e já
   está refletido no `index.html`.
6. **Identidade** — corrigido para **Marista Brasília** (era "Rede Marista Brasil") e paleta
   ajustada para **só azul e branco** (o dourado/amarelo foi removido de tudo).
7. **Design comportamental** — aplicada uma camada de nudges e redução de fricção (detalhada na
   seção 5).
8. **Imagens** — inseridos prints reais com **áreas de foco** (hotspots com holofote + lightbox),
   a pedido, no lugar de um passo a passo só textual.

---

## 2. Estado atual

O site deixou de ser uma página só. O fluxo agora é
**link → "quer ajuda em qual plataforma?" → iônica / Marista Conecta / Evolucional → guia certo.**

```
index.html                      triagem das plataformas (é o link que se divulga)
ionica.html                     a base de conhecimento da iônica, completa (CSS+JS inline)
conecta.html                    Marista Conecta — em construção, com contato da TE
evolucional.html                Evolucional — em construção, com contato da TE
assets/base.css                 tokens + shell das páginas menores
assets/plataforma.css           extras das páginas em construção
assets/tema.js                  alternador de tema compartilhado
img/
  login-ionica.png              tela de login da iônica
  escolher-conta.png            "Escolha uma conta" da Microsoft (outras contas BORRADAS)
  autenticacao-app.png          aprovação via app Outlook
  autenticacao-sms.png          código por SMS (código BORRADO)
  home-popup.png                pop-up de boas-vindas no primeiro acesso
  home-ionica.png               "Minha iônica" — página inicial limpa
vercel.json                     cleanUrls + cache das imagens
README.md                       instruções de publicação e de como estender
CLAUDE.md                       regras do projeto (ler sempre)
HANDOFF.md                      este arquivo
docs/materiais-estuda/          material anterior sobre o Estuda.com (docx, pptx, html)
```

**Seções da `ionica.html`:** Como acessar · Minha iônica · Biblioteca · Módulos · Perfil e ajustes ·
Deu problema? · Central de Ajuda oficial · Falar com a TE.

**Funcionalidades da `ionica.html`:** busca instantânea (ignora acento, tecla `/` foca, `Esc` limpa,
mostra contagem de resultados), índice lateral com seção ativa, tema claro/escuro, barra de
progresso de leitura, link copiável por tópico (`#`), botão "✓ Resolveu" nos erros, hotspots com
holofote nas imagens, legenda tocável no celular e na impressão, lightbox, versão de impressão
limpa (abre todos os `details` no `beforeprint`), botão voltar ao topo.

**Links antigos continuam funcionando.** Antes da triagem, a iônica era a raiz, então existem
links compartilhados como `/#login` e `/#problemas`. O `index.html` guarda a lista de âncoras da
iônica e redireciona esses acessos para `ionica#<âncora>`. Âncora nova na iônica exige acrescentar
na lista `ancorasIonica` do `index.html` — está anotado no `CLAUDE.md`.

---

## 3. Conteúdo confirmado pela auditoria (fonte da verdade)

**A iônica é um hub.** Ambiente digital da FTD Educação usado pelo Marista. Reúne módulos próprios
(Biblioteca, Salas, Atividades, IA) e plataformas externas abertas por SSO. Quase todo "erro de
acesso" acontece na passagem entre esses sistemas — isso é a tese central da página.

**Endereço:** `home.souionica.com.br` · a home se chama "Minha iônica" (`/home`).

**Login:** o caminho que funciona para todo mundo é o **botão Microsoft**. Mas **o professor pode
já ter usuário e senha da própria iônica** e entrar por eles — isso foi corrigido em 31/07/2026,
depois de a página ter afirmado por um tempo que esses campos "não serviam". O botão do Google e
o "Criar conta" continuam fora do caminho do professor. Se o login pela Microsoft não funciona, o
acesso não foi liberado — a pessoa deve procurar o responsável pelo seu segmento. Pode haver MFA (aprovação pelo app Outlook com número, ou código por SMS). No primeiro
acesso aparece um pop-up de novidades: clicar em "Continuar".

**Seletor de escola** no topo ("Você está em: COLÉGIO MARISTA…"). Turmas, biblioteca e relatórios
mudam conforme a escola selecionada — é a causa nº 1 de "minhas turmas sumiram".

**Menu lateral, nesta ordem:** Minha iônica · Simulados FTD · Minha Escolha · Comunidade Integra ·
Consultoria On-line · Avaliações (Estuda.com) · Novidades · Notificações · Relatórios · Sair.
No topo fica o "Menu" (hambúrguer) que abre a Biblioteca, e um botão **"?"** rosa na lateral direita.

**Biblioteca — 5 abas:** Publicações (`/library`, livros por etapa/ano, da Alfabetização ao 9º ano
e EM 1ª–3ª série, com filtro, busca e "Código de acesso") · Recursos (`/resources`, conteúdos
avulsos: vídeos e interativos) · Acervo de links (`/links`, links externos curados) · Videoaulas
(`/videoaulas`, 19 disciplinas, Anos Finais e EM) · Labs (`/labs`, projeto **Quant Bot** —
robótica, cultura maker e gamificação, missões por ano, Anos Iniciais).

**Módulos externos (URLs reais):**
- Simulados FTD → `simulados.estuda.com`
- Minha Escolha → `ftd.minhaescolha.com.br`
- Comunidade Integra → `ead-consultoriaonline.ftd.com.br` com `lti=integra`
- Consultoria On-line → mesmo ambiente EAD com `lti=co`
- Avaliações → `app.estuda.com`

**Relatórios:** três tipos no seletor "Selecionar relatório" — **Uso** (acessos e engajamento),
**Desempenho** (nas atividades) e **Notas** (por curso e período).

**Novidades** (`/novidades`) é o changelog oficial. **Notificações** costuma estar vazia — é normal.

**Inteligência iônica (IA):** botão flutuante com três ações — Buscar materiais, Criar questões e
Criar plano de aula (BETA). Há também um banner na home.

**Perfil / Ajustes:** Perfil abre pela foto no topo (trocar foto, **trocar de escola/unidade**, FAQ,
termos, excluir conta). "Sair" fica no menu lateral, não no perfil. Ajustes contém Licenças
("+ Adicionar" com código de ativação; lixeira remove), Dispositivos (desvincular pela lixeira),
Aparência dia/noite, Tamanho do texto e "Baixar apenas com Wi-Fi". Essa área é mais completa no
**app mobile** do que na web.

**Central de Ajuda oficial:** `centraldeajuda.souionica.com.br`, pelo botão "?" → "Central de ajuda".
Organizada por categoria (Conta e acesso; Página inicial, navegação e perfil; Materiais e biblioteca;
Atividades, banco de questões e cursos; Relatórios; App móvel) e por perfil (Estudantes, Professores,
Gestão escolar, Famílias). A seção **Professores tem 30 artigos** — é o backlog natural desta base.

**Erro real observado na auditoria:** ao clicar em Relatórios após um tempo parado, a plataforma
disparou o fluxo de re-login da Microsoft ("Escolha uma conta"). É sessão SSO expirada — está
marcado na página como o problema **mais comum**.

---

## 4. Contatos da TE (aparecem na página, com link direto para WhatsApp)

| Segmento | Nome | E-mail | WhatsApp |
|---|---|---|---|
| Anos Iniciais | Walyson | walyson.ramos@maristabrasil.org | +55 61 9953-2943 → `wa.me/556199532943` |
| Anos Finais | Luis Filipe | luis.gomes@maristabrasil.org | +55 61 9178-4413 → `wa.me/556191784413` |
| Ensino Médio | Evandro | evandro.nascimento@maristabrasil.org | +55 61 9318-1701 → `wa.me/556193181701` |

---

## 5. Design comportamental aplicado

Cada item abaixo é intencional. Se for mexer, saiba o que está removendo:

- **Triagem de 3 caminhos** no topo ("primeiro acesso" / "quero achar uma coisa" / "está dando
  erro") — reduz o número de decisões antes da primeira ação (lei de Hick).
- **Resumo de 1 linha** antes de qualquer passo a passo — quem só quer a resposta para de ler ali.
- **Tempo estimado** (`⏱ 30s`) em cada tópico — reduz o custo percebido de começar.
- **Barra de progresso de leitura** no topo — sensação de avanço.
- **Chip "Mais comum"** no erro nº 1 — prova social + destaque por isolamento.
- **Botão "✓ Resolveu"** no fim de cada erro — fecha o ciclo com uma confirmação positiva; o card
  fica verde e recolhe. Ao lado, sempre a saída "Ainda não — falar com a TE".
- **WhatsApp como ação primária** nos contatos (botão cheio, alvo grande) — e-mail fica secundário.
- **Linguagem sem culpa** em todos os erros.
- **Fechamento positivo** no fim da página ("chegou até aqui? já sabe mais que a maioria").
- **Contadores no topo** calculados do próprio DOM — não precisam ser atualizados à mão.

---

## 6. O que falta (backlog priorizado)

0. **Conteúdo do Marista Conecta e do Evolucional.** As duas páginas existem, mas só com o aviso
   honesto de que o guia está sendo montado e o contato da TE — nenhuma das duas foi auditada,
   e a regra 7 proíbe inventar. Para destravar: navegar logado nas duas plataformas (como foi
   feito com a iônica), anotar o fluxo de acesso e os erros comuns, e mandar prints. Aí elas
   passam a seguir o padrão da `ionica.html`. **É o item mais urgente**, porque a triagem já
   promete as três plataformas na porta de entrada.
1. **Gravar os vídeos curtos.** Três já estão no ar, no canal Tecnologia Educacional Marista
   Asa Sul: *Como acessar a Iônica* (tópico `login`), *Minha Iônica* (tópico `painel`) e
   *Inteligência Iônica* (tópico `ia`, que ainda espera o print da tela). Os
   demais tópicos ainda estão com `🎥 Vídeo curto + print — a produzir`. Para encaixar um vídeo
   novo, copie o bloco `<figure class="video-player">` de um dos dois, troque `data-src` e
   `data-titulo`, acrescente o chip `<span class="fmt vid">🎥 Vídeo</span>` nas `meta-tags` e
   apague o `.video-row` de pendência. O contador do topo se atualiza sozinho.
2. **Prints das demais telas** com hotspots: Biblioteca (5 abas), Relatórios, Perfil/Ajustes,
   Licenças e Dispositivos. Já existe o componente pronto — é só seguir o padrão do `CLAUDE.md`.
3. **Trazer artigos da Central de Ajuda oficial** para o formato rápido: criar e corrigir
   atividades, busca inteligente, criar curso, consultar notas e desempenho, adicionar/baixar livros.
4. **Auditar os módulos externos por dentro** (Estuda.com, Simulados, EAD Integra/Consultoria).
   A auditoria anterior parou na tela de login da Microsoft e não avançou — exige login humano.
5. Avaliar uma página separada (ou aba) para o **app mobile**, já que Ajustes é mais completo lá.

---

## 7. Como publicar (GitHub + Vercel)

Repositório de destino: **`luisfilipegdc/temaristasasul`**

O repositório local já vem com git inicializado e um commit inicial. Basta:

```bash
cd temaristasasul                     # a pasta descompactada
git remote add origin https://github.com/luisfilipegdc/temaristasasul.git
git branch -M main
git push -u origin main
```

Se o repositório remoto já tiver conteúdo e o push for recusado, resolva com merge —
**não use `--force` sem conferir o que existe lá**:

```bash
git pull origin main --allow-unrelated-histories
# resolva conflitos, se houver
git push -u origin main
```

Na Vercel: **Add New… → Project** → importe `temaristasasul` → Framework Preset **Other** →
Build Command **vazio** → Output Directory **vazio** (raiz) → **Deploy**.
A partir daí, todo `git push` na `main` republica sozinho.

---

## 8. QA antes de publicar

O ambiente Cowork já tem Chromium e Playwright configurados
(`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) — **não rode `playwright install`**.

```js
// qa.js — screenshot da página para conferência visual
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  await p.goto('file://' + process.cwd() + '/index.html');
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'qa-top.png' });
  await p.evaluate(() => document.getElementById('login').scrollIntoView());
  await p.waitForTimeout(400);
  await p.screenshot({ path: 'qa-login.png' });
  await b.close();
})();
```

Confira sempre: hotspots alinhados com o elemento certo do print (o par `--x/--y` e
`data-x/data-y` bate?), busca retornando resultado, tema claro legível, e a página impressa
(Ctrl+P) sem cortes.

---

## 9. Armadilhas conhecidas

- **Hotspot desalinhado:** quase sempre é `--x/--y` diferente de `data-x/data-y`.
- **Trocar "Marista Brasília" por "Marista Brasil":** errado. Mas o domínio de e-mail
  `@maristabrasil.org` está certo — não mexa.
- **Reintroduzir amarelo/dourado:** já foi removido de propósito. Só o laranja de `--warn` fica,
  e só dentro de print para marcar "não clique aqui".
- **Voltar com badge "Mapeado"** ou qualquer status interno nos tópicos: foi removido de propósito.
- **Subir print sem borrar dados:** conferir sempre antes do commit.
