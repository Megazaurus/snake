#!/bin/bash
composer -d /var/www/html install
#npm i --prefix /var/www/html
#npm run --prefix /var/www/html build
php /var/www/html/artisan migrate
php /var/www/html/artisan db:seed
#npx vite
