let totalApples = 5;
let collectedApples = 0;

export function initAppleCount(total) {
    totalApples = total;
    collectedApples = 0;
    updateAppleDisplay();
}

export function collectApple() {
    collectedApples++;
    updateAppleDisplay();
}

function updateAppleDisplay() {
    document.getElementById('apples').textContent = `${collectedApples} / ${totalApples}`;
}
