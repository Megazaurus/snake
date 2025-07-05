<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактор уровней</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    @vite(['resources/js/editor/editor.js', 'resources/css/editor.css']) {{-- Подключение JS + CSS редактора --}}
</head>
<body>
<div class="editor-container">
    <h1>Редактор уровней</h1>

    <div class="toolbar">
        <label>Инструмент:
            <select id="tool">
                <option value=" ">Пусто</option>
                <option value="#">Стена</option>
                <option value="E">Выход</option>
                <option value="S">Старт змейки</option>
                <option value="P1">Портал 1</option>
                <option value="P2">Портал 2</option>
                <option value="P3">Портал 3</option>
            </select>
        </label>
        <button id="download-btn">Скачать</button>
        <button id="clear-btn">Очистить</button>
    </div>

    <canvas id="editor-canvas" width="512" height="512"></canvas>
</div>
</body>
</html>
