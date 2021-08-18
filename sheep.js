const grid = document.getElementById('grid');

const CELL_SIZE = 56;
const NUM_COLS = 5;
const NUM_ROWS = 5;
const NUM_CELLS = NUM_ROWS * NUM_COLS;

function initGrid() {
    grid.innerHTML = '';
    grid.style.setProperty("grid-template-columns",
        "repeat(" + NUM_COLS + ", " + CELL_SIZE + "px)");
    for (var idx = 0; idx < NUM_CELLS; idx++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.draggable = false;
        grid.appendChild(cell);
    }
}

function createModel() {
    const model = [];
    for (var idx = 0; idx < NUM_CELLS; idx++) {
        model.push(false);
    }

    return model;
}

function renderModel(model) {
    const grid = document.getElementById('grid');
    for (var idx = 0; idx < NUM_CELLS; idx++) {
        if (model[idx]) {
            grid.children[idx].classList.add("alive");
        } else {
            grid.children[idx].classList.remove("alive");
        }
        if (seen(model, idx)) {
            grid.children[idx].classList.add("seen");
        } else {
            grid.children[idx].classList.remove("seen");
        }
    }
}

function seen(model, idx) {
    let colRoot = idx % NUM_COLS;
    for (var i = colRoot; i < NUM_CELLS; i += NUM_COLS) {
        if (model[i]) {
            return true;
        }
    }
    let rowIdx = Math.floor(idx / NUM_COLS);
    let rowRoot = rowIdx * NUM_COLS;
    for (i = rowRoot; i < rowRoot + NUM_COLS; i++) {
        if (model[i]) {
            return true;
        }
    }

    for (var rowNum = 0; rowNum < NUM_ROWS; rowNum++) {
        let rowStart = rowNum * NUM_COLS;

        let rowOffset = rowNum - rowIdx;
        let leftDiagColNum = colRoot + rowOffset;
        if (leftDiagColNum >= 0 && leftDiagColNum < NUM_COLS) {
            if (model[rowStart + leftDiagColNum]) {
                return true;
            }
        }
        let rightDiagColNum = colRoot - rowOffset;
        if (rightDiagColNum >= 0 && rightDiagColNum < NUM_COLS) {
            if (model[rowStart + rightDiagColNum]) {
                return true;
            }
        }
    }

    return false;
}

(function() {
    let grid = document.getElementById("grid");

    initGrid();
    var model = createModel();
    renderModel(model);

    let cells = document.getElementsByClassName("cell");
    for (let i=0, cell; (cell = cells[i]) !== undefined; i++) {
        cell.addEventListener('click', function(event) {
            model[i] = !model[i];
            renderModel(model);
        });
    }
})();