<?php

namespace App\Http\Controllers;

use App\Models\Amenity;

class AmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Amenity::all());
    }
}
