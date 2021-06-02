
const gridContainer = document.querySelector('.grid-container');

let gridDimension = 16;
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





