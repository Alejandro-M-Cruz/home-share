# Running development server
api:
	@php artisan serve
web:
	@cd front-end && yarn expo start --web
android:
	@cd front-end && yarn expo start --android
ios:
	@cd front-end && yarn expo start --ios

#Testing
test-api:
	@php artisan test
test:
	@cd front-end && yarn test

# Dependencies
install:
	@composer install
	@cd front-end && yarn install

# Database
migrate:
	@php artisan migrate
seed:
	@php artisan db:seed
fresh:
	@php artisan migrate:fresh --seed

# Formatting
format:
	@cd front-end && yarn prettier . --write
