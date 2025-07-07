@extends('layouts.app')
@section('content')



<div class="container">
    <!-- Левая панель -->
    <div class="side-panel">
        <div class="panel Level">
            <div>Level</div>
            <div></div>
        </div>
        <div class="panel timer">
            <div>⏱ TIME</div>
            <div id="timer">00:00</div>
        </div>

        <div class="panel store">
            <div>💰 STORE</div>
            <div id="apples">0</div>
        </div>

        <div class="button editor-btn"><a class="button editor-btn" href="level-editor">🎮 Редактор уровней</a></div>
    </div>

    <!-- Центральная часть -->
    <div class="game-wrapper">
        <canvas id="game" ></canvas>
    </div>

    <!-- Правая панель -->
    <div class="side-panel">
        <div class="panel">
            <div>📜 ПРАВИЛА</div>
            <p style="font-size: 8px; line-height: 1.5;">
    Собирай яблоки и избегай стен. Достигни портала, чтобы перейти на следующий уровень!
            </p>
            <div class="button" onclick="location.reload()">🔄 Начать заново</div>

            <div class="controls">
                <p style="margin-top: 10px;">🕹️ Управление:</p>
                <img src="{{ asset('/img/arrow-up.png') }}" alt="Up" />
                <img src="{{ asset('/img/arrow-down.png') }}" alt="Down" />
                <img src="{{ asset('/img/arrow-left.png') }}" alt="Left" />
                <img src="{{ asset('/img/arrow-right.png') }}" alt="Right" />
            </div>
        </div>
        <div class="chat">
            <div id="chat-messages" class="h-40 overflow-y-auto mb-2 text-sm">
                {{-- Здесь будут появляться сообщения --}}
            </div>
            <form id="chat-form" class="chat_form">
                <input type="text" class="chat_input" placeholder="Напишите сообщение..." />
                <button type="submit" class="button_say">Сказать</button>
            </form>
        </div>
    </div>

</div>


