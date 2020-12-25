<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
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
Route::post('/user',function (){
    return auth()->user();
})->middleware('auth:web');

Route::get('/gamiskah',function (){

    if(!\App\Models\User::where('email','admin@gmail.com')){
        $user = new \App\Models\User();
        $user->name = "Ernest Brayce";
        $user-> email = "admin@gmail.com";
        $user-> password = Hash::make("admin@123");
        $user->save();
        return redirect('/');
    }else{
        return redirect('/');
    }

});

Route::post('/data', [ProductController::class,'index']);
Route::post('/sale', [SaleController::class,'index']);
Route::post('/purchase', [PurchaseController::class,'index']);



//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('{name}',function (){
    $auth = auth()->user();
    $isAuth = auth()->check();

    return view('main',compact('auth','isAuth'));
})->where('name','([A-z0-9\-/_.]+)?');
Auth::routes();
