console.log("perfectly linked")
let animTime = 0.2;
let clickedElem;
let selection = document.querySelectorAll('.circle');
console.log(selection)
let random;
if (!localStorage.getItem("score")) {
    localStorage.setItem("score", "0");
}
document.querySelector('.score').innerText = localStorage.getItem("score");
//creating a map to store which choice can beat whom...
let mp = new Map();
mp.set('rock', 'scissor')
mp.set('scissor', 'paper')
mp.set('paper', 'rock')


//function to choose a random element from given choices for computer
let generateRandomElem = () => {
    random = selection[Math.floor(Math.random() * selection.length)]
    console.log(random)
}


//function to add animation to a element dynamically... the animation parameter it takes is defined inside css file
let addAnim = (element, animation, time) => {
    element.style.animation = `${animation}+${time}s ease forwards`
}


//function to remove animation from the given animation
let removeAnim = (element) => {
    element.style.animation = "none"
}


// THE MAIN FUNCTION WHICH TAKES US FROM START SCREEN TO THE MAIN SCREEN
let removeStarterScreen = (e) => {
    clickedElem = e.target;
    addAnim(e.target.parentElement.parentElement, "exit", animTime)
    setTimeout(() => {
        document.querySelector('.starterScreen').classList.add('none');
        document.querySelector('.mainScreen').classList.remove('none')
        renderMainScreen(e.target.cloneNode(true))
    }, animTime * 999)
}




//selection is actually a nodelist of all selectable choices i.e rock,paper and scissor and in this nodelist...... we are actually adding eventlistener for click event to call 'removeStarterScreen' function which we defined above.....
selection.forEach((item) => {
    item.addEventListener('click', removeStarterScreen)
})

// below are some of the helper functions....

//function to remove its display none property
let addElement = (element) => {
    console.log(element)
    element.classList.remove('none')
    removeAnim(element) //remove the animation if it contains any...
}


//function to calculate the score after each selection
let checkResult = (first, second) => {
    if (first === second) {
        return 0;
    }
    if (second === mp.get(first)) {
        return 1;
    } else {
        return -1;
    }
}
let updateScore = (num) => {
        localStorage.setItem("score", String(Number(localStorage.getItem("score")) + num))
        document.querySelector('.score').innerText = localStorage.getItem("score");
    }
    //function to create a result board and adding it in main screen
let resultBoard = (score) => {
    let outerDiv = document.createElement('div')
    outerDiv.setAttribute('class', 'resultBoard')
    let res = document.createElement('div')
    if (score === 1) {
        res.innerText = 'you win'
        document.querySelector('.computerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
        document.querySelector('.playerChoiceContainer').querySelector('.imgContainer').classList.add('winnerImgClass')
    } else if (score === -1) {
        res.innerText = 'you lose'
        document.querySelector('.computerChoiceContainer').querySelector('.imgContainer').classList.add('winnerImgClass')
        document.querySelector('.playerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
    } else {
        res.innerText = 'draw'
        document.querySelector('.computerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
        document.querySelector('.playerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
    }
    res.setAttribute('class', 'result')
    outerDiv.appendChild(res)
    let btn = document.createElement('button')
    btn.setAttribute('class', 'btn')
    btn.innerText = 'play Again'
    btn.addEventListener('click', hideMainScreenAndResetEveryThing)
    outerDiv.appendChild(btn)
    document.querySelector('.mainScreen').insertBefore(outerDiv, document.querySelector('.computerChoiceContainer'))
}

//function to render the main screen.... after removing the starter screen
let renderMainScreen = (element) => {
    generateRandomElem();
    document.querySelector('.playerChoiceContainer').querySelector('.imgContainer').appendChild(element)
    document.querySelector('.computerChoiceContainer').querySelector('.imgContainer').appendChild(random.cloneNode(true));

    setTimeout(() => {
        resultBoard(checkResult(element.classList[1], random.classList[1]))
        updateScore(checkResult(element.classList[1], random.classList[1]))
    }, 300)
}
let hideMainScreenAndResetEveryThing = () => {
    addAnim(document.querySelector('.mainScreen'), 'exit', animTime);
    document.querySelector('.computerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
    document.querySelector('.playerChoiceContainer').querySelector('.imgContainer').classList.remove('winnerImgClass')
    setTimeout(() => {
            document.querySelector('.mainScreen').classList.add('none');
            document.querySelector('.starterScreen').classList.remove('none');
            removeAnim(document.querySelector('.starterScreen'))
            document.querySelectorAll('.imgContainer').forEach((item) => {
                item.innerHTML = ''
            })
            document.querySelector('.mainScreen').removeChild(document.querySelector('.resultBoard'))
            removeAnim(document.querySelector('.mainScreen'))
        }, animTime * 999)
        // addEventListenerToAllSelectables()
}

let showRules = () => {
    document.querySelector('.overlay').classList.remove('none');
}
let hideRules = () => {
    document.querySelector('.overlay').classList.add('none')
}

document.querySelector('.rulesBtn').addEventListener('click', showRules)
document.querySelector('.close').addEventListener('click', hideRules)