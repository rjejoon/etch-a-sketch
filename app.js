const DEFAULT_GRID_DIMENSION = 16;
let bgColor = 'white';

const gridContainer = document.querySelector('.grid-container');
const gridSizeSlider = document.querySelector('#grid-size-slider');
const gridSizeInfo = document.querySelector('#grid-size-info');
const clearBtn = document.querySelector('#clear-grid-button');

let isMouseDown = false;
let lastPixel = null;

let hue = 0;
let hueIncr = 2;
const saturation = 100;
const lightness = 85;

window.addEventListener('resize', e => {
    // Keep the grid items square on smaller screens
    if (this.innerWidth <= 600) {
        gridContainer.style.height = window.getComputedStyle(gridContainer).width;
    }
});

window.addEventListener('load', () => {
    if (this.innerWidth <= 600) {
        gridContainer.style.height = window.getComputedStyle(gridContainer).width;
    }

    drawGrid(DEFAULT_GRID_DIMENSION);

    clearBtn.addEventListener('click', clearGrid);

    gridSizeSlider.addEventListener('mousemove', e => isMouseDown && drawGrid(parseInt(e.target.value)));
    gridSizeSlider.addEventListener('change', e => drawGrid(parseInt(e.target.value)));

    gridContainer.addEventListener('touchstart', fillPixelOnTouchStart);
    gridContainer.addEventListener('touchmove', fillPixelOnTouchMove);

    window.addEventListener('mouseup', () => isMouseDown = false);
    window.addEventListener('mousedown', () => isMouseDown = true);
});




function drawGrid(gridDimension) {
    removeGrid();

    gridSizeInfo.textContent = `${gridDimension} x ${gridDimension}`;    

    for (let i=0; i<gridDimension; i++) {
        const gridRow = document.createElement('div');
        gridRow.className = 'grid-row';
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

function fillPixelOnTouchStart(e) {
    const touches = e.touches;
    const target = touches[0].target;
    
    if (!target) return;
    if (!target.matches('.grid-item')) return;

    target.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
}

function fillPixelOnTouchMove(e) {
    e.preventDefault();
    const touches = e.touches;
    const target = document.elementFromPoint(touches[0].pageX, touches[0].pageY)

    if (!target) return;
    if (!target.matches('.grid-item')) return;

    target.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
}


function fillPixelOnMove(e) {
    if (!isMouseDown) return;
    if (lastPixel === this) return;

    this.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
    lastPixel = this;
}

function copyTouch ( { target, pageX, pageY }) {
    return { target, pageX, pageY };
}

function fillPixelOnClick(e) {
    this.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    hue = (hue + hueIncr) % 360;
}

function removeGrid() {
    while (gridContainer.firstChild) { 
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function clearGrid() {
    const gridRows = gridContainer.querySelectorAll('.grid-row');
    gridRows.forEach(row => {
        row.querySelectorAll('.grid-item').forEach(node => node.style.backgroundColor = bgColor);
    });
}


