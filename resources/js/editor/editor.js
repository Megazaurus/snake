// editor.js
document.addEventListener('DOMContentLoaded', () => {

const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");
const size = 16;
const tileSize = canvas.width / size;
const tileTypes = [" ", "#", "E", "S", "P1", "P2", "P3"];
const tiles = [];
let currentTile = " ";
const tileImages = {
    " ": new Image(),
    "#": new Image(),
    "E": new Image(),
    "S": new Image(),
    "P1": new Image(),
    "P2": new Image(),
    "P3": new Image(),
};

tileImages[" "].src = "/img/grass.png";
tileImages["#"].src = "/img/wall.png";
tileImages["E"].src = "/img/exit.png";
tileImages["S"].src = "/img/start.png";
tileImages["P1"].src = "/img/blue_portal.png";
tileImages["P2"].src = "/img/green_portal.png";
tileImages["P3"].src = "/img/portal.png";

let loadedCount = 0;
const totalImages = Object.keys(tileImages).length;

Object.values(tileImages).forEach(img => {
    img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
            drawGrid(); // Все картинки загружены
        }
    };
});

const toolSelector = document.getElementById("tool");
toolSelector.addEventListener("change", () => {
    currentTile = toolSelector.value;
});

// Инициализируем пустой уровень
for (let y = 0; y < size; y++) {
    tiles[y] = [];
    for (let x = 0; x < size; x++) {
        tiles[y][x] = " ";
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            drawTile(x, y, tiles[y][x]);
        }
    }
    drawLines();
}

function drawTile(x, y, type) {
    const img = tileImages[type];
    if (img && img.complete) {
        ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
    } else {
        // fallback на случай, если изображение не загрузилось
        ctx.fillStyle = "#444";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
}

function drawLines() {
    ctx.strokeStyle = "#333";
    for (let i = 0; i <= size; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tileSize, 0);
        ctx.lineTo(i * tileSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * tileSize);
        ctx.lineTo(canvas.width, i * tileSize);
        ctx.stroke();
    }
}

canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / tileSize);
    const y = Math.floor((e.clientY - rect.top) / tileSize);

    if (x >= 0 && x < size && y >= 0 && y < size) {
        tiles[y][x] = currentTile;  // 👈 используем выбранный инструмент
        drawGrid();
    }
});



document.getElementById("clear-btn").addEventListener("click", () => {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            tiles[y][x] = " ";
        }
    }
    drawGrid();
});

document.getElementById("download-btn").addEventListener("click", () => {
    const data = {
        level: tiles,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "level.json";
    a.click();
    URL.revokeObjectURL(url);
});


});
