<?php

namespace App\Models;

use App\Http\Traits\FromNow;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory,FromNow;

    protected $casts = [
        'price' => 'double',
        'is_low_stock' => 'boolean',
        'is_out_stock' => 'boolean'
    ];

    protected $appends = [
        'date',
        'fromNow'
    ];

    public static function saveProduct(Product $product){
        $product->is_out_stock = $product->in_stock == 0;
        $product->is_low_stock = $product->in_stock <= $product->min_stock;
        $product->save();
    }

    public function purchases(){
        return $this->hasMany(Purchase::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }


}
