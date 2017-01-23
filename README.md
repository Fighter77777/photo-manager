Symfony Techtalk Edition
========================

[![Build Status](https://secure.travis-ci.org/liip-forks/symfony-standard.png?branch=techtalk)](http://travis-ci.org/liip-forks/symfony-standard)

За основу взятий Symfony Techtalk Edition.

Original README.md here:
https://github.com/symfony/symfony-standard/blob/master/README.md

Installation instructions:
--------------------------
1.
 ```
   composer install
   ```

2. Install the FOSUserBundle schema:
```
app/console doctrine:schema:create
```

3. 
```
php app/console doctrine:migrations:migrate
php app/console assetic:dump
