<?php

namespace ImageManagerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\FOSRestController;
use ImageManagerBundle\Entity\Topic;
use ImageManagerBundle\Form\Type\TopicForm;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class TopicsController extends FOSRestController
{
    public function getTopicsAction()
    {
        $topics = $this->getDoctrine()->getManager()->getRepository('ImageManagerBundle:Topic')->getTopicsWithTags();

        $responseData = [
            'success' => true,
            'data' => $topics,
        ];

        $view = $this
            ->view($responseData, 200)
            ->setTemplate("ImageManagerBundle:Topics:topics_list.html.twig")
            ->setTemplateVar('topics')
            ->setTemplateData(['topics' => $topics]);

        return $this->handleView($view);
    }


    public function getTopicAction($id)
    {
        $topic = $this->getDoctrine()->getManager()->getRepository('ImageManagerBundle:Topic')->find($id);

        if (empty($topic)) {
            $statusCode = 404;
            $responseData = [
                'success' => false,
                'errors' => ['Topic not found'],
            ];
        }else{
            $statusCode = 200 ;
            $responseData = [
                'success' => true,
                'data' => $topic,
            ];
        }

        $view = $this
            ->view($responseData, $statusCode)
            ->setTemplate("ImageManagerBundle:Topics:topic_page.html.twig")
            ->setTemplateVar('topic')
            ->setTemplateData(['topic' => $topic]);

        return $this->handleView($view);
    }


    public function postTopicsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $fileManager = $this->get('image_manager.file_manager');

        foreach($request->files as $file) {
            /** @var UploadedFile $file */
            $filePath = $fileManager->saveFile($file);
            if($filePath){
                $topic = new Topic();
                $topic->setImgPath($filePath);

                $em->persist($topic);
                $em->flush($topic);
            }
        }

        if($topic) {
            $url = $this->generateUrl('image_manager_get_topic', ['id' => $topic->getId()]);

            $view = $this
                ->view($topic, 201)
                ->setLocation($url);
        } else {
            $view = $this
                ->view('', 500);
        }

        return $this->handleView($view);
    }
}
