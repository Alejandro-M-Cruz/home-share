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
        Schema::create('amenity_rental_listing', function (Blueprint $table) {
            $table->id();

            $table->foreignId('amenity_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('rental_listing_id')
                ->constrained()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenity_rental_listing');
    }
};
