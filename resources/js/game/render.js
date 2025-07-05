// resources/js/game/render.js

import { ctx, tileSize, imgWall, imgGround, imgApple, imgHead, imgBody, portalImages, imgExit } from "./canvas";
import { apple } from "./state";

// Главная функция отрисовки
export function draw(map, snake) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const cell = map[y][x];
            if (cell === "#") {
                ctx.drawImage(imgWall, x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (cell === "E") {
                ctx.drawImage(imgExit, x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (cell.startsWith("P")) {
                const img = portalImages[cell];
                if (img?.complete) {
                    ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
                } else {
                    ctx.fillStyle = "purple";
                    ctx.beginPath();
                    ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize / 2.5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            } else {
                ctx.drawImage(imgGround, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Яблоко
    if (apple.value) {
        ctx.drawImage(imgApple, apple.value.x * tileSize, apple.value.y * tileSize, tileSize, tileSize);
    }

    // Змейка
    for (let i = 0; i < snake.length; i++) {
        const part = snake[i];
        const img = i === 0 ? imgHead : imgBody;
        ctx.drawImage(img, part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    }
}
