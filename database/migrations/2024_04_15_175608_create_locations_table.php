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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('rental_listing_id')
                ->constrained()
                ->cascadeOnDelete();

            $this->create_location_columns($table);

            $table->timestamps();
        });
        Schema::table('rental_listings', function (Blueprint $table) {
            $table->dropColumn('country');
            $table->dropColumn('state');
            $table->dropColumn('city');
            $table->dropColumn('postal_code');
            $table->dropColumn('street');
            $table->dropColumn('street_number');
            $table->dropColumn('door_number');
            $table->dropColumn('floor_number');
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
        Schema::table('rental_listings', function (Blueprint $table) {
            $this->create_location_columns($table);
        });
    }

    /**
     * @param Blueprint $table
     * @return void
     */
    private function create_location_columns(Blueprint $table): void
    {
        $table->string('country');
        $table->string('state');
        $table->string('city');
        $table->string('postal_code');
        $table->string('street');
        $table->string('street_number');
        $table->string('door_number')->nullable();
        $table->string('floor_number')->nullable();
        $table->decimal('latitude', 10, 7);
        $table->decimal('longitude', 10, 7);
    }
};
