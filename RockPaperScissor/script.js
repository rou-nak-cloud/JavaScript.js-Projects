let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice)
    })
})

const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3)
    return options[randIdx];
}
const playGame = (userChoice) => {
    const compChoice = getCompChoice();

    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            // scissors and paper for comp
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper"){
            // rock and scissors for comp
            userWin = compChoice === "scissors" ? false : true;
        } else if(userChoice === "scissors"){
            // rock and paper for comp
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice)
    }
}
const drawGame = () => {
    msg.textContent = "Game was Draw! Try again";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.textContent =userScore;
        msg.textContent = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else{
        compScore++;
        compScorePara.textContent = compScore;
        msg.textContent = `Computer Wins! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}