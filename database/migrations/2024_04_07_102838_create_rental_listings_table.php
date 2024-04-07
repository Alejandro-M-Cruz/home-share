<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rental_listings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('type', ['apartment', 'house']);
            $table->text('rules')->nullable();
            $table->text('additional_information')->nullable();

            $table->decimal('monthly_rent_amount', total: 10, places: 2);
            $table->unsignedInteger('year_built')->nullable();
            $table->unsignedInteger('size');
            $table->enum('size_unit', ['sq_ft', 'sq_m']);
            $table->unsignedSmallInteger('bathrooms');
            $table->unsignedSmallInteger('bedrooms');
            $table->unsignedSmallInteger('available_rooms');

            $table->string('country');
            $table->string('state');
            $table->string('city');
            $table->string('postal_code');
            $table->string('street');
            $table->string('street_number');
            $table->string('door_number')->nullable();
            $table->string('floor_number')->nullable();
            $table->decimal('latitude', total: 10, places: 7);
            $table->decimal('longitude', total: 10, places: 7);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_listings');
    }
};
