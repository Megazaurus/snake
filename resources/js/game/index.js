import { loadLevel } from "./level";
import { setupControls } from "./controls";
import {
    imgWall, imgGround, imgHead, imgBody, imgApple,
    portalImages, totalImages, imageState, imgExit
} from "./canvas";
import {draw} from "@/game/render.js";

// Подсчёт загруженных изображений
function handleImageLoad() {
    imageState.loaded++;
    if (imageState.loaded === totalImages) {
        loadLevel();
        setupControls();
        draw();
    }
}

// Назначаем обработчик загрузки всем картинкам
[imgWall, imgGround, imgHead, imgBody, imgApple, imgExit, ...Object.values(portalImages)]
    .forEach(img => {
        img.onload = handleImageLoad;
    });
