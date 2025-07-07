import './bootstrap';
import Alpine from 'alpinejs';
import { startGame } from './game/startGame';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    startGame();
});
