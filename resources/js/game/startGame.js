import { initCanvas } from "./canvas";
import { loadLevel } from "./level";
import { setupControls } from "./controls";
import { draw } from "./render";
import { startTimer } from './timer';


import {
    imgWall, imgGround, imgHead, imgBody, imgApple, imgExit,
    portalImages, totalImages, imageState,
} from "./canvas";

export function startGame() {
    initCanvas();

    const allImages = [
        imgWall, imgGround, imgHead, imgBody,
        imgApple, imgExit,
        ...Object.values(portalImages)
    ];

    imageState.loaded = 0;

    function handleImageLoad() {
        imageState.loaded++;
        if (imageState.loaded === totalImages) {
            loadLevel();
            setupControls();
            draw();
            startTimer();
        }
    }

    allImages.forEach(img => {
        if (img.complete) {
            // картинка уже загружена (браузер из кэша)
            imageState.loaded++;
        } else {
            img.onload = handleImageLoad;
        }
    });

    // если все уже загружены — запускаем сразу
    if (imageState.loaded === totalImages) {
        loadLevel();
        setupControls();
        draw();
        startTimer();
    }

}
