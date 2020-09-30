<?php

namespace App\Models;

use App\Http\Traits\FromNow;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory, FromNow;


    protected $appends = [
        'date',
        'fromNow'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
