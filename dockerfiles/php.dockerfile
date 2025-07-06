FROM php:8.3-fpm

ARG WORKDIR=/var/www/html
ENV DOCUMENT_ROOT=${WORKDIR}
ENV CAPYBARA_PROCS_NUMBER=1
ENV NODE_VERSION=17.x
ARG HOST_UID=1000
ENV USER=www-data

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmemcached-dev \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    librdkafka-dev \
    libpq-dev \
    openssh-server \
    zip \
    unzip \
    supervisor \
    sqlite3  \
    nano \
    cron \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev

# Install Node
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y lsof

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions zip, mbstring, exif, bcmath, intl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install  zip mbstring exif pcntl bcmath -j$(nproc) gd intl

# Install Redis and enable it
RUN pecl install redis  && docker-php-ext-enable redis

# Install the PHP pdo_mysql extention

RUN docker-php-ext-install pgsql pdo_pgsql
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR $WORKDIR

RUN rm -Rf /var/www/* && \
    mkdir -p /var/www/html

ADD dockerfiles/php/php.ini /usr/local/etc/php/php.ini




RUN usermod -u ${HOST_UID} www-data
RUN groupmod -g ${HOST_UID} www-data

RUN chmod -R 755 $WORKDIR
RUN chown -R www-data:www-data $WORKDIR

COPY . $WORKDIR


