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
            'size' => $this->size,
            'size_unit' => $this->size_unit,
            'country' => $this->country,
            'state' => $this->state,
            'city' => $this->city,
            'street' => $this->street,
            'available_rooms' => $this->available_rooms,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'image_urls' => $this->images->map(fn($image) => $image->url)
        ];
    }
}
