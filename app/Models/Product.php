<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $casts = [
        'price' => 'double',
        'is_low_stock' => 'boolean',
        'is_out_stock' => 'boolean'
    ];
}
