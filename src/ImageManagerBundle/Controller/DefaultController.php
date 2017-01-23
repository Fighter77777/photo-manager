<?php

namespace ImageManagerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use ImageManagerBundle\Entity\Topic;
use ImageManagerBundle\Form\Type\TopicForm;

class DefaultController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $topic = new Topic();
        $form = $this->createForm(new TopicForm(), $topic);
        return $this->render(
            'ImageManagerBundle:Default:index.html.twig',
            [
                'newTopicForm' => $form->createView(),
            ]
        );
    }
}
