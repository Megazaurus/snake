// resources/js/game/apple.js

import { apple } from "./state";

// Разместить яблоко в случайной свободной клетке
export function placeApple(map, snake) {
    let empty = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "#" && !snake.some(part => part.x === x && part.y === y)) {
                empty.push({ x, y });
            }
        }
    }

    apple.value = empty.length > 0 ? empty[Math.floor(Math.random() * empty.length)] : null;
}
