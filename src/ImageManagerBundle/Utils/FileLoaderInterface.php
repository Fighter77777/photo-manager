<?php

namespace ImageManagerBundle\Utils;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileLoaderInterface
{

    /**
     * @param UploadedFile $file
     * @param $dir
     * @param $newFileName
     * @return string|false - path to file in file system
     */
    public function saveFile(UploadedFile $file, $dir = '', $newFileName = null);


    /**
     * @return array|null
     */
    public function getErrors();
}