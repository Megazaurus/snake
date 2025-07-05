// resources/js/game/state.js

// Змейка — массив с координатами частей тела
export let snake = [{ x: 1, y: 1 }];

// Яблоко (null пока не размещено)
export let apple = { value: null };

// Кол-во шагов, на которое растет змейка
export let growSteps = { value: 2 };

// Порталы: P1 -> [коорд1, коорд2]
export let portals = {};

// Текущий индекс уровня
export let currentLevelIndex = { value: 0 };
