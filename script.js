




const modal = document.querySelector("#modal")

const closeBtn = document.querySelector("#close")


const openModal = (evt) => {
    modal.style.display = "block";
} 

const closeModal = (evt) => {
    modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal)

openModal()


//make the grid that the snake and apples will traverse.

//make the snake and give it functionallity.

//make the apples and make them appear in random locations on the grid when an apple has beem devoured.

//make the snake grow everytime an apple has eaten.

let lastRenderTime = 0;
const snakeSpeed = 7;
let gameOver = false;
const field = document.querySelector('.field');

function main(currentTime) {
    

    if (gameOver) {
       if (confirm('Game Over! Press ok to restart!')) {
        window.location = './index.html'
       }
        return openModal()
    }

    window.requestAnimationFrame(main);
    const timeAfterLastRender = (currentTime - lastRenderTime) / 1000;
    if (timeAfterLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    
    update();
    draw();
    
}

window.requestAnimationFrame(main);


//render the snake and apple

const snakeSkin = [{ x: 9, y: 9}];
let apple = getRandomApplePosition();
const EXPANSION_RATE = 1;
let newSkins = 0;

function addSkins() {
    for(let i = 0; i < newSkins; i++) {
        snakeSkin.push({ ...snakeSkin[snakeSkin.length - 1] })
    }

    newSkins = 0;
}

function update(){
    const snakeControls = getSnakeControls();
    draw(field);
    
    

    for (let i = snakeSkin.length - 2; i >= 0; i--) {
        snakeSkin[i + 1] = { ...snakeSkin[i] };
    }
    
    
    snakeSkin[0].x += snakeControls.x;
    snakeSkin[0].y += snakeControls.y;

    
    checkDeath()

    if (onSnake(apple)) {
        expandSnake(EXPANSION_RATE);
        apple = getRandomApplePosition();
    }
    addSkins();

    

}

function draw(field){
    field.innerHTML = '';
    snakeSkin.forEach(skin => {
        const snakeEl = document.createElement('div');
        snakeEl.style.gridRowStart = skin.y;
        snakeEl.style.gridColumnStart = skin.x;
        snakeEl.classList.add('snake');
        field.appendChild(snakeEl);
    })

    const appleEl = document.createElement('div');
    appleEl.style.gridRowStart = apple.y;
    appleEl.style.gridColumnStart = apple.x;
    appleEl.classList.add('apple');
    field.appendChild(appleEl);
    
}

function expandSnake(amount) {
    newSkins += amount
}

function onSnake(position, { ignoreHead = false} = {}) {
    return snakeSkin.some((skin, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(skin, position)
    })
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > 17 || position.y < 1 || position.y > 17
    )
}

function snakeIntersection() {
    return onSnake(snakeSkin[0], { ignoreHead: true})
}

function getSnakeHead() {
    return snakeSkin[0]
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function randomGridPosition() {
    return {
        x: Math.ceil(Math.random() * 17),
        y: Math.ceil(Math.random() * 17)
    }
}

function getRandomApplePosition() {
    let newApplePosition
    while (newApplePosition == null || onSnake(newApplePosition)) {
        newApplePosition = randomGridPosition()
    }
    return newApplePosition
}

//give controls to the player

function getSnakeControls() {
    lastSnakeDirection = snakeControls;
    return snakeControls;
}

let snakeControls = { x: 0, y: 0 };
let lastSnakeDirection = { x: 0, y: 0 };

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


