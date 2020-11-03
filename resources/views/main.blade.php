@extends('master')

@section('content')
    <main-app p-is-auth="{{$isAuth}}" p-user="{{$auth}}"></main-app>
@endsection
