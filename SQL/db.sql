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
  PRIMARY KEY (`id`),
  KEY `POST_ID` (`post`),
  CONSTRAINT `FK_POST_ID` FOREIGN KEY (`post`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (17,'c',17,NULL,'test','2022-01-04 22:59:38'),(19,'16428920316050',21,'1621525884-99815-zoom-500x600.jpg','jpg','2022-01-22 22:53:51'),(20,'16428923992560',22,'1621525884-99815-zoom-500x600.jpg','jpg','2022-01-22 22:59:59'),(21,'16428923992580',22,'FEldaSsWQAsbQCc','jpg','2022-01-22 22:59:59'),(22,'16428924845650',23,'Nouveau document texte.txt',NULL,'2022-01-22 23:01:24'),(23,'16428926328770',24,'_DSC5777.NEF','nef','2022-01-22 23:03:53'),(38,'16470427532330',39,'1501585560-96228-printright-500x717.jpg','jpg','2022-03-11 23:52:33'),(39,'16473842663070',40,'a.jpg','jpg','2022-03-15 22:44:26'),(40,'16473851192460',41,'b.jpg','jpg','2022-03-15 22:58:39'),(41,'16473855197450',42,'2022031316373700_s.jpg','jpg','2022-03-15 23:05:19'),(42,'16473858228460',44,'th_example_batman_3.jpg','jpg','2022-03-15 23:10:22'),(43,'16473858420900',45,'th_example_batman_5.jpg','jpg','2022-03-15 23:10:42'),(44,'16473871023380',46,'2022031316512000_s.jpg','jpg','2022-03-15 23:31:42'),(45,'16473872346070',47,'2022031316473700_s.jpg','jpg','2022-03-15 23:33:54'),(46,'16473882994270',78,'Crashâ¢ Team Racing Nitro-Fueled_20190622202158.jpg','jpg','2022-03-15 23:51:39'),(47,'16473883731300',79,'LocoRocoâ¢ 2 Remastered_20171227173227.jpg','jpg','2022-03-15 23:52:53'),(48,'16473884067900',80,'Far CryÂ® 5_20190403202446.jpg','jpg','2022-03-15 23:53:26'),(49,'16473884985300',81,'Far CryÂ® 5_20180507163615.jpg','jpg','2022-03-15 23:54:58'),(50,'16473885258400',82,'Far CryÂ® 5_20180507163657.jpg','jpg','2022-03-15 23:55:25'),(51,'16473885410760',83,'Far CryÂ® 5_20180516143136.jpg','jpg','2022-03-15 23:55:41'),(52,'16473888557370',84,'Far CryÂ® 5_20180507163606.jpg','jpg','2022-03-16 00:00:55'),(53,'16473888625120',85,'Far CryÂ® 5_20180507163624.jpg','jpg','2022-03-16 00:01:02');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'tdghiu@servt.fr','tdghiu@servt.fr','','2021-12-15 23:30:30'),(2,'tdghiu@servt.fr','tdghiu@servt.fr','','2021-12-15 23:49:09'),(3,'ezrvdfvgdb','fsq@fko.df','','2021-12-17 22:42:18'),(4,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:48:37'),(5,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:49:43'),(6,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:54:56'),(7,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-17 23:59:32'),(8,'<efsopgjuoihg','rjwgio@ehwsg.gf','','2021-12-18 00:01:14'),(9,'f<dsfnlk<gdnlskgnsm','qsdqgfv@fgdg.grf','','2021-12-27 18:37:22'),(10,'dfwojgpsjhdwhj)dsw','thsfth@fhfxh.gf','','2021-12-27 19:03:57'),(11,'dfwojgpsjhdwhj)dsw','thsfth@fhfxh.gf','','2021-12-27 19:05:21'),(12,'ùmklfqjmrqtpù','retuioaietyeo@kijdsf.df','','2021-12-27 19:39:11'),(13,'yrrtry','tgyyr@drt.gt','','2021-12-29 18:34:51'),(14,'qeùtputoiquv','eqfser@dgsd.fg','NEW','2022-01-14 12:50:47'),(15,'qeùtputoiquv','eqfser@dgsd.fg','NEW','2022-01-14 12:55:59');
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
  `status` enum('MOD','DEL','OK') NOT NULL DEFAULT 'MOD',
  `check_box` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mail_idx` (`user_id`),
  KEY `date` (`date`),
  CONSTRAINT `mail` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (22,NULL,NULL,'2022-01-22 22:59:59','busboy2','OK',0),(23,NULL,NULL,'2022-01-22 23:01:24','busboy2','OK',0),(40,NULL,4,'2022-03-15 22:44:26','Battlefield 3','OK',0),(41,NULL,4,'2022-03-15 22:58:39','Serious Sam: The First Encounter','OK',1),(42,NULL,4,'2022-03-15 23:05:19','Super Mario Sunshine (via Super Mario 3D All-Stars)','OK',1),(43,'Gangsta',2,'2022-03-15 23:01:44','Need For Speed','OK',1),(44,'Le-Bat-Flare',4,'2022-03-15 23:10:22','Batman Arkham Knight','OK',1),(45,'Le-Bat-Flare',4,'2022-03-15 23:10:42','Batman Arkham Knight','OK',1),(46,NULL,4,'2022-03-15 23:31:42','Super Mario Galaxy (via Super Mario 3D All-Stars)','OK',1),(47,NULL,4,'2022-03-15 23:33:54','Super Mario Galaxy (via Super Mario 3D All-Stars)','OK',1),(78,'CTR',4,'2022-03-15 23:51:39','Crash™ Team Racing Nitro-Fueled','OK',1),(79,'TROLOLOL',4,'2022-03-15 23:52:53','LocoRoco™ 2 Remastered','MOD',0),(80,'TROLOLOL',4,'2022-03-15 23:53:26','Far Cry 5','MOD',1),(81,'Seb',4,'2022-03-15 23:54:58','Far Cry 5','OK',1),(82,'Seb',4,'2022-03-15 23:55:25','Far Cry 5','OK',1),(83,'Seb',4,'2022-03-15 23:55:41','Far Cry 5','OK',1),(84,'Seb',4,'2022-03-16 00:00:55','Far Cry 5','MOD',1),(85,'Seb',4,'2022-03-16 00:01:02','Far Cry 5','MOD',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'bnlkjfdghj'),(2,'dfhdfhdjkhg'),(4,'admin');
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

-- Dump completed on 2022-03-16  1:18:28
