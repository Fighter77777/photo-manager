<?php

namespace ImageManagerBundle\Utils;

use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FilesManager
 * @package ImageManagerBundle\Utils
 */
class FilesManager implements FileLoaderInterface
{
    /**
     * @var FileLoaderInterface
     */
    private $fileSaver;

    /**
     * @var string
     */
    private $folderForFiles;

    /**
     * FileLoadManager constructor.
     * @param FileLoaderInterface $fileSaver
     * @param string $folderForFiles
     */
    public function __construct(FileLoaderInterface $fileSaver, $folderForFiles)
    {
        $this->fileSaver = $fileSaver;
        $this->folderForFiles = $folderForFiles;
    }


    /**
     * @param UploadedFile $file
     * @param string $dir
     * @param null $newFileName
     * @return false|string
     */
    public function saveFile(UploadedFile $file, $dir = '', $newFileName = null)
    {
        if (empty($dir)) {
            $dir = $this->folderForFiles;
        }

        return $this->fileSaver->saveFile($file, $dir, $newFileName);
    }


    /**
     * @return array|null
     */
    public function getErrors()
    {
        $this->fileSaver->getErrors();
    }
}