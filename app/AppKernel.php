<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),

            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Doctrine\Bundle\PHPCRBundle\DoctrinePHPCRBundle(),
            new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle(),
            new Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),

            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),

            new AppBundle\AppBundle(),

            new JMS\SerializerBundle\JMSSerializerBundle(),

            new FOS\UserBundle\FOSUserBundle(),
            new FOS\RestBundle\FOSRestBundle(),
            new FOS\HttpCacheBundle\FOSHttpCacheBundle(),

            new Liip\ContainerWrapperBundle\LiipContainerWrapperBundle(),
            new Liip\HelloBundle\LiipHelloBundle(),
            new Liip\HyphenatorBundle\LiipHyphenatorBundle(),
            new Liip\ThemeBundle\LiipThemeBundle(),
            new Liip\ImagineBundle\LiipImagineBundle(),
            new Liip\MonitorBundle\LiipMonitorBundle(),
            new Liip\UrlAutoConverterBundle\LiipUrlAutoConverterBundle(),
            new Liip\TranslationBundle\LiipTranslationBundle(),
            new Liip\SearchBundle\LiipSearchBundle(),

            new Nelmio\ApiDocBundle\NelmioApiDocBundle(),
            new ImageManagerBundle\ImageManagerBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'), true)) {
            $bundles[] = new Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
            $bundles[] = new Egulias\ListenersDebugCommandBundle\EguliasListenersDebugCommandBundle();
            if ('test' === $this->getEnvironment()) {
                $bundles[] = new Liip\FunctionalTestBundle\LiipFunctionalTestBundle();
            } else {
                $bundles[] = new Liip\CodeBundle\LiipCodeBundle();
            }
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load($this->getRootDir().'/config/config_'.$this->getEnvironment().'.yml');
    }
}
