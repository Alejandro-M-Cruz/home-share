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

    public function attributes()
    {
        return [
            'location.country' => 'country',
            'location.state' => 'state',
            'location.city' => 'city',
            'location.street' => 'street',
            'location.street_number' => 'street number',
            'location.door_number' => 'door number',
            'location.floor_number' => 'floor number',
            'location.postal_code' => 'postal code',
            'location.latitude' => 'latitude',
            'location.longitude' => 'longitude',
            'amenities.*' => 'amenity',
            'images.*' => 'image',
        ];
    }

    public function messages()
    {
        return [
            'images.required' => 'At least one image is required.',
            'images.max' => 'The maximum number of images is 8.',
            'images.*.image' => 'Every file must be an image.',
        ];
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
            'bathrooms' => ['required', 'integer', 'min:1', 'max:255'],
            'bedrooms' => ['required', 'integer', 'min:1', 'max:255'],
            'year_built' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],
            'rules' => ['nullable', 'string', 'max:2000'],
            'additional_information' => ['nullable', 'string', 'max:2000'],
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
            'amenities' => ['array'],
            'amenities.*' => ['string', 'exists:amenities,slug', 'distinct'],
            'images' => ['required', 'array', 'min:1', 'max:8'],
            'images.*' => ['image', 'max:4096'],
        ];
    }
}
