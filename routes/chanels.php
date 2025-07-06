<?php


use Illuminate\Support\Facades\Broadcast;

// Пример для приватного канала "chat"
Broadcast::channel('chat', function ($user) {
    return ['id' => $user->id, 'name' => $user->name];
});
