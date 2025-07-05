<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8" />
    <title>Змейка: Пиксельный мир</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    @vite([
    'resources/css/app.css',
    'resources/js/app.js'
])
</head>
    <body>
        <div>
            @include('layouts.navigation')

            <!-- Page Heading -->
            @isset($header)
                <header>
                    <div>
                        {{ $header }}
                    </div>
                </header>
            @endisset

            <!-- Page Content -->
            <main>
                @yield('content')
            </main>
        </div>
    </body>
</html>
