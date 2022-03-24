'use strict'
const EMPTY = '⬛'
const MINE = '💣'
const FLAG = '🚩'
const SMILEY = '😀'
const WINNER = '😎'
const DEAD = '💀'
const NUM_ONE = '1️⃣'
const NUM_TWO = '2️⃣'
const NUM_THREE = '3️⃣'
const NUM_FOUR = '4️⃣'
const NUM_FIVE = '5️⃣'

// const NUM_ONE = '<img src="assests/num1.png" alt="1">'
// const NUM_TWO = '<img src="assests/num2.png" alt="2">'
// const NUM_THREE = '<img src="assests/num3.png" alt="3">'
// const NUM_FOUR = '<img src="assests/num4.png" alt="4">'
// const NUM_FIVE = '<img src="assests/num5.png" alt="5">'


var gBoard
var gNextId = 101



var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}




function initGame() {
    gBoard = buildBoard()

    renderBoard(gBoard)
    setBoard(gBoard)

    console.log(gBoard)




}
// function levelSet(elBtn , row , col) {
//     // var levelOne = document.querySelector('.difficulty-lvl1')
//     // var levelTwo = document.querySelector('.difficulty-lvl2')
//     // var levelThree = document.querySelector('.difficulty-lvl3')


//     console.log(elBtn)

// }


function buildBoard(ROWS = 4, COLS = 4) {
    var board = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            var cell = createCell()
            row.push(cell)
        }
        board.push(row)
    }
    return board
}
function createCell() {

    return {
        id: gNextId++,
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
    }
}
function setBoard(board, numOfMines = 2) {
    var mineCount = 0


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            while (mineCount < numOfMines) {
                var randomI = getRandomIntInclusive(0, 3)
                var randomJ = getRandomIntInclusive(0, 3)
                var elCellSetToMine = document.querySelector(`.cell-${randomI}-${randomJ}`)
                if (elCellSetToMine.innerText === MINE) {
                    continue
                } else {
                    elCellSetToMine.innerText = MINE

                    gBoard[randomI][randomJ].isMine = true

                    mineCount++

                }

            }
            var elCellSetToEmpty = document.querySelector(`.cell-${i}-${j}`)
            if (elCellSetToEmpty.innerText === MINE) {
                continue
            } else {
                elCellSetToEmpty.innerText = ''
            }



        }


    }



}


// function copyMat(board) {
//     var newBoard = [];
//     for (var i = 0; i < gBoard.length; i++) {
//         newBoard[i] = [];
//         for (var j = 0; j < gBoard[0].length; j++) {
//             newBoard[i][j] = gBoard[i][j];
//         }
//     }
//     console.log(newBoard)
//     return newBoard;
// }





function setMinesNegCount(board, rowIdx, colIdx) {
    var negCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            // console.log('j:', j)
            var cell = board[i][j]
            if (cell.isMine) {
                negCount++
                gBoard[i][j].minesAroundCount = negCount
            }
        }
    }

    return negCount
}




function renderBoard(board) {



    var strHTML = '<table border="1px" ><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = 'cell cell-' + i + '-' + j
            strHTML += '<td onclick="cellClicked(this,' + i + ',' + j + ', event)" class="' + className + ' hidden"> ' + cell + '</td>'
            // `<td onclick="cellClicked(this,${i},${j}) class="${className} hidden">${cell} </td>`


        }
        strHTML += '</tr>'

    }
    strHTML += '</tbody></table>'


    var elContainer = document.querySelector('div.body')

    elContainer.innerHTML = strHTML;
    // var elCell = document.querySelector('.cell')


    // elCell.style.visibility = 'hidden'
    // console.log(elCell)

    // if(!elCell.isShown){
    //     cell.innerText = ''
    //     console.log(cell)
    // }



    // var allCells = document.querySelector('')
    // allCells.style.display = 'none'


    // currCell.style.display = 'none'





}




function cellClicked(elCell, i, j , ev) {
    ev.preventDefault()
    elCell.classList.remove('hidden')
    console.log(ev)

    gBoard[i][j].isShown = true
    var res = setMinesNegCount(gBoard, i, j)
    gBoard[i][j].minesAroundCount = res
    if(ev ===' ')

    console.log(gBoard[i][j])
    if (elCell.innerText === MINE) {
        elCell.innerText = MINE
    } else if (gBoard[i][j].minesAroundCount === 0) {
        elCell.innerText = EMPTY
    } else if (gBoard[i][j].minesAroundCount === 1) {
        elCell.innerText = NUM_ONE
    } else if (gBoard[i][j].minesAroundCount === 2) {
        elCell.innerText = NUM_TWO
    } else if (gBoard[i][j].minesAroundCount === 3) {
        elCell.innerText = NUM_THREE
    } else if (gBoard[i][j].minesAroundCount === 4) {
        elCell.innerText = NUM_FOUR
    } else if (gBoard[i][j].minesAroundCount === 5) {
        elCell.innerText = NUM_FIVE
    }


    console.log(elCell)
    // elCell.style.display = 'initial'




}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



