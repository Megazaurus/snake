<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LevelController;

Route::post('/save-level', [LevelController::class, 'store']);

Route::get('/get-level', [GameController::class, 'getLevel']);

Route::get('/play', function () {
    return view('play');
})->middleware(['auth'])->name('play');

Route::get('/', function () {
    return view('welcome');
});

Route::view('/level-editor', 'level_editor');


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
