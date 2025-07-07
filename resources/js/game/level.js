import { tileSize } from "./config";
import { canvas } from "./canvas";
import { placeApple } from "./apple";
import { draw } from "./render";
import { snake, portals, currentLevelIndex } from "./state";
import { initAppleCount } from "./appleCounter";

export let map = [];

export function loadLevel(index = null) {
    let url = "/get-level";
    if (index !== null) url += "?index=" + index;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Загружаем карту
            map = data.level;
            currentLevelIndex.value = data.index;

            // Сброс змейки
            snake.length = 0;
            snake.push({ x: 2, y: 1 }); // начальная позиция головы
            snake.grow = 2;

            // Очищаем порталы
            Object.keys(portals).forEach(key => delete portals[key]);

            // Заполняем порталы заново
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    const cell = map[y][x];
                    if (cell.startsWith("P") && cell.length === 2) {
                        if (!portals[cell]) portals[cell] = [];
                        portals[cell].push({ x, y });
                    }
                }
            }
            initAppleCount(5);
            placeApple(map, snake);
            draw();
        });
}

export function nextLevel() {
    currentLevelIndex.value++;
    loadLevel(currentLevelIndex.value);
}
