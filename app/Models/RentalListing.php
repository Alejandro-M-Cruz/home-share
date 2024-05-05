<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class RentalListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'description',
        'monthly_rent',
        'bathrooms',
        'bedrooms',
        'available_rooms',
        'size',
        'year_built',
        'status',
        'rules',
        'additional_information',
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

    public function toggleStatus(): void
    {
        $this->status = $this->status === 'active' ? 'inactive' : 'active';
        $this->save();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')->orderBy('order');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function scopeWhereMonthlyRentBetween(Builder $query, float $min, float $max = PHP_FLOAT_MAX): Builder
    {
        return $query->whereBetween('monthly_rent', [$min, $max]);
    }

    public function scopeWhereAvailableRoomsBetween(Builder $query, int $min, int $max = PHP_INT_MAX): Builder
    {
        return $query->whereBetween('available_rooms', [$min, $max]);
    }
}
