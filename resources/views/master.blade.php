<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
{{--    <script src="{{ asset('js/app.js') }}" defer></script>--}}

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
{{--    <link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}


    @if (config('app.env') == 'local')
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    @else
        <link rel="stylesheet" href="{{asset(mix('css/app.css'), true)}}">
    @endif


</head>
<body>
<div id="app">
    <main class="py-4">
        @yield('content')
    </main>
</div>

@if (config('app.env') == 'local')
    <script src="{{asset('js/app.js')}}"></script>
@else
    <script src="{{asset(mix('js/app.js'), true)}}"></script>
@endif
</body>
</html>
