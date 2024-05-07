<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RentalListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'monthly_rent' => $this->monthly_rent,
            'year_built' => $this->year_built,
            'size' => $this->size,
            'size_unit' => $this->size_unit,
            'bathrooms' => $this->bathrooms,
            'bedrooms' => $this->bedrooms,
            'available_rooms' => $this->available_rooms,
            'country' => $this->country,
            'state' => $this->state,
            'city' => $this->city,
            'street' => $this->street,
            'street_number' => $this->street_number,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'username' => $this->user->name,
            'user_created_at' => $this->user->created_at,
            'image_urls' => $this->images->map(function ($image) {
                $url = $image->url;
                return str_contains($url, 'http') ? $url : asset($url);
            }),
            'status' => $this->status,
        ];
    }
}
