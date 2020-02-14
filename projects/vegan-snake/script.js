//Переменные
//позиция еды

let box = 32,
  score = 0;

const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 17 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

window.onload = function() {
  document.addEventListener('keydown', direction);

  let dir;

  function direction(event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && dir != 'right') dir = 'left';
    else if ((event.keyCode == 38 || event.keyCode == 87) && dir != 'down') dir = 'up';
    else if ((event.keyCode == 39 || event.keyCode == 68) && dir != 'left') dir = 'right';
    else if ((event.keyCode == 40 || event.keyCode == 83) && dir != 'up') dir = 'down';

    console.log('dir is', dir);
  }

  function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (head.x == arr[i].x && head.y == arr[i].y) {
        clearInterval(gameTimer);
        alert('Вы проиграли :( Постарайтесь не есть свой хвост');
        location.reload();
      }
    }
  }
  function drawGame() {
    ctx.drawImage(ground, 0, 0);
    if (food.y > 16 * box) food.y = 16 * box;
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i == 0 ? '#FF191F' : '#AB25FA	';
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px ARIAL';
    ctx.fillText(score + '   VEGAN snake :)', box * 2.5, box * 1.6);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 17 + 3) * box,
      };
    } else {
      snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
      clearInterval(gameTimer);
      alert('Вы проиграли :( Постарайтесь не врезаться в стены');
      location.reload();
    }

    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);
    //  console.log('snakeX ' + snake[0].x + ' snakeY ' + snake[0].y);
  }

  let gameTimer = setInterval(drawGame, 100);
};
