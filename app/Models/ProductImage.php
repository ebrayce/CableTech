<?php

namespace App\Models;

use http\Url;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected $appends = [
        'thumbnail',
        'web',
        'original',
        'square'
    ];

    public function getThumbnailAttribute()
    {
        return $this->genUrl($this->name, self::getPath('thumb'));
    }

    public function getSquareAttribute(){
        return $this->genUrl($this->name, self::getPath('square'));
    }

    public function getOriginalAttribute(){
        return $this->genUrl($this->name, self::getPath('original'));
    }

    public function getWebAttribute(){
        return $this->genUrl($this->name, self::getPath('web'));
    }

    private function genUrl($name, $path)
    {
        return url($path.$name,[],config('app.env') != 'local' );
    }

    public static function getPath($for)
    {
        switch ($for){
            case 'web':
                return "product/image/web/";
            case 'square':
                return "product/image/square/";
            case 'original':
                return "product/image/original/";
            case 'thumb':
                return "product/image/thumb/";
            default :
                return '/////';
        }
    }
}
