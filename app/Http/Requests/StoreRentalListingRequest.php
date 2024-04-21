<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRentalListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:apartment,house,apartment_block'],
            'description' => ['required', 'string'],
            'monthly_rent' => ['required', 'numeric', 'min:0'],
            'available_rooms' => ['required', 'integer', 'min:1'],
            'size' => ['required', 'numeric', 'min:0'],
            'bathrooms' => ['required', 'integer', 'min:1'],
            'bedrooms' => ['required', 'integer', 'min:1'],
            'year_built' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],
            'location' => ['required', 'array'],
            'location.country' => ['required', 'string'],
            'location.state' => ['required', 'string'],
            'location.city' => ['required', 'string'],
            'location.street' => ['required', 'string'],
            'location.street_number' => ['required', 'string'],
            'location.door_number' => ['nullable', 'string'],
            'location.floor_number' => ['nullable', 'integer', 'min:1'],
            'location.postal_code' => ['required', 'string'],
            'location.latitude' => ['required', 'numeric', 'min:-90', 'max:90'],
            'location.longitude' => ['required', 'numeric', 'min:-180', 'max:180'],
            'amenities' => ['required', 'array'],
            'amenities.*' => ['required', 'string', 'exists:amenities,slug', 'distinct'],
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image', 'max:4096'],
        ];
    }
}
