const myNumbs = [[], [], [], []];
for (let i = 0; i < 4; i++) {
    myNumbs[i] = [0, 0, 0, 0];
}

function generateTwoInitialNumbers() {
    let randomRow1 = Math.floor(Math.random() * 4);
    let randomColumn1 = Math.floor(Math.random() * 4);
    let randomRow2, randomColumn2;

    do {
        randomRow2 = Math.floor(Math.random() * 4);
        randomColumn2 = Math.floor(Math.random() * 4);
    } while (randomRow1 === randomRow2 && randomColumn1 === randomColumn2);

    myNumbs[randomRow1][randomColumn1] = 2;
    myNumbs[randomRow2][randomColumn2] = 2;
}

generateTwoInitialNumbers();

function updateDOM() {
    const numberBoxElement = document.querySelectorAll('.box');
    numberBoxElement.forEach((box, index) => {
        let row = Math.floor(index / 4);
        let column = index % 4;
        box.innerHTML = '';
        box.classList.remove('active-cell');
        if (myNumbs[row][column] !== 0) {
            num = myNumbs[row][column]
            box.innerHTML = `<p>${num}</p>`;
        }
    });
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newColumn = [];
        for (let row = 0; row < 4; row++) {
            if (myNumbs[row][col] !== 0) {
                newColumn.push(myNumbs[row][col]);
            }
        }
        for (let i = 0; i < newColumn.length - 1; i++) {
            if (newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                newColumn.splice(i + 1, 1);
            }
        }
        while (newColumn.length < 4) {
            newColumn.push(0);
        }
        for (let row = 0; row < 4; row++) {
            myNumbs[row][col] = newColumn[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newColumn = [];
        for (let row = 3; row >= 0; row--) {
            if (myNumbs[row][col] !== 0) {
                newColumn.push(myNumbs[row][col]);
            }
        }
        for (let i = 0; i < newColumn.length - 1; i++) {
            if (newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                newColumn.splice(i + 1, 1);
            }
        }
        while (newColumn.length < 4) {
            newColumn.push(0);
        }
        for (let row = 3; row >= 0; row--) {
            myNumbs[row][col] = newColumn[3 - row];
        }
    }
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 0; col < 4; col++) {
            if (myNumbs[row][col] !== 0) {
                newRow.push(myNumbs[row][col]);
            }
        }
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow.splice(i + 1, 1);
            }
        }
        while (newRow.length < 4) {
            newRow.push(0);
        }
        for (let col = 0; col < 4; col++) {
            myNumbs[row][col] = newRow[col];
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 3; col >= 0; col--) {
            if (myNumbs[row][col] !== 0) {
                newRow.push(myNumbs[row][col]);
            }
        }
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow.splice(i + 1, 1);
            }
        }
        while (newRow.length < 4) {
            newRow.push(0);
        }
        for (let col = 3; col >= 0; col--) {
            myNumbs[row][col] = newRow[3 - col];
        }
    }
}

function generateNewNumber() {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (myNumbs[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        myNumbs[row][col] = 2;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        moveUp();
    } else if (event.key === 'ArrowDown') {
        moveDown();
    } else if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
    generateNewNumber();
    updateDOM();
});

let touchStartX = null;
let touchStartY = null;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}, false);

document.addEventListener('touchmove', (event) => {
    if (!touchStartX || !touchStartY) {
        return;
    }
    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            moveLeft();
        } else {
            moveRight();
        }
    } else {
        if (diffY > 0) {
            moveUp();
        } else {
            moveDown();
        }
    }

    generateNewNumber();
    updateDOM();

    touchStartX = null;
    touchStartY = null;
}, false);

updateDOM();
console.log(myNumbs);
