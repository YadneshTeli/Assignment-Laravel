<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'BeyondChats Article Management API',
        'version' => '1.0.0'
    ]);
});
