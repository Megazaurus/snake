let startTime = null;
let timerInterval = null;

export function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}
