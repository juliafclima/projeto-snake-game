# Snake Game - Página Inicial

Este é o código-fonte HTML para a página inicial do jogo da cobrinha. O jogo foi construído utilizando HTML, CSS e JavaScript para criar uma experiência interativa de jogabilidade. Abaixo estão detalhes sobre a estrutura do código e seu funcionamento.

## Estrutura do HTML

### Meta e Links
- `<!DOCTYPE html>`: Define a versão do HTML utilizada.
- `<html lang="pt-BR">`: Declara o idioma do documento como português do Brasil.
- `<head>`: Contém informações sobre o documento.
  - Meta tags para codificação e viewport.
  - Link para a fonte "Material Symbols Outlined".
  - Links para o ícone de favicon e o arquivo de estilo.
  - Título da página.

### Corpo da Página
- `<body>`: Contém todo o conteúdo visível da página.
  - `<h1>`: Título principal, indicando o nome do jogo.
  - `<div class="score">`: Exibição do score atual do jogador.
  - `<div class="menu-screen">`: Tela de menu exibida quando o jogo termina.
    - `<span class="game-over">`: Mensagem de "Game Over".
    - `<span class="final-score">`: Exibição do score final.
    - `<button class="btn-play">`: Botão para reiniciar o jogo.
  - `<h2>`: Elemento não identificado. Pode ser usado para exibir mensagens adicionais.
  - `<canvas>`: Elemento para renderização do jogo, com largura e altura definidas.

### Script JavaScript
- `<script src="../js/script.js"></script>`: Inclui o arquivo JavaScript responsável pela lógica do jogo.

## Estilos
- Os estilos estão definidos no arquivo `style.css`.

## Como Usar

1. Clone ou faça o download do repositório.
2. Abra o arquivo `index.html` em um navegador web.
3. Interaja com o jogo da cobrinha e aproveite!

Divirta-se jogando o Snake Game!
