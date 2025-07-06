<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $user = auth()->user(); // если авторизация включена
        $message = $request->input('message');

        // Временно можно использовать заглушку пользователя:
        if (!$user) {
            $user = (object)['name' => 'Гость'];
        }

        broadcast(new MessageSent($user->name, $message))->toOthers();

        return response()->json(['status' => 'sent']);
    }
}
