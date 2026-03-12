let boxes = document.querySelectorAll('.box');
let resetBtn = document.getElementById('reset-btn');
let newGameBtn = document.getElementById('new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.getElementById('msg');
let turn=true; // true for X and false for O
let moveCount=0;
let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box)=>{    
    box.addEventListener('click',()=>{
        if(turn){
            box.innerText = 'X';
            turn = false;
        }else{
            box.innerText = 'O';
            turn = true;
        }
        box.disabled = true;
        moveCount++;
        checkWin();
    });
});

const checkWin = () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
        );
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1==='' || pos2==='' || pos3===''){
            continue;
        }
        if(pos1===pos2 && pos2===pos3){
            boxes[pattern[0]].style.backgroundColor = "#B7CE63";
            boxes[pattern[1]].style.backgroundColor = "#B7CE63";
            boxes[pattern[2]].style.backgroundColor = "#B7CE63";
            showWinner(pos1);
            winnerFound = true;
            break
        }
    }
    if(!winnerFound && moveCount === 9){
        showDraw();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} wins!`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const resetGame = () => {
    turn = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
}

newGameBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);
