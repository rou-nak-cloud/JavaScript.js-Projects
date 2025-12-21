
const board = document.querySelector(".board");

const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const menuButton = document.querySelector('.btn-menu');

// infos
const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")

let highScore = localStorage.getItem("highScore") || 0;
let score = 0
let time = `00:00`

highScoreElement.innerText = highScore;

const blockWidth = 40;
const blockHeight = 40;
const rows = Math.floor(board.clientHeight / blockHeight); // vertical
const cols = Math.floor(board.clientWidth / blockWidth);  // horizontal


const blocks = [];
let snake, direction; // dynamic value will be taking from the randomSnake func
// hard coded value
// let snake = [ 
//     {x: 1, y: 3}, // single block or segment from blocks 2d array
//     {x: 1, y: 4},
//     {x: 1, y: 5},
// ]; // row->1, col->3,4,5
// let direction = 'right';

// prevent from 180 deg turn with opposite
const opposite = {
    'left': 'right',
    'right': 'left',
    'up': 'down',
    'down': 'up'
};


// Food placement randomly
let food = { x: Math.floor(Math.random()  * rows), y:Math.floor(Math.random() * cols)}
// to clear the interval when game over
let intervalId = null;
let timerIntervalId = null;

// BASIC GRID STRUCTURE ->
// for (let index = 0; index < cols * rows; index++) {
//     const blockChecks = document.createElement("div");
//     blockChecks.classList.add("block");
//     board.appendChild(blockChecks);
// }

for (let row = 0; row< rows; row++){
    for (let col = 0; col<cols; col++){
        const blockCheck = document.createElement("div");
        blockCheck.classList.add("block");
        board.appendChild(blockCheck);
        blocks[`${row}-${col}`] = blockCheck; // 2D array write in reversed way 
    }   
}

function renderSnakeAndFood() {    
    // Render snake
    snake.forEach((block)=>{
    blocks[ `${block.x}-${block.y}` ].classList.add("fill");
    })
    // Render food
    blocks[ `${food.x}-${food.y}` ].classList.add("food")
}


function render(){
    let head = null;
    // All directions
    if(direction === 'left'){
        head = { x: snake[0].x, y: snake[0].y-1 };
    }else if(direction === 'right'){
        head = { x: snake[0].x, y: snake[0].y+1 };
    }else if(direction === 'down'){
        head = { x: snake[0].x+1, y: snake[0].y };
    }else if(direction === 'up'){
        head = { x: snake[0].x-1, y: snake[0].y };
    }else{
        alert("Invalid direction")
    }

    // Game over logic
    // 1. wall collisions
    //  | row = -1 |  <-- invalid && head.x = rows (OUTSIDE) means below the last row 
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        // alert("Game Over");
        gameOver();
        return;
    }
    // 2. self collisions
    for (let i = 1; i < snake.length; i++) { // i = 0 snake[0] IS the head. it will collide instantly we need to check with body..thats why i = 1.
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Food logic
    if(head.x === food.x && head.y === food.y){
        blocks[ `${food.x}-${food.y}` ].classList.remove("food")
        food = { x: Math.floor(Math.random()  * rows), y:Math.floor(Math.random() * cols)}
        blocks[ `${food.x}-${food.y}` ].classList.add("food")

        // Add tail means consuming the food with the help of unshift()
        // snake.unshift(head); // add a element at the start
        snake.push(head); // add faster
        // score multiply
        score += 10;
        scoreElement.innerText = score

        // highScore
        if(score > highScore){
            highScore = score
            localStorage.setItem("highScore", highScore.toString())
        }
    }

    // remove the fill color
    snake.forEach((block)=>{
        blocks[ `${block.x}-${block.y}` ].classList.remove("fill");
    })
    snake.unshift(head); // add a new element at the start
    snake.pop(); // remove the last element not the fill color

    // call the snake and food function and call at the last
    renderSnakeAndFood();
}


// AddEventListener of keyboard keys to assign with the directions
window.addEventListener("keydown", (e) => {
    let newDir = null;
    if(e.key === "ArrowUp") newDir = "up"; 
    if(e.key === "ArrowDown") newDir = "down";
    if(e.key === "ArrowLeft") newDir = "left";
    if(e.key === "ArrowRight") newDir = "right";
    // return stops everything, func ends and 180 deg logic never happens as well as direction never updates

    // prevent 180 deg turn and it will not collide with self lead to game over
    if(newDir && newDir !== opposite[direction]){
        direction = newDir;
        // opposite[direction] = opposite["right"] = "left"
        // newDir === opposite[direction] → true/ where direction comes form random func
        // So ignore the input
    }
}) 

function gameOver(){
    clearInterval(intervalId);

    // restarting modal to show
    modal.style.display = 'flex';
    startGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';
}
// function for restarting the game
function restartGame(){
    blocks[ `${food.x}-${food.y}` ].classList.remove("food")
    snake.forEach((block)=>{
    blocks[ `${block.x}-${block.y}` ].classList.remove("fill");
    })

    // window.location.reload();
    score = 0
    time = `00:00`

    scoreElement.innerText = score
    timeElement.innerText = time
    highScoreElement.innerText = highScore
   
    // call that function and get the random snake with direction from that function
    const data = getRandomSnake();
    snake = data.newSnake;
    direction = data.direction;

    food = { x: Math.floor(Math.random()  * rows), y:Math.floor(Math.random() * cols)}

    modal.style.display = 'none';
    intervalId = setInterval(()=>{
    render();
    },200)
}

// EventListener for start button for starting the game
function startGame(){
    modal.style.display = 'none';
    gameOverModal.style.display = 'none';
        
    //  stop old intervals
    clearInterval(intervalId);

    // get random snake and direction from the random snake function, for using it dynamically..
    const data = getRandomSnake();
    snake = data.newSnake;
    direction = data.direction;

    // reset food
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

    // Interval for render function
    intervalId = setInterval(()=>{
    render();
    },200)

    // Interval for timer
    timerIntervalId = setInterval(()=>{
        let [ min,sec ] = time.split(":").map(Number)
        if(sec == 59){
            min +=1
            sec = 0
        }else{
            sec +=1
        }
        // format to 2 digits (01, 09, 12)
        const mm = String(min).padStart(2, "0");
        const ss = String(sec).padStart(2, "0");
        time = `${mm}:${ss}`
        timeElement.innerText = time
    }, 1000)
}
startButton.addEventListener("click",()=>{
    startGame();
})
menuButton.addEventListener("click",()=>{
    clearInterval(intervalId);
    window.location.reload();

    modal.style.display = 'flex';
    startGameModal.style.display = 'flex';
    gameOverModal.style.display = 'none';

})
// EventListener fo restart the game
restartButton.addEventListener("click", restartGame)


// Different logic for snake while restarting the game
// 1. random direction
function getRandomDirection() {
    const dirs = ["left", "right", "up", "down"];
    const dir = dirs[Math.floor(Math.random() * dirs.length)];
    // console.log(dir) // 0,1,2,3 gives one of these values
    return dir
}
// 2. snake random position
function getRandomSnake (){
    const dir = getRandomDirection(); // every time one value from the function

    // random head position
    let head = {
        // random position in the grid but not linked together
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    }
    let body = [head]; // as more objects will create

    // build 2 more blocks means body  based on the direction
    for(let i = 1; i < 3; i++){
        let newBlock = { x: head.x, y: head.y}; 
        // store the position like {5,5} in the same position like stacked over each other and then based on the direction move it  with +1 and +2 or -1 -2 to form a body with the default head

        if (dir === "left")  newBlock.y += i;
        if (dir === "right") newBlock.y -= i;
        if (dir === "up")    newBlock.x += i;
        if (dir === "down")  newBlock.x -= i;

        // keep in bounds so that it never goes outside of the grid
        newBlock.x = Math.min(Math.max(newBlock.x, 0), rows - 1);
        newBlock.y = Math.min(Math.max(newBlock.y, 0), cols - 1);

        // Math.max(newBlock.x, 0)
        // → If x is below 0, force it to 0.
        // Math.min(…, rows - 1)
        // → If x is beyond the last row, force it to rows - 1.

        // now push it to make a body
        body.push(newBlock)
    }
    return { newSnake: body, direction: dir };
}

