// resources/js/game/snake.js

import { snake, apple, growSteps, portals } from "./state";
import { draw } from "./render";
import { placeApple } from "./apple";
import { nextLevel } from "./level";

// Обработка движения змейки
export function moveSnake(direction, map) {
    const head = { ...snake[0] };

    if (direction === "ArrowUp") head.y--;
    if (direction === "ArrowDown") head.y++;
    if (direction === "ArrowLeft") head.x--;
    if (direction === "ArrowRight") head.x++;

    // Столкновение со стеной или с собой
    if (
        head.x < 0 || head.x >= map[0].length ||
        head.y < 0 || head.y >= map.length ||
        map[head.y][head.x] === "#" ||
        snake.some(part => part.x === head.x && part.y === head.y)
    ) return;

    const cell = map[head.y][head.x];

    // Портал
    if (cell.startsWith("P") && portals[cell]?.length === 2) {
        const [a, b] = portals[cell];
        if (head.x === a.x && head.y === a.y) {
            head.x = b.x;
            head.y = b.y;
        } else {
            head.x = a.x;
            head.y = a.y;
        }
    }

    // Выход
    if (cell === "E") {
        nextLevel();
        return;
    }

    snake.unshift(head); // Добавляем голову

    // Поедание яблока
    if (apple.value && head.x === apple.value.x && head.y === apple.value.y) {
        placeApple(map, snake);
        snake.grow = (snake.grow || 0) + 1; // Увеличиваем змейку
    }

    // Рост или обычное движение
    if (snake.grow > 0) {
        snake.grow--;
    } else {
        snake.pop();
    }

    draw(map, snake);
}
