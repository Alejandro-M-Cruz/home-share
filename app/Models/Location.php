<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'country',
        'state',
        'city',
        'postal_code',
        'street',
        'street_number',
        'door_number',
        'floor_number',
        'latitude',
        'longitude',
    ];

    public function rentalListing(): BelongsTo
    {
        return $this->belongsTo(RentalListing::class);
    }
}
