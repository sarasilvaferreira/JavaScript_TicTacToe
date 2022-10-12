const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.querySelector("[data-winning-message]");
const restartButtom = document.querySelector("[data-restart-button");

let isCircleTurn;

const winningCominations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    }

    isCircleTurn = false;

    setBoardHoverClass();
    winningMessageElement.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? 'O venceu!' : "X Venceu!";
    }

    winningMessageElement.classList.add("show-winning-message");
};



const ckeckForWin = (currentPlayer) => {
    return winningCominations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [ ... cellElements].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => {
    // Colocar a marca (X ou circulo) 
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    
    // Verificar por vitória
    const isWin = ckeckForWin (classToAdd);

    const isDraw = checkForDraw();

    if (isWin) {
       endGame(false)
    } else if (isDraw) {
        // Verificar por empate
        endGame(true)
    } else {
        // Mudar símbolo na próxima jogada
        swapTurns();
    }
    
}

startGame();

restartButtom.addEventListener("click", startGame);