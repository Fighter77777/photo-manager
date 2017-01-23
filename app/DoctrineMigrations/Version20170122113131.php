<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170122113131 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE topics_tags (id INT AUTO_INCREMENT NOT NULL, topic_id INT UNSIGNED DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_F9C48D121F55203D (topic_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topics (id INT UNSIGNED AUTO_INCREMENT NOT NULL, img_path VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE topics_tags ADD CONSTRAINT FK_F9C48D121F55203D FOREIGN KEY (topic_id) REFERENCES topics (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE topics_tags DROP FOREIGN KEY FK_F9C48D121F55203D');
        $this->addSql('DROP TABLE topics_tags');
        $this->addSql('DROP TABLE topics');
    }
}
