<?php

namespace ImageManagerBundle\Form\Type;

use ImageManagerBundle\Entity\Topic;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class TopicForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('imgPath', 'file', [
                'label' => 'Виберіть фото',
                'attr' => [
                    'ng-files' => 'getTheFiles($files)',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Topic::class,
            'csrf_protection'   => false,
        ));
    }

    public function getName()
    {
        return 'topic';
    }
}