function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative');

    if (target.children.length) throw new Error('Aborted: target element should be empty');

    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount;
        row.style.transform = `translateY(${-rowsCount}px)`;

        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount;
            cell.style.transform = `translateX(${-cellsCount}px)`;
            row.append(cell);
        }

        target.append(row);
    }
}

const shapes = {
    I: { 
        shape: [[1],
                [1],
                [1],
                [1]], 
        color: 'cyan'
    },
    J: { 
        shape: [[0, 1],
                [0, 1],
                [1, 1]], 
        color: 'blue'
    },
    L: { 
        shape: [[1, 0],
                [1, 0],
                [1, 1]], 
        color: 'orange'
    },
    O: { 
        shape: [[1, 1],
                [1, 1]], 
        color: 'yellow'
    },
    S: { 
        shape: [[0, 1, 1],
                [1, 1, 0]], 
        color: 'yellowgreen'
    },
    T: { 
        shape: [[1, 1, 1],
                [0, 1, 0]], 
        color: 'purple'
    },
    Z: { 
        shape: [[1, 1, 0],
                [0, 1, 1]], 
        color: 'red'
    }
};

// Функция для отрисовки случайной фигуры
function drawRandomShapeOnPlayground(target) {
    const shapeKeys = Object.keys(shapes);
    const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
    const shapeKey = shapeKeys[shapeKeyIndex];
    const currentShape = shapes[shapeKey];

    // Очищаем цвет ячеек
    Array.from(target.children).forEach(row => {
        Array.from(row.children).forEach(cell => {
            cell.style.backgroundColor = '';
        });
    });

    const rowsToColor = currentShape.shape.length;
    const cellsToColor = currentShape.shape[0].length;

    // Применяем цвет выбранной фигуры
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const row = target.children[rowIndex];

        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const cell = row.children[cellIndex];
            if (currentShape.shape[rowIndex][cellIndex]) {
                cell.style.backgroundColor = currentShape.color;
            }
        }
    }
}

// Инициализация игрового поля и отрисовка случайной фигуры
const tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
drawRandomShapeOnPlayground(tetrisPlaygroundTarget);