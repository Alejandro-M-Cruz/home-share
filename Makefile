# Running development server
api:
	@php artisan serve
front-end:
	@php nativewind-fix.php && cd front-end && yarn start
web:
	@php nativewind-fix.php && cd front-end && yarn expo start --web --clear
android:
	@cd front-end && yarn expo start --android --clear
ios:
	@cd front-end && yarn expo start --ios --clear

# Repository
diff-main:
	@git diff --name-only main

# Testing
test-api:
	@php artisan test
test:
	@cd front-end && yarn test

# Dependencies
yarn-install:
	@cd front-end && yarn install && cd .. && php nativewind-fix.php
install: yarn-install
	@composer install

# Database
migrate:
	@php artisan migrate
seed:
	@php artisan db:seed
seed-amenities:
	@php artisan db:seed --class=AmenitySeeder
fresh:
	@php artisan migrate:fresh --seed

# Formatting
format:
	@cd front-end && yarn prettier . --write

# Routes
list-routes:
	@php artisan route:list

# Cache
clear-cache:
	@php artisan optimize:clear

# Storage
link-storage:
	@php artisan storage:link
