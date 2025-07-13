document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("editor-canvas");
    const ctx = canvas.getContext("2d");

    let width = 16;
    let height = 16;
    let tileSize = 32; // будем пересчитывать динамически
    let tiles = [];

    const tileTypes = ["@", "#", "E", "S", "P1", "P2", "P3"];
    let currentTile = "@";

    const tileImages = {
        "@": new Image(),
        "#": new Image(),
        "E": new Image(),
        "S": new Image(),
        "P1": new Image(),
        "P2": new Image(),
        "P3": new Image(),
    };

    tileImages["@"].src = "/img/grass.png";
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
                generateMap(); // Все изображения загружены — генерируем карту
            }
        };
    });

    // Смена выбранного тайла
    document.getElementById("tool").addEventListener("change", e => {
        currentTile = e.target.value;
    });

    // Генерация карты по кнопке
    document.getElementById("generate-map").addEventListener("click", () => {
        width = parseInt(document.getElementById("map-width").value);
        height = parseInt(document.getElementById("map-height").value);
        generateMap();
    });

    function generateMap() {
        // Вычисляем тайл-сайз чтобы вся карта помещалась на канвас
        tileSize = 32;

        canvas.width = width * tileSize;
        canvas.height = height * tileSize;

        tiles = [];
        for (let y = 0; y < height; y++) {
            tiles[y] = [];
            for (let x = 0; x < width; x++) {
                tiles[y][x] = "@";
            }
        }

        drawGrid();
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
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
            ctx.fillStyle = "#444";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    function drawLines() {
        ctx.strokeStyle = "#333";
        for (let i = 0; i <= width; i++) {
            ctx.beginPath();
            ctx.moveTo(i * tileSize, 0);
            ctx.lineTo(i * tileSize, canvas.height);
            ctx.stroke();
        }

        for (let i = 0; i <= height; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * tileSize);
            ctx.lineTo(canvas.width, i * tileSize);
            ctx.stroke();
        }
    }

    // Рисование по клику
    canvas.addEventListener("click", e => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / tileSize);
        const y = Math.floor((e.clientY - rect.top) / tileSize);

        if (x >= 0 && x < width && y >= 0 && y < height) {
            tiles[y][x] = currentTile;
            drawGrid();
        }
    });

    // Очистить карту
    document.getElementById("clear-btn").addEventListener("click", () => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                tiles[y][x] = "@";
            }
        }
        drawGrid();
    });

    // Скачать JSON
    document.getElementById("download-btn").addEventListener("click", () => {
        const data = {
            level: tiles,
        };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "level.json";
        a.click();
        URL.revokeObjectURL(url);
    });
    document.getElementById("save-db-btn").addEventListener("click", () => {
        const name = document.getElementById("level-name").value.trim();

        if (!name) {
            alert("Введи назву рівня!");
            return;
        }
        console.log(tiles);

        axios.post('/save-level',{name, data: tiles})
            .then(res => res.data.success
                ? alert("Рівень збережено! ID: " + res.data.id)
                : alert("Помилка збереження")
            )
            .catch(err => alert("Помилка підключення" ));

        // fetch('/save-level', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        //     },
        //     body: JSON.stringify({
        //         name,
        //         data: tiles,
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.success) {
        //             alert("Рівень збережено! ID: " + data.id);
        //         } else {
        //             alert("Помилка збереження");
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         alert("Помилка підключення");
        //     });
    });

});
