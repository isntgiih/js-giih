// Variáveis do jogo
let pontuacaoJogador1 = 0, // Pontuação do jogador 1
  pontuacaoJogador2 = 0, // Pontuação do jogador 2
  posicaoJogador1Y = 200, // Posição inicial vertical do jogador 1
  posicaoJogador2Y = 200, // Posição inicial vertical do jogador 2
  posicaoBolaX = 200, // Posição inicial horizontal da bola
  posicaoBolaY = 200, // Posição inicial vertical da bola
  velocidadeBolaX = 5, // Velocidade horizontal da bola
  velocidadeBolaY = 5, // Velocidade vertical da bola
  alturaJogador = 80, // Altura dos jogadores
  larguraJogador = 15, // Largura dos jogadores
  tamanhoBola = 20, // Tamanho da bola
  dificuldade = 1 // Dificuldade do jogo (quão rápido o jogador 2 reage)

function setup() {
  createCanvas(600, 400); // Cria um canvas de 600x400 pixels
}

function draw() {
  background("pink"); // Define o fundo como preto

  // Desenhar os jogadores
  fill(255); // Define a cor como branca
  rect(0, posicaoJogador1Y, larguraJogador, alturaJogador); // Desenha o jogador 1
  rect(width - larguraJogador, posicaoJogador2Y, larguraJogador, alturaJogador); // Desenha o jogador 2

  // Desenhar a bola
  ellipse(posicaoBolaX, posicaoBolaY, tamanhoBola); // Desenha a bola como uma elipse

  // Movimentação do jogador 1
  if (keyIsDown(UP_ARROW)) posicaoJogador1Y -= 5; // Move para cima se a tecla de seta para cima for pressionada
  if (keyIsDown(DOWN_ARROW)) posicaoJogador1Y += 5; // Move para baixo se a tecla de seta para baixo for pressionada

  // Movimentação do jogador 2 (computador)
  if (random(1) < dificuldade) { // Determina aleatoriamente se o jogador 2 deve se mover
    if (posicaoBolaY > posicaoJogador2Y + alturaJogador / 2) posicaoJogador2Y += 5; // Se a bola estiver abaixo do jogador 2, move para baixo
    else posicaoJogador2Y -= 5; // Caso contrário, move para cima
  }

  // Manter os jogadores dentro dos limites da tela
  posicaoJogador1Y = constrain(posicaoJogador1Y, 0, height - alturaJogador); // Limita a posição do jogador 1 na tela
  posicaoJogador2Y = constrain(posicaoJogador2Y, 0, height - alturaJogador); // Limita a posição do jogador 2 na tela

  // Movimentação da bola
  posicaoBolaX += velocidadeBolaX; // Move a bola horizontalmente
  posicaoBolaY += velocidadeBolaY; // Move a bola verticalmente

  // Colisão com as paredes superior e inferior
  if (posicaoBolaY < 0 || posicaoBolaY > height) velocidadeBolaY *= -1; // Inverte a direção da bola se ela atingir o topo ou a base da tela

  // Colisão com os jogadores
  if (posicaoBolaX < larguraJogador && posicaoBolaY > posicaoJogador1Y && posicaoBolaY < posicaoJogador1Y + alturaJogador) velocidadeBolaX *= -1; // Inverte a direção da bola se colidir com o jogador 1
  else if (posicaoBolaX > width - larguraJogador && posicaoBolaY > posicaoJogador2Y && posicaoBolaY < posicaoJogador2Y + alturaJogador) velocidadeBolaX *= -1; // Inverte a direção da bola se colidir com o jogador 2

  // Pontuação
  if (posicaoBolaX < 0) { // Se a bola ultrapassar o jogador 1
    pontuacaoJogador2++; // Incrementa a pontuação do jogador 2
    reset(); // Reinicia a posição da bola
  }
  if (posicaoBolaX > width) { // Se a bola ultrapassar o jogador 2
    pontuacaoJogador1++; // Incrementa a pontuação do jogador 1
    reset(); // Reinicia a posição da bola
  }

  // Mostrar pontuação
  fill(0, 0, 255); // Define a cor do texto como azul
  textSize(32); // Define o tamanho do texto
  text(pontuacaoJogador1, 200, 50); // Mostra a pontuação do jogador 1
  fill(255, 165, 0); // Define a cor do texto como laranja
  text(pontuacaoJogador2, 400, 50); // Mostra a pontuação do jogador 2

  // Verificar se um jogador alcançou 5 pontos (condição de vitória)
  if (pontuacaoJogador1 >= 5 || pontuacaoJogador2 >= 5) {
    // Exibir mensagem de vitória
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    if (pontuacaoJogador1 > pontuacaoJogador2) {
      text("Jogador 1 Venceu!", width / 2, height / 2);
    } else {
      text("Jogador 2 Venceu!", width / 2, height / 2);
    }
    noLoop(); // Parar o loop do jogo
  }
}

// Reiniciar a posição da bola
function reset() {
  posicaoBolaX = width / 2; // Reposiciona a bola horizontalmente ao centro
  posicaoBolaY = height / 2; // Reposiciona a bola verticalmente ao centro
}