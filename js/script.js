const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
/* contexto 2d */
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const scoreNone = document.querySelector(".score");

const audio = new Audio("../assets/audio.mp3");
const size = 30;
/* tamanho dos elementos */

const initialPosition = [
   { x: 270, y: 240 },
   { x: 300, y: 240 },
];

const incrementScore = () => {
   score.innerText = +score.innerText + 10;
};

randomNumber = (max, min) => {
   return Math.round(
      Math.random() * (max - min) + min
   ); /* min = 5 ; max = 10 */
};

randomPosition = () => {
   const number = randomNumber(0, canvas.width - size);
   return (
      Math.round(number / 30) * 30
   ); /* divide, arredonda e multiplica por 30 */
};

const randomColor = () => {
   const red = randomNumber(0, 255);
   const green = randomNumber(0, 255);
   const blue = randomNumber(0, 255);

   return `rgb(${red},${green},${blue})`;
};

const food = {
   x: randomPosition(),
   y: randomPosition(),
   color: randomColor(),
};

let snake = [
   /* cobra array */
   { x: 270, y: 240 },
   { x: 300, y: 240 },
];

let direction, loopId;

const drawFood = () => {
   const { x, y, color } = food;

   ctx.shadowColor = color;
   ctx.shadowBlur = 6;
   ctx.fillStyle = food.color;
   ctx.fillRect(food.x, food.y, size, size);
   ctx.shadowBlur = 0;
};

const drawSnake = () => {
   /* funcao que vai desenhar a cobra */

   ctx.fillStyle = "#F6AE2D"; /* cor do preenchimento */

   ctx.fillRect(snake[0].x, snake[0].y, size, size); /* coordenadas */

   snake.forEach((position, index) => {
      /* função que percorre o array */

      if (index == snake.length - 1) {
         ctx.fillStyle = "#ffa600";
      }

      ctx.fillRect(position.x, position.y, size, size);
   });
};

const moveSnake = () => {
   if (!direction) return;
   /* se não houver direção */

   const head = snake.at(-1);
   /* ultima posição do array */

   if (direction == "right") {
      /* pra direita */
      snake.push({ x: head.x + size, y: head.y });
   }

   if (direction == "left") {
      /* pra esquerda */
      snake.push({ x: head.x - size, y: head.y });
   }

   if (direction == "up") {
      /* pra cima */
      snake.push({ x: head.x, y: head.y - size });
   }

   if (direction == "down") {
      /* pra baixo */
      snake.push({ x: head.x, y: head.y + size });
   }

   snake.shift();
   /* remove o primeiro elemento */
};

const drawGrid = () => {
   ctx.lineWidth = 1;
   ctx.strokeStyle = "#4c708dce";

   for (let i = size; i < canvas.width; i += size) {
      ctx.beginPath();
      /* reinicia o desenho do zero */
      ctx.lineTo(i, 0);
      ctx.lineTo(i, 600);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineTo(0, i);
      ctx.lineTo(600, i);
      ctx.stroke();
   }
};

const checkEat = () => {
   const head = snake.at(-1);

   if (head.x == food.x && head.y == food.y) {
      incrementScore();

      snake.push(head);

      audio.play();

      let x = randomPosition();
      let y = randomPosition();

      while (snake.find((position) => position.x == x && position.y == y)) {
         x = randomPosition();
         y = randomPosition();
      }

      food.x = x;
      food.y = x;
      food.color = randomColor();
   }
};

const checkCollision = () => {
   const head = snake.at(-1);
   const canvasLimit = canvas.width - size;
   const neckIndex = snake.length - 2;

   const wallCollision =
      head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

   const selfCollision = snake.find((position, index) => {
      return index < neckIndex && position.x == head.x && position.y == head.y;
   });

   if (wallCollision || selfCollision) {
      gameOver();
   }
};

const gameOver = () => {
   direction = undefined;

   menu.style.display = "flex";
   finalScore.innerText = score.innerText;
   canvas.style.filter = "blur(5px)";
   scoreNone.style.display = "none";
};

const gameLoop = () => {
   clearInterval(loopId);

   ctx.clearRect(0, 0, 600, 600);

   drawGrid();
   drawFood();

   moveSnake();
   drawSnake();

   checkEat();
   checkCollision();

   loopId = setTimeout(() => {
      /* função recursiva */
      gameLoop();
   }, 150);
};

gameLoop();

/* eventos do teclado */
document.addEventListener("keydown", ({ key }) => {
   /* recupera a tecla pressionada */

   if (
      (key == "ArrowRight" || key == "d" || key == "D") &&
      direction != "left"
   ) {
      direction = "right";
   }

   if (
      (key == "ArrowLeft" || key == "a" || key == "A") &&
      direction != "right"
   ) {
      direction = "left";
   }

   if ((key == "ArrowUp" || key == "w" || key == "W") && direction != "down") {
      direction = "up";
   }

   if ((key == "ArrowDown" || key == "s" || key == "S") && direction != "up") {
      direction = "down";
   }
});

buttonPlay.addEventListener("click", () => {
   score.innerText = "00";
   menu.style.display = "none";
   canvas.style.filter = "none";
   snake = [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
   ];
   scoreNone.style.display = "block";
});
