<!DOCTYPE html>
<html lang="ru">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.10.0/axios.min.js"></script>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Редактор уровней</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    @vite(['resources/js/editor/editor.js', 'resources/css/editor.css']) {{-- Подключение JS + CSS редактора --}}
</head>
<body>
<div class="editor-container">
    <h1>Редактор рівнів</h1>

    <div class="toolbar">
        <label>Інструмент:
            <select id="tool">
                <option value=" ">Пусто</option>
                <option value="#">Стіна</option>
                <option value="E">Вихід</option>
                <option value="S">Старт змійки</option>
                <option value="P1">Портал 1</option>
                <option value="P2">Портал 2</option>
                <option value="P3">Портал 3</option>
            </select>
        </label>
        <button id="download-btn">Скачать</button>
        <button id="clear-btn">Очистить</button>
        <button id="save-db-btn">Сохранить в базу</button>
        <div class="map-size-controls">
            <label>
                Ширина:
                <input type="number" id="map-width" min="5" max="200" value="20">
            </label>
            <label>
                Висота:
                <input type="number" id="map-height" min="5" max="200" value="20">
            </label>
            <button id="generate-map">Создать карту</button>
            <label>
                Название уровня:
                <input type="text" id="level-name" placeholder="Назви рівень">
            </label>
        </div>
    </div>

    <canvas id="editor-canvas" width="512" height="512"></canvas>
</div>
</body>
</html>
