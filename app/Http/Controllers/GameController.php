<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Level;


class GameController extends Controller {
    public function getLevel(Request $request)
    {
        $index = $request->query('index');

        // Отримуємо всі ID рівнів
        $levels = Level::select('id', 'data')->orderBy('id')->get();

        if ($levels->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Немає доступних рівнів',
            ], 404);
        }

        if (!is_numeric($index) || !isset($levels[$index])) {
            $index = rand(0, $levels->count() - 1);
        }

        $level = $levels[$index];

        return response()->json([
            'level' => $level->data,
            'index' => $index,
            'success' => true,
            'data_img' => $level->data_img,
        ]);
    }
}
