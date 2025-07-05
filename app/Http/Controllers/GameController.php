<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function getLevel(Request $request)
    {
        $levelsPath = storage_path('app/levels');
        $files = collect(scandir($levelsPath))
            ->filter(fn($file) => is_file($levelsPath . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'php')
            ->values()
            ->all();

        $index = $request->query('index');

        if (!is_numeric($index) || !isset($files[$index])) {
            $index = array_rand($files);
        }

        $file = $levelsPath . '/' . $files[$index];

        $level = include $file;

        return response()->json([
            'level' => $level,
            'index' => (int)$index,
        ]);
    }
}
