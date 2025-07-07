import { tileSize, viewRadius } from "./config";
import {canvas, ctx, imgWall, imgGround, imgHead, imgBody, imgApple, imgExit,
    portalImages} from "@/game/canvas.js";
import {apple, snake} from "@/game/state.js";
import {map} from "@/game/level.js";

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const head = snake[0];

    for (let dy = -viewRadius; dy <= viewRadius; dy++) {
        for (let dx = -viewRadius; dx <= viewRadius; dx++) {

            const mapY = head.y + dy;
            const mapX = head.x + dx;

            // Координаты, куда рисовать на экране (центрируется)
            const screenX = (dx + viewRadius) * tileSize;
            const screenY = (dy + viewRadius) * tileSize;

            // Проверяем выход за границы карты
            if (mapY < 0 || mapY >= map.length || mapX < 0 || mapX >= map[0].length) {
                ctx.drawImage(imgWall, screenX, screenY, tileSize, tileSize);
                continue;
            }

            const cell = map[mapY][mapX];

            if (cell === "#") {
                ctx.drawImage(imgWall, screenX, screenY, tileSize, tileSize);
            } else if (cell === "E") {
                ctx.drawImage(imgExit, screenX, screenY, tileSize, tileSize);
            } else if (cell.startsWith("P")) {
                const portalImg = portalImages[cell];
                if (portalImg?.complete) {
                    ctx.drawImage(portalImg, screenX, screenY, tileSize, tileSize);
                }
            } else {
                ctx.drawImage(imgGround, screenX, screenY, tileSize, tileSize);
            }
        }
    }

    // Рисуем яблоко, если оно в пределах камеры
    if (apple.value) {
        const dx = apple.value.x - head.x;
        const dy = apple.value.y - head.y;
        if (Math.abs(dx) <= viewRadius && Math.abs(dy) <= viewRadius) {
            const screenX = (dx + viewRadius) * tileSize;
            const screenY = (dy + viewRadius) * tileSize;
            ctx.drawImage(imgApple, screenX, screenY, tileSize, tileSize);
        }
    }

    // Рисуем змейку, если часть в пределах камеры
    for (let i = 0; i < snake.length; i++) {
        const part = snake[i];
        const dx = part.x - head.x;
        const dy = part.y - head.y;

        if (Math.abs(dx) <= viewRadius && Math.abs(dy) <= viewRadius) {
            const screenX = (dx + viewRadius) * tileSize;
            const screenY = (dy + viewRadius) * tileSize;
            const img = (i === 0) ? imgHead : imgBody;
            ctx.drawImage(img, screenX, screenY, tileSize, tileSize);
        }
    }
}
