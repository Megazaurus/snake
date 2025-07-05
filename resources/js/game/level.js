// resources/js/game/level.js

import { canvas, tileSize } from "./canvas";
import { placeApple } from "./apple";
import { draw } from "./render";
import { snake, portals, currentLevelIndex } from "./state";

export let map = [];

export function loadLevel(index = null) {
    let url = "/get-level";
    if (index !== null) url += "?index=" + index;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            map = data.level;
            currentLevelIndex.value = data.index;

            canvas.width = map[0].length * tileSize;
            canvas.height = map.length * tileSize;

            snake.length = 0;
            snake.push({ x: 3, y: 1 }); // только голова
            snake.grow = 2; // <- добавить это свойство

            Object.keys(portals).forEach(key => delete portals[key]);

            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    const cell = map[y][x];
                    if (cell.startsWith("P") && cell.length === 2) {
                        if (!portals[cell]) portals[cell] = [];
                        portals[cell].push({ x, y });
                    }
                }
            }

            placeApple(map, snake);
            draw(map, snake);
        });
}

export function nextLevel() {
    currentLevelIndex.value++;
    loadLevel(currentLevelIndex.value);
}
