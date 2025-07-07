// resources/js/game/canvas.js

import { tileSize, viewRadius } from "./config";

// Настраиваем canvas
export let canvas;
export let ctx;

// Изображения
export const imgWall = new Image();
imgWall.src = "/img/wall.png";

export const imgGround = new Image();
imgGround.src = "/img/grass.png";

export const imgHead = new Image();
imgHead.src = "/img/head.png";

export const imgExit = new Image();
imgExit.src = "/img/exit.png";

export const imgBody = new Image();
imgBody.src = "/img/body.png";

export const imgApple = new Image();
imgApple.src = "/img/apple.png";

export const portalImages = {
    P1: new Image(),
    P2: new Image(),
    P3: new Image(),
};

portalImages.P1.src = "/img/blue_portal.png";
portalImages.P2.src = "/img/green_portal.png";
portalImages.P3.src = "/img/red_portal.png";

export const totalImages = 9;

export const imageState = {
    loaded: 0
};

export function initCanvas() {
    canvas = document.getElementById("game");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    ctx = canvas.getContext("2d");

    // Устанавливаем размеры канваса в зависимости от радиуса обзора
    canvas.width = tileSize * (viewRadius * 2 + 1);
    canvas.height = tileSize * (viewRadius * 2 + 1);

    // Вызов отрисовки после инициализации (необязательно, если вызывается отдельно)
    import('./render.js').then(({ draw }) => {
        draw();
    });
}
