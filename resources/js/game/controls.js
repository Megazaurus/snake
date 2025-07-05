// resources/js/game/controls.js

import { moveSnake } from "./snake";
import { map } from "./level";

export function setupControls() {
    document.addEventListener("keydown", (e) => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (keys.includes(e.key)) {
            moveSnake(e.key, map);
        }
    });
}
