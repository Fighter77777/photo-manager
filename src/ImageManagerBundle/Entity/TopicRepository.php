<?php

namespace ImageManagerBundle\Entity;

/**
 * TopicRepository
 */
class TopicRepository extends \Doctrine\ORM\EntityRepository
{
    public function getTopicsWithTags()
    {
        return $this
            ->createQueryBuilder('topics')
            ->select('topics', 'tags')
            ->leftJoin('topics.topicsTags', 'tags')
            ->orderBy('topics.id', 'desc')
            ->getQuery()
            ->getResult();
    }
}
