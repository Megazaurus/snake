<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = ['name', 'data', 'user_id','data_img'];

    protected $table = 'levels';
    protected $casts = [
        'data' => 'array',
    ];
}
