<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class RentalListing extends Model
{
    use HasFactory;

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
