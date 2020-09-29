<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});


Route::post('/data', [ProductController::class,'index']);
Route::post('/data', [ProductController::class,'index']);

//Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('{name}',function (){
    $auth = Auth::check() ? auth()->user():[];

    return view('main',compact('auth'));
})->where('name','([A-z0-9\-/_.]+)?');
