<?php

namespace ImageManagerBundle\Utils;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileLoader implements FileLoaderInterface
{
    /**
     * @var array|null
     */
    private $errors;

    /**
     * @var string
     */
    private $projectDir;

    /**
     * FileLoader constructor.
     * @param $kernelDir
     */
    public function __construct($kernelDir)
    {
        $this->projectDir = $kernelDir.'/../web';
    }


    /**
     * Тут би потрібно реалізувати валідацію, перевірку на дублі і.т.д. Але немає часу все це робити для тестової задачки
     * @param UploadedFile $file
     * @param string $dir
     * @param null $newFileName
     * @return string
     */
    public function saveFile(UploadedFile $file, $dir = '', $newFileName = null)
    {
        if (empty($newFileName)) {
            $newFileName = $file->getClientOriginalName();
        }

        try {
            $dirAbsolute = $this->projectDir.$dir;
            if (!is_dir($dirAbsolute)) {
                mkdir($dirAbsolute, 0755, true);
            }

            $file->move($dirAbsolute, $newFileName);
        } catch (\Exception $e) {
            $this->errors[] = $e->getMessage();

            return false;
        }

        return $dir.'/'.$newFileName;
    }


    public function getErrors()
    {
        $this->errors;
    }
}