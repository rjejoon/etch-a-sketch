const DEFAULT_GRID_DIMENSION = 16;

const gridContainer = document.querySelector('.grid-container');
const gridSizeSlider = document.querySelector('#grid-size-slider');

let isMouseDown = false;

gridSizeSlider.addEventListener('mousemove', e => {
    if (!isMouseDown) return;

    const gridDimension = parseInt(e.target.value);
    drawGrid(gridDimension);
});
gridSizeSlider.addEventListener('mouseup', () => isMouseDown = false);
gridSizeSlider.addEventListener('mousedown', () => isMouseDown = true);

window.addEventListener('mouseup', () => isMouseDown = false);




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
            gridRow.appendChild(gridItem);
        }
    }
}


drawGrid(DEFAULT_GRID_DIMENSION);


