CREATE DATABASE  IF NOT EXISTS `flare` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `flare`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: flare
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(260) NOT NULL COMMENT 'taille max des uri windows 260',
  `post` int NOT NULL,
  `name_client` varchar(260) DEFAULT NULL COMMENT 'Nom initial du fichier (ordinateur client)',
  `ext` varchar(260) DEFAULT NULL COMMENT 'Extension detecté',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'redundant with post.date',
  `state` enum('MOD','DEL','OK') NOT NULL DEFAULT 'MOD',
  PRIMARY KEY (`id`),
  KEY `POST_ID` (`post`),
  CONSTRAINT `FK_POST_ID` FOREIGN KEY (`post`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE; SET FOREIGN_KEY_CHECKS=0;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'a',1,NULL,'jpg','2022-01-03 21:52:13','OK'),(2,'b',2,NULL,'jpg','2022-01-03 21:52:13','OK'),(3,'a',3,NULL,'jpg','2022-01-03 21:52:13','OK'),(12,'c',12,NULL,'test','2022-01-04 22:53:09','MOD'),(13,'c',14,NULL,'test','2022-01-04 22:53:28','MOD'),(14,'c',15,NULL,'test','2022-01-04 22:54:00','MOD'),(16,'c',17,NULL,'test','2022-01-04 22:54:13','MOD'),(17,'c',19,NULL,'test','2022-01-04 22:59:38','MOD'),(18,'c',999,NULL,'test','2022-01-04 23:14:40','MOD');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES; SET FOREIGN_KEY_CHECKS=1;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reply-to` varchar(320) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Max length seem to be 256 octets, but 320 octets is also mentionned and sometime it be characters instead octets (and utf8 chars are 1 or 2 octets depending of the char). SO 320 utf8 chars should enough to store all email adresse...',
  `state` enum('NEW','READ','ANSWERED') DEFAULT 'NEW',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'tdghiu@servt.fr','tdghiu@servt.fr','','2021-12-15 23:30:30'),(2,'tdghiu@servt.fr','tdghiu@servt.fr','','2021-12-15 23:49:09'),(3,'ezrvdfvgdb','fsq@fko.df','','2021-12-17 22:42:18'),(4,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:48:37'),(5,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:49:43'),(6,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:54:56'),(7,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:59:32'),(8,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-18 00:01:14'),(9,'f<dsfnlk<gdnlskgnsm','qsdqgfv@fgdg.grf','','2021-12-27 18:37:22'),(10,'dfwojgpsjhdwhj)dsw','thsfth@fhfxh.gf','','2021-12-27 19:03:57'),(11,'dfwojgpsjhdwhj)dsw','thsfth@fhfxh.gf','','2021-12-27 19:05:21'),(12,'ùmklfqjmrqtpù','retuioaietyeo@kijdsf.df','','2021-12-27 19:39:11'),(13,'yrrtry','tgyyr@drt.gt','','2021-12-29 18:34:51');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` tinytext,
  `user_id` int DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `game` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mail_idx` (`user_id`),
  KEY `date` (`date`),
  CONSTRAINT `mail` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'seb',2,'2021-11-07 16:12:17','battlefield 3'),(2,'seb',NULL,'2021-11-07 21:31:48','serious sam: the second encounter'),(3,'seb',2,'2021-11-21 23:49:31','battlefield 3'),(12,NULL,NULL,'2022-01-04 22:46:21','test'),(13,NULL,NULL,'2022-01-04 22:46:26','test'),(14,NULL,NULL,'2022-01-04 22:47:49','test'),(15,NULL,NULL,'2022-01-04 22:54:00','test'),(16,NULL,NULL,'2022-01-04 22:54:06','test'),(17,NULL,NULL,'2022-01-04 22:54:13','test'),(18,NULL,NULL,'2022-01-04 22:54:28','test'),(19,NULL,NULL,'2022-01-04 22:59:38','test');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'bnlkjfdghj'),(2,'dfhdfhdjkhg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-08 13:58:11
