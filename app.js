const DEFAULT_GRID_DIMENSION = 16;

const gridContainer = document.querySelector('.grid-container');
const gridSizeSlider = document.querySelector('#grid-size-slider');

window.addEventListener('load', () => {
    drawGrid(DEFAULT_GRID_DIMENSION);
});

let isMouseDown = false;
let lastPixel = null;

let hue = 0;
let hueIncr = 2;
const saturation = 100;
const lightness = 85;

gridSizeSlider.addEventListener('mousemove', e => {
    if (!isMouseDown) return;

    const gridDimension = parseInt(e.target.value);
    drawGrid(gridDimension);
});

window.addEventListener('mouseup', () => isMouseDown = false);
window.addEventListener('mousedown', () => isMouseDown = true);


function drawGrid(gridDimension) {
    // reset grid
    while (gridContainer.firstChild) { 
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i=0; i<gridDimension; i++) {

        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        gridRow.setAttribute('style', `grid-template-columns: repeat(${gridDimension}, 1fr)`);
        gridContainer.appendChild(gridRow);

        for (let j=0; j<gridDimension; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            gridItem.addEventListener('mousemove', fillPixelOnMove);
            gridItem.addEventListener('click', fillPixelOnClick);

            gridRow.appendChild(gridItem);
        }
    }
}

function fillPixelOnMove(e) {
    if (!isMouseDown) return;
    if (lastPixel === this) return;

    this.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
    lastPixel = this;
}

function fillPixelOnClick(e) {
    this.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
}



