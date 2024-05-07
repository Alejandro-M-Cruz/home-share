<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RentalListingDetailsResource extends JsonResource
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
            'user_id' => $this->user_id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'type' => $this->type,
            'rules' => $this->rules,
            'additional_information' => $this->additional_information,
            'monthly_rent' => $this->monthly_rent,
            'year_built' => $this->year_built,
            'size' => $this->size,
            'size_unit' => $this->size_unit,
            'bathrooms' => $this->bathrooms,
            'bedrooms' => $this->bedrooms,
            'available_rooms' => $this->available_rooms,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'country' => $this->country,
            'state' => $this->state,
            'city' => $this->city,
            'postal_code' => $this->postal_code,
            'street' => $this->street,
            'street_number' => $this->street_number,
            'door_number' => $this->door_number,
            'floor_number' => $this->floor_number,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'username' => $this->user->name,
            'user_created_at' => $this->user->created_at,
            'amenities' => $this->amenities->map(fn($amenity) => [
                'id' => $amenity->id,
                'name' => $amenity->name,
                'slug' => $amenity->slug,
                'icon' => $amenity->icon,
                'created_at' => $amenity->created_at,
                'updated_at' => $amenity->updated_at
            ]),
            'image_urls' => $this->images->map(fn($image) => asset($image->url)),
        ];
    }
}
