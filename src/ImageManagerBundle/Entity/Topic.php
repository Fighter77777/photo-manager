<?php

namespace ImageManagerBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Topic
 *
 * @ORM\Table(name="topics")
 * @ORM\Entity(repositoryClass="ImageManagerBundle\Entity\TopicRepository")
 */
class Topic
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", options={"unsigned"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @Assert\NotBlank(message="Please, upload the product brochure as a jpg file.")
     * @Assert\File(mimeTypes={ "img/jpg" })
     * @ORM\Column(name="img_path", type="string", length=255)
     */
    private $imgPath;

    /**
     * @ORM\OneToMany(targetEntity="TopicsTag", mappedBy="topic", cascade={"all"}, orphanRemoval=true)
     **/
    protected $topicsTags;


    public function __construct()
    {
        $this->topicsTags = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set imgPath
     *
     * @param string $imgPath
     *
     * @return Topic
     */
    public function setImgPath($imgPath)
    {
        $this->imgPath = $imgPath;

        return $this;
    }

    /**
     * Get imgPath
     *
     * @return string
     */
    public function getImgPath()
    {
        return $this->imgPath;
    }


    /**
     * @param TopicsTag $tag
     * @return $this
     */
    public function addTopicsTag(TopicsTag $tag)
    {
        $tag->setTopic($this);
        $this->topicsTags->add($tag);

        return $this;
    }

    /**
     * @param TopicsTag $tag
     */
    public function removeTopicsTag(TopicsTag $tag)
    {
        $this->topicsTags->removeElement($tag);
        $tag->setTopic(null);
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTopicsTags()
    {
        return $this->topicsTags;
    }

    /**
     * @param $tags
     */
    public function setTopicsTags($tags)
    {
        if (!$tags) {
            $this->topicsTags = new ArrayCollection();
            return;
        }

        foreach ($tags as $tag) {
            $tag->setTopic($this);
        }

        foreach ($this->getTopicsTags() as $item) {
            if (!$tags->contains($item)) {
                $this->getTopicsTags()->removeElement($item);
                $item->setTopic(null);
            }
        }

        $this->topicsTags = $tags;
    }
}

