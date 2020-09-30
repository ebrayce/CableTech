<?php


namespace App\Http\Traits;


use Carbon\Carbon;

trait FromNow
{
    public function getFromNowAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function getDateAttribute(){
        return Carbon::parse($this->created_at)->isoFormat('Do MMMM, YYYY');
    }
}
