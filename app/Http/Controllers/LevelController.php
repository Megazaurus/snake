<?php

namespace App\Http\Controllers;

use App\Http\Requests\Level\SaveRequest;
use Illuminate\Http\Request;
use App\Models\Level;
use Illuminate\Support\Facades\Auth;

class LevelController extends Controller
{
    public function store(SaveRequest $request)
    {

        $data = $request->validated();

        $level = Level::create([
            'name' => $data['name'],
            'data' => $data['data'], // Laravel сам сериализует в JSON
            'user_id' => Auth::id(), // если авторизация есть
        ]);

        return response()->json(['success' => true, 'id' => $level->id]);
    }
}
