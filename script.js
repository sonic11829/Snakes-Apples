

console.log('snaAake');
console.log('slippery snaaake');
//make the grid that the snake and apples will traverse.

//make the snake and give it functionallity.

//make the apples and make them appear in random locations on the grid when an apple has beem devoured.

//make the snake grow everytime an apple has eaten.

//display a score for every apple that gets eaten & or display max length achieved.

//make it so you can change the color of your slippery snaaake.

let lastRenderTime = 0;
const snakeSpeed = 3;
const field = document.querySelector('.field');

function main(currentTime) {
    window.requestAnimationFrame(main);
    const timeAfterLastRender = (currentTime - lastRenderTime) / 1000;
    if (timeAfterLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateApple();
}

function draw(){
    drawSnake(field);
    drawApple(field);
}

//render the snake

const snakeSkin = [{ x: 9, y: 9}];

function updateSnake(){
    const snakeControls = getSnakeControls();
    drawSnake(field);
    for (let i = snakeSkin.length - 2; i >= 0; i--) {
        snakeSkin[i + 1] = { ...snakeSkin[i] };
    }

    snakeSkin[0].x += snakeControls.x;
    snakeSkin[0].y += snakeControls.y;
}

function drawSnake(field){
    field.innerHTML = "";
    snakeSkin.forEach(skin => {
        const snakeEl = document.createElement('div');
        snakeEl.style.gridRowStart = skin.y;
        snakeEl.style.gridColumnStart = skin.x;
        snakeEl.classList.add('snake');
        field.appendChild(snakeEl);
    })
    
}

//render apple

let apple = { x: 1, y: -1};

function updateApple() {
    drawApple(field);
}

function drawApple(field) {
    field.innerHTML = "";
    const appleEl = document.createElement('div');
    appleEl.style.gridRowStart = apple.y;
    appleEl.style.gridColumnStart = apple.x;
    appleEl.classList.add('apple');
    field.appendChild(appleEl);
}

//give controls to the player

let snakeControls = { x: 0, y: 0 };
let lastSnakeDirection = { x: 0, y: 0 };

function getSnakeControls() {
    lastSnakeDirection = snakeControls;
    return snakeControls;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastSnakeDirection.y !== 0) break;
            snakeControls = { x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (lastSnakeDirection.y !== 0) break;
            snakeControls = { x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (lastSnakeDirection.x !== 0) break;
            snakeControls = { x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (lastSnakeDirection.x !== 0) break;
            snakeControls = { x: 1, y: 0};
            break;
    }
})


