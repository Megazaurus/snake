<?php
// Папка с уровнями
$levelsDir = __DIR__ . '/levels';

// Получаем список файлов с уровнями
$files = array_values(array_filter(scandir($levelsDir), function($file) use ($levelsDir) {
    return is_file($levelsDir . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'php';
}));

// Индекс уровня из GET, если есть
$index = isset($_GET['index']) ? (int)$_GET['index'] : null;

// Если индекс не передан или некорректен — случайный уровень
if ($index === null || !isset($files[$index])) {
    $index = array_rand($files);
}

$levelFile = $levelsDir . '/' . $files[$index];

// Подключаем файл с уровнем, он должен вернуть массив
$level = include $levelFile;

// Отдаем JSON с уровнем и индексом (чтобы клиент знал, какой уровень загрузился)
header('Content-Type: application/json');
echo json_encode(['level' => $level, 'index' => $index]);
