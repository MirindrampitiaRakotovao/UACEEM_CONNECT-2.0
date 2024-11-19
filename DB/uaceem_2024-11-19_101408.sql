-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: uaceem
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Reactions_Publication`
--

DROP TABLE IF EXISTS `Reactions_Publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reactions_Publication` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `publicationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dateReaction` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_reaction_user_publication` (`publicationId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reactions_Publication_ibfk_1` FOREIGN KEY (`publicationId`) REFERENCES `publications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Reactions_Publication_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reactions_Publication`
--

/*!40000 ALTER TABLE `Reactions_Publication` DISABLE KEYS */;
INSERT INTO `Reactions_Publication` VALUES ('1963771e-4c27-443f-b984-4b832ecf2cf1','35807a42-f70b-4ba0-9442-04409055acb1','abd2dd19-fcde-419c-97ea-58b18068dc10','2024-11-15 19:20:51','2024-11-15 19:20:51','2024-11-15 19:20:51'),('67a7ff49-266a-4079-88b8-2a931b93863c','6a2d8f8d-9414-4a18-af0b-95cfd505e744','4e359a23-a0d1-11ef-ae23-40b0763c5df3','2024-11-14 21:08:19','2024-11-14 21:08:19','2024-11-14 21:08:19'),('97e4e79e-4fba-4cc6-9a61-bf6bfb0892a2','35807a42-f70b-4ba0-9442-04409055acb1','4e359a23-a0d1-11ef-ae23-40b0763c5df3','2024-11-15 19:21:35','2024-11-15 19:21:35','2024-11-15 19:21:35'),('b5d059f2-167c-4c6d-89d3-5e433c5af717','abafd70e-e5b8-47cb-9f03-2d6cdf3fe501','abd2dd19-fcde-419c-97ea-58b18068dc10','2024-11-15 19:28:47','2024-11-15 19:28:47','2024-11-15 19:28:47'),('c024d84d-d241-4a0a-a4b0-0c514b6e677d','6a2d8f8d-9414-4a18-af0b-95cfd505e744','abd2dd19-fcde-419c-97ea-58b18068dc10','2024-11-15 19:20:53','2024-11-15 19:20:53','2024-11-15 19:20:53'),('dc1b1043-99d4-44bb-ac07-94c19a32ebab','35807a42-f70b-4ba0-9442-04409055acb1','53c02327-a0d0-11ef-ae23-40b0763c5df3','2024-11-17 00:44:55','2024-11-17 00:44:55','2024-11-17 00:44:55');
/*!40000 ALTER TABLE `Reactions_Publication` ENABLE KEYS */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240917130408-create-personnel.js'),('20240930063111-create-publication.js'),('20241007055004-create-reaction.js'),('20241008061055-create-commentaire.js'),('20241023063440-create-reactionsCommentaire.js'),('20241023171838-create-notifications.js'),('20241108155915-create-message.js'),('20241108200734-create-forum.js'),('20241111205245-create-enseignements.js'),('20241112053937-create-cours.js'),('20241112113543-create-feedback.js'),('20241112180857-create-emploi_du_temps.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_logs_utilisateur_id_foreign` (`utilisateur_id`),
  CONSTRAINT `activity_logs_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;

--
-- Table structure for table `annee_universitaires`
--

DROP TABLE IF EXISTS `annee_universitaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annee_universitaires` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `annee_universitaires_design_unique` (`design`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annee_universitaires`
--

/*!40000 ALTER TABLE `annee_universitaires` DISABLE KEYS */;
INSERT INTO `annee_universitaires` VALUES (1,'2024-2025',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `annee_universitaires` ENABLE KEYS */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;

--
-- Table structure for table `candidats`
--

DROP TABLE IF EXISTS `candidats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mention_id` bigint unsigned DEFAULT NULL,
  `serie_id` bigint unsigned DEFAULT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_bacc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anne_bacc` year NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_conc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preuve_bacc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('admis','recalé') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_mvola` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mode_inscription` enum('local','en_ligne') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `vagues_id` bigint unsigned DEFAULT NULL,
  `niveaux_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidats_num_bacc_unique` (`num_bacc`),
  UNIQUE KEY `candidats_email_unique` (`email`),
  KEY `candidats_mention_id_foreign` (`mention_id`),
  KEY `candidats_serie_id_foreign` (`serie_id`),
  KEY `candidats_vagues_id_foreign` (`vagues_id`),
  KEY `candidats_niveaux_id_foreign` (`niveaux_id`),
  CONSTRAINT `candidats_mention_id_foreign` FOREIGN KEY (`mention_id`) REFERENCES `mentions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `candidats_niveaux_id_foreign` FOREIGN KEY (`niveaux_id`) REFERENCES `niveaux` (`id`) ON DELETE SET NULL,
  CONSTRAINT `candidats_serie_id_foreign` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`) ON DELETE SET NULL,
  CONSTRAINT `candidats_vagues_id_foreign` FOREIGN KEY (`vagues_id`) REFERENCES `vagues` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidats`
--

/*!40000 ALTER TABLE `candidats` DISABLE KEYS */;
INSERT INTO `candidats` VALUES (1,6,3,'RATOVOARIVONY Ainanirina Sabrino','78961330',2024,'0388922781','001/ConcIE/IèA/24-25','sabrino@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-05 05:37:30','2024-09-05 05:46:39',NULL,1,NULL),(2,6,3,'Voavison Binea','1564313',2024,'0342458915','001/ConcIE/IèA/24-25','voavisonbinea@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-09 08:18:58','2024-09-09 09:10:35',NULL,2,NULL),(4,6,3,'John Doe','4567612',2024,'0344312449','002/ConcIE/IèA/24-25','john@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-09 10:13:40','2024-09-09 10:14:47',NULL,2,NULL),(5,6,3,'Voavy Paulin','876132160',2024,'0346490580','003/ConcIE/IèA/24-25','voavy@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-09 10:24:11','2024-09-09 10:28:35',NULL,2,NULL),(6,3,4,'Henri VE','87613217',2024,'0344312447','001/ConcSS/IèA/24-25','henri@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-10 03:55:37','2024-09-10 04:01:01',NULL,2,NULL),(7,6,2,'Desiré Noel','12345678',2024,'0332589741','004/ConcIE/IèA/24-25','desire@gmail.com',NULL,'admis',NULL,NULL,'local','2024-09-10 04:08:46','2024-09-10 04:13:15',NULL,2,NULL),(8,6,2,'Berthrand Aristide','45676129',2024,'0344312445','005/ConcIE/IèA/24-25',NULL,NULL,NULL,NULL,NULL,'local','2024-09-11 05:15:10','2024-09-11 05:15:10',NULL,2,NULL);
/*!40000 ALTER TABLE `candidats` ENABLE KEYS */;

--
-- Table structure for table `command_elements`
--

DROP TABLE IF EXISTS `command_elements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `command_elements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantite` int NOT NULL DEFAULT '1',
  `prixUnitaire` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `command_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `command_elements_command_id_foreign` (`command_id`),
  CONSTRAINT `command_elements_command_id_foreign` FOREIGN KEY (`command_id`) REFERENCES `commands` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `command_elements`
--

/*!40000 ALTER TABLE `command_elements` DISABLE KEYS */;
INSERT INTO `command_elements` VALUES (5,'Gasoil',1,200000,'2024-10-01 18:24:14','2024-10-01 18:24:14',4),(6,'Materiel',6,100000,'2024-10-01 18:24:14','2024-10-01 18:24:14',4),(7,'Test',1,30000,'2024-10-02 09:03:09','2024-10-02 09:03:09',5),(8,'Gasoil',1,50000,'2024-10-02 09:03:09','2024-10-02 09:03:09',5),(9,'sadsadasds',1,0,'2024-10-02 09:08:20','2024-10-02 09:08:20',6),(10,'gsgg',1,0,'2024-10-02 09:08:20','2024-10-02 09:08:20',6),(11,'Hello world',1,2000,'2024-10-02 12:54:13','2024-10-02 12:54:13',7),(12,'Drag and drop',3,500,'2024-10-02 12:54:13','2024-10-02 12:54:13',7),(13,'test1',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',8),(14,'test3',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',8),(15,'Pack de feutre',3,15000,'2024-10-04 17:52:25','2024-10-04 17:52:25',16),(16,'Alcool ',3,5000,'2024-10-04 17:52:25','2024-10-04 17:52:25',16),(17,'Souris',2,20000,'2024-10-07 04:02:20','2024-10-07 04:02:20',17),(18,'Clavier ',2,40000,'2024-10-07 04:02:20','2024-10-07 04:02:20',17),(19,'e;em 1',2,10000,'2024-10-07 14:47:35','2024-10-07 14:47:35',18),(20,'elem 2',1,20000,'2024-10-07 14:47:35','2024-10-07 14:47:35',18),(21,'Sono',1,1000000,'2024-10-08 05:32:05','2024-10-08 05:32:05',19),(22,'Stand',15,50000,'2024-10-08 05:32:05','2024-10-08 05:32:05',19),(23,'Dean',1,0,'2024-10-09 04:34:24','2024-10-09 04:34:24',NULL),(24,'sdrwerwe',1,0,'2024-10-09 04:36:00','2024-10-09 04:36:00',NULL),(25,'erouief',1,0,'2024-10-09 05:07:05','2024-10-09 05:07:05',NULL),(26,'WER',1,0,'2024-10-09 05:07:57','2024-10-09 05:07:57',NULL),(27,'EOPRIE',1,0,'2024-10-09 05:08:44','2024-10-09 05:08:44',NULL),(28,'OPREIWPR',1,0,'2024-10-09 05:09:54','2024-10-09 05:09:54',NULL),(29,'230492-3049',1,0,'2024-10-09 05:39:15','2024-10-09 05:39:15',NULL),(30,'wtwe',1,0,'2024-10-09 05:39:15','2024-10-09 05:39:15',NULL),(31,'ewrw',1,0,'2024-10-09 05:41:50','2024-10-09 05:41:50',NULL),(32,'LKJFA',1,0,'2024-10-09 05:51:26','2024-10-09 05:51:26',NULL),(33,'wweiro',1,0,'2024-10-09 05:52:33','2024-10-09 05:52:33',NULL),(34,'PDF genere ',3,45000,'2024-10-09 09:42:45','2024-10-09 09:42:45',30),(40,'STAT NIF',1,0,'2024-10-09 13:41:27','2024-10-09 13:41:27',36),(41,'STAT NIF',2,120000,'2024-10-09 13:49:15','2024-10-09 13:49:15',37),(42,'STAT',1,50000,'2024-10-09 13:49:15','2024-10-09 13:49:15',37),(43,'Achat de paquet de feutre',3,15000,'2024-10-09 13:55:14','2024-10-09 13:55:14',38),(44,'Pack de feutre',20,15000,'2024-10-18 10:45:48','2024-10-18 10:45:48',39),(45,'Test',2,5000,'2024-10-18 10:45:48','2024-10-18 10:45:48',39),(46,'Pack de feutre',1,2000000,'2024-10-26 15:40:31','2024-10-26 15:40:31',40);
/*!40000 ALTER TABLE `command_elements` ENABLE KEYS */;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raison` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isBc` tinyint(1) NOT NULL DEFAULT '0',
  `isInterne` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `status` enum('en attente','refuse','valide','debloque') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `univ_certification_id` bigint unsigned DEFAULT NULL,
  `validated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commands_utilisateur_id_foreign` (`utilisateur_id`),
  KEY `commands_univ_certification_id_foreign` (`univ_certification_id`),
  CONSTRAINT `commands_univ_certification_id_foreign` FOREIGN KEY (`univ_certification_id`) REFERENCES `univ_certifications` (`id`) ON DELETE SET NULL,
  CONSTRAINT `commands_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (4,'Anderson','034 79 424 28','Simple',1,0,'2024-10-01 18:24:13','2024-10-01 18:24:13',17,'en attente',NULL,NULL),(5,'Test','409 27 349 01','test pour la fete',0,0,'2024-10-02 09:03:07','2024-10-02 09:03:07',17,'valide',NULL,NULL),(6,'Demandeur','973 92 047 02','KJDOSkdas',1,0,'2024-10-02 09:08:20','2024-10-07 03:40:48',17,'en attente',NULL,NULL),(7,'Simplet','034 79 424 28','Simple Bon de command',1,0,'2024-10-02 12:54:13','2024-10-07 14:39:50',17,'valide',NULL,NULL),(8,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',17,'refuse',NULL,NULL),(9,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-04 17:49:49',17,'refuse',NULL,NULL),(10,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',17,'debloque',NULL,NULL),(11,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-10 13:43:04',17,'valide',NULL,'2024-10-10 15:43:04'),(12,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',17,'en attente',NULL,NULL),(13,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',17,'en attente',NULL,NULL),(14,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-07 12:50:58',17,'refuse',NULL,NULL),(15,'Anderson','834 70 237 48','Test',1,0,'2024-10-03 04:03:10','2024-10-03 04:03:10',17,'en attente',NULL,NULL),(16,'Pdg','043 47 942 42','Nouveau materiels scolaire',0,0,'2024-10-04 17:52:25','2024-10-07 14:29:23',18,'debloque',NULL,NULL),(17,'Luco Ramaromanana','034 78 292 83','Materiel et equipement informatique',0,0,'2024-10-07 04:02:20','2024-10-08 03:52:48',18,'valide',NULL,NULL),(18,'Luco','054 76 585 85','Test pour presentation',1,0,'2024-10-07 14:47:35','2024-10-08 03:58:36',18,'valide',NULL,NULL),(19,'TEst','304 92 034 02','SImple BC',1,0,'2024-10-08 05:32:05','2024-10-08 05:37:39',18,'debloque',NULL,NULL),(30,'Test PDF','010 10 292 92','Test de generation de pdf',0,0,'2024-10-09 09:42:45','2024-10-09 09:42:45',18,'valide',NULL,NULL),(36,'Luco','020 39 392 81','WIth NIF STAT',0,0,'2024-10-09 13:41:27','2024-10-09 13:41:27',18,'valide',1,NULL),(37,'Luco','034 19 718 71','WIth NIF STAT',1,1,'2024-10-09 13:49:15','2024-10-09 13:49:15',18,'en attente',NULL,NULL),(38,'Luco','029 30 129 03','Simple Note de frais',0,0,'2024-10-09 13:55:14','2024-10-09 13:55:14',18,'valide',1,NULL),(39,'Luco','034 85 859 59','Simple test',1,0,'2024-10-18 10:45:47','2024-10-18 10:48:28',18,'debloque',1,'2024-10-18 12:47:26'),(40,'Anderson','034 85 859 59','Besoin de cash urgent',1,1,'2024-10-26 15:40:31','2024-10-26 15:43:00',17,'valide',NULL,'2024-10-26 17:43:00');
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;

--
-- Table structure for table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaires` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `text` text NOT NULL,
  `auteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `publicationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nombre_commentaire` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auteurId` (`auteurId`),
  KEY `publicationId` (`publicationId`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`auteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`publicationId`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentaires_ibfk_3` FOREIGN KEY (`parentId`) REFERENCES `commentaires` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires`
--

/*!40000 ALTER TABLE `commentaires` DISABLE KEYS */;
INSERT INTO `commentaires` VALUES ('4659c26f-33de-4e9f-b579-540886e6cbc6','Ayyy inona itony','abd2dd19-fcde-419c-97ea-58b18068dc10','abafd70e-e5b8-47cb-9f03-2d6cdf3fe501',NULL,0,'2024-11-15 19:28:42','2024-11-15 19:28:42');
/*!40000 ALTER TABLE `commentaires` ENABLE KEYS */;

--
-- Table structure for table `compte_details`
--

DROP TABLE IF EXISTS `compte_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compte_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom_banque` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rib` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localisation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nature_compte` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `compte_id` bigint unsigned DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `compte_details_compte_id_foreign` (`compte_id`),
  CONSTRAINT `compte_details_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compte_details`
--

/*!40000 ALTER TABLE `compte_details` DISABLE KEYS */;
INSERT INTO `compte_details` VALUES (3,'BNI','02','Antaninarenina','Compte courant','2024-10-17 05:14:33','2024-10-17 05:14:33',4,'Simple description'),(4,NULL,NULL,'Caisse de l\'université','Mobile Money','2024-10-22 06:11:11','2024-10-22 06:11:11',5,NULL),(5,NULL,NULL,'Université UACEEM','Compte de caisse','2024-10-22 06:12:28','2024-10-22 06:12:28',NULL,NULL),(6,NULL,NULL,'Universite ACEEM','Compte de caisse','2024-10-22 07:32:01','2024-10-22 07:32:01',7,NULL),(7,'BFG-Societe Generale','02','Antaninarenina','Compte de prélèvement','2024-11-01 18:30:17','2024-11-01 18:30:17',9,NULL);
/*!40000 ALTER TABLE `compte_details` ENABLE KEYS */;

--
-- Table structure for table `comptes`
--

DROP TABLE IF EXISTS `comptes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comptes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `numero_compte` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intitule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solde` decimal(15,2) NOT NULL DEFAULT '0.00',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `solde_minimal` decimal(15,2) NOT NULL DEFAULT '0.00',
  `isSoldeUpdated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `comptes_numero_compte_unique` (`numero_compte`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptes`
--

/*!40000 ALTER TABLE `comptes` DISABLE KEYS */;
INSERT INTO `comptes` VALUES (4,'98127409126699','BNI',28780000.00,'banque','2024-10-17 05:14:33','2024-10-28 07:47:09',3000000.00,1),(5,'0349624578','MVOLA caisse',258000.00,'mobile','2024-10-22 06:11:11','2024-10-27 10:39:22',100000.00,0),(7,'001','Caisse',1842000.00,'caisse','2024-10-22 07:32:01','2024-10-27 10:39:22',100000.00,0),(9,'8753022529386','BFV-SG',6000000.00,'banque','2024-11-01 18:30:17','2024-11-01 18:31:21',200000.00,1);
/*!40000 ALTER TABLE `comptes` ENABLE KEYS */;

--
-- Table structure for table `concours`
--

DROP TABLE IF EXISTS `concours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concours`
--

/*!40000 ALTER TABLE `concours` DISABLE KEYS */;
INSERT INTO `concours` VALUES (1,'Concours d\'entrer en L1','2024-09-05 05:27:14','2024-09-05 05:27:14');
/*!40000 ALTER TABLE `concours` ENABLE KEYS */;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cours` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `enseignementId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text,
  `fichiers` text,
  `datePublication` datetime DEFAULT NULL,
  `estPublie` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cours_enseignement_id` (`enseignementId`),
  KEY `cours_titre` (`titre`),
  CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`enseignementId`) REFERENCES `enseignements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cours`
--

/*!40000 ALTER TABLE `cours` DISABLE KEYS */;
INSERT INTO `cours` VALUES ('d2f0c0c4-bf9c-4cd1-8d39-99ee6e945406','0e9ae823-a143-11ef-89b9-80c5f2b98e29','ffdfbd','dfvdfvd','[]','2024-11-17 14:06:32',1,'2024-11-17 14:06:32','2024-11-17 14:06:32');
/*!40000 ALTER TABLE `cours` ENABLE KEYS */;

--
-- Table structure for table `emplois_du_temps`
--

DROP TABLE IF EXISTS `emplois_du_temps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emplois_du_temps` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nomMatiere` varchar(255) NOT NULL,
  `personnelId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `jour` enum('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi') NOT NULL,
  `heureDebut` time NOT NULL,
  `heureFin` time NOT NULL,
  `salle` varchar(255) NOT NULL,
  `couleur` varchar(255) NOT NULL DEFAULT 'bg-[#FFAA00]',
  `mention` varchar(255) NOT NULL,
  `niveau` varchar(255) NOT NULL,
  `parcours` varchar(255) NOT NULL,
  `anneeUniversitaire` varchar(255) NOT NULL,
  `semestre` int NOT NULL,
  `statut` enum('Actif','Inactif','Suspendu') NOT NULL DEFAULT 'Actif',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `personnelId` (`personnelId`),
  CONSTRAINT `emplois_du_temps_ibfk_1` FOREIGN KEY (`personnelId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emplois_du_temps`
--

/*!40000 ALTER TABLE `emplois_du_temps` DISABLE KEYS */;
INSERT INTO `emplois_du_temps` VALUES ('0f80b3de-529d-44d9-815c-c06d927fec15','CULTURE ET CIVILISATIONS MALAGASY','4e359a23-a0d1-11ef-ae23-40b0763c5df3','Vendredi','00:00:08','00:00:10','S001','bg-blue-100','DROIT','LICENCE 1','DROIT','2023-2024',1,'Actif','2024-11-14 10:13:57','2024-11-14 10:13:57'),('1017d560-5caa-41bc-9dce-11450992f997','Macroéconomie','8f7ddc9b-a0ce-11ef-ae23-40b0763c5df3','Mercredi','00:00:13','00:00:17','S002','bg-purple-500','ECONOMIE ET DEVELOPPEMENT','LICENCE 2','ECONOMIE ET DEVELOPPEMENT','2023-2024',4,'Actif','2024-11-13 16:22:25','2024-11-13 16:22:25'),('6669ad36-5730-49d2-84d5-50d3cd6fe9f3','Genre et Développement','53c022f1-a0d0-11ef-ae23-40b0763c5df3','Mardi','00:00:08','00:00:12','S002','bg-red-100','ECONOMIE ET DEVELOPPEMENT','LICENCE 2','ECONOMIE ET DEVELOPPEMENT','2023-2024',3,'Actif','2024-11-14 09:56:15','2024-11-14 09:56:15'),('c96e589a-2ebd-4827-9b89-a1aa2ec8fe7f','Informatique','53c02390-a0d0-11ef-ae23-40b0763c5df3','Vendredi','00:00:15','00:00:17','S003','bg-green-100','ECONOMIE ET DEVELOPPEMENT','LICENCE 2','ECONOMIE ET DEVELOPPEMENT','2023-2024',4,'Actif','2024-11-14 00:50:13','2024-11-14 00:50:13'),('f6e0c403-2307-433f-9b0a-c3d98c4a916c','CULTURE ET CIVILISATIONS MALAGASY','4e359a23-a0d1-11ef-ae23-40b0763c5df3','Lundi','00:00:08','00:00:10','S003','bg-blue-100','DROIT','LICENCE 1','DROIT','2023-2024',1,'Actif','2024-11-14 00:49:31','2024-11-14 00:49:31');
/*!40000 ALTER TABLE `emplois_du_temps` ENABLE KEYS */;

--
-- Table structure for table `enseignements`
--

DROP TABLE IF EXISTS `enseignements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enseignements` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `anneeUniversitaire` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `niveau` varchar(255) NOT NULL,
  `mention` varchar(255) NOT NULL,
  `semestre` int NOT NULL,
  `typeUE` enum('Fondamentale','Découverte','Méthodologie','Complementaire','Transversale') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nomMatiere` varchar(255) NOT NULL,
  `coursmagistraux` int DEFAULT '0',
  `travauxDiriges` int DEFAULT '0',
  `volumeHoraireTotal` int NOT NULL,
  `credits` float NOT NULL DEFAULT '0',
  `coefficient` float NOT NULL DEFAULT '0',
  `nomEnseignant` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `prenomEnseignant` varchar(255) DEFAULT NULL,
  `titreEnseignant` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `personnelId` char(50) DEFAULT NULL,
  `travauxPratiques` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enseignements`
--

/*!40000 ALTER TABLE `enseignements` DISABLE KEYS */;
INSERT INTO `enseignements` VALUES ('0e84a374-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Fondamentale','DROIT ADMINISTRATIF GENERAL I',30,5,40,0,0,'RAMAHANDRY','Tsirava Maurice','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a5c-a0d1-11ef-ae23-40b0763c5df3',5),('0e888cbb-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Fondamentale','DROIT COMMERCIAL I',30,10,40,0,0,'ANDRIANASOLO','Léon','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a70-a0d1-11ef-ae23-40b0763c5df3',0),('0e8ae4e7-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Fondamentale','DROIT DES OBLIGATIONS I',30,10,40,0,0,'RAKOTONDRAMASY','Franck','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e3599d5-a0d1-11ef-ae23-40b0763c5df3',0),('0e8d5cd5-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Fondamentale','DROIT PENAL GENERAL I',30,10,40,0,0,'RASAMIMANANA','Livasoa','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a85-a0d1-11ef-ae23-40b0763c5df3',0),('0e8fab3b-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Complementaire','DROIT BUDGETAIRE I',20,0,20,0,0,'ANDRIAMBOLATIANA','Parson','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a99-a0d1-11ef-ae23-40b0763c5df3',0),('0e91f03c-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Complementaire','PROCEDURE PENALE I',20,0,20,0,0,'RASAMIMANANA','Livasoa','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a85-a0d1-11ef-ae23-40b0763c5df3',0),('0e945666-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Complementaire','INTRODUCTION A LA SCIENCE POLITIQUE I',20,0,20,0,0,'RALAMBOSON','Hantsa','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359aad-a0d1-11ef-ae23-40b0763c5df3',0),('0e9874c5-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Transversale','PRAGMATIQUE LINGUISTIQUE',10,5,15,0,0,'ANDRIANAIVO','Fanja','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e3599ff-a0d1-11ef-ae23-40b0763c5df3',0),('0e9ae823-a143-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 2','DROIT',3,'Transversale','DYNAMIQUE INTERCULTURELLE',10,5,15,0,0,'RAHARISOA','Aimée','professeur','2024-11-13 01:11:25','2024-11-13 01:11:25','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0),('494a94b5-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CIVIL I',20,10,40,4,4,'ANDRIANANDRASANA','Joelle','professeur','2024-11-13 00:51:35','2024-11-13 00:51:35','4e359971-a0d1-11ef-ae23-40b0763c5df3',0),('494cff3b-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CONSTITUTIONNEL I',20,10,40,4,4,'ANDRIANALY','Jacquelin','professeur','2024-11-13 00:51:35','2024-11-13 00:51:35','4e3599be-a0d1-11ef-ae23-40b0763c5df3',0),('494f95fe-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','INTRODUCTION A L\'ETUDE DU DROIT I',20,10,40,4,4,'RAKOTONDRAMASY','Franck','professeur','2024-11-13 00:51:35','2024-11-13 00:51:35','4e3599d5-a0d1-11ef-ae23-40b0763c5df3',0),('4952302a-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','METHODOLOGIE JURIDIQUE I',20,10,30,3,3,'RASAMIMANANA','Livasoa','professeur','2024-11-13 00:51:35','2024-11-13 00:51:35','4e359a85-a0d1-11ef-ae23-40b0763c5df3',0),('53c2c4ad-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Fondamentale','Microéconomie',25,10,35,3.5,3.5,'ANDRIAMIFALIHARIMANANA','Rado','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd2af-a0ce-11ef-ae23-40b0763c5df3',0),('53c2c677-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Fondamentale','Problèmes économiques contemporains',25,10,35,3.5,3.5,'MANDRARA','Thosun Eric','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7ddd7b-a0ce-11ef-ae23-40b0763c5df3',0),('53c2c6e5-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Fondamentale','Genre et Développement',25,10,35,3.5,3.5,'RAZAFIMANDIMBY','Malalatiana','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c022f1-a0d0-11ef-ae23-40b0763c5df3',0),('53c2c7fc-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Fondamentale','Développement Local et son financement',25,10,35,3.5,3,'RAVELONTSALAMA','Miora','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c02327-a0d0-11ef-ae23-40b0763c5df3',0),('53c57563-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Découverte','Statistiques Mathématiques',25,10,35,3.5,3.5,'RAKOTOARIMANANA','Tsiriheriniana','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd900-a0ce-11ef-ae23-40b0763c5df3',0),('53c576d2-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Découverte','Algèbre II',25,10,35,3.5,3.5,'RAZAFIZANAKA','Giannot','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd79e-a0ce-11ef-ae23-40b0763c5df3',0),('53c57825-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Découverte','Sociologie des organisations',20,10,30,3,3,'RAZAFIMANDIMBY','Rian\'aina','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dde54-a0ce-11ef-ae23-40b0763c5df3',0),('53c7ccad-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Méthodologie','Droit du développement',15,5,20,2,2,'ROBIVELO','Marie Michel','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c0233c-a0d0-11ef-ae23-40b0763c5df3',0),('53c7cf10-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',3,'Méthodologie','Chinois',10,5,15,1.5,2,'ROBIJAONA','Nomena','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c0234e-a0d0-11ef-ae23-40b0763c5df3',0),('53ca2eae-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Fondamentale','Macroéconomie',25,10,35,3.5,3.5,'RANDRIANARIMANANA','Andoniaina Charles','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7ddc9b-a0ce-11ef-ae23-40b0763c5df3',0),('53ca2ff3-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Fondamentale','Démographie',25,10,35,3.5,3.5,'RAZAFIMANJATO','Jocelyn Yves','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c02360-a0d0-11ef-ae23-40b0763c5df3',0),('53ca321a-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Fondamentale','Economie du développement',25,10,35,3.5,3.5,'RAZAFINDRALAMBO','Manohisoa','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd615-a0ce-11ef-ae23-40b0763c5df3',0),('53ca33a6-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Fondamentale','Comptabilité nationale',25,10,35,3.5,3.5,'ANDRIAMIFALIHARIMANANA','Rado','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd2af-a0ce-11ef-ae23-40b0763c5df3',0),('53cd9c07-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Découverte','Programmation linéaire',25,10,35,3.5,3.5,'RAZAFIZANAKA','Giannot','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','8f7dd79e-a0ce-11ef-ae23-40b0763c5df3',0),('53cd9d2d-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Découverte','Mathématiques Financières',25,10,30,3.5,3.5,'RAZAFINJATOVO','Heriniaina','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c02371-a0d0-11ef-ae23-40b0763c5df3',0),('53cd9e4c-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Découverte','Technique bancaire',20,10,30,3,3.5,'RAKOTOZAFY','Rivo John','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c02381-a0d0-11ef-ae23-40b0763c5df3',0),('53cd9f55-a0d0-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 2','ECONOMIE ET DEVELOPPEMENT',4,'Méthodologie','Informatique',15,5,20,2,2,'ANDRIAMANOHISOA','Hery Zo','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09','53c02390-a0d0-11ef-ae23-40b0763c5df3',0),('8957a917-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CIVIL I',20,10,40,4,4,'ANDRIANANDRASANA','Joelle','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e359971-a0d1-11ef-ae23-40b0763c5df3',0),('895a0d5f-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CONSTITUTIONNEL I',20,10,40,4,4,'ANDRIANALY','Jacquelin','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e3599be-a0d1-11ef-ae23-40b0763c5df3',0),('895ff42a-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','INTRODUCTION A L\'ETUDE DU DROIT I',20,10,40,4,4,'RAKOTONDRAMASY','Franck','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e3599d5-a0d1-11ef-ae23-40b0763c5df3',0),('89634cf1-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','METHODOLOGIE JURIDIQUE I',20,10,30,3,3,'RASAMIMANANA','Livasoa','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e359a85-a0d1-11ef-ae23-40b0763c5df3',0),('8965ab80-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','HISTOIRE DU DROIT ET DES INSTITUTIONS I',20,0,20,2,2,'ANDRINETRAZAFY','Hemerson','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e3599ec-a0d1-11ef-ae23-40b0763c5df3',0),('8968327c-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','HISTOIRE ET CONNAISSANCES DE M/CAR I',20,0,20,2,2,'ANDRINETRAZAFY','Hemerson','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e3599ec-a0d1-11ef-ae23-40b0763c5df3',0),('896ae648-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','LINGUISTIQUE PRAGMATIQUE',15,5,20,2,2,'ANDRIANAIVO','Fanja','professeur','2024-11-13 00:53:22','2024-11-13 00:53:22','4e3599ff-a0d1-11ef-ae23-40b0763c5df3',0),('8b545ed3-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Fondamentale','Introduction à l\'économie',25,10,35,3.5,3.5,'RAZAFITRIMO','Ny Aina Lazaharijaona','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dcd6a-a0ce-11ef-ae23-40b0763c5df3',0),('8b5461c5-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Fondamentale','Microéconomie',25,10,35,3.5,3.5,'ANDRIAMIFALIHARIMANANA','Rado','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd2af-a0ce-11ef-ae23-40b0763c5df3',0),('8b546347-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Fondamentale','Histoire des Faits Economiques Mondiaux',25,10,35,3.5,3.5,'RANDRIAMAMPIANINA','Andy','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd4b5-a0ce-11ef-ae23-40b0763c5df3',0),('8b5464a3-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Fondamentale','Initiation au Etudes du développement',25,10,35,3.5,3.5,'RAZAFINDRALAMBO','Manohisoa','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd615-a0ce-11ef-ae23-40b0763c5df3',0),('8b5465e6-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Découverte','Mathématiques - Parties Algèbre 1',25,10,35,3.5,3.5,'RAZAFIZANAKA','Giannot','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd79e-a0ce-11ef-ae23-40b0763c5df3',0),('8b546742-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Découverte','Statistique Descriptive',25,10,35,3.5,3.5,'RAKOTOARIMANANA','Tsiriheriniana','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd900-a0ce-11ef-ae23-40b0763c5df3',0),('8b5468c0-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',1,'Découverte','Comptabilité général I',20,10,30,3,3,'ANDRIAMIHARIVOLAMENA','R. Jacob','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7ddb0c-a0ce-11ef-ae23-40b0763c5df3',0),('8b587476-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Fondamentale','Macroéconomie',25,10,35,3.5,3.5,'RANDRIANARIMANANA','Andoniaina Charles','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7ddc9b-a0ce-11ef-ae23-40b0763c5df3',0),('8b587676-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Fondamentale','Histoire des Pensées économiques',25,10,35,3.5,3.5,'MANDRARA','Thosun Eric','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7ddd7b-a0ce-11ef-ae23-40b0763c5df3',0),('8b58775e-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Fondamentale','Histoire des institutions',25,10,35,3.5,3.5,'RANDRIAMAMPIANINA','Andy','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd4b5-a0ce-11ef-ae23-40b0763c5df3',0),('8b58794f-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Fondamentale','Introduction à la Sociologie',25,10,35,3.5,3.5,'RAZAFIMANDIMBY','Rian\'aina','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dde54-a0ce-11ef-ae23-40b0763c5df3',0),('8b587a3c-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Découverte','Mathématiques - Parties Analyse',25,10,35,3.5,3.5,'RAZAFIZANAKA','Giannot','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd79e-a0ce-11ef-ae23-40b0763c5df3',0),('8b587b9a-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Découverte','Probabilité',25,10,35,3.5,3.5,'RAKOTOARIMANANA','Tsiriheriniana','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7dd900-a0ce-11ef-ae23-40b0763c5df3',0),('8b587cfe-a0cf-11ef-ae23-40b0763c5df3','2023-2024','LICENCE 1','ECONOMIE ET DEVELOPPEMENT',2,'Découverte','Comptabilité II Analytique des entreprises',20,10,30,3.5,3,'ANDRIAMIHARIVOLAMENA','R. Jacob','professeur','2024-11-12 11:24:32','2024-11-12 11:24:32','8f7ddb0c-a0ce-11ef-ae23-40b0763c5df3',0),('ba537f0b-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CIVIL I',20,10,40,4,4,'ANDRIANANDRASANA','Joelle','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e359971-a0d1-11ef-ae23-40b0763c5df3',0),('ba576e7b-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','DROIT CONSTITUTIONNEL I',20,10,40,4,4,'ANDRIANALY','Jacquelin','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e3599be-a0d1-11ef-ae23-40b0763c5df3',0),('ba59f0a5-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','INTRODUCTION A L\'ETUDE DU DROIT I',20,10,40,4,4,'RAKOTONDRAMASY','Franck','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e3599d5-a0d1-11ef-ae23-40b0763c5df3',0),('ba5cab89-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Fondamentale','METHODOLOGIE JURIDIQUE I',20,10,30,3,3,'RASAMIMANANA','Livasoa','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e359a85-a0d1-11ef-ae23-40b0763c5df3',0),('ba5f42f9-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','HISTOIRE DU DROIT ET DES INSTITUTIONS I',20,0,20,2,2,'ANDRINETRAZAFY','Hemerson','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e3599ec-a0d1-11ef-ae23-40b0763c5df3',0),('ba62112a-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','HISTOIRE ET CONNAISSANCES DE M/CAR I',20,0,20,2,2,'ANDRINETRAZAFY','Hemerson','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e3599ec-a0d1-11ef-ae23-40b0763c5df3',0),('ba64acbb-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Complementaire','LINGUISTIQUE PRAGMATIQUE',15,5,20,2,2,'ANDRIANAIVO','Fanja','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e3599ff-a0d1-11ef-ae23-40b0763c5df3',0),('ba6e5503-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Transversale','STATISTIQUES I',20,10,30,3,3,'RAHARISON','Noelin','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e359a10-a0d1-11ef-ae23-40b0763c5df3',0),('ba709f2c-a140-11ef-89b9-80c5f2b98e29','2023-2024','LICENCE 1','DROIT',1,'Transversale','CULTURE ET CIVILISATIONS MALAGASY',15,5,20,2,2,'RAHARISOA','Aimée','professeur','2024-11-13 00:54:44','2024-11-13 00:54:44','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0);
/*!40000 ALTER TABLE `enseignements` ENABLE KEYS */;

--
-- Table structure for table `etudiants`
--

DROP TABLE IF EXISTS `etudiants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etudiants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidat_id` bigint unsigned DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexe` enum('M','F') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_nais` date NOT NULL,
  `lieu_nais` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `situation_matri` enum('celibataire','marier','autre') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'celibataire',
  `num_cin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_cin` date NOT NULL,
  `lieu_cin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quartier` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etablissement_origine` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profession_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_mvola` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province_parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom_parent_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profession_parent_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel_parent_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `centre_interet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_changed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `groupes_id` bigint unsigned DEFAULT NULL,
  `mention_id` bigint unsigned DEFAULT NULL,
  `sous_groupes_id` bigint unsigned DEFAULT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_frere_soeurs` int NOT NULL,
  `etat_domicile` enum('seul','avec_personne') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etudiants_matricule_unique` (`matricule`),
  UNIQUE KEY `etudiants_num_cin_unique` (`num_cin`),
  UNIQUE KEY `etudiants_username_unique` (`username`),
  KEY `etudiants_candidat_id_foreign` (`candidat_id`),
  KEY `etudiants_groupes_id_foreign` (`groupes_id`),
  KEY `etudiants_mention_id_foreign` (`mention_id`),
  KEY `etudiants_sous_groupes_id_foreign` (`sous_groupes_id`),
  CONSTRAINT `etudiants_candidat_id_foreign` FOREIGN KEY (`candidat_id`) REFERENCES `candidats` (`id`) ON DELETE SET NULL,
  CONSTRAINT `etudiants_groupes_id_foreign` FOREIGN KEY (`groupes_id`) REFERENCES `groupes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `etudiants_mention_id_foreign` FOREIGN KEY (`mention_id`) REFERENCES `mentions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `etudiants_sous_groupes_id_foreign` FOREIGN KEY (`sous_groupes_id`) REFERENCES `sous_groupes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etudiants`
--

/*!40000 ALTER TABLE `etudiants` DISABLE KEYS */;
INSERT INTO `etudiants` VALUES (1,1,'photos/rBHS9fKr7DOM2hmYGynBbFQlhHCVq91MJo0gfKik.jpg','1','M','2000-12-15','Antananarivo','celibataire','201011028960','2019-01-09','Fianarantsoa','Lot 266A/3710','67HA','sabrino Lp','Collège Saint François Xavier Ambatomena',NULL,'RATOVOARIVONY Guillaume Marie Germain','Lot 244D/7890','Directeur de Bank Of Africa','0343101807',NULL,'Fianarantsoa',NULL,NULL,NULL,'Dance, TikTok, Lire, Parkour','$2y$12$Lj.mDNp72eK0/kt/2PmRVuf8aX7ZH0Lb1Zql.IHqjz5vAB9HHGf1m','sabrino',0,'2024-09-05 05:46:43','2024-09-05 05:46:43',NULL,NULL,NULL,NULL,'','','',0,'seul'),(2,2,NULL,'2','M','2004-06-08','Antananarivo','celibataire','201468455987','2019-11-21','Fianarantsoa','Lot 266A/3710','Ambohipo','voavy binea','Collège Saint Michelle Mahamasina','example@gmail.com','RATOVOARIVONY Andoniaina','Lot 2584C/7890','Secretaire','0332578945','0345897458','Antananarivo','Andriantefy Tsanta','Secretaire','0332598945','Dance, TikTok, Lire, Ecrire','$2y$12$j1XJhyTZSLYKwZWMTuJzjuJHtNPsws/SKvkeZ2o5H3GjbzKA/.82e','binea',0,'2024-09-09 09:43:12','2024-09-09 09:43:12',NULL,NULL,NULL,NULL,'','','',0,'seul'),(3,4,NULL,'3','M','2004-04-11','Fianarantsoa','celibataire','024897561564','2019-06-12','Fianarantsoa','Lot 266A/3712','Ankadifotsy',NULL,'Collège Saint Michelle Mahamasina',NULL,'RATOVOARIVONY Jean','Lot 2584C/7894','Directeur de BOA','0332577945',NULL,'Fianarantsoa',NULL,NULL,NULL,'Dance, TikTok, Lire','$2y$12$81/O/FG1Pg3nJAfhDC3e1.M5OcBdQ8G9axelUnKVeEp3806dMeuyi','john',0,'2024-09-09 10:17:00','2024-09-09 10:17:00',NULL,NULL,NULL,NULL,'','','',0,'seul'),(4,5,'photos/jc8UWFFKHHziAQrjd2Niv8cJbar366nXbyE0CrS8.jpg','4','M','2002-05-07','Antananarivo','celibataire','201460455987','2020-05-16','Antananarivo','Lot 265A/3712','Andavamamba',NULL,'Collège Saint François Xavier Ambatomena',NULL,'RATOVOARIVONY Voavy','Lot 2574C/7890','Directeur de BNI','0332778945',NULL,'Antananarivo',NULL,NULL,NULL,'Dance, Lire','$2y$12$f6FBeGULFYkecXq.7isF3edAM/jMFaUq8HFscPU88czJXOg4.zGai','voavy',0,'2024-09-09 10:28:40','2024-09-09 10:28:40',NULL,NULL,NULL,NULL,'Test Name','','',0,'seul'),(5,6,NULL,'5','M','2002-03-10','Fianarantsoa','celibataire','201498455987','2020-03-11','Fianarantsoa','Lot 266A/3719','-- Sélectionner --','henri VE','Collège Saint François Xavier Ambatomena',NULL,'RATOVOARIVONY Henri','Lot 2584C/7898','Directeur de BOA','0332577445',NULL,'-- Sélectionner --',NULL,NULL,NULL,'Lire','$2y$12$IeBrgRofXrqMJOOYRBtClOmidg4st9w4anfjvDpOxrZmO2DhK4NZ.','henri',0,'2024-09-10 04:01:02','2024-09-10 04:01:02',NULL,NULL,NULL,NULL,'','','',0,'seul'),(6,7,'photos/IwiLm3YrO3T4xjCkxELnFJDt5AoC1Gp12ZQgaZ6z.jpg','6','M','2003-07-10','Antananarivo','celibataire','024897561567','2019-02-16','Antananarivo','Lot 266A/3718','Anosizato',NULL,'Collège Saint François Xavier Ambatomena',NULL,'RATOVOARIVONY Desiré','Lot 2584C/7899','Directeur de BFV','0332587945',NULL,'Antananarivo',NULL,NULL,NULL,'Dance, TikTok, Lire, Parkour, Dormir','$2y$12$FqcNaKjraPxEnCj4bgJVYusIwnkIeEOVvtPR.31XA8KsYqo37wkgC','desiré',1,'2024-09-10 04:13:17','2024-09-10 04:13:17',NULL,NULL,NULL,NULL,'','','',0,'seul');
/*!40000 ALTER TABLE `etudiants` ENABLE KEYS */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `personnel_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `cours_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `notation` int NOT NULL,
  `commentaire` text,
  `date_publication` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_personnel_cours` (`personnel_id`,`cours_id`),
  KEY `cours_id` (`cours_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`cours_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES ('4507d736-9c04-421d-ba5e-3330ac8bdc99','20a89396-89e2-45ce-b195-8c58f06dacbb','d2f0c0c4-bf9c-4cd1-8d39-99ee6e945406',4,'Mety tsara ity raika ity','2024-11-17 14:07:31','2024-11-17 14:07:31','2024-11-17 14:07:31');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;

--
-- Table structure for table `forum_reactions`
--

DROP TABLE IF EXISTS `forum_reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_reactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `utilisateurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `forumId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reponseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` enum('reaction','partage') NOT NULL DEFAULT 'reaction',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_forum_reaction` (`utilisateurId`,`forumId`,`reponseId`,`type`),
  KEY `forum_reactions_forum_id` (`forumId`),
  KEY `forum_reactions_reponse_id` (`reponseId`),
  KEY `forum_reactions_utilisateur_id` (`utilisateurId`),
  CONSTRAINT `forum_reactions_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forum_reactions_ibfk_2` FOREIGN KEY (`forumId`) REFERENCES `forums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forum_reactions_ibfk_3` FOREIGN KEY (`reponseId`) REFERENCES `forum_reponses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_reactions`
--

/*!40000 ALTER TABLE `forum_reactions` DISABLE KEYS */;
INSERT INTO `forum_reactions` VALUES ('449b2ab2-8ece-4cc3-8027-01cf64c79d95','abd2dd19-fcde-419c-97ea-58b18068dc10','f4f0d9f4-134e-4078-9db5-15776e6f2102',NULL,'reaction','2024-11-14 20:52:03','2024-11-14 21:33:40'),('8e5b6072-3f48-4914-ac01-a40f0a591d6e','abd2dd19-fcde-419c-97ea-58b18068dc10','2c7ef636-1c7d-4f1c-92eb-8776dbf1a472',NULL,'reaction','2024-11-14 20:16:32','2024-11-14 20:35:14'),('94675150-b7f0-426d-a1fa-942ec31d12ba','4e359a23-a0d1-11ef-ae23-40b0763c5df3','2c7ef636-1c7d-4f1c-92eb-8776dbf1a472',NULL,'reaction','2024-11-14 20:44:55','2024-11-14 20:45:22'),('aa84bd3f-ff56-4627-ba27-f3df766dd33f','4e359a23-a0d1-11ef-ae23-40b0763c5df3','f4f0d9f4-134e-4078-9db5-15776e6f2102',NULL,'reaction','2024-11-14 21:33:42','2024-11-14 21:33:42');
/*!40000 ALTER TABLE `forum_reactions` ENABLE KEYS */;

--
-- Table structure for table `forum_reponses`
--

DROP TABLE IF EXISTS `forum_reponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_reponses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `forumId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `auteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `contenu` text NOT NULL,
  `nombreReactions` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `forum_reponses_forum_id` (`forumId`),
  KEY `forum_reponses_auteur_id` (`auteurId`),
  CONSTRAINT `forum_reponses_ibfk_1` FOREIGN KEY (`forumId`) REFERENCES `forums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forum_reponses_ibfk_2` FOREIGN KEY (`auteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_reponses`
--

/*!40000 ALTER TABLE `forum_reponses` DISABLE KEYS */;
INSERT INTO `forum_reponses` VALUES ('15cbe5f0-3bc3-4e28-926c-90d301a1c20e','f4f0d9f4-134e-4078-9db5-15776e6f2102','abd2dd19-fcde-419c-97ea-58b18068dc10','test',0,'2024-11-14 20:58:14','2024-11-14 20:58:14'),('77958033-ed49-4bd2-a246-6bf5af01a2af','2c7ef636-1c7d-4f1c-92eb-8776dbf1a472','4e359a23-a0d1-11ef-ae23-40b0763c5df3','vevevre',0,'2024-11-14 20:46:01','2024-11-14 20:46:01'),('89e284d1-b0a6-4512-9383-84328dbe5ed8','9e5431e7-b448-47bd-a3af-80b060a56963','abd2dd19-fcde-419c-97ea-58b18068dc10','de aona ry janjy',0,'2024-11-14 19:18:38','2024-11-14 19:18:38'),('ac1923a0-d169-4c12-a418-f31b27a2110e','9e5431e7-b448-47bd-a3af-80b060a56963','abd2dd19-fcde-419c-97ea-58b18068dc10','alors',0,'2024-11-14 19:18:28','2024-11-14 19:18:28'),('e7ac20c6-2d59-47db-b08c-688e7c0be6cc','2c7ef636-1c7d-4f1c-92eb-8776dbf1a472','abd2dd19-fcde-419c-97ea-58b18068dc10','allo',0,'2024-11-14 19:06:37','2024-11-14 19:06:37'),('eb2618e6-32fc-4fb6-ad00-534a81ed2aa1','2c7ef636-1c7d-4f1c-92eb-8776dbf1a472','abd2dd19-fcde-419c-97ea-58b18068dc10','vsfvfd',0,'2024-11-14 19:36:55','2024-11-14 19:36:55');
/*!40000 ALTER TABLE `forum_reponses` ENABLE KEYS */;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `auteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `motsCles` text,
  `audio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pieceJointes` text,
  `nombreReactions` int DEFAULT '0',
  `nombrePartages` int DEFAULT '0',
  `estEtendu` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `forums_auteur_id` (`auteurId`),
  KEY `forums_categorie` (`categorie`),
  CONSTRAINT `forums_ibfk_1` FOREIGN KEY (`auteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` VALUES ('19879743-e29c-4650-a3e1-2a363f612ddb','abd2dd19-fcde-419c-97ea-58b18068dc10','dsvsfnvsfdbvdf','dfbdfbdsbsdvdfv dff df dsfffbsdfbsfdbsdfbsd','Général','[\"dfssbdsbd\",\"sfdb bsfdbdsfbds\",\"sdbdsfbdsbsfd\"]',NULL,'[]',0,0,0,'2024-11-14 18:00:51','2024-11-14 18:00:51',NULL),('245aa1ea-6c60-4fe9-87be-5734af936a54','abd2dd19-fcde-419c-97ea-58b18068dc10','Forum kely','mandeha ve ito sa tsy mandeha azafady?','Général','[\"mandeha be\",\"kely\"]','{\"nom\":\"audio-1731579119490-837002868\",\"chemin\":\"uploads/audio-1731579119490-837002868\",\"type\":\"audio/webm\",\"taille\":69511}','[{\"nom\":\"fichiers-1731579119492-153605983.pdf\",\"chemin\":\"uploads/fichiers-1731579119492-153605983.pdf\",\"type\":\"application/pdf\",\"taille\":3281464}]',0,0,0,'2024-11-14 17:11:59','2024-11-14 17:11:59',NULL),('2c7ef636-1c7d-4f1c-92eb-8776dbf1a472','abd2dd19-fcde-419c-97ea-58b18068dc10','bfdfbdf','d f daf adfdfa df adf sfvadfvadfbadf','Général','[\"dfafdafd afd\",\"dfa afd adf adf\"]',NULL,'[]',14,0,0,'2024-11-14 18:52:51','2024-11-14 20:51:26','2024-11-14 20:51:26'),('4f2a33eb-61e1-4e5e-ba8a-78d283c4622c','4e359a23-a0d1-11ef-ae23-40b0763c5df3','Ankizy kely','mety lty ilay izy anh, tena mety be mihintsy ilay izy','Technique','[\"test kely lessy\",\"vaovao lessy\"]',NULL,'[]',0,0,0,'2024-11-14 17:59:11','2024-11-14 17:59:11',NULL),('595babb0-cddd-460d-bc40-c72c82d8ac5c','abd2dd19-fcde-419c-97ea-58b18068dc10','Test','Dia ahoana ry janjy be ah? Inona ny vaovao','Général','[\"test kely\",\"mandeha sa tsia\"]','{\"nom\":\"audio-1731569452496-44463404\",\"chemin\":\"uploads/audio-1731569452496-44463404\",\"type\":\"audio/webm\",\"taille\":68043}','[{\"nom\":\"fichiers-1731569452497-577396350.pdf\",\"chemin\":\"uploads/fichiers-1731569452497-577396350.pdf\",\"type\":\"application/pdf\",\"taille\":3281464}]',0,0,0,'2024-11-14 14:30:52','2024-11-14 14:30:52',NULL),('9b8772bf-5fb9-4cff-a6de-cca702832225','abd2dd19-fcde-419c-97ea-58b18068dc10','Test','sdvdsf dsffbd fk vakdff vdf dsggb sdsg','Général','[\"dsvsdfv\",\"vdfbvdsfbsd\"]','{\"nom\":\"audio-1731569593267-107158961\",\"chemin\":\"uploads/audio-1731569593267-107158961\",\"type\":\"audio/webm\",\"taille\":32357}','[{\"nom\":\"fichiers-1731569593267-144786439.pdf\",\"chemin\":\"uploads/fichiers-1731569593267-144786439.pdf\",\"type\":\"application/pdf\",\"taille\":3281464}]',0,0,0,'2024-11-14 14:33:13','2024-11-14 14:33:13',NULL),('9e5431e7-b448-47bd-a3af-80b060a56963','4e359a23-a0d1-11ef-ae23-40b0763c5df3','vfdfvefffsfedbdsf','vfdbsdfbgbs','Technique','[\"bfgbfsgbgfs\",\"bgfsbsfgbgsf\"]',NULL,'[]',0,0,0,'2024-11-14 18:03:02','2024-11-14 18:03:02',NULL),('e44c1c70-ac22-4068-aaec-9bfd13af60dd','abd2dd19-fcde-419c-97ea-58b18068dc10','Nouveau Forum','Description du forum','Général','[\"nouveau\",\"forum\"]',NULL,'[]',0,0,0,'2024-11-14 15:54:14','2024-11-14 15:54:14',NULL),('f4f0d9f4-134e-4078-9db5-15776e6f2102','abd2dd19-fcde-419c-97ea-58b18068dc10','gegewgwe','gtwrgwrbwrwt','Général','[\"ebwervwe\",\"vewrvewrvw\"]',NULL,'[]',15,0,0,'2024-11-14 18:08:09','2024-11-17 00:39:28',NULL),('fb7815b0-b4b5-41dd-9d2a-ba8461b44e5b','abd2dd19-fcde-419c-97ea-58b18068dc10','Mety be','vaovao ato? Inona ny malaza any rall?','Technique','[\"test\",\"mety sa tsy mety\",\"vaovao\"]',NULL,'[{\"nom\":\"fichiers-1731579910349-720535193.pdf\",\"chemin\":\"uploads/fichiers-1731579910349-720535193.pdf\",\"type\":\"application/pdf\",\"taille\":3281464}]',0,0,0,'2024-11-14 17:25:10','2024-11-14 17:25:10',NULL);
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;

--
-- Table structure for table `frais_scolarites`
--

DROP TABLE IF EXISTS `frais_scolarites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frais_scolarites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `isComplet` tinyint(1) NOT NULL DEFAULT '0',
  `etudiant_id` bigint unsigned DEFAULT NULL,
  `niveau_id` bigint unsigned DEFAULT NULL,
  `annee_universitaire_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `frais_scolarites_etudiant_id_foreign` (`etudiant_id`),
  KEY `frais_scolarites_niveau_id_foreign` (`niveau_id`),
  KEY `frais_scolarites_annee_universitaire_id_foreign` (`annee_universitaire_id`),
  CONSTRAINT `frais_scolarites_annee_universitaire_id_foreign` FOREIGN KEY (`annee_universitaire_id`) REFERENCES `annee_universitaires` (`id`) ON DELETE SET NULL,
  CONSTRAINT `frais_scolarites_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `frais_scolarites_niveau_id_foreign` FOREIGN KEY (`niveau_id`) REFERENCES `niveaux` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frais_scolarites`
--

/*!40000 ALTER TABLE `frais_scolarites` DISABLE KEYS */;
/*!40000 ALTER TABLE `frais_scolarites` ENABLE KEYS */;

--
-- Table structure for table `groupes`
--

DROP TABLE IF EXISTS `groupes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `niveaux_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groupes_niveaux_id_foreign` (`niveaux_id`),
  CONSTRAINT `groupes_niveaux_id_foreign` FOREIGN KEY (`niveaux_id`) REFERENCES `niveaux` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupes`
--

/*!40000 ALTER TABLE `groupes` DISABLE KEYS */;
INSERT INTO `groupes` VALUES (2,'C1','Communication groupe 01',4,'2024-09-11 02:59:40','2024-09-11 03:04:17'),(3,'D1','Droit 01',5,'2024-09-12 03:51:20','2024-09-12 03:51:20');
/*!40000 ALTER TABLE `groupes` ENABLE KEYS */;

--
-- Table structure for table `inscriptions`
--

DROP TABLE IF EXISTS `inscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `is_payement_ok` tinyint(1) NOT NULL DEFAULT '0',
  `niveau_id` bigint unsigned DEFAULT NULL,
  `annee_univ_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule_id` bigint unsigned DEFAULT NULL,
  `is_email_sent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `inscriptions_niveaux_id_foreign` (`niveau_id`),
  KEY `inscriptions_annee_univ_id_foreign` (`annee_univ_id`),
  KEY `inscriptions_matricule_id_foreign` (`matricule_id`),
  CONSTRAINT `inscriptions_annee_univ_id_foreign` FOREIGN KEY (`annee_univ_id`) REFERENCES `annee_universitaires` (`id`) ON DELETE SET NULL,
  CONSTRAINT `inscriptions_matricule_id_foreign` FOREIGN KEY (`matricule_id`) REFERENCES `matricules` (`id`) ON DELETE SET NULL,
  CONSTRAINT `inscriptions_niveaux_id_foreign` FOREIGN KEY (`niveau_id`) REFERENCES `niveaux` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscriptions`
--

/*!40000 ALTER TABLE `inscriptions` DISABLE KEYS */;
INSERT INTO `inscriptions` VALUES (1,1,5,1,'2024-10-01 11:15:20','2024-10-01 11:15:20',3,0),(2,1,6,1,'2024-10-01 11:18:10','2024-10-01 11:18:10',2,0),(3,0,7,1,'2024-09-24 11:14:56','2024-09-24 11:14:56',4,0),(4,0,5,1,'2024-09-26 04:12:40','2024-09-26 04:12:40',1,0),(5,0,5,1,'2024-10-01 10:47:51','2024-10-01 10:47:51',5,0);
/*!40000 ALTER TABLE `inscriptions` ENABLE KEYS */;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

--
-- Table structure for table `journal_activites`
--

DROP TABLE IF EXISTS `journal_activites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_activites` (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `compte_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journal_activites_transaction_id_foreign` (`transaction_id`),
  KEY `journal_activites_utilisateur_id_foreign` (`utilisateur_id`),
  KEY `journal_activites_compte_id_foreign` (`compte_id`),
  CONSTRAINT `journal_activites_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `journal_activites_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `journal_activites_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal_activites`
--

/*!40000 ALTER TABLE `journal_activites` DISABLE KEYS */;
INSERT INTO `journal_activites` VALUES ('TRC-\n1730021862-WQuesJad','consultation','Consultation d\'un compte.','2024-10-27 08:37:42','2024-10-27 08:37:42',NULL,17,7),('TRC-1729679771-d19PJ44D','creation',NULL,'2024-10-23 08:36:11','2024-10-23 08:36:11','TRC-1729679771-uFbAnklH',17,NULL),('TRC-1729679771-YwwE9wYD','consultation','Consultation d\'un compte.','2024-10-23 08:36:11','2024-10-23 08:36:11',NULL,17,5),('TRC-1729679771-ZofEoFiJ','transaction','Creation d\'une transaction.','2024-10-23 08:36:11','2024-10-23 08:36:11','TRC-1729679771-uFbAnklH',17,NULL),('TRC-1729679885-5pP8HSVX','creation',NULL,'2024-10-23 08:38:05','2024-10-23 08:38:05','TRC-1729679885-PWPgy3BN',17,NULL),('TRC-1729679885-Ax2AhVTx','transaction','Creation d\'une transaction.','2024-10-23 08:38:05','2024-10-23 08:38:05','TRC-1729679885-PWPgy3BN',17,NULL),('TRC-1729679885-V1RMkQLO','consultation','Consultation d\'un compte.','2024-10-23 08:38:05','2024-10-23 08:38:05',NULL,17,7),('TRC-1729679931-5fU8ZJn3','consultation','Consultation d\'un compte.','2024-10-23 08:38:51','2024-10-23 08:38:51',NULL,17,7),('TRC-1729679931-eg8Qpi71','transaction','Creation d\'une transaction.','2024-10-23 08:38:51','2024-10-23 08:38:51','TRC-1729679931-FOC6tjBf',17,NULL),('TRC-1729679931-VEc2DIaB','creation',NULL,'2024-10-23 08:38:51','2024-10-23 08:38:51','TRC-1729679931-FOC6tjBf',17,NULL),('TRC-1729680218-Lh2xiITU','creation',NULL,'2024-10-23 08:43:38','2024-10-23 08:43:38','TRC-1729680218-Iv7HU6rK',17,NULL),('TRC-1729680218-oIhWTnZP','transaction','Creation d\'une transaction.','2024-10-23 08:43:38','2024-10-23 08:43:38','TRC-1729680218-Iv7HU6rK',17,NULL),('TRC-1729680218-OPUTMp51','consultation','Consultation d\'un compte.','2024-10-23 08:43:38','2024-10-23 08:43:38',NULL,17,5),('TRC-1729680246-auIjEKU8','transaction','Creation d\'une transaction.','2024-10-23 08:44:06','2024-10-23 08:44:06','TRC-1729680246-fkgJ6ox3',17,NULL),('TRC-1729680246-qZOeUIln','consultation','Consultation d\'un compte.','2024-10-23 08:44:06','2024-10-23 08:44:06',NULL,17,7),('TRC-1729680246-V2yhVh3x','creation',NULL,'2024-10-23 08:44:06','2024-10-23 08:44:06','TRC-1729680246-fkgJ6ox3',17,NULL),('TRC-1729680277-cttfivka','transaction','Creation d\'une transaction.','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL',17,NULL),('TRC-1729680277-HpDhx99d','consultation','Consultation d\'un compte.','2024-10-23 08:44:37','2024-10-23 08:44:37',NULL,17,5),('TRC-1729680277-jx7FWBC2','consultation','Consultation d\'un compte.','2024-10-23 08:44:37','2024-10-23 08:44:37',NULL,17,5),('TRC-1729680277-s1H2xUvA','creation',NULL,'2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL',17,NULL),('TRC-1729680277-vujxSMiK','consultation','Consultation d\'un compte.','2024-10-23 08:44:37','2024-10-23 08:44:37',NULL,17,7),('TRC-1729680870-GUTQ9KqC','transaction','Creation d\'une transaction.','2024-10-23 08:54:30','2024-10-23 08:54:30','TRC-1729680870-5GYTgype',17,NULL),('TRC-1729680870-k3cagcBl','consultation','Consultation d\'un compte.','2024-10-23 08:54:30','2024-10-23 08:54:30',NULL,17,5),('TRC-1729680870-WLmcVAgd','creation',NULL,'2024-10-23 08:54:30','2024-10-23 08:54:30','TRC-1729680870-5GYTgype',17,NULL),('TRC-1729680914-2VQtAC2c','creation',NULL,'2024-10-23 08:55:14','2024-10-23 08:55:14','TRC-1729680914-rnOOIL2F',17,NULL),('TRC-1729680914-Dl2z9I98','transaction','Creation d\'une transaction.','2024-10-23 08:55:14','2024-10-23 08:55:14','TRC-1729680914-rnOOIL2F',17,NULL),('TRC-1729680915-UuihPTiB','consultation','Consultation d\'un compte.','2024-10-23 08:55:15','2024-10-23 08:55:15',NULL,17,5),('TRC-1729681262-7CZultHE','consultation','Consultation d\'un compte.','2024-10-23 09:01:02','2024-10-23 09:01:02',NULL,17,7),('TRC-1729681262-LkybQ8OA','consultation','Consultation d\'un compte.','2024-10-23 09:01:02','2024-10-23 09:01:02',NULL,17,5),('TRC-1729681262-rbvjeRl9','creation',NULL,'2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f',17,NULL),('TRC-1729681262-t4ooZEcU','transaction','Creation d\'une transaction.','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f',17,NULL),('TRC-1729681262-UXiHzwEN','consultation','Consultation d\'un compte.','2024-10-23 09:01:02','2024-10-23 09:01:02',NULL,17,5),('TRC-1729681983-424yHvGX','consultation','Consultation d\'un compte.','2024-10-23 09:13:03','2024-10-23 09:13:03',NULL,17,5),('TRC-1729681983-dSeDtHMj','creation',NULL,'2024-10-23 09:13:03','2024-10-23 09:13:03','TRC-1729681983-GVV5uLxa',17,NULL),('TRC-1729681983-thz687us','transaction','Creation d\'une transaction.','2024-10-23 09:13:03','2024-10-23 09:13:03','TRC-1729681983-GVV5uLxa',17,NULL),('TRC-1729681997-YIKQxqtV','creation',NULL,'2024-10-23 09:13:17','2024-10-23 09:13:17','TRC-1729681997-dHJOVSma',17,NULL),('TRC-1729681998-5PUu3lTq','transaction','Creation d\'une transaction.','2024-10-23 09:13:18','2024-10-23 09:13:18','TRC-1729681997-dHJOVSma',17,NULL),('TRC-1729681998-SfkK3Ff8','consultation','Consultation d\'un compte.','2024-10-23 09:13:18','2024-10-23 09:13:18',NULL,17,5),('TRC-1729682298-6Bd1AM4w','consultation','Consultation d\'un compte.','2024-10-23 09:18:18','2024-10-23 09:18:18',NULL,17,5),('TRC-1729682298-HAVwthGA','creation',NULL,'2024-10-23 09:18:18','2024-10-23 09:18:18','TRC-1729682298-B6lrApeZ',17,NULL),('TRC-1729682298-ppWwgOPM','transaction','Creation d\'une transaction.','2024-10-23 09:18:18','2024-10-23 09:18:18','TRC-1729682298-B6lrApeZ',17,NULL),('TRC-1729682306-07H07S9J','consultation','Consultation d\'un compte.','2024-10-23 09:18:26','2024-10-23 09:18:26',NULL,17,5),('TRC-1729682306-8Qur6HYo','transaction','Creation d\'une transaction.','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9',17,NULL),('TRC-1729682306-c4nyqrxk','consultation','Consultation d\'un compte.','2024-10-23 09:18:26','2024-10-23 09:18:26',NULL,17,7),('TRC-1729682306-PGHjCA0W','consultation','Consultation d\'un compte.','2024-10-23 09:18:26','2024-10-23 09:18:26',NULL,17,5),('TRC-1729682306-w3osFymZ','creation',NULL,'2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9',17,NULL),('TRC-1729755628-aR5NxyNO','consultation','Consultation d\'un compte.','2024-10-24 05:40:28','2024-10-24 05:40:28',NULL,17,5),('TRC-1729755628-as5vsgS5','creation',NULL,'2024-10-24 05:40:28','2024-10-24 05:40:28','TRC-1729755627-hCjnaS1l',17,NULL),('TRC-1729755628-M3UStnrc','transaction','Creation d\'une transaction.','2024-10-24 05:40:28','2024-10-24 05:40:28','TRC-1729755627-hCjnaS1l',17,NULL),('TRC-1729755867-CU3MI9BI','transaction','Creation d\'une transaction.','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP',17,NULL),('TRC-1729755867-IAbYgMeC','consultation','Consultation d\'un compte.','2024-10-24 05:44:27','2024-10-24 05:44:27',NULL,17,5),('TRC-1729755867-icugFRmm','consultation','Consultation d\'un compte.','2024-10-24 05:44:27','2024-10-24 05:44:27',NULL,17,7),('TRC-1729755867-jvfki1AM','consultation','Consultation d\'un compte.','2024-10-24 05:44:27','2024-10-24 05:44:27',NULL,17,5),('TRC-1729755867-q2k82hTm','creation',NULL,'2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP',17,NULL),('TRC-1729756924-RHQhaB5v','consultation','Consultation d\'un compte.','2024-10-24 06:02:04','2024-10-24 06:02:04',NULL,17,4),('TRC-1729756990-yRS4ShZy','consultation','Consultation d\'un compte.','2024-10-24 06:03:10','2024-10-24 06:03:10',NULL,17,4),('TRC-1729758151-s2TOjnrD','consultation','Consultation d\'un compte.','2024-10-24 06:22:31','2024-10-24 06:22:31',NULL,17,4),('TRC-1729758162-ZEgdCSjV','consultation','Consultation d\'un compte.','2024-10-24 06:22:42','2024-10-24 06:22:42',NULL,17,4),('TRC-1729758314-ThAPVViw','consultation','Consultation d\'un compte.','2024-10-24 06:25:14','2024-10-24 06:25:14',NULL,17,4),('TRC-1729758318-LgZaefJD','consultation','Consultation d\'un compte.','2024-10-24 06:25:18','2024-10-24 06:25:18',NULL,17,4),('TRC-1729758328-n3jiW47Z','consultation','Consultation d\'un compte.','2024-10-24 06:25:28','2024-10-24 06:25:28',NULL,17,4),('TRC-1729758330-o2ubzwnt','consultation','Consultation d\'un compte.','2024-10-24 06:25:30','2024-10-24 06:25:30',NULL,17,4),('TRC-1729758334-CQE1VdZR','consultation','Consultation d\'un compte.','2024-10-24 06:25:34','2024-10-24 06:25:34',NULL,17,4),('TRC-1729758336-8CiE9IX7','consultation','Consultation d\'un compte.','2024-10-24 06:25:36','2024-10-24 06:25:36',NULL,17,4),('TRC-1729758346-UjAwgoeW','consultation','Consultation d\'un compte.','2024-10-24 06:25:46','2024-10-24 06:25:46',NULL,17,4),('TRC-1729758349-kTFP9YfL','consultation','Consultation d\'un compte.','2024-10-24 06:25:49','2024-10-24 06:25:49',NULL,17,4),('TRC-1729758363-w6IiFuHu','consultation','Consultation d\'un compte.','2024-10-24 06:26:03','2024-10-24 06:26:03',NULL,17,4),('TRC-1729758368-uKbS7mG3','consultation','Consultation d\'un compte.','2024-10-24 06:26:08','2024-10-24 06:26:08',NULL,17,4),('TRC-1729758378-VP9zZ6lo','consultation','Consultation d\'un compte.','2024-10-24 06:26:18','2024-10-24 06:26:18',NULL,17,4),('TRC-1729758578-2xX5kTck','consultation','Consultation d\'un compte.','2024-10-24 06:29:38','2024-10-24 06:29:38',NULL,17,4),('TRC-1729758581-RZrStrAQ','consultation','Consultation d\'un compte.','2024-10-24 06:29:41','2024-10-24 06:29:41',NULL,17,4),('TRC-1729758598-MzNFkUEM','consultation','Consultation d\'un compte.','2024-10-24 06:29:58','2024-10-24 06:29:58',NULL,17,4),('TRC-1729758600-C4TtMIYM','consultation','Consultation d\'un compte.','2024-10-24 06:30:00','2024-10-24 06:30:00',NULL,17,4),('TRC-1729758615-QROBHoSR','consultation','Consultation d\'un compte.','2024-10-24 06:30:15','2024-10-24 06:30:15',NULL,17,4),('TRC-1729758627-bJ3uOEHN','consultation','Consultation d\'un compte.','2024-10-24 06:30:27','2024-10-24 06:30:27',NULL,17,4),('TRC-1729758629-NT7XMFFI','consultation','Consultation d\'un compte.','2024-10-24 06:30:29','2024-10-24 06:30:29',NULL,17,4),('TRC-1729758649-Kqc6l3t4','consultation','Consultation d\'un compte.','2024-10-24 06:30:49','2024-10-24 06:30:49',NULL,17,4),('TRC-1729758658-sFWmX3NC','consultation','Consultation d\'un compte.','2024-10-24 06:30:58','2024-10-24 06:30:58',NULL,17,4),('TRC-1729759073-NB3U77ab','consultation','Consultation d\'un compte.','2024-10-24 06:37:53','2024-10-24 06:37:53',NULL,17,4),('TRC-1729759085-48iOt56O','consultation','Consultation d\'un compte.','2024-10-24 06:38:05','2024-10-24 06:38:05',NULL,17,4),('TRC-1729759089-Gos4kO4u','consultation','Consultation d\'un compte.','2024-10-24 06:38:09','2024-10-24 06:38:09',NULL,17,4),('TRC-1729759091-QCo5QSyt','consultation','Consultation d\'un compte.','2024-10-24 06:38:11','2024-10-24 06:38:11',NULL,17,4),('TRC-1729759102-sHBr2x7c','consultation','Consultation d\'un compte.','2024-10-24 06:38:22','2024-10-24 06:38:22',NULL,17,4),('TRC-1729759108-lupORMOR','consultation','Consultation d\'un compte.','2024-10-24 06:38:28','2024-10-24 06:38:28',NULL,17,4),('TRC-1729759118-CS6tOTs7','consultation','Consultation d\'un compte.','2024-10-24 06:38:38','2024-10-24 06:38:38',NULL,17,4),('TRC-1729759132-QhFMGkcY','consultation','Consultation d\'un compte.','2024-10-24 06:38:52','2024-10-24 06:38:52',NULL,17,4),('TRC-1729759137-ShqKM8hH','consultation','Consultation d\'un compte.','2024-10-24 06:38:57','2024-10-24 06:38:57',NULL,17,4),('TRC-1729759139-jdVuNwQf','consultation','Consultation d\'un compte.','2024-10-24 06:38:59','2024-10-24 06:38:59',NULL,17,4),('TRC-1729759144-4Pfo1mIL','consultation','Consultation d\'un compte.','2024-10-24 06:39:04','2024-10-24 06:39:04',NULL,17,4),('TRC-1729759150-BYlFpoae','consultation','Consultation d\'un compte.','2024-10-24 06:39:10','2024-10-24 06:39:10',NULL,17,4),('TRC-1729759155-o5UALpxk','consultation','Consultation d\'un compte.','2024-10-24 06:39:15','2024-10-24 06:39:15',NULL,17,4),('TRC-1729759164-G5jI9nnX','consultation','Consultation d\'un compte.','2024-10-24 06:39:24','2024-10-24 06:39:24',NULL,17,4),('TRC-1729759168-MCsAy2jP','consultation','Consultation d\'un compte.','2024-10-24 06:39:28','2024-10-24 06:39:28',NULL,17,4),('TRC-1729759359-JkevX5HN','consultation','Consultation d\'un compte.','2024-10-24 06:42:39','2024-10-24 06:42:39',NULL,17,4),('TRC-1729759360-tShmALPo','consultation','Consultation d\'un compte.','2024-10-24 06:42:40','2024-10-24 06:42:40',NULL,17,4),('TRC-1729759368-VCzK4909','consultation','Consultation d\'un compte.','2024-10-24 06:42:48','2024-10-24 06:42:48',NULL,17,4),('TRC-1729759374-vvYZFoxi','consultation','Consultation d\'un compte.','2024-10-24 06:42:54','2024-10-24 06:42:54',NULL,17,4),('TRC-1729759381-3WCQQw0t','consultation','Consultation d\'un compte.','2024-10-24 06:43:01','2024-10-24 06:43:01',NULL,17,4),('TRC-1729759383-92sPFoYI','consultation','Consultation d\'un compte.','2024-10-24 06:43:03','2024-10-24 06:43:03',NULL,17,4),('TRC-1729759387-NylzpvUU','consultation','Consultation d\'un compte.','2024-10-24 06:43:07','2024-10-24 06:43:07',NULL,17,4),('TRC-1729759405-ju4AiOQ1','consultation','Consultation d\'un compte.','2024-10-24 06:43:25','2024-10-24 06:43:25',NULL,17,4),('TRC-1729759413-cqRTOcQ7','consultation','Consultation d\'un compte.','2024-10-24 06:43:33','2024-10-24 06:43:33',NULL,17,4),('TRC-1729759733-uIjY2mOv','consultation','Consultation d\'un compte.','2024-10-24 06:48:53','2024-10-24 06:48:53',NULL,17,4),('TRC-1729759736-geHi2eJO','consultation','Consultation d\'un compte.','2024-10-24 06:48:56','2024-10-24 06:48:56',NULL,17,4),('TRC-1729759801-Xk0serQn','consultation','Consultation d\'un compte.','2024-10-24 06:50:01','2024-10-24 06:50:01',NULL,17,4),('TRC-1729759805-LtFOq9Qj','consultation','Consultation d\'un compte.','2024-10-24 06:50:05','2024-10-24 06:50:05',NULL,17,4),('TRC-1729759812-dkQm5z1m','consultation','Consultation d\'un compte.','2024-10-24 06:50:12','2024-10-24 06:50:12',NULL,17,4),('TRC-1729759822-n4w3PxXW','consultation','Consultation d\'un compte.','2024-10-24 06:50:22','2024-10-24 06:50:22',NULL,17,4),('TRC-1729759845-DF2s1h4h','consultation','Consultation d\'un compte.','2024-10-24 06:50:45','2024-10-24 06:50:45',NULL,17,4),('TRC-1729759851-K6nai0KX','consultation','Consultation d\'un compte.','2024-10-24 06:50:51','2024-10-24 06:50:51',NULL,17,4),('TRC-1729759857-ASjv5yfv','consultation','Consultation d\'un compte.','2024-10-24 06:50:57','2024-10-24 06:50:57',NULL,17,4),('TRC-1729759878-bH3fN4tk','consultation','Consultation d\'un compte.','2024-10-24 06:51:18','2024-10-24 06:51:18',NULL,17,4),('TRC-1729760060-ZQThhuUc','consultation','Consultation d\'un compte.','2024-10-24 06:54:20','2024-10-24 06:54:20',NULL,17,4),('TRC-1729760111-6wC6Lu4i','consultation','Consultation d\'un compte.','2024-10-24 06:55:11','2024-10-24 06:55:11',NULL,17,4),('TRC-1729760160-v926ZS0Z','consultation','Consultation d\'un compte.','2024-10-24 06:56:00','2024-10-24 06:56:00',NULL,17,4),('TRC-1729760176-XQgD6tHR','consultation','Consultation d\'un compte.','2024-10-24 06:56:16','2024-10-24 06:56:16',NULL,17,4),('TRC-1729760184-rJ2WynvJ','consultation','Consultation d\'un compte.','2024-10-24 06:56:24','2024-10-24 06:56:24',NULL,17,4),('TRC-1729760200-NGFxr8cX','consultation','Consultation d\'un compte.','2024-10-24 06:56:40','2024-10-24 06:56:40',NULL,17,4),('TRC-1729760206-rueL2ruL','consultation','Consultation d\'un compte.','2024-10-24 06:56:46','2024-10-24 06:56:46',NULL,17,4),('TRC-1729760231-jsX92yLH','consultation','Consultation d\'un compte.','2024-10-24 06:57:11','2024-10-24 06:57:11',NULL,17,4),('TRC-1729760236-0TO8mrgy','consultation','Consultation d\'un compte.','2024-10-24 06:57:16','2024-10-24 06:57:16',NULL,17,4),('TRC-1729760330-2WzP57vW','consultation','Consultation d\'un compte.','2024-10-24 06:58:50','2024-10-24 06:58:50',NULL,17,4),('TRC-1729760350-3JPaOgQD','consultation','Consultation d\'un compte.','2024-10-24 06:59:10','2024-10-24 06:59:10',NULL,17,4),('TRC-1729760354-BPYLDkPp','consultation','Consultation d\'un compte.','2024-10-24 06:59:14','2024-10-24 06:59:14',NULL,17,4),('TRC-1729760367-ZUf5EBzw','consultation','Consultation d\'un compte.','2024-10-24 06:59:27','2024-10-24 06:59:27',NULL,17,4),('TRC-1729760373-tJqWhlAp','consultation','Consultation d\'un compte.','2024-10-24 06:59:33','2024-10-24 06:59:33',NULL,17,4),('TRC-1729760387-1YRIaGUK','consultation','Consultation d\'un compte.','2024-10-24 06:59:47','2024-10-24 06:59:47',NULL,17,4),('TRC-1729760398-CAjOwDPi','consultation','Consultation d\'un compte.','2024-10-24 06:59:58','2024-10-24 06:59:58',NULL,17,4),('TRC-1729760412-1UZDnahm','consultation','Consultation d\'un compte.','2024-10-24 07:00:12','2024-10-24 07:00:12',NULL,17,4),('TRC-1729760419-EfUAPQe2','consultation','Consultation d\'un compte.','2024-10-24 07:00:19','2024-10-24 07:00:19',NULL,17,4),('TRC-1729760422-L1lpUjlF','consultation','Consultation d\'un compte.','2024-10-24 07:00:22','2024-10-24 07:00:22',NULL,17,4),('TRC-1729760438-I2DxghuR','consultation','Consultation d\'un compte.','2024-10-24 07:00:38','2024-10-24 07:00:38',NULL,17,4),('TRC-1729760442-GgEYBbvj','consultation','Consultation d\'un compte.','2024-10-24 07:00:42','2024-10-24 07:00:42',NULL,17,4),('TRC-1729760453-M77ePL1J','consultation','Consultation d\'un compte.','2024-10-24 07:00:53','2024-10-24 07:00:53',NULL,17,4),('TRC-1729760462-mcUegWso','consultation','Consultation d\'un compte.','2024-10-24 07:01:02','2024-10-24 07:01:02',NULL,17,4),('TRC-1729760478-BZyybfLD','consultation','Consultation d\'un compte.','2024-10-24 07:01:18','2024-10-24 07:01:18',NULL,17,4),('TRC-1729760489-4XLjeNzq','consultation','Consultation d\'un compte.','2024-10-24 07:01:29','2024-10-24 07:01:29',NULL,17,4),('TRC-1729760504-P4VrDGEC','consultation','Consultation d\'un compte.','2024-10-24 07:01:44','2024-10-24 07:01:44',NULL,17,4),('TRC-1729760516-VC9ohmlX','consultation','Consultation d\'un compte.','2024-10-24 07:01:56','2024-10-24 07:01:56',NULL,17,4),('TRC-1729760524-iYE0RUSC','consultation','Consultation d\'un compte.','2024-10-24 07:02:04','2024-10-24 07:02:04',NULL,17,4),('TRC-1729760531-ktbUbXts','consultation','Consultation d\'un compte.','2024-10-24 07:02:11','2024-10-24 07:02:11',NULL,17,4),('TRC-1729760549-a32PdsDn','consultation','Consultation d\'un compte.','2024-10-24 07:02:29','2024-10-24 07:02:29',NULL,17,4),('TRC-1729760583-xVShOOiu','consultation','Consultation d\'un compte.','2024-10-24 07:03:03','2024-10-24 07:03:03',NULL,17,4),('TRC-1729760593-107fHPqa','consultation','Consultation d\'un compte.','2024-10-24 07:03:13','2024-10-24 07:03:13',NULL,17,4),('TRC-1729760626-8SBjwsoQ','consultation','Consultation d\'un compte.','2024-10-24 07:03:46','2024-10-24 07:03:46',NULL,17,4),('TRC-1729760629-u9pu927G','consultation','Consultation d\'un compte.','2024-10-24 07:03:49','2024-10-24 07:03:49',NULL,17,4),('TRC-1729760646-CsCtrSdI','consultation','Consultation d\'un compte.','2024-10-24 07:04:06','2024-10-24 07:04:06',NULL,17,4),('TRC-1729760648-3mCiqrUw','consultation','Consultation d\'un compte.','2024-10-24 07:04:08','2024-10-24 07:04:08',NULL,17,4),('TRC-1729760667-tWCYura2','consultation','Consultation d\'un compte.','2024-10-24 07:04:27','2024-10-24 07:04:27',NULL,17,4),('TRC-1729760691-eUAtBz3m','consultation','Consultation d\'un compte.','2024-10-24 07:04:51','2024-10-24 07:04:51',NULL,17,4),('TRC-1729766316-T0KoTgYG','consultation','Consultation d\'un compte.','2024-10-24 08:38:36','2024-10-24 08:38:36',NULL,17,4),('TRC-1729766382-94Z3pCwF','consultation','Consultation d\'un compte.','2024-10-24 08:39:42','2024-10-24 08:39:42',NULL,17,4),('TRC-1729766400-QsNEL2wO','consultation','Consultation d\'un compte.','2024-10-24 08:40:00','2024-10-24 08:40:00',NULL,17,4),('TRC-1729766408-KHDcnEJc','consultation','Consultation d\'un compte.','2024-10-24 08:40:08','2024-10-24 08:40:08',NULL,17,4),('TRC-1729766419-t60rWNbt','consultation','Consultation d\'un compte.','2024-10-24 08:40:19','2024-10-24 08:40:19',NULL,17,4),('TRC-1729766432-oP6G1pa7','consultation','Consultation d\'un compte.','2024-10-24 08:40:32','2024-10-24 08:40:32',NULL,17,4),('TRC-1729766436-GQoWuxrL','consultation','Consultation d\'un compte.','2024-10-24 08:40:36','2024-10-24 08:40:36',NULL,17,4),('TRC-1729766440-fam9S79o','consultation','Consultation d\'un compte.','2024-10-24 08:40:40','2024-10-24 08:40:40',NULL,17,4),('TRC-1729766444-XxKP0G6H','consultation','Consultation d\'un compte.','2024-10-24 08:40:44','2024-10-24 08:40:44',NULL,17,4),('TRC-1729766482-wqL5ibjZ','consultation','Consultation d\'un compte.','2024-10-24 08:41:22','2024-10-24 08:41:22',NULL,17,4),('TRC-1729766562-i910IS7Y','consultation','Consultation d\'un compte.','2024-10-24 08:42:42','2024-10-24 08:42:42',NULL,17,4),('TRC-1729766575-on3S7dHQ','consultation','Consultation d\'un compte.','2024-10-24 08:42:55','2024-10-24 08:42:55',NULL,17,4),('TRC-1729766585-BKAbzZF1','consultation','Consultation d\'un compte.','2024-10-24 08:43:05','2024-10-24 08:43:05',NULL,17,4),('TRC-1729766590-l51rwAOx','consultation','Consultation d\'un compte.','2024-10-24 08:43:10','2024-10-24 08:43:10',NULL,17,4),('TRC-1729766617-JFLRZoGz','consultation','Consultation d\'un compte.','2024-10-24 08:43:37','2024-10-24 08:43:37',NULL,17,4),('TRC-1729766622-UCChX12D','consultation','Consultation d\'un compte.','2024-10-24 08:43:42','2024-10-24 08:43:42',NULL,17,4),('TRC-1729766629-csBGZu9k','consultation','Consultation d\'un compte.','2024-10-24 08:43:49','2024-10-24 08:43:49',NULL,17,4),('TRC-1729766634-0RNsPxT5','consultation','Consultation d\'un compte.','2024-10-24 08:43:54','2024-10-24 08:43:54',NULL,17,4),('TRC-1729766645-NTXyNAMT','consultation','Consultation d\'un compte.','2024-10-24 08:44:05','2024-10-24 08:44:05',NULL,17,4),('TRC-1729766653-us7jhLLP','consultation','Consultation d\'un compte.','2024-10-24 08:44:13','2024-10-24 08:44:13',NULL,17,4),('TRC-1729766660-V7M1umnH','consultation','Consultation d\'un compte.','2024-10-24 08:44:20','2024-10-24 08:44:20',NULL,17,4),('TRC-1729766669-2S5pAlJ0','consultation','Consultation d\'un compte.','2024-10-24 08:44:29','2024-10-24 08:44:29',NULL,17,7),('TRC-1729766747-MD0JP4Ad','consultation','Consultation d\'un compte.','2024-10-24 08:45:47','2024-10-24 08:45:47',NULL,17,7),('TRC-1729766765-JtoVgMDR','consultation','Consultation d\'un compte.','2024-10-24 08:46:05','2024-10-24 08:46:05',NULL,17,4),('TRC-1729766772-QDWur6RF','consultation','Consultation d\'un compte.','2024-10-24 08:46:12','2024-10-24 08:46:12',NULL,17,4),('TRC-1729767353-FHOkSeKx','consultation','Consultation d\'un compte.','2024-10-24 08:55:53','2024-10-24 08:55:53',NULL,17,5),('TRC-1729767360-hhQQNved','consultation','Consultation d\'un compte.','2024-10-24 08:56:00','2024-10-24 08:56:00',NULL,17,4),('TRC-1729767384-rOzJM8Jv','consultation','Consultation d\'un compte.','2024-10-24 08:56:24','2024-10-24 08:56:24',NULL,17,4),('TRC-1729768453-mWTNR2Tr','consultation','Consultation d\'un compte.','2024-10-24 09:14:13','2024-10-24 09:14:13',NULL,17,4),('TRC-1729768469-jTgg4kFn','consultation','Consultation d\'un compte.','2024-10-24 09:14:29','2024-10-24 09:14:29',NULL,17,4),('TRC-1729837350-mZtsa1Sb','consultation','Consultation d\'un compte.','2024-10-25 04:22:30','2024-10-25 04:22:30',NULL,17,4),('TRC-1729837355-wEgsN7Gy','consultation','Consultation d\'un compte.','2024-10-25 04:22:35','2024-10-25 04:22:35',NULL,17,7),('TRC-1729837394-7fWzaHtY','consultation','Consultation d\'un compte.','2024-10-25 04:23:14','2024-10-25 04:23:14',NULL,17,7),('TRC-1729837399-m0V5CBLb','consultation','Consultation d\'un compte.','2024-10-25 04:23:19','2024-10-25 04:23:19',NULL,17,7),('TRC-1729837409-DLxiMHTe','consultation','Consultation d\'un compte.','2024-10-25 04:23:29','2024-10-25 04:23:29',NULL,17,7),('TRC-1729837413-ucHbmktP','consultation','Consultation d\'un compte.','2024-10-25 04:23:33','2024-10-25 04:23:33',NULL,17,7),('TRC-1729837426-RlaBhlpQ','consultation','Consultation d\'un compte.','2024-10-25 04:23:46','2024-10-25 04:23:46',NULL,17,7),('TRC-1729837430-DtGgAskz','consultation','Consultation d\'un compte.','2024-10-25 04:23:50','2024-10-25 04:23:50',NULL,17,7),('TRC-1729837433-iGogQwQX','consultation','Consultation d\'un compte.','2024-10-25 04:23:53','2024-10-25 04:23:53',NULL,17,7),('TRC-1729837493-QmUx4oyb','consultation','Consultation d\'un compte.','2024-10-25 04:24:53','2024-10-25 04:24:53',NULL,17,7),('TRC-1729837513-MZ2NVkWb','consultation','Consultation d\'un compte.','2024-10-25 04:25:13','2024-10-25 04:25:13',NULL,17,7),('TRC-1729837535-4vVR0rvO','consultation','Consultation d\'un compte.','2024-10-25 04:25:35','2024-10-25 04:25:35',NULL,17,7),('TRC-1729837543-zmaDL3Pn','consultation','Consultation d\'un compte.','2024-10-25 04:25:43','2024-10-25 04:25:43',NULL,17,7),('TRC-1729837554-QoSSosIl','consultation','Consultation d\'un compte.','2024-10-25 04:25:54','2024-10-25 04:25:54',NULL,17,7),('TRC-1729837559-kkX1xLwh','consultation','Consultation d\'un compte.','2024-10-25 04:25:59','2024-10-25 04:25:59',NULL,17,7),('TRC-1729837588-lZ02ntJw','consultation','Consultation d\'un compte.','2024-10-25 04:26:28','2024-10-25 04:26:28',NULL,17,7),('TRC-1729837602-qYDEkHqv','consultation','Consultation d\'un compte.','2024-10-25 04:26:42','2024-10-25 04:26:42',NULL,17,7),('TRC-1729837612-VNiyYiFR','consultation','Consultation d\'un compte.','2024-10-25 04:26:52','2024-10-25 04:26:52',NULL,17,7),('TRC-1729837625-jMnywURL','consultation','Consultation d\'un compte.','2024-10-25 04:27:05','2024-10-25 04:27:05',NULL,17,7),('TRC-1729837635-E6EhEI9q','consultation','Consultation d\'un compte.','2024-10-25 04:27:15','2024-10-25 04:27:15',NULL,17,4),('TRC-1729837651-d4LuviJY','consultation','Consultation d\'un compte.','2024-10-25 04:27:31','2024-10-25 04:27:31',NULL,17,4),('TRC-1729837653-yVZ7UaQc','consultation','Consultation d\'un compte.','2024-10-25 04:27:33','2024-10-25 04:27:33',NULL,17,4),('TRC-1729837669-jNHpLMCW','consultation','Consultation d\'un compte.','2024-10-25 04:27:49','2024-10-25 04:27:49',NULL,17,4),('TRC-1729837671-HX1ncHuO','consultation','Consultation d\'un compte.','2024-10-25 04:27:51','2024-10-25 04:27:51',NULL,17,4),('TRC-1729837708-KVgzdfo0','consultation','Consultation d\'un compte.','2024-10-25 04:28:28','2024-10-25 04:28:28',NULL,17,4),('TRC-1729837725-LvAR9uav','consultation','Consultation d\'un compte.','2024-10-25 04:28:45','2024-10-25 04:28:45',NULL,17,4),('TRC-1729837745-D5Qs0CPw','consultation','Consultation d\'un compte.','2024-10-25 04:29:05','2024-10-25 04:29:05',NULL,17,4),('TRC-1729838738-KjudaIF5','consultation','Consultation d\'un compte.','2024-10-25 04:45:38','2024-10-25 04:45:38',NULL,17,4),('TRC-1729838740-uramAc4X','consultation','Consultation d\'un compte.','2024-10-25 04:45:40','2024-10-25 04:45:40',NULL,17,4),('TRC-1729838743-wRPjb2eA','consultation','Consultation d\'un compte.','2024-10-25 04:45:43','2024-10-25 04:45:43',NULL,17,4),('TRC-1729838749-m7KeGAOC','consultation','Consultation d\'un compte.','2024-10-25 04:45:49','2024-10-25 04:45:49',NULL,17,4),('TRC-1729840195-ZtQhwW1Y','consultation','Consultation d\'un compte.','2024-10-25 05:09:55','2024-10-25 05:09:55',NULL,17,4),('TRC-1729840223-sUvB5gpy','consultation','Consultation d\'un compte.','2024-10-25 05:10:23','2024-10-25 05:10:23',NULL,17,4),('TRC-1729840233-Mj8gfL7L','consultation','Consultation d\'un compte.','2024-10-25 05:10:33','2024-10-25 05:10:33',NULL,17,4),('TRC-1729840242-FYX1crTV','consultation','Consultation d\'un compte.','2024-10-25 05:10:42','2024-10-25 05:10:42',NULL,17,4),('TRC-1729840283-E7bjwxuF','consultation','Consultation d\'un compte.','2024-10-25 05:11:23','2024-10-25 05:11:23',NULL,17,4),('TRC-1729840286-vsLs9eij','consultation','Consultation d\'un compte.','2024-10-25 05:11:26','2024-10-25 05:11:26',NULL,17,4),('TRC-1729840356-W9xWzD43','consultation','Consultation d\'un compte.','2024-10-25 05:12:36','2024-10-25 05:12:36',NULL,17,4),('TRC-1729840390-bFJF9jsa','consultation','Consultation d\'un compte.','2024-10-25 05:13:10','2024-10-25 05:13:10',NULL,17,4),('TRC-1729840402-eUqKqLjg','consultation','Consultation d\'un compte.','2024-10-25 05:13:22','2024-10-25 05:13:22',NULL,17,4),('TRC-1729840413-4lSwGLus','consultation','Consultation d\'un compte.','2024-10-25 05:13:33','2024-10-25 05:13:33',NULL,17,4),('TRC-1729840417-fOC28qcg','consultation','Consultation d\'un compte.','2024-10-25 05:13:37','2024-10-25 05:13:37',NULL,17,4),('TRC-1729840427-4Lk9x1uy','consultation','Consultation d\'un compte.','2024-10-25 05:13:47','2024-10-25 05:13:47',NULL,17,4),('TRC-1729840444-wnyoD3uw','consultation','Consultation d\'un compte.','2024-10-25 05:14:04','2024-10-25 05:14:04',NULL,17,4),('TRC-1729840474-Ww7rbWay','consultation','Consultation d\'un compte.','2024-10-25 05:14:34','2024-10-25 05:14:34',NULL,17,4),('TRC-1729840565-iHJOfJkc','consultation','Consultation d\'un compte.','2024-10-25 05:16:05','2024-10-25 05:16:05',NULL,17,4),('TRC-1729840577-86oToliB','consultation','Consultation d\'un compte.','2024-10-25 05:16:17','2024-10-25 05:16:17',NULL,17,4),('TRC-1729840584-fbjt5D9x','consultation','Consultation d\'un compte.','2024-10-25 05:16:24','2024-10-25 05:16:24',NULL,17,4),('TRC-1729840604-7qxX1P4C','consultation','Consultation d\'un compte.','2024-10-25 05:16:44','2024-10-25 05:16:44',NULL,17,4),('TRC-1729840629-QXeHgT2s','consultation','Consultation d\'un compte.','2024-10-25 05:17:09','2024-10-25 05:17:09',NULL,17,4),('TRC-1729840636-JsmXFlQl','consultation','Consultation d\'un compte.','2024-10-25 05:17:16','2024-10-25 05:17:16',NULL,17,4),('TRC-1729840657-7xrjsst6','consultation','Consultation d\'un compte.','2024-10-25 05:17:37','2024-10-25 05:17:37',NULL,17,4),('TRC-1729840664-WOkNqCo4','consultation','Consultation d\'un compte.','2024-10-25 05:17:44','2024-10-25 05:17:44',NULL,17,4),('TRC-1729840762-IlcjDkob','consultation','Consultation d\'un compte.','2024-10-25 05:19:22','2024-10-25 05:19:22',NULL,17,4),('TRC-1729840765-rbbxlm6N','consultation','Consultation d\'un compte.','2024-10-25 05:19:25','2024-10-25 05:19:25',NULL,17,4),('TRC-1729840789-zSrKigwJ','consultation','Consultation d\'un compte.','2024-10-25 05:19:49','2024-10-25 05:19:49',NULL,17,4),('TRC-1729840810-WT6YCUUD','\nconsultation','Consultation d\'un compte.','2024-10-25 05:20:10','2024-10-25 05:20:10',NULL,17,4),('TRC-1729840826-HE0dqCsU','consultation','Consultation d\'un compte.','2024-10-25 05:20:26','2024-10-25 05:20:26',NULL,17,4),('TRC-1729840838-bol7k06E','consultation','Consultation d\'un compte.','2024-10-25 05:20:38','2024-10-25 05:20:38',NULL,17,4),('TRC-1729840841-T9DwBIvp','consultation','Consultation d\'un compte.','2024-10-25 05:20:41','2024-10-25 05:20:41',NULL,17,4),('TRC-1729840849-bK6nbmIB','consultation','Consultation d\'un compte.','2024-10-25 05:20:49','2024-10-25 05:20:49',NULL,17,4),('TRC-1729840852-NXXdrd8x','consultation','Consultation d\'un compte.','2024-10-25 05:20:52','2024-10-25 05:20:52',NULL,17,4),('TRC-1729840883-QBTx2yvJ','consultation','Consultation d\'un compte.','2024-10-25 05:21:23','2024-10-25 05:21:23',NULL,17,4),('TRC-1729840909-QYydEoE5','consultation','Consultation d\'un compte.','2024-10-25 05:21:49','2024-10-25 05:21:49',NULL,17,4),('TRC-1729840931-60oNxAaa','consultation','Consultation d\'un compte.','2024-10-25 05:22:11','2024-10-25 05:22:11',NULL,17,4),('TRC-1729840941-UkJiayE6','consultation','Consultation d\'un compte.','2024-10-25 05:22:21','2024-10-25 05:22:21',NULL,17,4),('TRC-1729840969-tGoz1DOX','consultation','Consultation d\'un compte.','2024-10-25 05:22:49','2024-10-25 05:22:49',NULL,17,4),('TRC-1729840982-5p0apSe5','consultation','Consultation d\'un compte.','2024-10-25 05:23:02','2024-10-25 05:23:02',NULL,17,4),('TRC-1729841004-vSXqdEO1','consultation','Consultation d\'un compte.','2024-10-25 05:23:24','2024-10-25 05:23:24',NULL,17,4),('TRC-1729841050-CNZVHnpc','consultation','Consultation d\'un compte.','2024-10-25 05:24:10','2024-10-25 05:24:10',NULL,17,4),('TRC-1729841097-QGk1XhLW','consultation','Consultation d\'un compte.','2024-10-25 05:24:57','2024-10-25 05:24:57',NULL,17,4),('TRC-1729841105-XBxX9Qbe','consultation','Consultation d\'un compte.','2024-10-25 05:25:05','2024-10-25 05:25:05',NULL,17,4),('TRC-1729841115-pElpk6QJ','consultation','Consultation d\'un compte.','2024-10-25 05:25:15','2024-10-25 05:25:15',NULL,17,4),('TRC-1729841124-FsFj3Ro7','consultation','Consultation d\'un compte.','2024-10-25 05:25:24','2024-10-25 05:25:24',NULL,17,4),('TRC-1729841132-8AcFq5ou','consultation','Consultation d\'un compte.','2024-10-25 05:25:32','2024-10-25 05:25:32',NULL,17,4),('TRC-1729841240-HP2SUFbb','consultation','Consultation d\'un compte.','2024-10-25 05:27:20','2024-10-25 05:27:20',NULL,17,4),('TRC-1729841243-vreFAEAT','consultation','Consultation d\'un compte.','2024-10-25 05:27:23','2024-10-25 05:27:23',NULL,17,4),('TRC-1729841255-9H9UNiyX','consultation','Consultation d\'un compte.','2024-10-25 05:27:35','2024-10-25 05:27:35',NULL,17,4),('TRC-1729841274-vvSn2SVQ','consultation','Consultation d\'un compte.','2024-10-25 05:27:54','2024-10-25 05:27:54',NULL,17,4),('TRC-1729841284-QijwIgex','consultation','Consultation d\'un compte.','2024-10-25 05:28:04','2024-10-25 05:28:04',NULL,17,4),('TRC-1729841293-cUgC0LsM','consultation','Consultation d\'un compte.','2024-10-25 05:28:13','2024-10-25 05:28:13',NULL,17,4),('TRC-1729841294-J8lfyRK7','consultation','Consultation d\'un compte.','2024-10-25 05:28:14','2024-10-25 05:28:14',NULL,17,4),('TRC-1729841363-05x8DW0r','consultation','Consultation d\'un compte.','2024-10-25 05:29:23','2024-10-25 05:29:23',NULL,17,4),('TRC-1729841370-YRWtt47Q','consultation','Consultation d\'un compte.','2024-10-25 05:29:30','2024-10-25 05:29:30',NULL,17,4),('TRC-1729841388-l0VoPRmk','consultation','Consultation d\'un compte.','2024-10-25 05:29:48','2024-10-25 05:29:48',NULL,17,4),('TRC-1729841396-atnIT9ME','consultation','Consultation d\'un compte.','2024-10-25 05:29:56','2024-10-25 05:29:56',NULL,17,4),('TRC-1729841402-6N45FkTC','consultation','Consultation d\'un compte.','2024-10-25 05:30:02','2024-10-25 05:30:02',NULL,17,4),('TRC-1729841601-YThbprYj','consultation','Consultation d\'un compte.','2024-10-25 05:33:21','2024-10-25 05:33:21',NULL,17,4),('TRC-1729841756-2Cu2bMs5','consultation','Consultation d\'un compte.','2024-10-25 05:35:56','2024-10-25 05:35:56',NULL,17,4),('TRC-1729841768-GqxB04Hi','consultation','Consultation d\'un compte.','2024-10-25 05:36:08','2024-10-25 05:36:08',NULL,17,4),('TRC-1729841775-JYZltH8O','consultation','Consultation d\'un compte.','2024-10-25 05:36:15','2024-10-25 05:36:15',NULL,17,4),('TRC-1729841777-pn4YZWfp','consultation','Consultation d\'un compte.','2024-10-25 05:36:17','2024-10-25 05:36:17',NULL,17,4),('TRC-1729841815-CLlpNOaJ','consultation','Consultation d\'un compte.','2024-10-25 05:36:55','2024-10-25 05:36:55',NULL,17,4),('TRC-1729841824-HlUtCT0w','consultation','Consultation d\'un compte.','2024-10-25 05:37:04','2024-10-25 05:37:04',NULL,17,4),('TRC-1729841847-Or4gErfj','consultation','Consultation d\'un compte.','2024-10-25 05:37:27','2024-10-25 05:37:27',NULL,17,4),('TRC-1729841883-XVy9IRKk','consultation','Consultation d\'un compte.','2024-10-25 05:38:03','2024-10-25 05:38:03',NULL,17,4),('TRC-1729842293-zHtT00Dd','consultation','Consultation d\'un compte.','2024-10-25 05:44:53','2024-10-25 05:44:53',NULL,17,4),('TRC-1729842340-yDxpoQXP','consultation','Consultation d\'un compte.','2024-10-25 05:45:40','2024-10-25 05:45:40',NULL,17,4),('TRC-1729842363-ZHZkGRpQ','consultation','Consultation d\'un compte.','2024-10-25 05:46:03','2024-10-25 05:46:03',NULL,17,4),('TRC-1729842379-HPs0cASP','consultation','Consultation d\'un compte.','2024-10-25 05:46:19','2024-10-25 05:46:19',NULL,17,4),('TRC-1729842412-vepnOIRj','consultation','Consultation d\'un compte.','2024-10-25 05:46:52','2024-10-25 05:46:52',NULL,17,4),('TRC-1729842423-J2xE7mNW','consultation','Consultation d\'un compte.','2024-10-25 05:47:03','2024-10-25 05:47:03',NULL,17,4),('TRC-1729842429-lwLKR8ym','consultation','Consultation d\'un compte.','2024-10-25 05:47:09','2024-10-25 05:47:09',NULL,17,4),('TRC-1729842433-Qz6nkdAd','consultation','Consultation d\'un compte.','2024-10-25 05:47:13','2024-10-25 05:47:13',NULL,17,4),('TRC-1729842493-kiITQ6ad','consultation','Consultation d\'un compte.','2024-10-25 05:48:13','2024-10-25 05:48:13',NULL,17,4),('TRC-1729842515-JxVlJWOz','consultation','Consultation d\'un compte.','2024-10-25 05:48:35','2024-10-25 05:48:35',NULL,17,4),('TRC-1729842524-hULjberG','consultation','Consultation d\'un compte.','2024-10-25 05:48:44','2024-10-25 05:48:44',NULL,17,4),('TRC-1729842535-AWyn1M2t','consultation','Consultation d\'un compte.','2024-10-25 05:48:55','2024-10-25 05:48:55',NULL,17,4),('TRC-1729842560-CNFBKKkG','consultation','Consultation d\'un compte.','2024-10-25 05:49:20','2024-10-25 05:49:20',NULL,17,4),('TRC-1729842575-vxpftaUh','consultation','Consultation d\'un compte.','2024-10-25 05:49:35','2024-10-25 05:49:35',NULL,17,4),('TRC-1729842586-5OHWrn3i','consultation','Consultation d\'un compte.','2024-10-25 05:49:46','2024-10-25 05:49:46',NULL,17,4),('TRC-1729842731-WLJVlPpD','consultation','Consultation d\'un compte.','2024-10-25 05:52:11','2024-10-25 05:52:11',NULL,17,4),('TRC-1729842834-qpATDiK6','consultation','Consultation d\'un compte.','2024-10-25 05:53:54','2024-10-25 05:53:54',NULL,17,4),('TRC-1729842882-Mu6T4pgv','consultation','Consultation d\'un compte.','2024-10-25 05:54:42','2024-10-25 05:54:42',NULL,17,4),('TRC-1729842921-Efi1C0Mu','consultation','Consultation d\'un compte.','2024-10-25 05:55:21','2024-10-25 05:55:21',NULL,17,4),('TRC-1729842926-Rh3Rva9x','consultation','Consultation d\'un compte.','2024-10-25 05:55:26','2024-10-25 05:55:26',NULL,17,4),('TRC-1729842947-y6XI4xJt','consultation','Consultation d\'un compte.','2024-10-25 05:55:47','2024-10-25 05:55:47',NULL,17,4),('TRC-1729842951-oqlAInFh','consultation','Consultation d\'un compte.','2024-10-25 05:55:51','2024-10-25 05:55:51',NULL,17,4),('TRC-1729842958-quQMevjF','consultation','Consultation d\'un compte.','2024-10-25 05:55:58','2024-10-25 05:55:58',NULL,17,4),('TRC-1729842961-S99mnzGw','consultation','Consultation d\'un compte.','2024-10-25 05:56:01','2024-10-25 05:56:01',NULL,17,4),('TRC-1729843008-mzbViPHX','consultation','Consultation d\'un compte.','2024-10-25 05:56:48','2024-10-25 05:56:48',NULL,17,4),('TRC-1729843017-AsKcMsL7','consultation','Consultation d\'un compte.','2024-10-25 05:56:57','2024-10-25 05:56:57',NULL,17,4),('TRC-1729843040-xQfUxPtY','consultation','Consultation d\'un compte.','2024-10-25 05:57:20','2024-10-25 05:57:20',NULL,17,4),('TRC-1729843055-V5mKNWMM','consultation','Consultation d\'un compte.','2024-10-25 05:57:35','2024-10-25 05:57:35',NULL,17,4),('TRC-1729843058-eMp2LjFf','consultation','Consultation d\'un compte.','2024-10-25 05:57:38','2024-10-25 05:57:38',NULL,17,4),('TRC-1729843089-R9lMIGDF','consultation','Consultation d\'un compte.','2024-10-25 05:58:09','2024-10-25 05:58:09',NULL,17,4),('TRC-1729843105-KLxO7z7O','consultation','Consultation d\'un compte.','2024-10-25 05:58:25','2024-10-25 05:58:25',NULL,17,4),('TRC-1729843129-jgska1Rq','consultation','Consultation d\'un compte.','2024-10-25 05:58:49','2024-10-25 05:58:49',NULL,17,4),('TRC-1729844040-moLVz5E0','consultation','Consultation d\'un compte.','2024-10-25 06:14:00','2024-10-25 06:14:00',NULL,17,4),('TRC-1729844068-nVqW0UcY','consultation','Consultation d\'un compte.','2024-10-25 06:14:28','2024-10-25 06:14:28',NULL,17,4),('TRC-1729844088-pSot8YXt','consultation','Consultation d\'un compte.','2024-10-25 06:14:48','2024-10-25 06:14:48',NULL,17,4),('TRC-1729844136-fi7PZDI4','consultation','Consultation d\'un compte.','2024-10-25 06:15:36','2024-10-25 06:15:36',NULL,17,4),('TRC-1729844145-R9lGghcZ','consultation','Consultation d\'un compte.','2024-10-25 06:15:45','2024-10-25 06:15:45',NULL,17,4),('TRC-1729844147-LCqOU3AG','consultation','Consultation d\'un compte.','2024-10-25 06:15:47','2024-10-25 06:15:47',NULL,17,4),('TRC-1729844155-ybIKWfwl','consultation','Consultation d\'un compte.','2024-10-25 06:15:55','2024-10-25 06:15:55',NULL,17,4),('TRC-1729844159-Za3BuKQS','consultation','Consultation d\'un compte.','2024-10-25 06:15:59','2024-10-25 06:15:59',NULL,17,4),('TRC-1729844162-tiMPx2dR','consultation','Consultation d\'un compte.','2024-10-25 06:16:02','2024-10-25 06:16:02',NULL,17,4),('TRC-1729844172-qHaJ4eKY','consultation','Consultation d\'un compte.','2024-10-25 06:16:12','2024-10-25 06:16:12',NULL,17,4),('TRC-1729844179-ft9Ug0r2','consultation','Consultation d\'un compte.','2024-10-25 06:16:19','2024-10-25 06:16:19',NULL,17,4),('TRC-1729844190-VlV8EjKK','consultation','Consultation d\'un compte.','2024-10-25 06:16:30','2024-10-25 06:16:30',NULL,17,4),('TRC-1729844205-rBUbZ58D','consultation','Consultation d\'un compte.','2024-10-25 06:16:45','2024-10-25 06:16:45',NULL,17,4),('TRC-1729844215-L2uvsSVE','consultation','Consultation d\'un compte.','2024-10-25 06:16:55','2024-10-25 06:16:55',NULL,17,4),('TRC-1729844220-h3TBQjzc','consultation','Consultation d\'un compte.','2024-10-25 06:17:00','2024-10-25 06:17:00',NULL,17,4),('TRC-1729844706-J8sM9lP2','consultation','Consultation d\'un compte.','2024-10-25 06:25:06','2024-10-25 06:25:06',NULL,17,4),('TRC-1729844715-73BqikLT','consultation','Consultation d\'un compte.','2024-10-25 06:25:15','2024-10-25 06:25:15',NULL,17,4),('TRC-1729844750-JuZ65tNf','consultation','Consultation d\'un compte.','2024-10-25 06:25:50','2024-10-25 06:25:50',NULL,17,4),('TRC-1729844795-0D5OAwhY','consultation','Consultation d\'un compte.','2024-10-25 06:26:35','2024-10-25 06:26:35',NULL,17,4),('TRC-1729844799-MWtFf8Pp','consultation','Consultation d\'un compte.','2024-10-25 06:26:39','2024-10-25 06:26:39',NULL,17,4),('TRC-1729844827-UXeqXWTT','consultation','Consultation d\'un compte.','2024-10-25 06:27:07','2024-10-25 06:27:07',NULL,17,4),('TRC-1729844834-FzduTWUx','consultation','Consultation d\'un compte.','2024-10-25 06:27:14','2024-10-25 06:27:14',NULL,17,4),('TRC-1729844996-OSjNafbG','consultation','Consultation d\'un compte.','2024-10-25 06:29:56','2024-10-25 06:29:56',NULL,17,4),('TRC-1729844999-qRVsLUrP','consultation','Consultation d\'un compte.','2024-10-25 06:29:59','2024-10-25 06:29:59',NULL,17,4),('TRC-1729845001-Nx1abcKM','consultation','Consultation d\'un compte.','2024-10-25 06:30:01','2024-10-25 06:30:01',NULL,17,4),('TRC-1729845013-c1yn1aSf','consultation','Consultation d\'un compte.','2024-10-25 06:30:13','2024-10-25 06:30:13',NULL,17,4),('TRC-1729845021-V2qvpTjI','consultation','Consultation d\'un compte.','2024-10-25 06:30:21','2024-10-25 06:30:21',NULL,17,4),('TRC-1729845030-I2nFqQw6','consultation','Consultation d\'un compte.','2024-10-25 06:30:30','2024-10-25 06:30:30',NULL,17,4),('TRC-1729845054-X5u70tYq','consultation','Consultation d\'un compte.','2024-10-25 06:30:54','2024-10-25 06:30:54',NULL,17,4),('TRC-1729845056-5RmhfumX','consultation','Consultation d\'un compte.','2024-10-25 06:30:56','2024-10-25 06:30:56',NULL,17,4),('TRC-1729845368-q8FureAZ','consultation','Consultation d\'un compte.','2024-10-25 06:36:08','2024-10-25 06:36:08',NULL,17,4),('TRC-1729845582-dwmWFALb','consultation','Consultation d\'un compte.','2024-10-25 06:39:42','2024-10-25 06:39:42',NULL,17,4),('TRC-1729845625-Qu0qLXaf','consultation','Consultation d\'un compte.','2024-10-25 06:40:25','2024-10-25 06:40:25',NULL,17,4),('TRC-1729845635-GXioH5xd','consultation','Consultation d\'un compte.','2024-10-25 06:40:35','2024-10-25 06:40:35',NULL,17,4),('TRC-1729845650-CjWzQUVS','consultation','Consultation d\'un compte.','2024-10-25 06:40:50','2024-10-25 06:40:50',NULL,17,4),('TRC-1729845676-ix5oi7rz','consultation','Consultation d\'un compte.','2024-10-25 06:41:16','2024-10-25 06:41:16',NULL,17,4),('TRC-1729845686-E5kvdIOL','consultation','Consultation d\'un compte.','2024-10-25 06:41:26','2024-10-25 06:41:26',NULL,17,4),('TRC-1729845710-66N6wFL3','consultation','Consultation d\'un compte.','2024-10-25 06:41:50','2024-10-25 06:41:50',NULL,17,4),('TRC-1729845719-vR5zp0IO','consultation','Consultation d\'un compte.','2024-10-25 06:41:59','2024-10-25 06:41:59',NULL,17,4),('TRC-1729845730-rgOQ5x7p','consultation','Consultation d\'un compte.','2024-10-25 06:42:10','2024-10-25 06:42:10',NULL,17,4),('TRC-1729845731-V6usdGo5','consultation','Consultation d\'un compte.','2024-10-25 06:42:11','2024-10-25 06:42:11',NULL,17,4),('TRC-1729845784-fHS5FMsI','consultation','Consultation d\'un compte.','2024-10-25 06:43:04','2024-10-25 06:43:04',NULL,17,4),('TRC-1729845824-xvayBvKH','consultation','Consultation d\'un compte.','2024-10-25 06:43:44','2024-10-25 06:43:44',NULL,17,4),('TRC-1729846102-YrSxH4L1','consultation','Consultation d\'un compte.','2024-10-25 06:48:22','2024-10-25 06:48:22',NULL,17,4),('TRC-1729846112-CmFXQdoQ','consultation','Consultation d\'un compte.','2024-10-25 06:48:32','2024-10-25 06:48:32',NULL,17,4),('TRC-1729846131-FLw5SU5H','consultation','Consultation d\'un compte.','2024-10-25 06:48:51','2024-10-25 06:48:51',NULL,17,4),('TRC-1729846142-Hzf7bjDY','consultation','Consultation d\'un compte.','2024-10-25 06:49:02','2024-10-25 06:49:02',NULL,17,4),('TRC-1729846162-OlTHu6Z5','consultation','Consultation d\'un compte.','2024-10-25 06:49:22','2024-10-25 06:49:22',NULL,17,4),('TRC-1729846177-iC5lqctK','consultation','Consultation d\'un compte.','2024-10-25 06:49:37','2024-10-25 06:49:37',NULL,17,4),('TRC-1729846202-tYlLrqet','consultation','Consultation d\'un compte.','2024-10-25 06:50:02','2024-10-25 06:50:02',NULL,17,4),('TRC-1729846224-lX5rMjTZ','consultation','Consultation d\'un compte.','2024-10-25 06:50:24','2024-10-25 06:50:24',NULL,17,4),('TRC-1729848027-piYPthO6','consultation','Consultation d\'un compte.','2024-10-25 07:20:27','2024-10-25 07:20:27',NULL,17,4),('TRC-1729850616-2VxyKRUx','consultation','Consultation d\'un compte.','2024-10-25 08:03:36','2024-10-25 08:03:36',NULL,17,4),('TRC-1729850616-XdWBrzSt','consultation','Consultation d\'un compte.','2024-10-25 08:03:36','2024-10-25 08:03:36',NULL,17,4),('TRC-1729850703-3nfaP4Ij','consultation','Consultation d\'un compte.','2024-10-25 08:05:03','2024-10-25 08:05:03',NULL,17,4),('TRC-1729850738-0YxfKJIt','consultation','Consultation d\'un compte.','2024-10-25 08:05:38','2024-10-25 08:05:38',NULL,17,4),('TRC-1729850765-MHkoOAz9','consultation','Consultation d\'un compte.','2024-10-25 08:06:05','2024-10-25 08:06:05',NULL,17,4),('TRC-1729850806-XNLzZ7E4','consultation','Consultation d\'un compte.','2024-10-25 08:06:46','2024-10-25 08:06:46',NULL,17,4),('TRC-1729850899-mPB0aC9k','consultation','Consultation d\'un compte.','2024-10-25 08:08:19','2024-10-25 08:08:19',NULL,17,4),('TRC-1729850966-UPr3uqAH','consultation','Consultation d\'un compte.','2024-10-25 08:09:26','2024-10-25 08:09:26',NULL,17,4),('TRC-1729851009-KSomKjoL','consultation','Consultation d\'un compte.','2024-10-25 08:10:09','2024-10-25 08:10:09',NULL,17,4),('TRC-1729851016-TUkIyNn4','consultation','Consultation d\'un compte.','2024-10-25 08:10:16','2024-10-25 08:10:16',NULL,17,4),('TRC-1729851019-Rj0yBAZG','consultation','Consultation d\'un compte.','2024-10-25 08:10:19','2024-10-25 08:10:19',NULL,17,4),('TRC-1729851379-vB4lLmZ9','consultation','Consultation d\'un compte.','2024-10-25 08:16:19','2024-10-25 08:16:19',NULL,17,4),('TRC-1729851386-D61LeAmY','consultation','Consultation d\'un compte.','2024-10-25 08:16:26','2024-10-25 08:16:26',NULL,17,4),('TRC-1729851389-yn00XHtw','consultation','Consultation d\'un compte.','2024-10-25 08:16:29','2024-10-25 08:16:29',NULL,17,4),('TRC-1729852070-lxQXZw5T','consultation','Consultation d\'un compte.','2024-10-25 08:27:50','2024-10-25 08:27:50',NULL,17,4),('TRC-1729852083-0OZk5De3','consultation','Consultation d\'un compte.','2024-10-25 08:28:03','2024-10-25 08:28:03',NULL,17,4),('TRC-1729852091-PAZ77Kjp','consultation','Consultation d\'un compte.','2024-10-25 08:28:11','2024-10-25 08:28:11',NULL,17,4),('TRC-1729852099-iUv41knh','consultation','Consultation d\'un compte.','2024-10-25 08:28:19','2024-10-25 08:28:19',NULL,17,4),('TRC-1729852108-MUY6mEu2','consultation','Consultation d\'un compte.','2024-10-25 08:28:28','2024-10-25 08:28:28',NULL,17,4),('TRC-1729852110-WyLcbWfT','consultation','Consultation d\'un compte.','2024-10-25 08:28:30','2024-10-25 08:28:30',NULL,17,4),('TRC-1729852116-0Q9TcVzM','consultation','Consultation d\'un compte.','2024-10-25 08:28:36','2024-10-25 08:28:36',NULL,17,4),('TRC-1729852129-blsjfIN1','consultation','Consultation d\'un compte.','2024-10-25 08:28:49','2024-10-25 08:28:49',NULL,17,4),('TRC-1729852131-yKurNCxI','consultation','Consultation d\'un compte.','2024-10-25 08:28:51','2024-10-25 08:28:51',NULL,17,4),('TRC-1729852163-av9uqVEu','consultation','Consultation d\'un compte.','2024-10-25 08:29:23','2024-10-25 08:29:23',NULL,17,4),('TRC-1729852196-yyklUSCW','consultation','Consultation d\'un compte.','2024-10-25 08:29:56','2024-10-25 08:29:56',NULL,17,4),('TRC-1729852199-g55YXsP4','consultation','Consultation d\'un compte.','2024-10-25 08:29:59','2024-10-25 08:29:59',NULL,17,4),('TRC-1729852213-KYi2K2XA','consultation','Consultation d\'un compte.','2024-10-25 08:30:13','2024-10-25 08:30:13',NULL,17,4),('TRC-1729852226-xCKdXkXF','consultation','Consultation d\'un compte.','2024-10-25 08:30:26','2024-10-25 08:30:26',NULL,17,4),('TRC-1729852269-bSpufsgV','consultation','Consultation d\'un compte.','2024-10-25 08:31:09','2024-10-25 08:31:09',NULL,17,4),('TRC-1729852545-NPVMse0c','consultation','Consultation d\'un compte.','2024-10-25 08:35:45','2024-10-25 08:35:45',NULL,17,4),('TRC-1729852556-uU3KR7RC','consultation','Consultation d\'un compte.','2024-10-25 08:35:56','2024-10-25 08:35:56',NULL,17,4),('TRC-1729852627-b9l6CTHe','consultation','Consultation d\'un compte.','2024-10-25 08:37:07','2024-10-25 08:37:07',NULL,17,4),('TRC-1729852786-VzhV2L7u','consultation','Consultation d\'un compte.','2024-10-25 08:39:46','2024-10-25 08:39:46',NULL,17,4),('TRC-1729852791-AieAvfCR','consultation','Consultation d\'un compte.','2024-10-25 08:39:51','2024-10-25 08:39:51',NULL,17,4),('TRC-1729852811-OyACfKbX','consultation','Consultation d\'un compte.','2024-10-25 08:40:11','2024-10-25 08:40:11',NULL,17,4),('TRC-1729852813-2iYhk6Bk','consultation','Consultation d\'un compte.','2024-10-25 08:40:13','2024-10-25 08:40:13',NULL,17,4),('TRC-1729852923-gndd8Du0','consultation','Consultation d\'un compte.','2024-10-25 08:42:03','2024-10-25 08:42:03',NULL,17,4),('TRC-1729852924-yxARFXTO','consultation','Consultation d\'un compte.','2024-10-25 08:42:04','2024-10-25 08:42:04',NULL,17,4),('TRC-1729852946-0RKLfFk4','consultation','Consultation d\'un compte.','2024-10-25 08:42:26','2024-10-25 08:42:26',NULL,17,4),('TRC-1729852948-6KAxBOkJ','consultation','Consultation d\'un compte.','2024-10-25 08:42:28','2024-10-25 08:42:28',NULL,17,4),('TRC-1729852951-kinfEUOx','consultation','Consultation d\'un compte.','2024-10-25 08:42:31','2024-10-25 08:42:31',NULL,17,4),('TRC-1729852960-q5UUPvV6','consultation','Consultation d\'un compte.','2024-10-25 08:42:40','2024-10-25 08:42:40',NULL,17,4),('TRC-1729853014-hNIYUdfC','consultation','Consultation d\'un compte.','2024-10-25 08:43:34','2024-10-25 08:43:34',NULL,17,4),('TRC-1729853064-Ly9O9l6V','consultation','Consultation d\'un compte.','2024-10-25 08:44:24','2024-10-25 08:44:24',NULL,17,4),('TRC-1729853071-YBAdkWk8','consultation','Consultation d\'un compte.','2024-10-25 08:44:31','2024-10-25 08:44:31',NULL,17,4),('TRC-1729853077-0uAytpeo','consultation','Consultation d\'un compte.','2024-10-25 08:44:37','2024-10-25 08:44:37',NULL,17,4),('TRC-1729853260-geoZb6ps','consultation','Consultation d\'un compte.','2024-10-25 08:47:40','2024-10-25 08:47:40',NULL,17,4),('TRC-1729853267-lZpnINNW','consultation','Consultation d\'un compte.','2024-10-25 08:47:47','2024-10-25 08:47:47',NULL,17,4),('TRC-1729853280-fgprwO2t','consultation','Consultation d\'un compte.','2024-10-25 08:48:00','2024-10-25 08:48:00',NULL,17,4),('TRC-1729853298-xhOHfaHb','consultation','Consultation d\'un compte.','2024-10-25 08:48:18','2024-10-25 08:48:18',NULL,17,4),('TRC-1729853317-tXIJHN9A','consultation','Consultation d\'un compte.','2024-10-25 08:48:37','2024-10-25 08:48:37',NULL,17,4),('TRC-1729853325-ZiEf5bvc','consultation','Consultation d\'un compte.','2024-10-25 08:48:45','2024-10-25 08:48:45',NULL,17,4),('TRC-1729853452-RAn1Iun1','consultation','Consultation d\'un compte.','2024-10-25 08:50:52','2024-10-25 08:50:52',NULL,17,4),('TRC-1729853460-3VHRksWy','consultation','Consultation d\'un compte.','2024-10-25 08:51:00','2024-10-25 08:51:00',NULL,17,4),('TRC-1729853492-8R3wYN7d','consultation','Consultation d\'un compte.','2024-10-25 08:51:32','2024-10-25 08:51:32',NULL,17,4),('TRC-1729853498-fBSsc1lr','consultation','Consultation d\'un compte.','2024-10-25 08:51:38','2024-10-25 08:51:38',NULL,17,4),('TRC-1729853535-92Trjiic','consultation','Consultation d\'un compte.','2024-10-25 08:52:15','2024-10-25 08:52:15',NULL,17,4),('TRC-1729853638-QSc4RxXc','consultation','Consultation d\'un compte.','2024-10-25 08:53:58','2024-10-25 08:53:58',NULL,17,4),('TRC-1729853647-C44DAAYT','consultation','Consultation d\'un compte.','2024-10-25 08:54:07','2024-10-25 08:54:07',NULL,17,4),('TRC-1729853652-lvH7BD0l','consultation','Consultation d\'un compte.','2024-10-25 08:54:12','2024-10-25 08:54:12',NULL,17,4),('TRC-1729853657-O4pPvZk0','consultation','Consultation d\'un compte.','2024-10-25 08:54:17','2024-10-25 08:54:17',NULL,17,4),('TRC-1729853661-qgn2Iykw','consultation','Consultation d\'un compte.','2024-10-25 08:54:21','2024-10-25 08:54:21',NULL,17,4),('TRC-1729853665-2oXtA8Vt','consultation','Consultation d\'un compte.','2024-10-25 08:54:25','2024-10-25 08:54:25',NULL,17,4),('TRC-1729853675-T86AR2QC','consultation','Consultation d\'un compte.','2024-10-25 08:54:35','2024-10-25 08:54:35',NULL,17,4),('TRC-1729853749-ELHzV5sm','consultation','Consultation d\'un compte.','2024-10-25 08:55:49','2024-10-25 08:55:49',NULL,17,4),('TRC-1729853759-Eny2JNNd','consultation','Consultation d\'un compte.','2024-10-25 08:55:59','2024-10-25 08:55:59',NULL,17,4),('TRC-1729853914-jNBQhQqW','consultation','Consultation d\'un compte.','2024-10-25 08:58:34','2024-10-25 08:58:34',NULL,17,4),('TRC-1729854252-XG6YFqAH','consultation','Consultation d\'un compte.','2024-10-25 09:04:12','2024-10-25 09:04:12',NULL,17,4),('TRC-1729854273-BfdyP6oD','consultation','Consultation d\'un compte.','2024-10-25 09:04:33','2024-10-25 09:04:33',NULL,17,4),('TRC-1729854290-CX3ado0E','consultation','Consultation d\'un compte.','2024-10-25 09:04:50','2024-10-25 09:04:50',NULL,17,4),('TRC-1729854300-PRW0vVl2','consultation','Consultation d\'un compte.','2024-10-25 09:05:00','2024-10-25 09:05:00',NULL,17,4),('TRC-1729854347-vGzrnVPR','consultation','Consultation d\'un compte.','2024-10-25 09:05:47','2024-10-25 09:05:47',NULL,17,4),('TRC-1729854355-clDslmRa','consultation','Consultation d\'un compte.','2024-10-25 09:05:55','2024-10-25 09:05:55',NULL,17,4),('TRC-1729854381-PmycjIut','consultation','Consultation d\'un compte.','2024-10-25 09:06:21','2024-10-25 09:06:21',NULL,17,4),('TRC-1729854391-REjsOwbH','consultation','Consultation d\'un compte.','2024-10-25 09:06:31','2024-10-25 09:06:31',NULL,17,4),('TRC-1729854396-rfJVR7hE','consultation','Consultation d\'un compte.','2024-10-25 09:06:36','2024-10-25 09:06:36',NULL,17,4),('TRC-1729854401-4tIbIggc','consultation','Consultation d\'un compte.','2024-10-25 09:06:41','2024-10-25 09:06:41',NULL,17,4),('TRC-1729854415-eYp38Irq','consultation','Consultation d\'un compte.','2024-10-25 09:06:55','2024-10-25 09:06:55',NULL,17,4),('TRC-1729854446-GpCfKsn3','consultation','Consultation d\'un compte.','2024-10-25 09:07:26','2024-10-25 09:07:26',NULL,17,4),('TRC-1729854455-mHOLSFAR','consultation','Consultation d\'un compte.','2024-10-25 09:07:35','2024-10-25 09:07:35',NULL,17,4),('TRC-1729854464-9HW0G0uq','consultation','Consultation d\'un compte.','2024-10-25 09:07:44','2024-10-25 09:07:44',NULL,17,4),('TRC-1729854477-XOdI3sDh','consultation','Consultation d\'un compte.','2024-10-25 09:07:57','2024-10-25 09:07:57',NULL,17,4),('TRC-1729854487-ny8hW07p','consultation','Consultation d\'un compte.','2024-10-25 09:08:07','2024-10-25 09:08:07',NULL,17,4),('TRC-1729854492-CpECvAhP','consultation','Consultation d\'un compte.','2024-10-25 09:08:12','2024-10-25 09:08:12',NULL,17,4),('TRC-1729854517-WAGxV2T9','consultation','Consultation d\'un compte.','2024-10-25 09:08:37','2024-10-25 09:08:37',NULL,17,4),('TRC-1729854531-oLYhCdql','consultation','Consultation d\'un compte.','2024-10-25 09:08:51','2024-10-25 09:08:51',NULL,17,4),('TRC-1729854579-EaCbhiyf','consultation','Consultation d\'un compte.','2024-10-25 09:09:39','2024-10-25 09:09:39',NULL,17,4),('TRC-1729854630-qAShJkxK','consultation','Consultation d\'un compte.','2024-10-25 09:10:30','2024-10-25 09:10:30',NULL,17,4),('TRC-1729854655-7d3p65Pj','consultation','Consultation d\'un compte.','2024-10-25 09:10:55','2024-10-25 09:10:55',NULL,17,4),('TRC-1729854665-wu3vdlv0','consultation','Consultation d\'un compte.','2024-10-25 09:11:05','2024-10-25 09:11:05',NULL,17,4),('TRC-1729854695-fmTomXvW','consultation','Consultation d\'un compte.','2024-10-25 09:11:35','2024-10-25 09:11:35',NULL,17,4),('TRC-1729854725-hdkAt1fL','consultation','Consultation d\'un compte.','2024-10-25 09:12:05','2024-10-25 09:12:05',NULL,17,4),('TRC-1729854736-F3uMsefN','consultation','Consultation d\'un compte.','2024-10-25 09:12:16','2024-10-25 09:12:16',NULL,17,4),('TRC-1729855532-PdBg6uYv','consultation','Consultation d\'un compte.','2024-10-25 09:25:32','2024-10-25 09:25:32',NULL,17,4),('TRC-1729855577-HeZ4bV6a','consultation','Consultation d\'un compte.','2024-10-25 09:26:17','2024-10-25 09:26:17',NULL,17,4),('TRC-1729855578-acvDPFgX','consultation','Consultation d\'un compte.','2024-10-25 09:26:18','2024-10-25 09:26:18',NULL,17,4),('TRC-1729855581-aj4ExjKS','consultation','Consultation d\'un compte.','2024-10-25 09:26:21','2024-10-25 09:26:21',NULL,17,4),('TRC-1729855583-v3ipzrtl','consultation','Consultation d\'un compte.','2024-10-25 09:26:23','2024-10-25 09:26:23',NULL,17,4),('TRC-1729855625-rWpCUJLN','consultation','Consultation d\'un compte.','2024-10-25 09:27:05','2024-10-25 09:27:05',NULL,17,4),('TRC-1729855679-IUt2E4S4','consultation','Consultation d\'un compte.','2024-10-25 09:27:59','2024-10-25 09:27:59',NULL,17,4),('TRC-1729855715-DZWZWQjF','consultation','Consultation d\'un compte.','2024-10-25 09:28:35','2024-10-25 09:28:35',NULL,17,4),('TRC-1729855719-LAR64RWX','consultation','Consultation d\'un compte.','2024-10-25 09:28:39','2024-10-25 09:28:39',NULL,17,4),('TRC-1729855726-R8AdluxL','consultation','Consultation d\'un compte.','2024-10-25 09:28:46','2024-10-25 09:28:46',NULL,17,4),('TRC-1729855763-eSoppa5i','consultation','Consultation d\'un compte.','2024-10-25 09:29:23','2024-10-25 09:29:23',NULL,17,4),('TRC-1729855769-mQDP4wM2','consultation','Consultation d\'un compte.','2024-10-25 09:29:29','2024-10-25 09:29:29',NULL,17,4),('TRC-1729855789-ScUc2rMv','consultation','Consultation d\'un compte.','2024-10-25 09:29:49','2024-10-25 09:29:49',NULL,17,4),('TRC-1729855796-K0kopUWW','consultation','Consultation d\'un compte.','2024-10-25 09:29:56','2024-10-25 09:29:56',NULL,17,4),('TRC-1729855825-TRaNwU3E','consultation','Consultation d\'un compte.','2024-10-25 09:30:25','2024-10-25 09:30:25',NULL,17,4),('TRC-1729855838-JRr1zG5R','consultation','Consultation d\'un compte.','2024-10-25 09:30:38','2024-10-25 09:30:38',NULL,17,4),('TRC-1729855846-CwYSV2dI','consultation','Consultation d\'un compte.','2024-10-25 09:30:46','2024-10-25 09:30:46',NULL,17,4),('TRC-1729855855-0Nficgn9','consultation','Consultation d\'un compte.','2024-10-25 09:30:55','2024-10-25 09:30:55',NULL,17,4),('TRC-1729855856-28hXbxJd','consultation','Consultation d\'un compte.','2024-10-25 09:30:56','2024-10-25 09:30:56',NULL,17,4),('TRC-1729855871-Bq5i9qzG','consultation','Consultation d\'un compte.','2024-10-25 09:31:11','2024-10-25 09:31:11',NULL,17,4),('TRC-1729855875-PklFPsN2','consultation','Consultation d\'un compte.','2024-10-25 09:31:15','2024-10-25 09:31:15',NULL,17,4),('TRC-1729855889-vxzTkJOC','\nconsultation','Consultation d\'un compte.','2024-10-25 09:31:29','2024-10-25 09:31:29',NULL,17,4),('TRC-1729855897-dIOTmnWw','consultation','Consultation d\'un compte.','2024-10-25 09:31:37','2024-10-25 09:31:37',NULL,17,4),('TRC-1729855904-4h8ad314','consultation','Consultation d\'un compte.','2024-10-25 09:31:44','2024-10-25 09:31:44',NULL,17,4),('TRC-1729855910-SJyNa1i3','consultation','Consultation d\'un compte.','2024-10-25 09:31:50','2024-10-25 09:31:50',NULL,17,4),('TRC-1729855941-kiNlVvC4','consultation','Consultation d\'un compte.','2024-10-25 09:32:21','2024-10-25 09:32:21',NULL,17,4),('TRC-1729855953-xW3cxA1h','consultation','Consultation d\'un compte.','2024-10-25 09:32:33','2024-10-25 09:32:33',NULL,17,4),('TRC-1729855964-Rldo680o','consultation','Consultation d\'un compte.','2024-10-25 09:32:44','2024-10-25 09:32:44',NULL,17,4),('TRC-1729855965-CSbu4kQF','consultation','Consultation d\'un compte.','2024-10-25 09:32:45','2024-10-25 09:32:45',NULL,17,4),('TRC-1729856284-g1dfq367','consultation','Consultation d\'un compte.','2024-10-25 09:38:04','2024-10-25 09:38:04',NULL,17,4),('TRC-1729856290-AVdZ4WY2','consultation','Consultation d\'un compte.','2024-10-25 09:38:10','2024-10-25 09:38:10',NULL,17,4),('TRC-1729856304-JpRnOkZ3','consultation','Consultation d\'un compte.','2024-10-25 09:38:24','2024-10-25 09:38:24',NULL,17,4),('TRC-1729856305-c7csDtV0','consultation','Consultation d\'un compte.','2024-10-25 09:38:25','2024-10-25 09:38:25',NULL,17,4),('TRC-1729856311-RmoVsV9R','consultation','Consultation d\'un compte.','2024-10-25 09:38:31','2024-10-25 09:38:31',NULL,17,4),('TRC-1729856396-eC9lcEfN','consultation','Consultation d\'un compte.','2024-10-25 09:39:56','2024-10-25 09:39:56',NULL,17,4),('TRC-1729856418-HQEBl4wl','consultation','Consultation d\'un compte.','2024-10-25 09:40:18','2024-10-25 09:40:18',NULL,17,4),('TRC-1729856447-gJV3aQ8b','consultation','Consultation d\'un compte.','2024-10-25 09:40:47','2024-10-25 09:40:47',NULL,17,4),('TRC-1729856478-AxNSO4OI','consultation','Consultation d\'un compte.','2024-10-25 09:41:18','2024-10-25 09:41:18',NULL,17,4),('TRC-1729856520-7mrcs3vr','consultation','Consultation d\'un compte.','2024-10-25 09:42:00','2024-10-25 09:42:00',NULL,17,4),('TRC-1729856543-WlGGrqQp','consultation','Consultation d\'un compte.','2024-10-25 09:42:23','2024-10-25 09:42:23',NULL,17,4),('TRC-1729856554-O0V7Fg4q','consultation','Consultation d\'un compte.','2024-10-25 09:42:34','2024-10-25 09:42:34',NULL,17,4),('TRC-1729856556-J74JRWB9','consultation','Consultation d\'un compte.','2024-10-25 09:42:36','2024-10-25 09:42:36',NULL,17,4),('TRC-1729856567-SntjUvWU','consultation','Consultation d\'un compte.','2024-10-25 09:42:47','2024-10-25 09:42:47',NULL,17,4),('TRC-1729856595-wWgUUYqo','consultation','Consultation d\'un compte.','2024-10-25 09:43:15','2024-10-25 09:43:15',NULL,17,4),('TRC-1729856599-5FSGQpA2','consultation','Consultation d\'un compte.','2024-10-25 09:43:19','2024-10-25 09:43:19',NULL,17,4),('TRC-1729856602-DWy1nuqg','consultation','Consultation d\'un compte.','2024-10-25 09:43:22','2024-10-25 09:43:22',NULL,17,4),('TRC-1729856626-L9gzTsX3','consultation','Consultation d\'un compte.','2024-10-25 09:43:46','2024-10-25 09:43:46',NULL,17,4),('TRC-1729856674-b2LmLtM2','consultation','Consultation d\'un compte.','2024-10-25 09:44:34','2024-10-25 09:44:34',NULL,17,4),('TRC-1729856681-rgy7cIZ5','consultation','Consultation d\'un compte.','2024-10-25 09:44:41','2024-10-25 09:44:41',NULL,17,4),('TRC-1729856694-8pA3EPkg','consultation','Consultation d\'un compte.','2024-10-25 09:44:54','2024-10-25 09:44:54',NULL,17,4),('TRC-1729856697-LF5gXENx','consultation','Consultation d\'un compte.','2024-10-25 09:44:57','2024-10-25 09:44:57',NULL,17,4),('TRC-1729856705-ZDZoNiQI','consultation','Consultation d\'un compte.','2024-10-25 09:45:05','2024-10-25 09:45:05',NULL,17,4),('TRC-1729856722-WLKwWeMv','consultation','Consultation d\'un compte.','2024-10-25 09:45:22','2024-10-25 09:45:22',NULL,17,4),('TRC-1729856728-fIvMeAK7','consultation','Consultation d\'un compte.','2024-10-25 09:45:28','2024-10-25 09:45:28',NULL,17,4),('TRC-1729856739-FDsW68rv','consultation','Consultation d\'un compte.','2024-10-25 09:45:39','2024-10-25 09:45:39',NULL,17,4),('TRC-1729856742-U8V0Fou8','consultation','Consultation d\'un compte.','2024-10-25 09:45:42','2024-10-25 09:45:42',NULL,17,4),('TRC-1729856780-z7ph0TES','consultation','Consultation d\'un compte.','2024-10-25 09:46:20','2024-10-25 09:46:20',NULL,17,4),('TRC-1729856784-PEazdj6H','consultation','Consultation d\'un compte.','2024-10-25 09:46:24','2024-10-25 09:46:24',NULL,17,4),('TRC-1729856798-38AupEti','consultation','Consultation d\'un compte.','2024-10-25 09:46:38','2024-10-25 09:46:38',NULL,17,4),('TRC-1729856805-ibWNS24b','consultation','Consultation d\'un compte.','2024-10-25 09:46:45','2024-10-25 09:46:45',NULL,17,4),('TRC-1729856810-UwapCUCG','consultation','Consultation d\'un compte.','2024-10-25 09:46:50','2024-10-25 09:46:50',NULL,17,4),('TRC-1729856815-xMe0T2iH','consultation','Consultation d\'un compte.','2024-10-25 09:46:55','2024-10-25 09:46:55',NULL,17,4),('TRC-1729856841-tBxvkVcx','consultation','Consultation d\'un compte.','2024-10-25 09:47:21','2024-10-25 09:47:21',NULL,17,7),('TRC-1729856866-J6IeUniP','consultation','Consultation d\'un compte.','2024-10-25 09:47:46','2024-10-25 09:47:46',NULL,17,7),('TRC-1729856875-AwQKLO0B','consultation','Consultation d\'un compte.','2024-10-25 09:47:55','2024-10-25 09:47:55',NULL,17,7),('TRC-1729856891-6FxVBRRl','consultation','Consultation d\'un compte.','2024-10-25 09:48:11','2024-10-25 09:48:11',NULL,17,7),('TRC-1729856894-7qB1L4Jy','consultation','Consultation d\'un compte.','2024-10-25 09:48:14','2024-10-25 09:48:14',NULL,17,7),('TRC-1729856902-YaXgja1a','consultation','Consultation d\'un compte.','2024-10-25 09:48:22','2024-10-25 09:48:22',NULL,17,7),('TRC-1729856930-32Ov7NmR','consultation','Consultation d\'un compte.','2024-10-25 09:48:50','2024-10-25 09:48:50',NULL,17,7),('TRC-1729856956-VwkHEIDm','consultation','Consultation d\'un compte.','2024-10-25 09:49:16','2024-10-25 09:49:16',NULL,17,7),('TRC-1729856979-tGTtEoJC','consultation','Consultation d\'un compte.','2024-10-25 09:49:39','2024-10-25 09:49:39',NULL,17,7),('TRC-1729856994-t180umGe','consultation','Consultation d\'un compte.','2024-10-25 09:49:54','2024-10-25 09:49:54',NULL,17,7),('TRC-1729857008-0RYxqREa','consultation','Consultation d\'un compte.','2024-10-25 09:50:08','2024-10-25 09:50:08',NULL,17,7),('TRC-1729857013-MMBxU3ad','consultation','Consultation d\'un compte.','2024-10-25 09:50:13','2024-10-25 09:50:13',NULL,17,7),('TRC-1729857029-IkyujF47','consultation','Consultation d\'un compte.','2024-10-25 09:50:29','2024-10-25 09:50:29',NULL,17,7),('TRC-1729857101-uZN15OFi','consultation','Consultation d\'un compte.','2024-10-25 09:51:41','2024-10-25 09:51:41',NULL,17,7),('TRC-1729857110-NLjSsRQG','consultation','Consultation d\'un compte.','2024-10-25 09:51:50','2024-10-25 09:51:50',NULL,17,7),('TRC-1729857115-v35fGBCU','consultation','Consultation d\'un compte.','2024-10-25 09:51:55','2024-10-25 09:51:55',NULL,17,7),('TRC-1729857117-zQfC2cIj','consultation','Consultation d\'un compte.','2024-10-25 09:51:57','2024-10-25 09:51:57',NULL,17,7),('TRC-1729857123-Hy1tIVBp','consultation','Consultation d\'un compte.','2024-10-25 09:52:03','2024-10-25 09:52:03',NULL,17,7),('TRC-1729857136-eoy87H79','consultation','Consultation d\'un compte.','2024-10-25 09:52:16','2024-10-25 09:52:16',NULL,17,7),('TRC-1729857160-CX9ueq5D','consultation','Consultation d\'un compte.','2024-10-25 09:52:40','2024-10-25 09:52:40',NULL,17,7),('TRC-1729857182-03il7UdD','consultation','Consultation d\'un compte.','2024-10-25 09:53:02','2024-10-25 09:53:02',NULL,17,7),('TRC-1729857193-QJVd9ImS','consultation','Consultation d\'un compte.','2024-10-25 09:53:13','2024-10-25 09:53:13',NULL,17,7),('TRC-1729857199-DmHmSoQm','consultation','Consultation d\'un compte.','2024-10-25 09:53:19','2024-10-25 09:53:19',NULL,17,7),('TRC-1729857218-q8xWrKV7','consultation','Consultation d\'un compte.','2024-10-25 09:53:38','2024-10-25 09:53:38',NULL,17,7),('TRC-1729857222-G6ryGZHg','consultation','Consultation d\'un compte.','2024-10-25 09:53:42','2024-10-25 09:53:42',NULL,17,7),('TRC-1729857357-1dSXtqiz','consultation','Consultation d\'un compte.','2024-10-25 09:55:57','2024-10-25 09:55:57',NULL,17,7),('TRC-1729857360-kPK66KmB','consultation','Consultation d\'un compte.','2024-10-25 09:56:00','2024-10-25 09:56:00',NULL,17,7),('TRC-1729857440-hv9LdW4b','consultation','Consultation d\'un compte.','2024-10-25 09:57:20','2024-10-25 09:57:20',NULL,17,7),('TRC-1729857449-EVtWiJ7i','consultation','Consultation d\'un compte.','2024-10-25 09:57:29','2024-10-25 09:57:29',NULL,17,7),('TRC-1729857476-DJHEEsUY','consultation','Consultation d\'un compte.','2024-10-25 09:57:56','2024-10-25 09:57:56',NULL,17,7),('TRC-1729857553-4p2qpmIA','consultation','Consultation d\'un compte.','2024-10-25 09:59:13','2024-10-25 09:59:13',NULL,17,7),('TRC-1729857581-bKn1Bxhm','consultation','Consultation d\'un compte.','2024-10-25 09:59:41','2024-10-25 09:59:41',NULL,17,7),('TRC-1729857587-r8ISbfdF','consultation','Consultation d\'un compte.','2024-10-25 09:59:47','2024-10-25 09:59:47',NULL,17,7),('TRC-1729857603-OtHTS42K','consultation','Consultation d\'un compte.','2024-10-25 10:00:03','2024-10-25 10:00:03',NULL,17,7),('TRC-1729857614-DCh5S3DY','consultation','Consultation d\'un compte.','2024-10-25 10:00:14','2024-10-25 10:00:14',NULL,17,7),('TRC-1729857627-f8mdktm2','consultation','Consultation d\'un compte.','2024-10-25 10:00:27','2024-10-25 10:00:27',NULL,17,7),('TRC-1729857636-PdTRnle9','consultation','Consultation d\'un compte.','2024-10-25 10:00:36','2024-10-25 10:00:36',NULL,17,7),('TRC-1729857683-KA3SAjAw','consultation','Consultation d\'un compte.','2024-10-25 10:01:23','2024-10-25 10:01:23',NULL,17,7),('TRC-1729857808-bncO1tkQ','consultation','Consultation d\'un compte.','2024-10-25 10:03:28','2024-10-25 10:03:28',NULL,17,7),('TRC-1729857812-xRChcVYQ','consultation','Consultation d\'un compte.','2024-10-25 10:03:32','2024-10-25 10:03:32',NULL,17,7),('TRC-1729857825-TrULDGst','consultation','Consultation d\'un compte.','2024-10-25 10:03:45','2024-10-25 10:03:45',NULL,17,7),('TRC-1729857835-h4cwwCEu','consultation','Consultation d\'un compte.','2024-10-25 10:03:55','2024-10-25 10:03:55',NULL,17,7),('TRC-1729857838-JuPnvDbl','consultation','Consultation d\'un compte.','2024-10-25 10:03:58','2024-10-25 10:03:58',NULL,17,7),('TRC-1729857845-m0NE90Hp','consultation','Consultation d\'un compte.','2024-10-25 10:04:05','2024-10-25 10:04:05',NULL,17,7),('TRC-1729857878-afLmhhif','consultation','Consultation d\'un compte.','2024-10-25 10:04:38','2024-10-25 10:04:38',NULL,17,7),('TRC-1729857882-KiOUygbk','consultation','Consultation d\'un compte.','2024-10-25 10:04:42','2024-10-25 10:04:42',NULL,17,7),('TRC-1729857902-XzYcDcrA','consultation','Consultation d\'un compte.','2024-10-25 10:05:02','2024-10-25 10:05:02',NULL,17,7),('TRC-1729857905-bKZpQyHR','consultation','Consultation d\'un compte.','2024-10-25 10:05:05','2024-10-25 10:05:05',NULL,17,7),('TRC-1729857908-FZ0D13nn','consultation','Consultation d\'un compte.','2024-10-25 10:05:08','2024-10-25 10:05:08',NULL,17,7),('TRC-1729857919-YNhJUnNZ','consultation','Consultation d\'un compte.','2024-10-25 10:05:19','2024-10-25 10:05:19',NULL,17,7),('TRC-1729857925-XrivlBWa','consultation','Consultation d\'un compte.','2024-10-25 10:05:25','2024-10-25 10:05:25',NULL,17,7),('TRC-1729857934-mnCkBweK','consultation','Consultation d\'un compte.','2024-10-25 10:05:34','2024-10-25 10:05:34',NULL,17,7),('TRC-1729858265-DbjQQnL0','consultation','Consultation d\'un compte.','2024-10-25 10:11:05','2024-10-25 10:11:05',NULL,17,7),('TRC-1729858293-OiTgezxU','consultation','Consultation d\'un compte.','2024-10-25 10:11:33','2024-10-25 10:11:33',NULL,17,7),('TRC-1729858296-JPFLjMHV','consultation','Consultation d\'un compte.','2024-10-25 10:11:36','2024-10-25 10:11:36',NULL,17,7),('TRC-1729858300-0GERO9Dz','consultation','Consultation d\'un compte.','2024-10-25 10:11:40','2024-10-25 10:11:40',NULL,17,7),('TRC-1729858426-edgmAwSJ','consultation','Consultation d\'un compte.','2024-10-25 10:13:46','2024-10-25 10:13:46',NULL,17,7),('TRC-1729858445-UMqz2ALz','consultation','Consultation d\'un compte.','2024-10-25 10:14:05','2024-10-25 10:14:05',NULL,17,7),('TRC-1729858455-zfFkjtXU','consultation','Consultation d\'un compte.','2024-10-25 10:14:15','2024-10-25 10:14:15',NULL,17,7),('TRC-1729858497-rsmw0onq','consultation','Consultation d\'un compte.','2024-10-25 10:14:57','2024-10-25 10:14:57',NULL,17,7),('TRC-1729858500-r0qO44nG','consultation','Consultation d\'un compte.','2024-10-25 10:15:00','2024-10-25 10:15:00',NULL,17,7),('TRC-1729858534-9I8g9ZIW','consultation','Consultation d\'un compte.','2024-10-25 10:15:34','2024-10-25 10:15:34',NULL,17,7),('TRC-1729858540-8UsB6saw','consultation','Consultation d\'un compte.','2024-10-25 10:15:40','2024-10-25 10:15:40',NULL,17,7),('TRC-1729858546-L4D2sg01','consultation','Consultation d\'un compte.','2024-10-25 10:15:46','2024-10-25 10:15:46',NULL,17,7),('TRC-1729858768-1J8IDKFL','consultation','Consultation d\'un compte.','2024-10-25 10:19:28','2024-10-25 10:19:28',NULL,17,7),('TRC-1729858796-ljOAj4NG','consultation','Consultation d\'un compte.','2024-10-25 10:19:56','2024-10-25 10:19:56',NULL,17,7),('TRC-1729858805-oYY0ta6G','consultation','Consultation d\'un compte.','2024-10-25 10:20:05','2024-10-25 10:20:05',NULL,17,4),('TRC-1729858834-0GcXs0XF','transaction','Creation d\'une transaction.','2024-10-25 10:20:34','2024-10-25 10:20:34','TRC-1729858834-KQ33JCul',17,NULL),('TRC-1729858834-e8eXBEQq','creation',NULL,'2024-10-25 10:20:34','2024-10-25 10:20:34','TRC-1729858834-KQ33JCul',17,NULL),('TRC-1729858835-CeFh19Q7','consultation','Consultation d\'un compte.','2024-10-25 10:20:35','2024-10-25 10:20:35',NULL,17,4),('TRC-1729858835-da3BQMeQ','consultation','Consultation d\'un compte.','2024-10-25 10:20:35','2024-10-25 10:20:35',NULL,17,4),('TRC-1729858835-kPki7H4n','consultation','Consultation d\'un compte.','2024-10-25 10:20:35','2024-10-25 10:20:35',NULL,17,5),('TRC-1729858846-1Y75fWuK','consultation','Consultation d\'un compte.','2024-10-25 10:20:46','2024-10-25 10:20:46',NULL,17,4),('TRC-1729858899-bSKRhoWk','creation',NULL,'2024-10-25 10:21:39','2024-10-25 10:21:39','TRC-1729858899-fim0usIe',17,NULL),('TRC-1729858899-CX3c1fXX','transaction','Creation d\'une transaction.','2024-10-25 10:21:39','2024-10-25 10:21:39','TRC-1729858899-fim0usIe',17,NULL),('TRC-1729858899-nG9oMJHZ','consultation','Consultation d\'un compte.','2024-10-25 10:21:39','2024-10-25 10:21:39',NULL,17,7),('TRC-1729858952-ca9S2K6f','consultation','Consultation d\'un compte.','2024-10-25 10:22:32','2024-10-25 10:22:32',NULL,17,5),('TRC-1729858952-h4681213','consultation','Consultation d\'un compte.','2024-10-25 10:22:32','2024-10-25 10:22:32',NULL,17,7),('TRC-1729858952-L7p0Kcl5','transaction','Creation d\'une transaction.','2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs',17,NULL),('TRC-1729858952-PVmIx2iO','consultation','Consultation d\'un compte.','2024-10-25 10:22:32','2024-10-25 10:22:32',NULL,17,7),('TRC-1729858952-vSJripgu','creation',NULL,'2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs',17,NULL),('TRC-1729858964-QPSvbccd','consultation','Consultation d\'un compte.','2024-10-25 10:22:44','2024-10-25 10:22:44',NULL,17,5),('TRC-1729858968-vY6oVivr','consultation','Consultation d\'un compte.','2024-10-25 10:22:48','2024-10-25 10:22:48',NULL,17,4),('TRC-1729859002-KFIoyLQU','consultation','Consultation d\'un compte.','2024-10-25 10:23:22','2024-10-25 10:23:22',NULL,17,4),('TRC-1729859013-EBKdeJMJ','consultation','Consultation d\'un compte.','2024-10-25 10:23:33','2024-10-25 10:23:33',NULL,17,4),('TRC-1729859017-04BzRe88','consultation','Consultation d\'un compte.','2024-10-25 10:23:37','2024-10-25 10:23:37',NULL,17,7),('TRC-1729859032-p9Kej6Vq','consultation','Consultation d\'un compte.','2024-10-25 10:23:52','2024-10-25 10:23:52',NULL,17,7),('TRC-1729859549-agqpPEP0','consultation','Consultation d\'un compte.','2024-10-25 10:32:29','2024-10-25 10:32:29',NULL,17,7),('TRC-1729859581-Bp0jYqyw','consultation','Consultation d\'un compte.','2024-10-25 10:33:01','2024-10-25 10:33:01',NULL,17,7),('TRC-1729859591-osPfNON3','consultation','Consultation d\'un compte.','2024-10-25 10:33:11','2024-10-25 10:33:11',NULL,17,7),('TRC-1729859597-nEtMbgd0','consultation','Consultation d\'un compte.','2024-10-25 10:33:17','2024-10-25 10:33:17',NULL,17,7),('TRC-1729859612-xukxNxDM','consultation','Consultation d\'un compte.','2024-10-25 10:33:32','2024-10-25 10:33:32',NULL,17,7),('TRC-1729859615-hJJ2C7Rt','consultation','Consultation d\'un compte.','2024-10-25 10:33:35','2024-10-25 10:33:35',NULL,17,7),('TRC-1729859643-l1fdjBYQ','consultation','Consultation d\'un compte.','2024-10-25 10:34:03','2024-10-25 10:34:03',NULL,17,7),('TRC-1729859653-bF1FdWDY','consultation','Consultation d\'un compte.','2024-10-25 10:34:13','2024-10-25 10:34:13',NULL,17,7),('TRC-1729859655-EAF5aaNI','consultation','Consultation d\'un compte.','2024-10-25 10:34:15','2024-10-25 10:34:15',NULL,17,7),('TRC-1729859670-HfWnOgB0','consultation','Consultation d\'un compte.','2024-10-25 10:34:30','2024-10-25 10:34:30',NULL,17,7),('TRC-1729859725-WoNDU3hi','consultation','Consultation d\'un compte.','2024-10-25 10:35:25','2024-10-25 10:35:25',NULL,17,7),('TRC-1729859770-B9UkMIxt','consultation','Consultation d\'un compte.','2024-10-25 10:36:10','2024-10-25 10:36:10',NULL,17,7),('TRC-1729859778-KBbE1naV','consultation','Consultation d\'un compte.','2024-10-25 10:36:18','2024-10-25 10:36:18',NULL,17,7),('TRC-1729859812-z6h3OxMt','consultation','Consultation d\'un compte.','2024-10-25 10:36:52','2024-10-25 10:36:52',NULL,17,7),('TRC-1729859881-Ca9gMWaw','consultation','Consultation d\'un compte.','2024-10-25 10:38:01','2024-10-25 10:38:01',NULL,17,7),('TRC-1729859886-Scbh3YoC','consultation','Consultation d\'un compte.','2024-10-25 10:38:06','2024-10-25 10:38:06',NULL,17,7),('TRC-1729859919-ZBooOLgg','consultation','Consultation d\'un compte.','2024-10-25 10:38:39','2024-10-25 10:38:39',NULL,17,7),('TRC-1729859975-epC1L171','consultation','Consultation d\'un compte.','2024-10-25 10:39:35','2024-10-25 10:39:35',NULL,17,7),('TRC-1729859976-ETFpClE7','consultation','Consultation d\'un compte.','2024-10-25 10:39:36','2024-10-25 10:39:36',NULL,17,7),('TRC-1729859996-6nqMZtbm','consultation','Consultation d\'un compte.','2024-10-25 10:39:56','2024-10-25 10:39:56',NULL,17,7),('TRC-1729859999-0TVtvEhN','consultation','Consultation d\'un compte.','2024-10-25 10:39:59','2024-10-25 10:39:59',NULL,17,7),('TRC-1729860025-CnToBhBr','consultation','Consultation d\'un compte.','2024-10-25 10:40:25','2024-10-25 10:40:25',NULL,17,7),('TRC-1729860028-2C9cH84H','consultation','Consultation d\'un compte.','2024-10-25 10:40:28','2024-10-25 10:40:28',NULL,17,7),('TRC-1729860032-Ip2XDXa3','consultation','Consultation d\'un compte.','2024-10-25 10:40:32','2024-10-25 10:40:32',NULL,17,7),('TRC-1729860041-a71qvsEd','consultation','Consultation d\'un compte.','2024-10-25 10:40:41','2024-10-25 10:40:41',NULL,17,7),('TRC-1729860055-CDW7FX1a','consultation','Consultation d\'un compte.','2024-10-25 10:40:55','2024-10-25 10:40:55',NULL,17,7),('TRC-1729860074-yTHvhVnH','consultation','Consultation d\'un compte.','2024-10-25 10:41:14','2024-10-25 10:41:14',NULL,17,7),('TRC-1729860092-KikqX0Tq','consultation','Consultation d\'un compte.','2024-10-25 10:41:32','2024-10-25 10:41:32',NULL,17,7),('TRC-1729860102-rNYgJcSi','consultation','Consultation d\'un compte.','2024-10-25 10:41:42','2024-10-25 10:41:42',NULL,17,7),('TRC-1729860108-wYKxQ44P','consultation','Consultation d\'un compte.','2024-10-25 10:41:48','2024-10-25 10:41:48',NULL,17,7),('TRC-1729860155-mfJB0phR','consultation','\nConsultation d\'un compte.','2024-10-25 10:42:35','2024-10-25 10:42:35',NULL,17,7),('TRC-1729860172-iaeQXoq9','consultation','Consultation d\'un compte.','2024-10-25 10:42:52','2024-10-25 10:42:52',NULL,17,7),('TRC-1729860193-Qgk2I2QI','consultation','Consultation d\'un compte.','2024-10-25 10:43:13','2024-10-25 10:43:13',NULL,17,7),('TRC-1729860205-5D1rIMXK','consultation','Consultation d\'un compte.','2024-10-25 10:43:25','2024-10-25 10:43:25',NULL,17,7),('TRC-1729860226-farmJUmy','consultation','Consultation d\'un compte.','2024-10-25 10:43:46','2024-10-25 10:43:46',NULL,17,7),('TRC-1729860326-wbkRant5','consultation','Consultation d\'un compte.','2024-10-25 10:45:26','2024-10-25 10:45:26',NULL,17,7),('TRC-1729860331-w4S5E7uT','consultation','Consultation d\'un compte.','2024-10-25 10:45:31','2024-10-25 10:45:31',NULL,17,7),('TRC-1729860340-6w4jrnBM','consultation','Consultation d\'un compte.','2024-10-25 10:45:40','2024-10-25 10:45:40',NULL,17,7),('TRC-1729860357-xsDjYE7b','consultation','Consultation d\'un compte.','2024-10-25 10:45:57','2024-10-25 10:45:57',NULL,17,7),('TRC-1729860359-VihPREnF','consultation','Consultation d\'un compte.','2024-10-25 10:45:59','2024-10-25 10:45:59',NULL,17,7),('TRC-1729860369-qONrfkqT','consultation','Consultation d\'un compte.','2024-10-25 10:46:09','2024-10-25 10:46:09',NULL,17,7),('TRC-1729860376-wXYJE8J9','consultation','Consultation d\'un compte.','2024-10-25 10:46:16','2024-10-25 10:46:16',NULL,17,7),('TRC-1729860431-dPWemWmG','consultation','Consultation d\'un compte.','2024-10-25 10:47:11','2024-10-25 10:47:11',NULL,17,7),('TRC-1729860531-duDQ2XdY','consultation','Consultation d\'un compte.','2024-10-25 10:48:51','2024-10-25 10:48:51',NULL,17,7),('TRC-1729860540-QSCEJV8H','consultation','Consultation d\'un compte.','2024-10-25 10:49:00','2024-10-25 10:49:00',NULL,17,7),('TRC-1729860571-CYLxkc9i','consultation','Consultation d\'un compte.','2024-10-25 10:49:31','2024-10-25 10:49:31',NULL,17,7),('TRC-1729860578-oJFzIqH9','consultation','Consultation d\'un compte.','2024-10-25 10:49:38','2024-10-25 10:49:38',NULL,17,7),('TRC-1729860584-BHVeWhhk','consultation','Consultation d\'un compte.','2024-10-25 10:49:44','2024-10-25 10:49:44',NULL,17,7),('TRC-1729860589-NPH88iT3','consultation','Consultation d\'un compte.','2024-10-25 10:49:49','2024-10-25 10:49:49',NULL,17,7),('TRC-1729860663-ZEVIvdwb','consultation','Consultation d\'un compte.','2024-10-25 10:51:03','2024-10-25 10:51:03',NULL,17,7),('TRC-1729960282-E1po5kkv','consultation','Consultation d\'un compte.','2024-10-26 14:31:22','2024-10-26 14:31:22',NULL,17,4),('TRC-1729960319-22SBCFqW','consultation','Consultation d\'un compte.','2024-10-26 14:31:59','2024-10-26 14:31:59',NULL,17,4),('TRC-1729960330-UvSGETYY','consultation','Consultation d\'un compte.','2024-10-26 14:32:10','2024-10-26 14:32:10',NULL,17,4),('TRC-1729960341-wJ0aicD6','consultation','Consultation d\'un compte.','2024-10-26 14:32:21','2024-10-26 14:32:21',NULL,17,4),('TRC-1729960350-PzQ1pJAc','consultation','Consultation d\'un compte.','2024-10-26 14:32:30','2024-10-26 14:32:30',NULL,17,4),('TRC-1729960575-WYYKxvMy','consultation','Consultation d\'un compte.','2024-10-26 14:36:15','2024-10-26 14:36:15',NULL,17,4),('TRC-1729960580-2pMm3UFx','consultation','Consultation d\'un compte.','2024-10-26 14:36:20','2024-10-26 14:36:20',NULL,17,4),('TRC-1729960633-gi6hsmPM','consultation','Consultation d\'un compte.','2024-10-26 14:37:13','2024-10-26 14:37:13',NULL,17,4),('TRC-1729960639-STZ7Bckf','consultation','Consultation d\'un compte.','2024-10-26 14:37:19','2024-10-26 14:37:19',NULL,17,4),('TRC-1729960643-K6rXPzxt','consultation','Consultation d\'un compte.','2024-10-26 14:37:23','2024-10-26 14:37:23',NULL,17,4),('TRC-1729960652-ZcRf0SRl','consultation','Consultation d\'un compte.','2024-10-26 14:37:32','2024-10-26 14:37:32',NULL,17,4),('TRC-1729960669-1AnQxoYT','consultation','Consultation d\'un compte.','2024-10-26 14:37:49','2024-10-26 14:37:49',NULL,17,4),('TRC-1729960680-2lxXdW6c','consultation','Consultation d\'un compte.','2024-10-26 14:38:00','2024-10-26 14:38:00',NULL,17,4),('TRC-1729960717-CQ5zFMyC','consultation','Consultation d\'un compte.','2024-10-26 14:38:37','2024-10-26 14:38:37',NULL,17,4),('TRC-1729960726-ydILnW7z','consultation','Consultation d\'un compte.','2024-10-26 14:38:46','2024-10-26 14:38:46',NULL,17,4),('TRC-1729960759-0VHuFYOd','consultation','Consultation d\'un compte.','2024-10-26 14:39:19','2024-10-26 14:39:19',NULL,17,4),('TRC-1729960769-sz36JL9I','consultation','Consultation d\'un compte.','2024-10-26 14:39:29','2024-10-26 14:39:29',NULL,17,4),('TRC-1729960778-7ByLzV6z','consultation','Consultation d\'un compte.','2024-10-26 14:39:38','2024-10-26 14:39:38',NULL,17,4),('TRC-1729960842-5jIV2mIE','consultation','Consultation d\'un compte.','2024-10-26 14:40:42','2024-10-26 14:40:42',NULL,17,4),('TRC-1729960853-8cNUIHGp','consultation','Consultation d\'un compte.','2024-10-26 14:40:53','2024-10-26 14:40:53',NULL,17,4),('TRC-1729960880-UExgrMdg','consultation','Consultation d\'un compte.','2024-10-26 14:41:20','2024-10-26 14:41:20',NULL,17,4),('TRC-1729960922-oKUCpr5J','consultation','Consultation d\'un compte.','2024-10-26 14:42:02','2024-10-26 14:42:02',NULL,17,4),('TRC-1729960926-pKokIUqE','consultation','Consultation d\'un compte.','2024-10-26 14:42:06','2024-10-26 14:42:06',NULL,17,4),('TRC-1729960992-qlAnYGZu','consultation','Consultation d\'un compte.','2024-10-26 14:43:12','2024-10-26 14:43:12',NULL,17,4),('TRC-1729961147-wTFqa3h5','consultation','Consultation d\'un compte.','2024-10-26 14:45:47','2024-10-26 14:45:47',NULL,17,4),('TRC-1729961507-vUvXOWnz','consultation','Consultation d\'un compte.','2024-10-26 14:51:47','2024-10-26 14:51:47',NULL,17,4),('TRC-1729961513-8F1P1FcP','consultation','Consultation d\'un compte.','2024-10-26 14:51:53','2024-10-26 14:51:53',NULL,17,4),('TRC-1729961542-fV3tCAr8','consultation','Consultation d\'un compte.','2024-10-26 14:52:22','2024-10-26 14:52:22',NULL,17,4),('TRC-1729961549-PRLv1b6v','consultation','Consultation d\'un compte.','2024-10-26 14:52:29','2024-10-26 14:52:29',NULL,17,4),('TRC-1729961567-rq02nezw','consultation','Consultation d\'un compte.','2024-10-26 14:52:47','2024-10-26 14:52:47',NULL,17,4),('TRC-1729961592-zR82F0MY','consultation','Consultation d\'un compte.','2024-10-26 14:53:12','2024-10-26 14:53:12',NULL,17,4),('TRC-1729961622-GgDCHg1v','consultation','Consultation d\'un compte.','2024-10-26 14:53:42','2024-10-26 14:53:42',NULL,17,4),('TRC-1729961647-dhNrpieG','consultation','Consultation d\'un compte.','2024-10-26 14:54:07','2024-10-26 14:54:07',NULL,17,4),('TRC-1729961648-9V9Ofmzs','consultation','Consultation d\'un compte.','2024-10-26 14:54:08','2024-10-26 14:54:08',NULL,17,4),('TRC-1729961655-HmDmKZPo','consultation','Consultation d\'un compte.','2024-10-26 14:54:15','2024-10-26 14:54:15',NULL,17,4),('TRC-1729961669-MOtKdY8O','consultation','Consultation d\'un compte.','2024-10-26 14:54:29','2024-10-26 14:54:29',NULL,17,4),('TRC-1729961703-CNg0nnDO','consultation','Consultation d\'un compte.','2024-10-26 14:55:03','2024-10-26 14:55:03',NULL,17,4),('TRC-1729961743-A4aoJXjz','consultation','Consultation d\'un compte.','2024-10-26 14:55:43','2024-10-26 14:55:43',NULL,17,4),('TRC-1729961763-LWCE2T89','consultation','Consultation d\'un compte.','2024-10-26 14:56:03','2024-10-26 14:56:03',NULL,17,4),('TRC-1729961791-GbB4mnez','consultation','Consultation d\'un compte.','2024-10-26 14:56:31','2024-10-26 14:56:31',NULL,17,4),('TRC-1729961801-nm7ebeRR','consultation','Consultation d\'un compte.','2024-10-26 14:56:41','2024-10-26 14:56:41',NULL,17,4),('TRC-1729961812-RxzzdIoo','consultation','Consultation d\'un compte.','2024-10-26 14:56:52','2024-10-26 14:56:52',NULL,17,4),('TRC-1729961837-aRFG00YV','consultation','Consultation d\'un compte.','2024-10-26 14:57:17','2024-10-26 14:57:17',NULL,17,4),('TRC-1729961857-EEopq4Ha','consultation','Consultation d\'un compte.','2024-10-26 14:57:37','2024-10-26 14:57:37',NULL,17,4),('TRC-1729961863-xyIapJ4S','consultation','Consultation d\'un compte.','2024-10-26 14:57:43','2024-10-26 14:57:43',NULL,17,4),('TRC-1729961870-ek86zgcO','consultation','Consultation d\'un compte.','2024-10-26 14:57:50','2024-10-26 14:57:50',NULL,17,4),('TRC-1729961884-DalW8vrj','consultation','Consultation d\'un compte.','2024-10-26 14:58:04','2024-10-26 14:58:04',NULL,17,4),('TRC-1729961892-GjmCZmsu','consultation','Consultation d\'un compte.','2024-10-26 14:58:12','2024-10-26 14:58:12',NULL,17,4),('TRC-1729961900-aipaSiop','consultation','Consultation d\'un compte.','2024-10-26 14:58:20','2024-10-26 14:58:20',NULL,17,4),('TRC-1729961926-xzz4nDU9','consultation','Consultation d\'un compte.','2024-10-26 14:58:46','2024-10-26 14:58:46',NULL,17,7),('TRC-1729962841-oRgKrfOK','creation',NULL,'2024-10-26 15:14:01','2024-10-26 15:14:01',NULL,17,NULL),('TRC-1729963007-D12k8kZs','creation',NULL,'2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c',17,NULL),('TRC-1729963007-nsyzMSJK','transaction','Creation d\'une transaction.','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c',17,NULL),('TRC-1729971534-wwfp2LkC','consultation','Consultation d\'un compte.','2024-10-26 17:38:54','2024-10-26 17:38:54',NULL,17,7),('TRC-1729971569-PCINg633','consultation','Consultation d\'un compte.','2024-10-26 17:39:29','2024-10-26 17:39:29',NULL,17,7),('TRC-1729971689-1f1yfOZc','consultation','Consultation d\'un compte.','2024-10-26 17:41:29','2024-10-26 17:41:29',NULL,17,7),('TRC-1729971731-V6bp2ilX','consultation','Consultation d\'un compte.','2024-10-26 17:42:11','2024-10-26 17:42:11',NULL,17,7),('TRC-1729974190-SWy5eXtV','consultation','Consultation d\'un compte.','2024-10-26 18:23:10','2024-10-26 18:23:10',NULL,17,5),('TRC-1729974190-TJIAEF2z','consultation','Consultation d\'un compte.','2024-10-26 18:23:10','2024-10-26 18:23:10',NULL,17,5),('TRC-1729974198-aPI3ioKe','consultation','Consultation d\'un compte.','2024-10-26 18:23:18','2024-10-26 18:23:18',NULL,17,7),('TRC-1729974222-pict04DO','consultation','Consultation d\'un compte.','2024-10-26 18:23:42','2024-10-26 18:23:42',NULL,17,5),('TRC-1729974239-C8SKkfXM','consultation','Consultation d\'un compte.','2024-10-26 18:23:59','2024-10-26 18:23:59',NULL,17,7),('TRC-1729974268-QPXhe0YN','consultation','Consultation d\'un compte.','2024-10-26 18:24:28','2024-10-26 18:24:28',NULL,17,4),('TRC-1729974488-2S8vwfg2','consultation','Consultation d\'un compte.','2024-10-26 18:28:08','2024-10-26 18:28:08',NULL,17,7),('TRC-1730016477-0XAKeA5q','consultation','Consultation d\'un compte.','2024-10-27 07:07:57','2024-10-27 07:07:57',NULL,17,7),('TRC-1730020072-Flw7k21o','consultation','Consultation d\'un compte.','2024-10-27 08:07:52','2024-10-27 08:07:52',NULL,17,7),('TRC-1730020121-Nb7f6Txm','consultation','Consultation d\'un compte.','2024-10-27 08:08:41','2024-10-27 08:08:41',NULL,17,7),('TRC-1730020130-JneiV3yW','consultation','Consultation d\'un compte.','2024-10-27 08:08:50','2024-10-27 08:08:50',NULL,17,7),('TRC-1730020132-mvuhTz55','consultation','Consultation d\'un compte.','2024-10-27 08:08:52','2024-10-27 08:08:52',NULL,17,7),('TRC-1730020197-PI6DUuvn','consultation','Consultation d\'un compte.','2024-10-27 08:09:57','2024-10-27 08:09:57',NULL,17,7),('TRC-1730020204-ilxjW01R','consultation','Consultation d\'un compte.','2024-10-27 08:10:04','2024-10-27 08:10:04',NULL,17,7),('TRC-1730020238-Tc1DmEGe','consultation','Consultation d\'un compte.','2024-10-27 08:10:38','2024-10-27 08:10:38',NULL,17,7),('TRC-1730020250-ekbyX5Vo','consultation','Consultation d\'un compte.','2024-10-27 08:10:50','2024-10-27 08:10:50',NULL,17,7),('TRC-1730020267-zbclsFNK','consultation','Consultation d\'un compte.','2024-10-27 08:11:07','2024-10-27 08:11:07',NULL,17,7),('TRC-1730020287-kD5RV30q','consultation','Consultation d\'un compte.','2024-10-27 08:11:27','2024-10-27 08:11:27',NULL,17,7),('TRC-1730020310-TLnH7kF8','consultation','Consultation d\'un compte.','2024-10-27 08:11:50','2024-10-27 08:11:50',NULL,17,7),('TRC-1730020315-rOsjgAWE','consultation','Consultation d\'un compte.','2024-10-27 08:11:55','2024-10-27 08:11:55',NULL,17,7),('TRC-1730020544-v6oReiLb','consultation','Consultation d\'un compte.','2024-10-27 08:15:44','2024-10-27 08:15:44',NULL,17,7),('TRC-1730020553-NRUoRf2J','consultation','Consultation d\'un compte.','2024-10-27 08:15:53','2024-10-27 08:15:53',NULL,17,7),('TRC-1730020559-uGPVgEUA','consultation','Consultation d\'un compte.','2024-10-27 08:15:59','2024-10-27 08:15:59',NULL,17,7),('TRC-1730020568-8cYqLo1d','consultation','Consultation d\'un compte.','2024-10-27 08:16:08','2024-10-27 08:16:08',NULL,17,7),('TRC-1730020575-LcbwYBti','consultation','Consultation d\'un compte.','2024-10-27 08:16:15','2024-10-27 08:16:15',NULL,17,7),('TRC-1730020602-Ey2ZMaCZ','consultation','Consultation d\'un compte.','2024-10-27 08:16:42','2024-10-27 08:16:42',NULL,17,7),('TRC-1730020612-RCbapjZK','consultation','Consultation d\'un compte.','2024-10-27 08:16:52','2024-10-27 08:16:52',NULL,17,7),('TRC-1730020620-fnnCufiQ','consultation','Consultation d\'un compte.','2024-10-27 08:17:00','2024-10-27 08:17:00',NULL,17,7),('TRC-1730020638-iykUvORA','consultation','Consultation d\'un compte.','2024-10-27 08:17:18','2024-10-27 08:17:18',NULL,17,7),('TRC-1730020640-9dTYMfxM','consultation','Consultation d\'un compte.','2024-10-27 08:17:20','2024-10-27 08:17:20',NULL,17,7),('TRC-1730020645-XrZO7J3q','consultation','Consultation d\'un compte.','2024-10-27 08:17:25','2024-10-27 08:17:25',NULL,17,7),('TRC-1730020649-O2tLwUpA','consultation','Consultation d\'un compte.','2024-10-27 08:17:29','2024-10-27 08:17:29',NULL,17,7),('TRC-1730020659-bpUstzYA','consultation','Consultation d\'un compte.','2024-10-27 08:17:39','2024-10-27 08:17:39',NULL,17,7),('TRC-1730020666-5QgpKfPj','consultation','Consultation d\'un compte.','2024-10-27 08:17:46','2024-10-27 08:17:46',NULL,17,7),('TRC-1730020672-jBG7RSsZ','consultation','Consultation d\'un compte.','2024-10-27 08:17:52','2024-10-27 08:17:52',NULL,17,7),('TRC-1730020678-Il5gbHaD','consultation','Consultation d\'un compte.','2024-10-27 08:17:58','2024-10-27 08:17:58',NULL,17,7),('TRC-1730020679-PVprlfk8','consultation','Consultation d\'un compte.','2024-10-27 08:17:59','2024-10-27 08:17:59',NULL,17,7),('TRC-1730020685-O8Eg6NtO','consultation','Consultation d\'un compte.','2024-10-27 08:18:05','2024-10-27 08:18:05',NULL,17,7),('TRC-1730020694-qj8jOnLA','consultation','Consultation d\'un compte.','2024-10-27 08:18:14','2024-10-27 08:18:14',NULL,17,7),('TRC-1730020705-IHGqXdWU','consultation','Consultation d\'un compte.','2024-10-27 08:18:25','2024-10-27 08:18:25',NULL,17,7),('TRC-1730020774-VBdbUpbW','consultation','Consultation d\'un compte.','2024-10-27 08:19:34','2024-10-27 08:19:34',NULL,17,7),('TRC-1730020784-a8tgz0MD','consultation','Consultation d\'un compte.','2024-10-27 08:19:44','2024-10-27 08:19:44',NULL,17,7),('TRC-1730020903-KJe09ds4','consultation','Consultation d\'un compte.','2024-10-27 08:21:43','2024-10-27 08:21:43',NULL,17,7),('TRC-1730020909-Kz6QqmiE','consultation','Consultation d\'un compte.','2024-10-27 08:21:49','2024-10-27 08:21:49',NULL,17,7),('TRC-1730020942-4xXLyZAp','consultation','Consultation d\'un compte.','2024-10-27 08:22:22','2024-10-27 08:22:22',NULL,17,7),('TRC-1730020977-oJT0oW0C','consultation','Consultation d\'un compte.','2024-10-27 08:22:57','2024-10-27 08:22:57',NULL,17,7),('TRC-1730020993-8MCt8KCM','consultation','Consultation d\'un compte.','2024-10-27 08:23:13','2024-10-27 08:23:13',NULL,17,7),('TRC-1730021022-wOyO1S8u','consultation','Consultation d\'un compte.','2024-10-27 08:23:42','2024-10-27 08:23:42',NULL,17,7),('TRC-1730021028-ntSwXCyn','consultation','Consultation d\'un compte.','2024-10-27 08:23:48','2024-10-27 08:23:48',NULL,17,7),('TRC-1730021052-K9ZTrZCK','consultation','Consultation d\'un compte.','2024-10-27 08:24:12','2024-10-27 08:24:12',NULL,17,7),('TRC-1730021165-6dKvvva8','consultation','Consultation d\'un compte.','2024-10-27 08:26:05','2024-10-27 08:26:05',NULL,17,7),('TRC-1730021182-X70Qhao6','consultation','Consultation d\'un compte.','2024-10-27 08:26:22','2024-10-27 08:26:22',NULL,17,7),('TRC-1730021205-DbzHm11e','consultation','Consultation d\'un compte.','2024-10-27 08:26:45','2024-10-27 08:26:45',NULL,17,7),('TRC-1730021232-PEboPyLz','consultation','Consultation d\'un compte.','2024-10-27 08:27:12','2024-10-27 08:27:12',NULL,17,7),('TRC-1730021254-bEJ3IHEJ','consultation','Consultation d\'un compte.','2024-10-27 08:27:34','2024-10-27 08:27:34',NULL,17,7),('TRC-1730021272-2tzBt2Hl','consultation','Consultation d\'un compte.','2024-10-27 08:27:52','2024-10-27 08:27:52',NULL,17,7),('TRC-1730021300-NhRSHYjR','consultation','Consultation d\'un compte.','2024-10-27 08:28:20','2024-10-27 08:28:20',NULL,17,7),('TRC-1730021308-qZnTc0RX','consultation','Consultation d\'un compte.','2024-10-27 08:28:28','2024-10-27 08:28:28',NULL,17,7),('TRC-1730021321-I3VQXLsL','consultation','Consultation d\'un compte.','2024-10-27 08:28:41','2024-10-27 08:28:41',NULL,17,7),('TRC-1730021323-y8I8TOCk','consultation','Consultation d\'un compte.','2024-10-27 08:28:43','2024-10-27 08:28:43',NULL,17,7),('TRC-1730021333-LLr1nzIS','consultation','Consultation d\'un compte.','2024-10-27 08:28:53','2024-10-27 08:28:53',NULL,17,7),('TRC-1730021339-8KZFy8Xr','consultation','Consultation d\'un compte.','2024-10-27 08:28:59','2024-10-27 08:28:59',NULL,17,7),('TRC-1730021343-DIDusCYE','consultation','Consultation d\'un compte.','2024-10-27 08:29:03','2024-10-27 08:29:03',NULL,17,7),('TRC-1730021343-Z5FDAO4Z','consultation','Consultation d\'un compte.','2024-10-27 08:29:03','2024-10-27 08:29:03',NULL,17,7),('TRC-1730021374-v4m47b9l','consultation','Consultation d\'un compte.','2024-10-27 08:29:34','2024-10-27 08:29:34',NULL,17,7),('TRC-1730021381-8TCBG7bw','consultation','Consultation d\'un compte.','2024-10-27 08:29:41','2024-10-27 08:29:41',NULL,17,7),('TRC-1730021424-0SV8269m','consultation','Consultation d\'un compte.','2024-10-27 08:30:24','2024-10-27 08:30:24',NULL,17,7),('TRC-1730021440-ykflin1k','consultation','Consultation d\'un compte.','2024-10-27 08:30:40','2024-10-27 08:30:40',NULL,17,7),('TRC-1730021444-yX77dFbD','consultation','Consultation d\'un compte.','2024-10-27 08:30:44','2024-10-27 08:30:44',NULL,17,7),('TRC-1730021452-I3EnPldC','consultation','Consultation d\'un compte.','2024-10-27 08:30:52','2024-10-27 08:30:52',NULL,17,7),('TRC-1730021459-mfHbQ3tR','consultation','Consultation d\'un compte.','2024-10-27 08:30:59','2024-10-27 08:30:59',NULL,17,7),('TRC-1730021470-kY0voHu6','consultation','Consultation d\'un compte.','2024-10-27 08:31:10','2024-10-27 08:31:10',NULL,17,7),('TRC-1730021478-vX7oEs1v','consultation','Consultation d\'un compte.','2024-10-27 08:31:18','2024-10-27 08:31:18',NULL,17,7),('TRC-1730021483-YIF18QZE','consultation','Consultation d\'un compte.','2024-10-27 08:31:23','2024-10-27 08:31:23',NULL,17,7),('TRC-1730021551-XyJAxVgg','consultation','Consultation d\'un compte.','2024-10-27 08:32:31','2024-10-27 08:32:31',NULL,17,7),('TRC-1730021571-kyyPHTLz','consultation','Consultation d\'un compte.','2024-10-27 08:32:51','2024-10-27 08:32:51',NULL,17,7),('TRC-1730021580-dx8YeJ1l','consultation','Consultation d\'un compte.','2024-10-27 08:33:00','2024-10-27 08:33:00',NULL,17,7),('TRC-1730021584-jes9GphH','consultation','Consultation d\'un compte.','2024-10-27 08:33:04','2024-10-27 08:33:04',NULL,17,7),('TRC-1730021589-rKbRG38J','consultation','Consultation d\'un compte.','2024-10-27 08:33:09','2024-10-27 08:33:09',NULL,17,7),('TRC-1730021607-aXyhJ5cJ','consultation','Consultation d\'un compte.','2024-10-27 08:33:27','2024-10-27 08:33:27',NULL,17,7),('TRC-1730021821-edvTFuzd','consultation','Consultation d\'un compte.','2024-10-27 08:37:01','2024-10-27 08:37:01',NULL,17,7),('TRC-1730021841-oCTdkbkX','consultation','Consultation d\'un compte.','2024-10-27 08:37:21','2024-10-27 08:37:21',NULL,17,7),('TRC-1730021898-gzEzZOav','consultation','Consultation d\'un compte.','2024-10-27 08:38:18','2024-10-27 08:38:18',NULL,17,7),('TRC-1730021911-MFSDlwfs','consultation','Consultation d\'un compte.','2024-10-27 08:38:31','2024-10-27 08:38:31',NULL,17,7),('TRC-1730021935-FD9lVroN','consultation','Consultation d\'un compte.','2024-10-27 08:38:55','2024-10-27 08:38:55',NULL,17,7),('TRC-1730022072-Vq75L0h7','consultation','Consultation d\'un compte.','2024-10-27 08:41:12','2024-10-27 08:41:12',NULL,17,7),('TRC-1730022087-G2MTaCSz','consultation','Consultation d\'un compte.','2024-10-27 08:41:27','2024-10-27 08:41:27',NULL,17,7),('TRC-1730022091-n1o7Gmce','consultation','Consultation d\'un compte.','2024-10-27 08:41:31','2024-10-27 08:41:31',NULL,17,7),('TRC-1730022172-Lb4ODBuU','consultation','Consultation d\'un compte.','2024-10-27 08:42:52','2024-10-27 08:42:52',NULL,17,7),('TRC-1730022182-7qwQA0O2','consultation','Consultation d\'un compte.','2024-10-27 08:43:02','2024-10-27 08:43:02',NULL,17,7),('TRC-1730022204-4AtH5Cdk','consultation','Consultation d\'un compte.','2024-10-27 08:43:24','2024-10-27 08:43:24',NULL,17,7),('TRC-1730022230-zW8vgZ8x','consultation','Consultation d\'un compte.','2024-10-27 08:43:50','2024-10-27 08:43:50',NULL,17,7),('TRC-1730022292-UfRGe362','consultation','Consultation d\'un compte.','2024-10-27 08:44:52','2024-10-27 08:44:52',NULL,17,7),('TRC-1730022346-T4kjuZ7i','consultation','Consultation d\'un compte.','2024-10-27 08:45:46','2024-10-27 08:45:46',NULL,17,7),('TRC-1730022466-QernhCrY','consultation','Consultation d\'un compte.','2024-10-27 08:47:46','2024-10-27 08:47:46',NULL,17,7),('TRC-1730022479-m3CwVSW5','consultation','Consultation d\'un compte.','2024-10-27 08:47:59','2024-10-27 08:47:59',NULL,17,7),('TRC-1730022486-RksWyqOO','consultation','Consultation d\'un compte.','2024-10-27 08:48:06','2024-10-27 08:48:06',NULL,17,7),('TRC-1730022495-j5AfvYMl','consultation','Consultation d\'un compte.','2024-10-27 08:48:15','2024-10-27 08:48:15',NULL,17,7),('TRC-1730022513-x9iD48yP','consultation','Consultation d\'un compte.','2024-10-27 08:48:33','2024-10-27 08:48:33',NULL,17,7),('TRC-1730022525-mjLY4eiN','consultation','Consultation d\'un compte.','2024-10-27 08:48:45','2024-10-27 08:48:45',NULL,17,7),('TRC-1730022533-hJMW1Lwl','consultation','Consultation d\'un compte.','2024-10-27 08:48:53','2024-10-27 08:48:53',NULL,17,7),('TRC-1730022539-8dQAjBMQ','consultation','Consultation d\'un compte.','2024-10-27 08:48:59','2024-10-27 08:48:59',NULL,17,7),('TRC-1730022556-eM5w0xHp','consultation','Consultation d\'un compte.','2024-10-27 08:49:16','2024-10-27 08:49:16',NULL,17,7),('TRC-1730022561-z9JT4HVz','consultation','Consultation d\'un compte.','2024-10-27 08:49:21','2024-10-27 08:49:21',NULL,17,7),('TRC-1730022592-Uz25BfOJ','consultation','Consultation d\'un compte.','2024-10-27 08:49:52','2024-10-27 08:49:52',NULL,17,7),('TRC-1730022601-vyr4JJXL','consultation','Consultation d\'un compte.','2024-10-27 08:50:01','2024-10-27 08:50:01',NULL,17,7),('TRC-1730022633-yh3w65kY','consultation','Consultation d\'un compte.','2024-10-27 08:50:33','2024-10-27 08:50:33',NULL,17,7),('TRC-1730022660-o0hTVoFQ','consultation','Consultation d\'un compte.','2024-10-27 08:51:00','2024-10-27 08:51:00',NULL,17,7),('TRC-1730022787-U6abAlCr','consultation','Consultation d\'un compte.','2024-10-27 08:53:07','2024-10-27 08:53:07',NULL,17,7),('TRC-1730022811-KNihCgzc','consultation','Consultation d\'un compte.','2024-10-27 08:53:31','2024-10-27 08:53:31',NULL,17,7),('TRC-1730022826-2IOWMvNS','consultation','Consultation d\'un compte.','2024-10-27 08:53:46','2024-10-27 08:53:46',NULL,17,7),('TRC-1730022835-5sQvD5hr','consultation','Consultation d\'un compte.','2024-10-27 08:53:55','2024-10-27 08:53:55',NULL,17,7),('TRC-1730022898-ZlhRVCP7','consultation','Consultation d\'un compte.','2024-10-27 08:54:58','2024-10-27 08:54:58',NULL,17,7),('TRC-1730022910-h4SY3Q0f','consultation','Consultation d\'un compte.','2024-10-27 08:55:10','2024-10-27 08:55:10',NULL,17,7),('TRC-1730022947-mRoOpCsH','consultation','Consultation d\'un compte.','2024-10-27 08:55:47','2024-10-27 08:55:47',NULL,17,7),('TRC-1730022956-ezkp5njv','consultation','Consultation d\'un compte.','2024-10-27 08:55:56','2024-10-27 08:55:56',NULL,17,7),('TRC-1730022975-adKndx63','consultation','Consultation d\'un compte.','2024-10-27 08:56:15','2024-10-27 08:56:15',NULL,17,7),('TRC-1730023026-9EFkqHvG','consultation','Consultation d\'un compte.','2024-10-27 08:57:06','2024-10-27 08:57:06',NULL,17,7),('TRC-1730023114-cMbbD9FA','consultation','Consultation d\'un compte.','2024-10-27 08:58:34','2024-10-27 08:58:34',NULL,17,7),('TRC-1730023117-y6iBNA4d','consultation','Consultation d\'un compte.','2024-10-27 08:58:37','2024-10-27 08:58:37',NULL,17,7),('TRC-1730023253-GYyLLvdp','consultation','Consultation d\'un compte.','2024-10-27 09:00:53','2024-10-27 09:00:53',NULL,17,7),('TRC-1730023277-xkcYecOP','consultation','Consultation d\'un compte.','2024-10-27 09:01:17','2024-10-27 09:01:17',NULL,17,7),('TRC-1730023283-nHZvXNaf','consultation','Consultation d\'un compte.','2024-10-27 09:01:23','2024-10-27 09:01:23',NULL,17,7),('TRC-1730023286-EpuWjD5I','consultation','Consultation d\'un compte.','2024-10-27 09:01:26','2024-10-27 09:01:26',NULL,17,7),('TRC-1730023339-mlKH8KWB','consultation','Consultation d\'un compte.','2024-10-27 09:02:19','2024-10-27 09:02:19',NULL,17,7),('TRC-1730023824-tNej8Bme','consultation','Consultation d\'un compte.','2024-10-27 09:10:24','2024-10-27 09:10:24',NULL,17,7),('TRC-1730023869-TWsF5jCV','consultation','Consultation d\'un compte.','2024-10-27 09:11:09','2024-10-27 09:11:09',NULL,17,7),('TRC-1730026069-vVMNOiqy','consultation','Consultation d\'un compte.','2024-10-27 09:47:49','2024-10-27 09:47:49',NULL,17,7),('TRC-1730026479-SxVvGclu','consultation','Consultation d\'un compte.','2024-10-27 09:54:39','2024-10-27 09:54:39',NULL,17,7),('TRC-1730026597-puyY5zN6','consultation','Consultation d\'un compte.','2024-10-27 09:56:37','2024-10-27 09:56:37',NULL,17,7),('TRC-1730026641-Jvue6qaT','consultation','Consultation d\'un compte.','2024-10-27 09:57:21','2024-10-27 09:57:21',NULL,17,7),('TRC-1730026643-H3NU31yV','consultation','Consultation d\'un compte.','2024-10-27 09:57:23','2024-10-27 09:57:23',NULL,17,7),('TRC-1730026650-HZcQ1UaN','consultation','Consultation d\'un compte.','2024-10-27 09:57:30','2024-10-27 09:57:30',NULL,17,7),('TRC-1730026768-2Xxntzf9','consultation','Consultation d\'un compte.','2024-10-27 09:59:28','2024-10-27 09:59:28',NULL,17,7),('TRC-1730026844-Jbs0gPYt','consultation','Consultation d\'un compte.','2024-10-27 10:00:44','2024-10-27 10:00:44',NULL,17,7),('TRC-1730026931-sHKyYGDo','consultation','Consultation d\'un compte.','2024-10-27 10:02:11','2024-10-27 10:02:11',NULL,17,7),('TRC-1730027033-COvc52c2','consultation','Consultation d\'un compte.','2024-10-27 10:03:53','2024-10-27 10:03:53',NULL,17,7),('TRC-1730027045-OgooS1pt','consultation','Consultation d\'un compte.','2024-10-27 10:04:05','2024-10-27 10:04:05',NULL,17,7),('TRC-1730027216-LKtDgIEw','consultation','Consultation d\'un compte.','2024-10-27 10:06:56','2024-10-27 10:06:56',NULL,17,7),('TRC-1730027262-l28sMzCi','consultation','Consultation d\'un compte.','2024-10-27 10:07:42','2024-10-27 10:07:42',NULL,17,7),('TRC-1730027300-7KM5EiUq','consultation','Consultation d\'un compte.','2024-10-27 10:08:20','2024-10-27 10:08:20',NULL,17,7),('TRC-1730027304-VVkDAMVn','consultation','Consultation d\'un compte.','2024-10-27 10:08:24','2024-10-27 10:08:24',NULL,17,7),('TRC-1730027310-sgHwss9s','consultation','Consultation d\'un compte.','2024-10-27 10:08:30','2024-10-27 10:08:30',NULL,17,7),('TRC-1730027319-u4NDoIOG','consultation','Consultation d\'un compte.','2024-10-27 10:08:39','2024-10-27 10:08:39',NULL,17,7),('TRC-1730027327-Qt6IwD2I','consultation','Consultation d\'un compte.','2024-10-27 10:08:47','2024-10-27 10:08:47',NULL,17,7),('TRC-1730027386-dVPF69gi','consultation','Consultation d\'un compte.','2024-10-27 10:09:46','2024-10-27 10:09:46',NULL,17,7),('TRC-1730027425-FB0A0256','consultation','Consultation d\'un compte.','2024-10-27 10:10:25','2024-10-27 10:10:25',NULL,17,7),('TRC-1730027441-wdGJlibU','consultation','Consultation d\'un compte.','2024-10-27 10:10:41','2024-10-27 10:10:41',NULL,17,7),('TRC-1730027474-yq6DFhS6','consultation','Consultation d\'un compte.','2024-10-27 10:11:14','2024-10-27 10:11:14',NULL,17,7),('TRC-1730027481-J7ez3oPU','consultation','Consultation d\'un compte.','2024-10-27 10:11:21','2024-10-27 10:11:21',NULL,17,7),('TRC-1730027487-ywxK4YrC','consultation','Consultation d\'un compte.','2024-10-27 10:11:27','2024-10-27 10:11:27',NULL,17,7),('TRC-1730027500-pquTdyAe','consultation','Consultation d\'un compte.','2024-10-27 10:11:40','2024-10-27 10:11:40',NULL,17,7),('TRC-1730027504-XBrEHcFG','consultation','Consultation d\'un compte.','2024-10-27 10:11:44','2024-10-27 10:11:44',NULL,17,7),('TRC-1730027534-mMZz8hQ5','consultation','Consultation d\'un compte.','2024-10-27 10:12:14','2024-10-27 10:12:14',NULL,17,7),('TRC-1730027582-6df5JQfT','consultation','Consultation d\'un compte.','2024-10-27 10:13:02','2024-10-27 10:13:02',NULL,17,7),('TRC-1730027700-Q6RpNwln','consultation','Consultation d\'un compte.','2024-10-27 10:15:00','2024-10-27 10:15:00',NULL,17,7),('TRC-1730027718-3Hs1vFPk','consultation','Consultation d\'un compte.','2024-10-27 10:15:18','2024-10-27 10:15:18',NULL,17,7),('TRC-1730027741-c3ZsVsuo','consultation','Consultation d\'un compte.','2024-10-27 10:15:41','2024-10-27 10:15:41',NULL,17,7),('TRC-1730027768-AeJB5OUt','consultation','Consultation d\'un compte.','2024-10-27 10:16:08','2024-10-27 10:16:08',NULL,17,7),('TRC-1730028087-AWO7BqWn','consultation','Consultation d\'un compte.','2024-10-27 10:21:27','2024-10-27 10:21:27',NULL,17,7),('TRC-1730028116-a9Fg6ZYd','consultation','\nConsultation d\'un compte.','2024-10-27 10:21:56','2024-10-27 10:21:56',NULL,17,7),('TRC-1730028137-QlMORU6u','consultation','Consultation d\'un compte.','2024-10-27 10:22:17','2024-10-27 10:22:17',NULL,17,7),('TRC-1730028198-Ub9wmtw2','consultation','Consultation d\'un compte.','2024-10-27 10:23:18','2024-10-27 10:23:18',NULL,17,7),('TRC-1730028200-SBFnckbf','consultation','Consultation d\'un compte.','2024-10-27 10:23:20','2024-10-27 10:23:20',NULL,17,7),('TRC-1730028204-Pf8I8X4C','consultation','Consultation d\'un compte.','2024-10-27 10:23:24','2024-10-27 10:23:24',NULL,17,7),('TRC-1730028226-1yhO7XP8','consultation','Consultation d\'un compte.','2024-10-27 10:23:46','2024-10-27 10:23:46',NULL,17,7),('TRC-1730028259-lIlK5ZdT','consultation','Consultation d\'un compte.','2024-10-27 10:24:19','2024-10-27 10:24:19',NULL,17,7),('TRC-1730028263-sNr7HuLP','consultation','Consultation d\'un compte.','2024-10-27 10:24:23','2024-10-27 10:24:23',NULL,17,7),('TRC-1730028291-zMo1JarX','consultation','Consultation d\'un compte.','2024-10-27 10:24:51','2024-10-27 10:24:51',NULL,17,7),('TRC-1730028302-R4XXpLA7','consultation','Consultation d\'un compte.','2024-10-27 10:25:02','2024-10-27 10:25:02',NULL,17,4),('TRC-1730028313-ALGrMJRL','consultation','Consultation d\'un compte.','2024-10-27 10:25:13','2024-10-27 10:25:13',NULL,17,5),('TRC-1730028438-Cy7iRbaT','consultation','Consultation d\'un compte.','2024-10-27 10:27:18','2024-10-27 10:27:18',NULL,17,5),('TRC-1730028440-pJlxF0K3','consultation','Consultation d\'un compte.','2024-10-27 10:27:20','2024-10-27 10:27:20',NULL,17,5),('TRC-1730028491-usFxQ7hy','consultation','Consultation d\'un compte.','2024-10-27 10:28:11','2024-10-27 10:28:11',NULL,17,4),('TRC-1730028493-jTs8NKQs','consultation','Consultation d\'un compte.','2024-10-27 10:28:13','2024-10-27 10:28:13',NULL,17,5),('TRC-1730028512-iigAwP9e','consultation','Consultation d\'un compte.','2024-10-27 10:28:32','2024-10-27 10:28:32',NULL,17,7),('TRC-1730028538-LlttaoMs','consultation','Consultation d\'un compte.','2024-10-27 10:28:58','2024-10-27 10:28:58',NULL,17,7),('TRC-1730028547-06OXMn5V','consultation','Consultation d\'un compte.','2024-10-27 10:29:07','2024-10-27 10:29:07',NULL,17,7),('TRC-1730028556-sHsFCxe3','consultation','Consultation d\'un compte.','2024-10-27 10:29:16','2024-10-27 10:29:16',NULL,17,7),('TRC-1730028586-gTnjy8Q9','consultation','Consultation d\'un compte.','2024-10-27 10:29:46','2024-10-27 10:29:46',NULL,17,7),('TRC-1730028608-JTdekDC8','consultation','Consultation d\'un compte.','2024-10-27 10:30:08','2024-10-27 10:30:08',NULL,17,7),('TRC-1730028616-BEwHfjaC','consultation','Consultation d\'un compte.','2024-10-27 10:30:16','2024-10-27 10:30:16',NULL,17,7),('TRC-1730028655-efnjcWlr','consultation','Consultation d\'un compte.','2024-10-27 10:30:55','2024-10-27 10:30:55',NULL,17,7),('TRC-1730028677-j4imxfV2','consultation','Consultation d\'un compte.','2024-10-27 10:31:17','2024-10-27 10:31:17',NULL,17,7),('TRC-1730028680-cHVPsnIP','consultation','Consultation d\'un compte.','2024-10-27 10:31:20','2024-10-27 10:31:20',NULL,17,7),('TRC-1730028689-22QwulAL','consultation','Consultation d\'un compte.','2024-10-27 10:31:29','2024-10-27 10:31:29',NULL,17,7),('TRC-1730028690-QX3GMVhe','consultation','Consultation d\'un compte.','2024-10-27 10:31:30','2024-10-27 10:31:30',NULL,17,7),('TRC-1730028795-Cjrj9MJC','consultation','Consultation d\'un compte.','2024-10-27 10:33:15','2024-10-27 10:33:15',NULL,17,4),('TRC-1730028835-s3aBfVOe','consultation','Consultation d\'un compte.','2024-10-27 10:33:55','2024-10-27 10:33:55',NULL,17,4),('TRC-1730028843-ETuONeCy','consultation','Consultation d\'un compte.','2024-10-27 10:34:03','2024-10-27 10:34:03',NULL,17,7),('TRC-1730028850-nFKElECT','consultation','Consultation d\'un compte.','2024-10-27 10:34:10','2024-10-27 10:34:10',NULL,17,5),('TRC-1730028874-zeCUFGqu','consultation','Consultation d\'un compte.','2024-10-27 10:34:34','2024-10-27 10:34:34',NULL,17,5),('TRC-1730028901-z879uz2s','consultation','Consultation d\'un compte.','2024-10-27 10:35:01','2024-10-27 10:35:01',NULL,17,5),('TRC-1730028914-nQIQGZfV','consultation','Consultation d\'un compte.','2024-10-27 10:35:14','2024-10-27 10:35:14',NULL,17,5),('TRC-1730028925-lHvHRttv','consultation','Consultation d\'un compte.','2024-10-27 10:35:25','2024-10-27 10:35:25',NULL,17,7),('TRC-1730028973-KuU5icDm','consultation','Consultation d\'un compte.','2024-10-27 10:36:13','2024-10-27 10:36:13',NULL,17,7),('TRC-1730029076-Ek8H6tEh','creation',NULL,'2024-10-27 10:37:56','2024-10-27 10:37:56','TRC-1730029076-JCVTDgM2',17,NULL),('TRC-1730029076-QoKKhrj2','transaction','Creation d\'une transaction.','2024-10-27 10:37:56','2024-10-27 10:37:56','TRC-1730029076-JCVTDgM2',17,NULL),('TRC-1730029093-1F4bSpqw','consultation','Consultation d\'un compte.','2024-10-27 10:38:13','2024-10-27 10:38:13',NULL,17,5),('TRC-1730029104-faARoz09','consultation','Consultation d\'un compte.','2024-10-27 10:38:24','2024-10-27 10:38:24',NULL,17,7),('TRC-1730029162-4tootdrp','creation',NULL,'2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb',17,NULL),('TRC-1730029162-OHYSRLS4','transaction','Creation d\'une transaction.','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb',17,NULL),('TRC-1730029175-QTBBqNBd','consultation','Consultation d\'un compte.','2024-10-27 10:39:35','2024-10-27 10:39:35',NULL,17,5),('TRC-1730029246-vrG36Aj1','consultation','Consultation d\'un compte.','2024-10-27 10:40:46','2024-10-27 10:40:46',NULL,17,7),('TRC-1730029315-RORoruWq','consultation','Consultation d\'un compte.','2024-10-27 10:41:55','2024-10-27 10:41:55',NULL,17,7),('TRC-1730029861-5OPZwOd3','consultation','Consultation d\'un compte.','2024-10-27 10:51:01','2024-10-27 10:51:01',NULL,17,7),('TRC-1730030074-HcYsSm72','consultation','Consultation d\'un compte.','2024-10-27 10:54:34','2024-10-27 10:54:34',NULL,17,7),('TRC-1730031314-BYNdbbJ1','consultation','Consultation d\'un compte.','2024-10-27 11:15:14','2024-10-27 11:15:14',NULL,17,7),('TRC-1730031447-nIenv9mQ','consultation','Consultation d\'un compte.','2024-10-27 11:17:27','2024-10-27 11:17:27',NULL,17,7),('TRC-1730031535-kUdsZfWG','consultation','Consultation d\'un compte.','2024-10-27 11:18:55','2024-10-27 11:18:55',NULL,17,7),('TRC-1730093775-GwtCD5Td','consultation','Consultation d\'un compte.','2024-10-28 04:36:15','2024-10-28 04:36:15',NULL,17,7),('TRC-1730094008-hAb65A5i','consultation','Consultation d\'un compte.','2024-10-28 04:40:08','2024-10-28 04:40:08',NULL,17,7),('TRC-1730094042-ZD6HsYbT','consultation','Consultation d\'un compte.','2024-10-28 04:40:42','2024-10-28 04:40:42',NULL,17,7),('TRC-1730097135-dVJPkDdh','consultation','Consultation d\'un compte.','2024-10-28 05:32:15','2024-10-28 05:32:15',NULL,17,7),('TRC-1730097162-eUrEktSC','consultation','Consultation d\'un compte.','2024-10-28 05:32:42','2024-10-28 05:32:42',NULL,17,7),('TRC-1730097187-f74dtFho','consultation','Consultation d\'un compte.','2024-10-28 05:33:07','2024-10-28 05:33:07',NULL,17,7),('TRC-1730097200-yerWDj86','consultation','Consultation d\'un compte.','2024-10-28 05:33:20','2024-10-28 05:33:20',NULL,17,7),('TRC-1730097226-ppBvQubu','consultation','Consultation d\'un compte.','2024-10-28 05:33:46','2024-10-28 05:33:46',NULL,17,7),('TRC-1730097229-QyeP04v4','consultation','Consultation d\'un compte.','2024-10-28 05:33:49','2024-10-28 05:33:49',NULL,17,7),('TRC-1730097238-yQk6ZXXH','consultation','Consultation d\'un compte.','2024-10-28 05:33:58','2024-10-28 05:33:58',NULL,17,7),('TRC-1730097241-SCmSYp2L','consultation','Consultation d\'un compte.','2024-10-28 05:34:01','2024-10-28 05:34:01',NULL,17,7),('TRC-1730097253-byKdveEa','consultation','Consultation d\'un compte.','2024-10-28 05:34:13','2024-10-28 05:34:13',NULL,17,7),('TRC-1730097268-KQAuATVE','consultation','Consultation d\'un compte.','2024-10-28 05:34:28','2024-10-28 05:34:28',NULL,17,7),('TRC-1730097275-6rOeD541','consultation','Consultation d\'un compte.','2024-10-28 05:34:35','2024-10-28 05:34:35',NULL,17,7),('TRC-1730097401-K4FwxyVi','consultation','Consultation d\'un compte.','2024-10-28 05:36:41','2024-10-28 05:36:41',NULL,17,7),('TRC-1730097408-0b7AFjUP','consultation','Consultation d\'un compte.','2024-10-28 05:36:48','2024-10-28 05:36:48',NULL,17,7),('TRC-1730097409-MxVFrAQb','consultation','Consultation d\'un compte.','2024-10-28 05:36:49','2024-10-28 05:36:49',NULL,17,7),('TRC-1730097449-66NSnZvw','consultation','Consultation d\'un compte.','2024-10-28 05:37:29','2024-10-28 05:37:29',NULL,17,7),('TRC-1730097455-wXET5jJm','consultation','Consultation d\'un compte.','2024-10-28 05:37:35','2024-10-28 05:37:35',NULL,17,7),('TRC-1730097457-P2DmzXec','consultation','Consultation d\'un compte.','2024-10-28 05:37:37','2024-10-28 05:37:37',NULL,17,7),('TRC-1730097471-B2TYWeAg','consultation','Consultation d\'un compte.','2024-10-28 05:37:51','2024-10-28 05:37:51',NULL,17,7),('TRC-1730097485-X8iNPO7a','consultation','Consultation d\'un compte.','2024-10-28 05:38:05','2024-10-28 05:38:05',NULL,17,7),('TRC-1730098341-7hh7TSED','consultation','Consultation d\'un compte.','2024-10-28 05:52:21','2024-10-28 05:52:21',NULL,17,4),('TRC-1730102899-Hn2BtkPZ','consultation','Consultation d\'un compte.','2024-10-28 07:08:19','2024-10-28 07:08:19',NULL,17,7),('TRC-1730103849-86cdHY9d','consultation','Consultation d\'un compte.','2024-10-28 07:24:09','2024-10-28 07:24:09',NULL,17,7),('TRC-1730103864-6ZbJn4oB','consultation','Consultation d\'un compte.','2024-10-28 07:24:24','2024-10-28 07:24:24',NULL,17,7),('TRC-1730104395-cPh5IEpz','consultation','Consultation d\'un compte.','2024-10-28 07:33:15','2024-10-28 07:33:15',NULL,17,4),('TRC-1730105184-m4vjwG74','modification','modification d\'un compte.','2024-10-28 07:46:24','2024-10-28 07:46:24',NULL,17,4),('TRC-1730105198-lFJL8OGL','modification','modification d\'un compte.','2024-10-28 07:46:38','2024-10-28 07:46:38',NULL,17,4),('TRC-1730105229-JeM8s916','modification','\nmodification d\'un compte.','2024-10-28 07:47:09','2024-10-28 07:47:09',NULL,17,4),('TRC-1730105235-nDeR4wJY','consultation','Consultation d\'un compte.','2024-10-28 07:47:15','2024-10-28 07:47:15',NULL,17,4),('TRC-1730203928-1DMXZ9tc','consultation','Consultation d\'un compte.','2024-10-29 11:12:08','2024-10-29 11:12:08',NULL,17,7),('TRC-1730446138-Tn1f2n7j','consultation','Consultation d\'un compte.','2024-11-01 04:28:58','2024-11-01 04:28:58',NULL,17,7),('TRC-1730446155-DzRokjUk','consultation','Consultation d\'un compte.','2024-11-01 04:29:15','2024-11-01 04:29:15',NULL,17,7),('TRC-1730446327-9CuLg9Ye','consultation','Consultation d\'un compte.','2024-11-01 04:32:07','2024-11-01 04:32:07',NULL,17,7),('TRC-1730446582-DVYSld7t','consultation','Consultation d\'un compte.','2024-11-01 04:36:22','2024-11-01 04:36:22',NULL,17,7),('TRC-1730446651-x8czIPRc','consultation','Consultation d\'un compte.','2024-11-01 04:37:31','2024-11-01 04:37:31',NULL,17,7),('TRC-1730446812-EYQt9GzW','consultation','Consultation d\'un compte.','2024-11-01 04:40:12','2024-11-01 04:40:12',NULL,17,7),('TRC-1730446851-EEYTqktf','consultation','Consultation d\'un compte.','2024-11-01 04:40:51','2024-11-01 04:40:51',NULL,17,7),('TRC-1730446902-3YvRLPLS','consultation','Consultation d\'un compte.','2024-11-01 04:41:42','2024-11-01 04:41:42',NULL,17,7),('TRC-1730446925-LoFgCWjS','consultation','Consultation d\'un compte.','2024-11-01 04:42:05','2024-11-01 04:42:05',NULL,17,7),('TRC-1730446931-XTJ3EWsg','consultation','Consultation d\'un compte.','2024-11-01 04:42:11','2024-11-01 04:42:11',NULL,17,7),('TRC-1730446962-ZZjRd88a','consultation','Consultation d\'un compte.','2024-11-01 04:42:42','2024-11-01 04:42:42',NULL,17,7),('TRC-1730446969-EfbqFs1c','consultation','Consultation d\'un compte.','2024-11-01 04:42:49','2024-11-01 04:42:49',NULL,17,7),('TRC-1730446975-UfZk8Yff','consultation','Consultation d\'un compte.','2024-11-01 04:42:55','2024-11-01 04:42:55',NULL,17,7),('TRC-1730447000-0pVjZs5s','consultation','Consultation d\'un compte.','2024-11-01 04:43:20','2024-11-01 04:43:20',NULL,17,7),('TRC-1730447008-gzGqkUOv','consultation','Consultation d\'un compte.','2024-11-01 04:43:28','2024-11-01 04:43:28',NULL,17,7),('TRC-1730447028-KZRNbnEI','consultation','Consultation d\'un compte.','2024-11-01 04:43:48','2024-11-01 04:43:48',NULL,17,7),('TRC-1730447037-DzD4QDmv','consultation','Consultation d\'un compte.','2024-11-01 04:43:57','2024-11-01 04:43:57',NULL,17,7),('TRC-1730447073-OKvGSLAa','consultation','Consultation d\'un compte.','2024-11-01 04:44:33','2024-11-01 04:44:33',NULL,17,7),('TRC-1730448050-Ozp5Xxmd','consultation','Consultation d\'un compte.','2024-11-01 05:00:50','2024-11-01 05:00:50',NULL,17,7),('TRC-1730448169-pcJsO0dg','consultation','Consultation d\'un compte.','2024-11-01 05:02:49','2024-11-01 05:02:49',NULL,17,7),('TRC-1730448178-gS3GPe2O','consultation','Consultation d\'un compte.','2024-11-01 05:02:58','2024-11-01 05:02:58',NULL,17,7),('TRC-1730448217-n3DL74JL','consultation','Consultation d\'un compte.','2024-11-01 05:03:37','2024-11-01 05:03:37',NULL,17,7),('TRC-1730448488-dbD2ueks','consultation','Consultation d\'un compte.','2024-11-01 05:08:08','2024-11-01 05:08:08',NULL,17,7),('TRC-1730453327-ti4MGiqX','consultation','Consultation d\'un compte.','2024-11-01 06:28:47','2024-11-01 06:28:47',NULL,17,7),('TRC-1730454077-DQSCALKb','consultation','Consultation d\'un compte.','2024-11-01 06:41:17','2024-11-01 06:41:17',NULL,17,7),('TRC-1730454107-THWVWJD6','consultation','Consultation d\'un compte.','2024-11-01 06:41:47','2024-11-01 06:41:47',NULL,17,7),('TRC-1730482640-l2oK1lCX','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:37:20','2024-11-01 14:37:20',NULL,17,NULL),('TRC-1730482822-uu8Ywn4l','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:40:22','2024-11-01 14:40:22',NULL,17,NULL),('TRC-1730482840-E2DAn3lL','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:40:40','2024-11-01 14:40:40',NULL,17,NULL),('TRC-1730482864-FNDmsT7e','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:41:04','2024-11-01 14:41:04',NULL,17,NULL),('TRC-1730482876-ClqbMbYo','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:41:16','2024-11-01 14:41:16',NULL,17,NULL),('TRC-1730482885-kijEtQVO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:41:25','2024-11-01 14:41:25',NULL,17,NULL),('TRC-1730482895-iPJ7inBN','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:41:35','2024-11-01 14:41:35',NULL,17,NULL),('TRC-1730482949-yQ5GIMgp','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:42:29','2024-11-01 14:42:29',NULL,17,NULL),('TRC-1730482953-N56G8vDO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:42:33','2024-11-01 14:42:33',NULL,17,NULL),('TRC-1730482963-7gFWpa6K','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:42:43','2024-11-01 14:42:43',NULL,17,NULL),('TRC-1730482972-lIszBPuL','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:42:52','2024-11-01 14:42:52',NULL,17,NULL),('TRC-1730482995-tmZVXEBN','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:43:15','2024-11-01 14:43:15',NULL,17,NULL),('TRC-1730483008-EK0Ncknc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:43:28','2024-11-01 14:43:28',NULL,17,NULL),('TRC-1730483030-DbHIfHKw','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:43:50','2024-11-01 14:43:50',NULL,17,NULL),('TRC-1730483043-j7N4ddQn','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:44:03','2024-11-01 14:44:03',NULL,17,NULL),('TRC-1730483046-WGhU1lAA','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:44:06','2024-11-01 14:44:06',NULL,17,NULL),('TRC-1730483062-uAMyeKH4','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:44:22','2024-11-01 14:44:22',NULL,17,NULL),('TRC-1730483075-Gc2u9nuN','consultation','Consultation d\'un compte.','2024-11-01 14:44:35','2024-11-01 14:44:35',NULL,17,7),('TRC-1730483078-Z1Kd0uDk','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:44:38','2024-11-01 14:44:38',NULL,17,NULL),('TRC-1730483083-I0ew0X6n','consultation','Consultation d\'un compte.','2024-11-01 14:44:43','2024-11-01 14:44:43',NULL,17,7),('TRC-1730483085-4PXdWfVQ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:44:45','2024-11-01 14:44:45',NULL,17,NULL),('TRC-1730483127-pE8mJCJX','consultation','Consultation d\'un compte.','2024-11-01 14:45:27','2024-11-01 14:45:27',NULL,17,7),('TRC-1730483135-YuV6tKzs','consultation','Consultation d\'un compte.','2024-11-01 14:45:35','2024-11-01 14:45:35',NULL,17,7),('TRC-1730483175-XcsbRGdC','consultation','Consultation d\'un compte.','2024-11-01 14:46:15','2024-11-01 14:46:15',NULL,17,7),('TRC-1730483187-10k7fkaD','consultation','Consultation d\'un compte.','2024-11-01 14:46:27','2024-11-01 14:46:27',NULL,17,7),('TRC-1730483191-wOYyybZK','consultation','Consultation d\'un compte.','2024-11-01 14:46:31','2024-11-01 14:46:31',NULL,17,7),('TRC-1730483200-8GaJMfUj','consultation','Consultation d\'un compte.','2024-11-01 14:46:40','2024-11-01 14:46:40',NULL,17,7),('TRC-1730483203-roZiDXK7','consultation','Consultation d\'un compte.','2024-11-01 14:46:43','2024-11-01 14:46:43',NULL,17,7),('TRC-1730483207-IMLU8y5j','consultation','Consultation d\'un compte.','2024-11-01 14:46:47','2024-11-01 14:46:47',NULL,17,7),('TRC-1730483214-QktagpQa','consultation','Consultation d\'un compte.','2024-11-01 14:46:54','2024-11-01 14:46:54',NULL,17,7),('TRC-1730483226-1LMJ6eKv','consultation','Consultation d\'un compte.','2024-11-01 14:47:06','2024-11-01 14:47:06',NULL,17,7),('TRC-1730483232-HcyEkU1V','consultation','Consultation d\'un compte.','2024-11-01 14:47:12','2024-11-01 14:47:12',NULL,17,7),('TRC-1730483236-lK4njmnq','consultation','Consultation d\'un compte.','2024-11-01 14:47:16','2024-11-01 14:47:16',NULL,17,7),('TRC-1730483238-9G15jZaI','consultation','Consultation d\'un compte.','2024-11-01 14:47:18','2024-11-01 14:47:18',NULL,17,7),('TRC-1730483249-RD2crqCs','consultation','Consultation d\'un compte.','2024-11-01 14:47:29','2024-11-01 14:47:29',NULL,17,7),('TRC-1730483258-CQeq0PY3','consultation','Consultation d\'un compte.','2024-11-01 14:47:38','2024-11-01 14:47:38',NULL,17,7),('TRC-1730483268-wd8N9TWq','consultation','Consultation d\'un compte.','2024-11-01 14:47:48','2024-11-01 14:47:48',NULL,17,7),('TRC-1730483274-NIu4MSAm','consultation','Consultation d\'un compte.','2024-11-01 14:47:54','2024-11-01 14:47:54',NULL,17,7),('TRC-1730483280-qpeUlNFS','consultation','Consultation d\'un compte.','2024-11-01 14:48:00','2024-11-01 14:48:00',NULL,17,7),('TRC-1730483303-oCcsXqUJ','consultation','Consultation d\'un compte.','2024-11-01 14:48:23','2024-11-01 14:48:23',NULL,17,7),('TRC-1730483310-eoaCCvDs','consultation','Consultation d\'un compte.','2024-11-01 14:48:30','2024-11-01 14:48:30',NULL,17,7),('TRC-1730483377-2v5Gv7yh','consultation','Consultation d\'un compte.','2024-11-01 14:49:37','2024-11-01 14:49:37',NULL,17,7),('TRC-1730483379-enHVz3sJ','consultation','Consultation d\'un compte.','2024-11-01 14:49:39','2024-11-01 14:49:39',NULL,17,7),('TRC-1730483422-RDVConlp','consultation','Consultation d\'un compte.','2024-11-01 14:50:22','2024-11-01 14:50:22',NULL,17,7),('TRC-1730483437-1qEIwKdn','consultation','Consultation d\'un compte.','2024-11-01 14:50:37','2024-11-01 14:50:37',NULL,17,7),('TRC-1730483442-dakoTDeb','consultation transactions','Consultation l\'ensemble des transactions.','0000-00-00 00:00:00','2024-11-01 14:50:42',NULL,17,NULL),('TRC-1730483449-9Wd09OQB','consultation','Consultation d\'un compte.','2024-11-01 14:50:49','2024-11-01 14:50:49',NULL,17,7),('TRC-1730483469-imO7agcr','consultation','Consultation d\'un compte.','2024-11-01 14:51:09','2024-11-01 14:51:09',NULL,17,7),('TRC-1730483529-mcdA3oNg','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:52:09','2024-11-01 14:52:09',NULL,17,NULL),('TRC-1730483546-D1bnRt7R','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:52:26','2024-11-01 14:52:26',NULL,17,NULL),('TRC-1730483550-fUIvHx0R','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:52:30','2024-11-01 14:52:30',NULL,17,NULL),('TRC-1730483703-Z5UcdrM0','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:55:03','2024-11-01 14:55:03',NULL,17,NULL),('TRC-1730483710-RqUGpM2G','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:55:10','2024-11-01 14:55:10',NULL,17,NULL),('TRC-1730483717-JmAFlGGO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 14:55:17','2024-11-01 14:55:17',NULL,17,NULL),('TRC-1730484084-JuNMysqv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 15:01:24','2024-11-01 15:01:24',NULL,17,NULL),('TRC-1730490930-lsdYNg4Z','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:55:30','2024-11-01 16:55:30',NULL,17,NULL),('TRC-1730490932-gtwPmCIr','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:55:32','2024-11-01 16:55:32',NULL,17,NULL),('TRC-1730490944-8WMJl3dO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:55:44','2024-11-01 16:55:44',NULL,17,NULL),('TRC-1730490948-1bez4zpP','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:55:48','2024-11-01 16:55:48',NULL,17,NULL),('TRC-1730490956-HVxgFRlx','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:55:56','2024-11-01 16:55:56',NULL,17,NULL),('TRC-1730490961-f57zzhuy','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:01','2024-11-01 16:56:01',NULL,17,NULL),('TRC-1730490969-CmnIz7Ae','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:09','2024-11-01 16:56:09',NULL,17,NULL),('TRC-1730490973-0hqlpTAX','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:13','2024-11-01 16:56:13',NULL,17,NULL),('TRC-1730490978-uyy6kpJK','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:18','2024-11-01 16:56:18',NULL,17,NULL),('TRC-1730490981-gFQL3xfU','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:21','2024-11-01 16:56:21',NULL,17,NULL),('TRC-1730490982-cz9nNXcm','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:22','2024-11-01 16:56:22',NULL,17,NULL),('TRC-1730490986-tn5BxI9q','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:26','2024-11-01 16:56:26',NULL,17,NULL),('TRC-1730491001-VvCKIBOC','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:41','2024-11-01 16:56:41',NULL,17,NULL),('TRC-1730491007-g1tVifQ3','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:56:47','2024-11-01 16:56:47',NULL,17,NULL),('TRC-1730491066-xmENdk8k','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:57:46','2024-11-01 16:57:46',NULL,17,NULL),('TRC-1730491090-zfUNV65M','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:58:10','2024-11-01 16:58:10',NULL,17,NULL),('TRC-1730491105-V2yjSYmL','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:58:25','2024-11-01 16:58:25',NULL,17,NULL),('TRC-1730491120-d7JHuc6C','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:58:40','2024-11-01 16:58:40',NULL,17,NULL),('TRC-1730491125-NsE1PpTt','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:58:45','2024-11-01 16:58:45',NULL,17,NULL),('TRC-1730491137-Uz9tQoua','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:58:57','2024-11-01 16:58:57',NULL,17,NULL),('TRC-1730491151-GBjafMZB','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:59:11','2024-11-01 16:59:11',NULL,17,NULL),('TRC-1730491155-6b9PUZzt','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:59:15','2024-11-01 16:59:15',NULL,17,NULL),('TRC-1730491168-ikTlyESd','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 16:59:28','2024-11-01 16:59:28',NULL,17,NULL),('TRC-1730491412-y0joGKXn','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:03:32','2024-11-01 17:03:32',NULL,17,NULL),('TRC-1730491426-jjihjL1g','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:03:46','2024-11-01 17:03:46',NULL,17,NULL),('TRC-1730491429-wmV3chTv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:03:49','2024-11-01 17:03:49',NULL,17,NULL),('TRC-1730491431-shG8quhS','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:03:51','2024-11-01 17:03:51',NULL,17,NULL),('TRC-1730491463-mmpbDODE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:04:23','2024-11-01 17:04:23',NULL,17,NULL),('TRC-1730491538-COiG89x5','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:05:38','2024-11-01 17:05:38',NULL,17,NULL),('TRC-1730491930-gxmQcs8l','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:12:10','2024-11-01 17:12:10',NULL,17,NULL),('TRC-1730491939-HsLvkmQw','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:12:19','2024-11-01 17:12:19',NULL,17,NULL),('TRC-1730491944-B8h8JwWL','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:12:24','2024-11-01 17:12:24',NULL,17,NULL),('TRC-1730491947-iAuDhUv9','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:12:27','2024-11-01 17:12:27',NULL,17,NULL),('TRC-1730491962-NNNKA5Xf','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:12:42','2024-11-01 17:12:42',NULL,17,NULL),('TRC-1730492004-HlbTkbZ0','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:13:24','2024-11-01 17:13:24',NULL,17,NULL),('TRC-1730492019-SteLVrHu','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:13:39','2024-11-01 17:13:39',NULL,17,NULL),('TRC-1730492021-DRpeeCzL','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:13:41','2024-11-01 17:13:41',NULL,17,NULL),('TRC-1730492045-wvjIohvo','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:05','2024-11-01 17:14:05',NULL,17,NULL),('TRC-1730492046-95FlPnbW','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:06','2024-11-01 17:14:06',NULL,17,NULL),('TRC-1730492049-BMVfQQrN','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:09','2024-11-01 17:14:09',NULL,17,NULL),('TRC-1730492052-V9R3uBu6','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:12','2024-11-01 17:14:12',NULL,17,NULL),('TRC-1730492072-7o3gdWbR','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:32','2024-11-01 17:14:32',NULL,17,NULL),('TRC-1730492072-mYNWbKr8','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:32','2024-11-01 17:14:32',NULL,17,NULL),('TRC-1730492077-yFuQCKm4','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:14:37','2024-11-01 17:14:37',NULL,17,NULL),('TRC-1730492228-FVIgnRvY','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:17:08','2024-11-01 17:17:08',NULL,17,NULL),('TRC-1730492231-gzA1MzLV','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:17:11','2024-11-01 17:17:11',NULL,17,NULL),('TRC-1730492233-MfxFzBGy','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:17:13','2024-11-01 17:17:13',NULL,17,NULL),('TRC-1730492260-odp812fg','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:17:40','2024-11-01 17:17:40',NULL,17,NULL),('TRC-1730492262-2E5Mv1Ld','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:17:42','2024-11-01 17:17:42',NULL,17,NULL),('TRC-1730492283-txoDGwKZ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:18:03','2024-11-01 17:18:03',NULL,17,NULL),('TRC-1730492287-7xOdqw0u','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:18:07','2024-11-01 17:18:07',NULL,17,NULL),('TRC-1730492301-rnFpTnGW','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:18:21','2024-11-01 17:18:21',NULL,17,NULL),('TRC-1730492324-oyKHPgux','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:18:44','2024-11-01 17:18:44',NULL,17,NULL),('TRC-1730492337-2ubf4dxm','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:18:57','2024-11-01 17:18:57',NULL,17,NULL),('TRC-1730492344-0jludgIb','consultation transactions','\nConsultation l\'ensemble des transactions.','2024-11-01 17:19:04','2024-11-01 17:19:04',NULL,17,NULL),('TRC-1730492378-0GCQDvnN','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:19:38','2024-11-01 17:19:38',NULL,17,NULL),('TRC-1730492383-qyJ5UR2V','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:19:43','2024-11-01 17:19:43',NULL,17,NULL),('TRC-1730492386-UkUAPt3D','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:19:46','2024-11-01 17:19:46',NULL,17,NULL),('TRC-1730492397-J81A1JNP','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:19:57','2024-11-01 17:19:57',NULL,17,NULL),('TRC-1730492400-UEKNrrQ8','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:00','2024-11-01 17:20:00',NULL,17,NULL),('TRC-1730492408-RPjh1nfv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:08','2024-11-01 17:20:08',NULL,17,NULL),('TRC-1730492412-jQ94DbTM','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:12','2024-11-01 17:20:12',NULL,17,NULL),('TRC-1730492416-WZstbQb2','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:16','2024-11-01 17:20:16',NULL,17,NULL),('TRC-1730492426-zpelGUGC','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:26','2024-11-01 17:20:26',NULL,17,NULL),('TRC-1730492427-Gqw0DewV','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:27','2024-11-01 17:20:27',NULL,17,NULL),('TRC-1730492431-nnnIzU7v','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:20:31','2024-11-01 17:20:31',NULL,17,NULL),('TRC-1730492472-rurimhBZ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:21:12','2024-11-01 17:21:12',NULL,17,NULL),('TRC-1730492542-3rkzfn7r','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:22:22','2024-11-01 17:22:22',NULL,17,NULL),('TRC-1730492567-eKF05ter','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:22:47','2024-11-01 17:22:47',NULL,17,NULL),('TRC-1730492608-aYRBkO5v','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:23:28','2024-11-01 17:23:28',NULL,17,NULL),('TRC-1730492616-6hUAOROm','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:23:36','2024-11-01 17:23:36',NULL,17,NULL),('TRC-1730492622-gX04qigO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:23:42','2024-11-01 17:23:42',NULL,17,NULL),('TRC-1730492721-9uOCZ5IR','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:25:21','2024-11-01 17:25:21',NULL,17,NULL),('TRC-1730492736-rqIlXnBh','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:25:36','2024-11-01 17:25:36',NULL,17,NULL),('TRC-1730492753-zi7h8eiC','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:25:53','2024-11-01 17:25:53',NULL,17,NULL),('TRC-1730492805-ldJetTKb','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:26:45','2024-11-01 17:26:45',NULL,17,NULL),('TRC-1730492809-J5BSUDMu','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:26:49','2024-11-01 17:26:49',NULL,17,NULL),('TRC-1730492810-HmVlGVm9','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:26:50','2024-11-01 17:26:50',NULL,17,NULL),('TRC-1730492835-2H1cYY5N','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:27:15','2024-11-01 17:27:15',NULL,17,NULL),('TRC-1730492849-N92NnKgK','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:27:29','2024-11-01 17:27:29',NULL,17,NULL),('TRC-1730492868-QSnZ98cn','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:27:48','2024-11-01 17:27:48',NULL,17,NULL),('TRC-1730492975-zksM2g0F','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:29:35','2024-11-01 17:29:35',NULL,17,NULL),('TRC-1730492983-mkLMWojk','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:29:43','2024-11-01 17:29:43',NULL,17,NULL),('TRC-1730492986-MrxowMqu','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:29:46','2024-11-01 17:29:46',NULL,17,NULL),('TRC-1730492990-VulO1aon','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:29:50','2024-11-01 17:29:50',NULL,17,NULL),('TRC-1730492994-9sUw7Ifp','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:29:54','2024-11-01 17:29:54',NULL,17,NULL),('TRC-1730493000-lV3SEE9W','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:30:00','2024-11-01 17:30:00',NULL,17,NULL),('TRC-1730493897-iejz0KGW','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:44:57','2024-11-01 17:44:57',NULL,17,NULL),('TRC-1730493960-FILzCjhj','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:46:00','2024-11-01 17:46:00',NULL,17,NULL),('TRC-1730494073-2snu2pb1','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:47:53','2024-11-01 17:47:53',NULL,17,NULL),('TRC-1730494083-mQvSnGoH','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:48:03','2024-11-01 17:48:03',NULL,17,NULL),('TRC-1730494167-7g8yz4hg','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:49:27','2024-11-01 17:49:27',NULL,17,NULL),('TRC-1730494171-3DvsRoiQ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:49:31','2024-11-01 17:49:31',NULL,17,NULL),('TRC-1730494174-xLew7WdK','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:49:34','2024-11-01 17:49:34',NULL,17,NULL),('TRC-1730494193-yBzWGwTg','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:49:53','2024-11-01 17:49:53',NULL,17,NULL),('TRC-1730494198-eZ71FG9i','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:49:58','2024-11-01 17:49:58',NULL,17,NULL),('TRC-1730494207-WqpGrqJm','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:50:07','2024-11-01 17:50:07',NULL,17,NULL),('TRC-1730494274-Qko6otoH','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:51:14','2024-11-01 17:51:14',NULL,17,NULL),('TRC-1730494303-39PXGE9c','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:51:43','2024-11-01 17:51:43',NULL,17,NULL),('TRC-1730494310-dsEK0J2Q','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:51:50','2024-11-01 17:51:50',NULL,17,NULL),('TRC-1730494336-pdgQFrc6','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:16','2024-11-01 17:52:16',NULL,17,NULL),('TRC-1730494340-BQyEUqAI','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:20','2024-11-01 17:52:20',NULL,17,NULL),('TRC-1730494351-01kGI54b','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:31','2024-11-01 17:52:31',NULL,17,NULL),('TRC-1730494359-tyRsEVBa','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:39','2024-11-01 17:52:39',NULL,17,NULL),('TRC-1730494369-Uy3D2Cv5','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:49','2024-11-01 17:52:49',NULL,17,NULL),('TRC-1730494374-5qPkYK1B','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:54','2024-11-01 17:52:54',NULL,17,NULL),('TRC-1730494375-c658kicE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:52:55','2024-11-01 17:52:55',NULL,17,NULL),('TRC-1730494389-n5Js9ta1','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:53:09','2024-11-01 17:53:09',NULL,17,NULL),('TRC-1730494406-L9aG0jgI','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:53:26','2024-11-01 17:53:26',NULL,17,NULL),('TRC-1730494437-jjEwGlbM','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:53:57','2024-11-01 17:53:57',NULL,17,NULL),('TRC-1730494482-h5ezqHQx','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:54:42','2024-11-01 17:54:42',NULL,17,NULL),('TRC-1730494499-JsF5MADk','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:54:59','2024-11-01 17:54:59',NULL,17,NULL),('TRC-1730494519-XkUDrOYx','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:19','2024-11-01 17:55:19',NULL,17,NULL),('TRC-1730494521-6iMXXCAS','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:21','2024-11-01 17:55:21',NULL,17,NULL),('TRC-1730494531-4CXWajaU','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:31','2024-11-01 17:55:31',NULL,17,NULL),('TRC-1730494544-6MKX7sxY','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:44','2024-11-01 17:55:44',NULL,17,NULL),('TRC-1730494549-Z8f70J54','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:49','2024-11-01 17:55:49',NULL,17,NULL),('TRC-1730494556-8E9bWi5e','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:55:56','2024-11-01 17:55:56',NULL,17,NULL),('TRC-1730494565-YFMOItwE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:56:05','2024-11-01 17:56:05',NULL,17,NULL),('TRC-1730494569-ymLTUzcq','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:56:09','2024-11-01 17:56:09',NULL,17,NULL),('TRC-1730494608-S9BREqmq','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:56:48','2024-11-01 17:56:48',NULL,17,NULL),('TRC-1730494617-Hffu0d80','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:56:57','2024-11-01 17:56:57',NULL,17,NULL),('TRC-1730494621-MuzCfvgl','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:57:01','2024-11-01 17:57:01',NULL,17,NULL),('TRC-1730494634-Ib3NbZFD','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:57:14','2024-11-01 17:57:14',NULL,17,NULL),('TRC-1730494672-UkZysy7o','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:57:52','2024-11-01 17:57:52',NULL,17,NULL),('TRC-1730494676-aoByY4QY','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:57:56','2024-11-01 17:57:56',NULL,17,NULL),('TRC-1730494682-81jP6acj','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:58:02','2024-11-01 17:58:02',NULL,17,NULL),('TRC-1730494716-G57rMFSv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:58:36','2024-11-01 17:58:36',NULL,17,NULL),('TRC-1730494733-K9E1QXmK','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:58:53','2024-11-01 17:58:53',NULL,17,NULL),('TRC-1730494739-OMMxlthF','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:58:59','2024-11-01 17:58:59',NULL,17,NULL),('TRC-1730494748-PAVArj7b','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:59:08','2024-11-01 17:59:08',NULL,17,NULL),('TRC-1730494754-1jXz3i6m','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:59:14','2024-11-01 17:59:14',NULL,17,NULL),('TRC-1730494795-qS21dusc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 17:59:55','2024-11-01 17:59:55',NULL,17,NULL),('TRC-1730494863-J4yVWLR3','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:01:03','2024-11-01 18:01:03',NULL,17,NULL),('TRC-1730494864-3LIKCyjf','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:01:04','2024-11-01 18:01:04',NULL,17,NULL),('TRC-1730494893-fCi1Z8mb','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:01:33','2024-11-01 18:01:33',NULL,17,NULL),('TRC-1730494902-wAElDLAH','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:01:42','2024-11-01 18:01:42',NULL,17,NULL),('TRC-1730494921-lnbNg8nr','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:01','2024-11-01 18:02:01',NULL,17,NULL),('TRC-1730494933-RStGjT9C','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:13','2024-11-01 18:02:13',NULL,17,NULL),('TRC-1730494946-deKKknDa','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:26','2024-11-01 18:02:26',NULL,17,NULL),('TRC-1730494970-CKDMwJfU','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:50','2024-11-01 18:02:50',NULL,17,NULL),('TRC-1730494976-f8pVJvm9','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:56','2024-11-01 18:02:56',NULL,17,NULL),('TRC-1730494979-nNlJEeOk','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:02:59','2024-11-01 18:02:59',NULL,17,NULL),('TRC-1730494982-iY8gbo7d','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:02','2024-11-01 18:03:02',NULL,17,NULL),('TRC-1730494982-LGVTUamq','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:02','2024-11-01 18:03:02',NULL,17,NULL),('TRC-1730494993-GPQlWbnE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:13','2024-11-01 18:03:13',NULL,17,NULL),('TRC-1730495017-xG36oF1i','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:37','2024-11-01 18:03:37',NULL,17,NULL),('TRC-1730495022-rFXXPBoc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:42','2024-11-01 18:03:42',NULL,17,NULL),('TRC-1730495023-UeaZze3K','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:43','2024-11-01 18:03:43',NULL,17,NULL),('TRC-1730495024-AjCsusJx','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:03:44','2024-11-01 18:03:44',NULL,17,NULL),('TRC-1730495071-aeY7gNrc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:04:31','2024-11-01 18:04:31',NULL,17,NULL),('TRC-1730495078-b3aV3Kzh','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:04:38','2024-11-01 18:04:38',NULL,17,NULL),('TRC-1730495097-3ocI8yji','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:04:57','2024-11-01 18:04:57',NULL,17,NULL),('TRC-1730495163-sHNUK5k7','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:06:03','2024-11-01 18:06:03',NULL,17,NULL),('TRC-1730495166-w89jgJHI','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:06:06','2024-11-01 18:06:06',NULL,17,NULL),('TRC-1730495189-RwDxctLf','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:06:29','2024-11-01 18:06:29',NULL,17,NULL),('TRC-1730495214-CVyzJbhP','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:06:54','2024-11-01 18:06:54',NULL,17,NULL),('TRC-1730495215-XZAV3JCn','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:06:55','2024-11-01 18:06:55',NULL,17,NULL),('TRC-1730495242-vdIrIfDv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:07:22','2024-11-01 18:07:22',NULL,17,NULL),('TRC-1730495314-PA5PPUK8','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:08:34','2024-11-01 18:08:34',NULL,17,NULL),('TRC-1730495368-FMoyBaTh','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:09:28','2024-11-01 18:09:28',NULL,17,NULL),('TRC-1730495388-iIFA9mZa','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:09:48','2024-11-01 18:09:48',NULL,17,NULL),('TRC-1730495594-kzBsABs4','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:13:14','2024-11-01 18:13:14',NULL,17,NULL),('TRC-1730495660-X0BC5IiS','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:14:20','2024-11-01 18:14:20',NULL,17,NULL),('TRC-1730495680-wlOlEEEi','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:14:40','2024-11-01 18:14:40',NULL,17,NULL),('TRC-1730495725-nEi6vDNV','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:15:25','2024-11-01 18:15:25',NULL,17,NULL),('TRC-1730495758-rxfpMEAw','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:15:58','2024-11-01 18:15:58',NULL,17,NULL),('TRC-1730495765-LE7EhPGm','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:16:05','2024-11-01 18:16:05',NULL,17,NULL),('TRC-1730495773-ALDVjH8b','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:16:13','2024-11-01 18:16:13',NULL,17,NULL),('TRC-1730495780-x0Eb6dev','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:16:20','2024-11-01 18:16:20',NULL,17,NULL),('TRC-1730495794-QsLqAqsj','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:16:34','2024-11-01 18:16:34',NULL,17,NULL),('TRC-1730495844-ARflZi92','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:17:24','2024-11-01 18:17:24',NULL,17,NULL),('TRC-1730495863-qqfR0Nj6','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:17:43','2024-11-01 18:17:43',NULL,17,NULL),('TRC-1730495882-X9ADcd5x','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:02','2024-11-01 18:18:02',NULL,17,NULL),('TRC-1730495893-uv8txuPt','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:13','2024-11-01 18:18:13',NULL,17,NULL),('TRC-1730495898-YGzdKTLP','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:18','2024-11-01 18:18:18',NULL,17,NULL),('TRC-1730495906-8aBvzLXO','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:26','2024-11-01 18:18:26',NULL,17,NULL),('TRC-1730495915-Wgv1seAv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:35','2024-11-01 18:18:35',NULL,17,NULL),('TRC-1730495933-xSTKVz9T','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:18:53','2024-11-01 18:18:53',NULL,17,NULL),('TRC-1730496006-mK9LIKLc','consultation','Consultation d\'un compte.','2024-11-01 18:20:06','2024-11-01 18:20:06',NULL,17,7),('TRC-1730496139-X9KFg5hO','consultation','Consultation d\'un compte.','2024-11-01 18:22:19','2024-11-01 18:22:19',NULL,17,7),('TRC-1730496171-TRW2IWb1','consultation','\nConsultation d\'un compte.','2024-11-01 18:22:51','2024-11-01 18:22:51',NULL,17,7),('TRC-1730496186-7J1YdKF4','consultation','Consultation d\'un compte.','2024-11-01 18:23:06','2024-11-01 18:23:06',NULL,17,7),('TRC-1730496194-PRJzST7T','consultation','Consultation d\'un compte.','2024-11-01 18:23:14','2024-11-01 18:23:14',NULL,17,7),('TRC-1730496200-CRLPCaX4','consultation','Consultation d\'un compte.','2024-11-01 18:23:20','2024-11-01 18:23:20',NULL,17,7),('TRC-1730496205-wnt1nn24','consultation','Consultation d\'un compte.','2024-11-01 18:23:25','2024-11-01 18:23:25',NULL,17,7),('TRC-1730496215-xGj9GsLG','consultation','Consultation d\'un compte.','2024-11-01 18:23:35','2024-11-01 18:23:35',NULL,17,7),('TRC-1730496240-r5vHN8Bv','consultation','Consultation d\'un compte.','2024-11-01 18:24:00','2024-11-01 18:24:00',NULL,17,7),('TRC-1730496326-fjnf2Sxi','consultation','Consultation d\'un compte.','2024-11-01 18:25:26','2024-11-01 18:25:26',NULL,17,7),('TRC-1730496369-N3kui6mz','consultation','Consultation d\'un compte.','2024-11-01 18:26:09','2024-11-01 18:26:09',NULL,17,7),('TRC-1730496371-ILiTGohc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:26:11','2024-11-01 18:26:11',NULL,17,NULL),('TRC-1730496385-92MFnHCD','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:26:25','2024-11-01 18:26:25',NULL,17,NULL),('TRC-1730496402-D9jFZxGp','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:26:42','2024-11-01 18:26:42',NULL,17,NULL),('TRC-1730496413-9Bb8z1pt','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:26:53','2024-11-01 18:26:53',NULL,17,NULL),('TRC-1730496435-NH7UsHDg','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:27:15','2024-11-01 18:27:15',NULL,17,NULL),('TRC-1730496617-IL9yMa6E','creation','Creation d\'un nouveau compte.','2024-11-01 18:30:17','2024-11-01 18:30:17',NULL,17,9),('TRC-1730496631-idZIigVS','consultation','Consultation d\'un compte.','2024-11-01 18:30:31','2024-11-01 18:30:31',NULL,17,9),('TRC-1730496681-GWVeuQ5z','modification','modification d\'un compte.','2024-11-01 18:31:21','2024-11-01 18:31:21',NULL,17,9),('TRC-1730496713-jYTYw418','consultation','Consultation d\'un compte.','2024-11-01 18:31:53','2024-11-01 18:31:53',NULL,17,9),('TRC-1730496729-GtBnFG3p','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:32:09','2024-11-01 18:32:09',NULL,17,NULL),('TRC-1730496782-uPYRwQ3p','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:33:02','2024-11-01 18:33:02',NULL,17,NULL),('TRC-1730497092-G4zdgIk5','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:38:12','2024-11-01 18:38:12',NULL,17,NULL),('TRC-1730497099-pdYi3mK2','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:38:19','2024-11-01 18:38:19',NULL,17,NULL),('TRC-1730497107-i2UEnXhX','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:38:27','2024-11-01 18:38:27',NULL,17,NULL),('TRC-1730497111-JPBBgVcr','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:38:31','2024-11-01 18:38:31',NULL,17,NULL),('TRC-1730497145-lbUluYjc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:39:05','2024-11-01 18:39:05',NULL,17,NULL),('TRC-1730497220-YC6eiJIZ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:40:20','2024-11-01 18:40:20',NULL,17,NULL),('TRC-1730497235-qZuTvo5Y','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:40:35','2024-11-01 18:40:35',NULL,17,NULL),('TRC-1730497271-B4Ag2mg9','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:41:11','2024-11-01 18:41:11',NULL,17,NULL),('TRC-1730497305-CQMaPM22','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:41:45','2024-11-01 18:41:45',NULL,17,NULL),('TRC-1730497312-B0s6jkr0','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:41:52','2024-11-01 18:41:52',NULL,17,NULL),('TRC-1730497317-cQHuMTVE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:41:57','2024-11-01 18:41:57',NULL,17,NULL),('TRC-1730497322-Eq7yICs9','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:42:02','2024-11-01 18:42:02',NULL,17,NULL),('TRC-1730497349-aIN6D5hG','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:42:29','2024-11-01 18:42:29',NULL,17,NULL),('TRC-1730497363-yjLXV4Up','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:42:43','2024-11-01 18:42:43',NULL,17,NULL),('TRC-1730497417-FE2rcjpQ','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:43:37','2024-11-01 18:43:37',NULL,17,NULL),('TRC-1730497420-qdAhDEiF','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:43:40','2024-11-01 18:43:40',NULL,17,NULL),('TRC-1730497431-p1KB7arh','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:43:51','2024-11-01 18:43:51',NULL,17,NULL),('TRC-1730497440-otVeIpXq','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:44:00','2024-11-01 18:44:00',NULL,17,NULL),('TRC-1730497478-GfC9N6uT','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-01 18:44:38','2024-11-01 18:44:38',NULL,17,NULL),('TRC-1730532981-x58Fxaia','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:36:21','2024-11-02 04:36:21',NULL,17,NULL),('TRC-1730533081-4qdDDuNH','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:38:01','2024-11-02 04:38:01',NULL,17,NULL),('TRC-1730533087-dpE7QTuf','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:38:07','2024-11-02 04:38:07',NULL,17,NULL),('TRC-1730533101-0Pm7Zb56','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:38:21','2024-11-02 04:38:21',NULL,17,NULL),('TRC-1730533185-YwvIK03g','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:39:45','2024-11-02 04:39:45',NULL,17,NULL),('TRC-1730533188-rGz3Fl1I','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:39:48','2024-11-02 04:39:48',NULL,17,NULL),('TRC-1730533191-tbyc4t2Z','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:39:51','2024-11-02 04:39:51',NULL,17,NULL),('TRC-1730533196-BJHRukAI','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:39:56','2024-11-02 04:39:56',NULL,17,NULL),('TRC-1730533196-NZLvdw7U','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:39:56','2024-11-02 04:39:56',NULL,17,NULL),('TRC-1730533216-52TzWLBc','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:40:16','2024-11-02 04:40:16',NULL,17,NULL),('TRC-1730533302-wBpr1h94','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:41:42','2024-11-02 04:41:42',NULL,17,NULL),('TRC-1730533470-F2JMslVM','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:44:30','2024-11-02 04:44:30',NULL,17,NULL),('TRC-1730533519-Qj166fKs','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:19','2024-11-02 04:45:19',NULL,17,NULL),('TRC-1730533529-bzCfa5rv','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:29','2024-11-02 04:45:29',NULL,17,NULL),('TRC-1730533535-gMx9OFZ2','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:35','2024-11-02 04:45:35',NULL,17,NULL),('TRC-1730533538-82xZuAcz','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:38','2024-11-02 04:45:38',NULL,17,NULL),('TRC-1730533540-TUOdSuoe','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:40','2024-11-02 04:45:40',NULL,17,NULL),('TRC-1730533542-DUOkbRgx','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:45:42','2024-11-02 04:45:42',NULL,17,NULL),('TRC-1730533576-RloAD7mE','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:46:16','2024-11-02 04:46:16',NULL,17,NULL),('TRC-1730533586-mPHMbhka','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-02 04:46:26','2024-11-02 04:46:26',NULL,17,NULL),('TRC-1730882837-FXdTftEX','consultation transactions','Consultation l\'ensemble des transactions.','2024-11-06 05:47:17','2024-11-06 05:47:17',NULL,17,NULL);
/*!40000 ALTER TABLE `journal_activites` ENABLE KEYS */;

--
-- Table structure for table `journal_transactions`
--

DROP TABLE IF EXISTS `journal_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_transactions` (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `etape` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('SUCCESS','WARNING','ERROR','INFO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` json DEFAULT NULL,
  `date_operation` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journal_transactions_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `journal_transactions_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal_transactions`
--

/*!40000 ALTER TABLE `journal_transactions` DISABLE KEYS */;
INSERT INTO `journal_transactions` VALUES ('TRC-1729679771-JLh4cWPy','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"250 000,00 Ar\", \"montant_requis\": \"4 000 000,00 Ar\"}','2024-10-23 10:36:11','2024-10-23 08:36:11','2024-10-23 08:36:11','TRC-1729679771-uFbAnklH'),('TRC-1729679771-s3hoSahe','INITIATION','INFO',NULL,'2024-10-23 10:36:11','2024-10-23 08:36:11','2024-10-23 08:36:11','TRC-1729679771-uFbAnklH'),('TRC-1729679885-UksghLRA','INITIATION','INFO',NULL,'2024-10-23 10:38:05','2024-10-23 08:38:05','2024-10-23 08:38:05','TRC-1729679885-PWPgy3BN'),('TRC-1729679885-zVWT7Bpv','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"1 750 000,00 Ar\", \"montant_requis\": \"2 000 000 000,00 Ar\"}','2024-10-23 10:38:05','2024-10-23 08:38:05','2024-10-23 08:38:05','TRC-1729679885-PWPgy3BN'),('TRC-1729679931-NDQedSkM','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"1 750 000,00 Ar\", \"montant_requis\": \"30 000 000,00 Ar\"}','2024-10-23 10:38:51','2024-10-23 08:38:51','2024-10-23 08:38:51','TRC-1729679931-FOC6tjBf'),('TRC-1729679931-qCD1UJXD','INITIATION','INFO',NULL,'2024-10-23 10:38:51','2024-10-23 08:38:51','2024-10-23 08:38:51','TRC-1729679931-FOC6tjBf'),('TRC-1729680218-4mmqd7eZ','INITIATION','INFO',NULL,'2024-10-23 10:43:38','2024-10-23 08:43:38','2024-10-23 08:43:38','TRC-1729680218-Iv7HU6rK'),('TRC-1729680218-UReM2us0','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"250 000,00 Ar\", \"montant_requis\": \"40 000 000,00 Ar\"}','2024-10-23 10:43:38','2024-10-23 08:43:38','2024-10-23 08:43:38','TRC-1729680218-Iv7HU6rK'),('TRC-1729680246-HfqhTg7A','INITIATION','INFO',NULL,'2024-10-23 10:44:06','2024-10-23 08:44:06','2024-10-23 08:44:06','TRC-1729680246-fkgJ6ox3'),('TRC-1729680246-Wy38j2hX','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"1 750 000,00 Ar\", \"montant_requis\": \"3 423 423 430,00 Ar\"}','2024-10-23 10:44:06','2024-10-23 08:44:06','2024-10-23 08:44:06','TRC-1729680246-fkgJ6ox3'),('TRC-1729680277-aRWZ6oWL','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-Kdzs2BEK','FINALISATION','SUCCESS',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-WudslVLG','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-X4e0t4AF','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-ZvveVGXy','INITIATION','INFO',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-zWsohoRu','SUCCESS','SUCCESS',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680277-zZsrTpe3','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-23 10:44:37','2024-10-23 08:44:37','2024-10-23 08:44:37','TRC-1729680277-CRmWPQSL'),('TRC-1729680870-efRmaW09','INITIATION','INFO',NULL,'2024-10-23 10:54:30','2024-10-23 08:54:30','2024-10-23 08:54:30','TRC-1729680870-5GYTgype'),('TRC-1729680870-Xc88oFXW','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"238 000,00 Ar\", \"montant_requis\": \"40 000 000,00 Ar\"}','2024-10-23 10:54:30','2024-10-23 08:54:30','2024-10-23 08:54:30','TRC-1729680870-5GYTgype'),('TRC-1729680914-muxkoz0c','INITIATION','INFO',NULL,'2024-10-23 10:55:14','2024-10-23 08:55:14','2024-10-23 08:55:14','TRC-1729680914-rnOOIL2F'),('TRC-1729680915-SZJksVxN','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"238 000,00 Ar\", \"montant_requis\": \"40 000 000,00 Ar\"}','2024-10-23 10:55:15','2024-10-23 08:55:15','2024-10-23 08:55:15','TRC-1729680914-rnOOIL2F'),('TRC-1729681262-9Uqg9JE6','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-iT85ak6W','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-nhZZiqo0','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-NZ98wIbI','SUCCESS','SUCCESS',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-pNFtoZXa','INITIATION','INFO',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-tqTwJIm5','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681262-urxg8kMm','FINALISATION','SUCCESS',NULL,'2024-10-23 11:01:02','2024-10-23 09:01:02','2024-10-23 09:01:02','TRC-1729681262-sB6iAF8f'),('TRC-1729681983-0Wng4aXx','INITIATION','INFO',NULL,'2024-10-23 11:13:03','2024-10-23 09:13:03','2024-10-23 09:13:03','TRC-1729681983-GVV5uLxa'),('TRC-1729681983-L1WjtEH7','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"178 000,00 Ar\", \"montant_requis\": \"4 000 000,00 Ar\"}','2024-10-23 11:13:03','2024-10-23 09:13:03','2024-10-23 09:13:03','TRC-1729681983-GVV5uLxa'),('TRC-1729681998-IYQhMXNr','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"178 000,00 Ar\", \"montant_requis\": \"4 000 000,00 Ar\"}','2024-10-23 11:13:18','2024-10-23 09:13:18','2024-10-23 09:13:18','TRC-1729681997-dHJOVSma'),('TRC-1729681998-qFhRbVkn','INITIATION','INFO',NULL,'2024-10-23 11:13:18','2024-10-23 09:13:18','2024-10-23 09:13:18','TRC-1729681997-dHJOVSma'),('TRC-1729682298-BGlfg8qs','INITIATION','INFO',NULL,'2024-10-23 11:18:18','2024-10-23 09:18:18','2024-10-23 09:18:18','TRC-1729682298-B6lrApeZ'),('TRC-1729682298-oFRvjjnU','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"178 000,00 Ar\", \"montant_requis\": \"900 000,00 Ar\"}','2024-10-23 11:18:18','2024-10-23 09:18:18','2024-10-23 09:18:18','TRC-1729682298-B6lrApeZ'),('TRC-1729682306-13vX1eHF','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-3e3I5BrS','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-6ew84Z8c','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-kkMwypXE','FINALISATION','SUCCESS',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-MsgQERrs','INITIATION','INFO',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-OwYjRvIk','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729682306-x3AexPXt','SUCCESS','SUCCESS',NULL,'2024-10-23 11:18:26','2024-10-23 09:18:26','2024-10-23 09:18:26','TRC-1729682306-lJuCmcq9'),('TRC-1729755628-afxvxn2G','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"88 000,00 Ar\", \"montant_requis\": \"90 000,00 Ar\"}','2024-10-24 07:40:28','2024-10-24 05:40:28','2024-10-24 05:40:28','TRC-1729755627-hCjnaS1l'),('TRC-1729755628-b3v6XWHv','INITIATION','INFO',NULL,'2024-10-24 07:40:28','2024-10-24 05:40:28','2024-10-24 05:40:28','TRC-1729755627-hCjnaS1l'),('TRC-1729755867-1arXJ0kt','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-3iumBbiZ','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-DjvaO6ZG','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-EpOrwYF1','SUCCESS','SUCCESS',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-IATOQDcA','FINALISATION','SUCCESS',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-oGHvkbwj','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729755867-rCDxHIU3','INITIATION','INFO',NULL,'2024-10-24 07:44:27','2024-10-24 05:44:27','2024-10-24 05:44:27','TRC-1729755867-l3PEWONP'),('TRC-1729858834-6ww9IyNM','INITIATION','INFO',NULL,'2024-10-25 12:20:34','2024-10-25 10:20:34','2024-10-25 10:20:34','TRC-1729858834-KQ33JCul'),('TRC-1729858835-20c2oi7M','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858835-5vIAoqpI','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858835-69AJbq1D','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858835-ZcbteUkM','FINALISATION','SUCCESS',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858835-zFMooQln','SUCCESS','SUCCESS',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858835-ZftsNstH','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-25 12:20:35','2024-10-25 10:20:35','2024-10-25 10:20:35','TRC-1729858834-KQ33JCul'),('TRC-1729858899-hajF0Ly8','VERIFICATION_SOLDE','ERROR','{\"solde_valable\": \"1 942 000,00 Ar\", \"montant_requis\": \"2 000 000,00 Ar\"}','2024-10-25 12:21:39','2024-10-25 10:21:39','2024-10-25 10:21:39','TRC-1729858899-fim0usIe'),('TRC-1729858899-QIo47UrR','INITIATION','INFO',NULL,'2024-10-25 12:21:39','2024-10-25 10:21:39','2024-10-25 10:21:39','TRC-1729858899-fim0usIe'),('TRC-1729858952-BNmDaf2S','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-25 12:22:32','2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs'),('TRC-1729858952-xjZOrYzU','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-25 12:22:32','2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs'),('TRC-1729858952-yyhldAzt','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-25 12:22:32','2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs'),('TRC-1729858952-zXBMbcEM','INITIATION','INFO',NULL,'2024-10-25 12:22:32','2024-10-25 10:22:32','2024-10-25 10:22:32','TRC-1729858952-MG5DFNLs'),('TRC-1729858953-4ptpQ9zb','SUCCESS','SUCCESS',NULL,'2024-10-25 12:22:33','2024-10-25 10:22:33','2024-10-25 10:22:33','TRC-1729858952-MG5DFNLs'),('TRC-1729858953-ClaF7kFY','FINALISATION','SUCCESS',NULL,'2024-10-25 12:22:33','2024-10-25 10:22:33','2024-10-25 10:22:33','TRC-1729858952-MG5DFNLs'),('TRC-1729858953-hbXLrlVc','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-25 12:22:33','2024-10-25 10:22:33','2024-10-25 10:22:33','TRC-1729858952-MG5DFNLs'),('TRC-1729963007-2Czg9dmD','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-7HCa1ubL','FINALISATION','SUCCESS',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-bnwRZe1u','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-FU9hYmE1','SUCCESS','SUCCESS',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-gNPhCejp','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-vwLRTKc0','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1729963007-XCk9ZFyD','INITIATION','INFO',NULL,'2024-10-26 17:16:47','2024-10-26 15:16:47','2024-10-26 15:16:47','TRC-1729963007-lQ1JOn3c'),('TRC-1730029076-HXIoaSfJ','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-27 11:37:56','2024-10-27 10:37:56','2024-10-27 10:37:56','TRC-1730029076-JCVTDgM2'),('TRC-1730029076-j8YWSdUy','INITIATION','INFO',NULL,'2024-10-27 11:37:56','2024-10-27 10:37:56','2024-10-27 10:37:56','TRC-1730029076-JCVTDgM2'),('TRC-1730029076-ptnfhfpr','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-27 11:37:56','2024-10-27 10:37:56','2024-10-27 10:37:56','TRC-1730029076-JCVTDgM2'),('TRC-1730029077-e96NCcED','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-27 11:37:57','2024-10-27 10:37:57','2024-10-27 10:37:57','TRC-1730029076-JCVTDgM2'),('TRC-1730029077-evlwaYqp','SUCCESS','SUCCESS',NULL,'2024-10-27 11:37:57','2024-10-27 10:37:57','2024-10-27 10:37:57','TRC-1730029076-JCVTDgM2'),('TRC-1730029077-TAmVqiM9','FINALISATION','SUCCESS',NULL,'2024-10-27 11:37:57','2024-10-27 10:37:57','2024-10-27 10:37:57','TRC-1730029076-JCVTDgM2'),('TRC-1730029077-wujB9kMS','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-27 11:37:57','2024-10-27 10:37:57','2024-10-27 10:37:57','TRC-1730029076-JCVTDgM2'),('TRC-1730029162-C4QG0rIo','DEBUT_TRAITEMENT','INFO',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-G5rpPrm0','VERIFICATION_SOLDE','SUCCESS',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-qWUbFqMd','SUCCESS','SUCCESS',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-VLj8OZ2e','FINALISATION','SUCCESS',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-WWTZmJw0','INITIATION','INFO',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-xboFRag5','CREDIT_COMPTE_SOURCE','SUCCESS',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb'),('TRC-1730029162-XujaqiJ1','DEBIT_COMPTE_DESTINATAIRE','SUCCESS',NULL,'2024-10-27 11:39:22','2024-10-27 10:39:22','2024-10-27 10:39:22','TRC-1730029162-QXAouELb');
/*!40000 ALTER TABLE `journal_transactions` ENABLE KEYS */;

--
-- Table structure for table `matricules`
--

DROP TABLE IF EXISTS `matricules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidat_id` bigint unsigned DEFAULT NULL,
  `etudiant_id` bigint unsigned DEFAULT NULL,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricules_design_unique` (`design`),
  KEY `matricules_candidat_id_foreign` (`candidat_id`),
  KEY `matricules_etudiant_id_foreign` (`etudiant_id`),
  CONSTRAINT `matricules_candidat_id_foreign` FOREIGN KEY (`candidat_id`) REFERENCES `candidats` (`id`) ON DELETE SET NULL,
  CONSTRAINT `matricules_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricules`
--

/*!40000 ALTER TABLE `matricules` DISABLE KEYS */;
INSERT INTO `matricules` VALUES (1,1,1,'001/IE/IèA','2024-09-04 08:34:44','2024-09-04 08:41:28'),(2,2,2,'002/IE/IèA','2024-09-09 09:12:13','2024-09-09 09:43:13'),(3,4,3,'003/IE/IèA','2024-09-09 10:14:58','2024-09-09 10:17:00'),(4,5,4,'004/IE/IèA','2024-09-09 10:25:25','2024-09-09 10:28:41'),(5,6,5,'001/SS/IèA','2024-09-10 03:57:07','2024-09-10 04:01:02'),(6,7,6,'005/IE/IèA','2024-09-10 04:10:53','2024-09-10 04:13:17');
/*!40000 ALTER TABLE `matricules` ENABLE KEYS */;

--
-- Table structure for table `mention_serie`
--

DROP TABLE IF EXISTS `mention_serie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mention_serie` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `serie_id` bigint unsigned NOT NULL,
  `mention_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mention_serie_serie_id_foreign` (`serie_id`),
  KEY `mention_serie_mention_id_foreign` (`mention_id`),
  CONSTRAINT `mention_serie_mention_id_foreign` FOREIGN KEY (`mention_id`) REFERENCES `mentions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mention_serie_serie_id_foreign` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mention_serie`
--

/*!40000 ALTER TABLE `mention_serie` DISABLE KEYS */;
INSERT INTO `mention_serie` VALUES (1,1,1,NULL,NULL),(2,2,1,NULL,NULL),(3,3,1,NULL,NULL),(4,4,1,NULL,NULL),(5,5,1,NULL,NULL),(6,6,1,NULL,NULL),(7,1,2,NULL,NULL),(8,2,2,NULL,NULL),(9,2,3,NULL,NULL),(10,3,3,NULL,NULL),(11,4,3,NULL,NULL),(12,2,4,NULL,NULL),(13,3,4,NULL,NULL),(14,5,4,NULL,NULL),(15,1,5,NULL,NULL),(16,2,5,NULL,NULL),(17,3,5,NULL,NULL),(18,4,5,NULL,NULL),(19,5,5,NULL,NULL),(20,6,5,NULL,NULL),(21,2,6,NULL,NULL),(22,3,6,NULL,NULL),(23,5,6,NULL,NULL),(24,6,6,NULL,NULL),(25,5,2,NULL,NULL);
/*!40000 ALTER TABLE `mention_serie` ENABLE KEYS */;

--
-- Table structure for table `mentions`
--

DROP TABLE IF EXISTS `mentions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dispo_l1` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mentions_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentions`
--

/*!40000 ALTER TABLE `mentions` DISABLE KEYS */;
INSERT INTO `mentions` VALUES (1,'COMMUNICATION','COM','2024-08-21 16:04:39','2024-08-21 16:04:39',NULL,'Communication',1),(2,'DROIT & SCIENCE POLITIQUE','DT','2024-08-21 16:05:41','2024-08-21 16:15:17',NULL,'Droit',1),(3,'SCIENCE DE LA SANTE','SS','2024-08-21 16:08:21','2024-08-21 16:14:55',NULL,'Science de la santé',1),(4,'SCIENCE ECONOMIQUE & ETUDE DU DEVELOPPEMENT','ECO','2024-08-21 16:11:36','2024-08-21 16:17:53',NULL,'Science Economique et Etude du Développement',1),(5,'GESTION','GE','2024-08-21 16:14:41','2024-08-21 16:14:41',NULL,'Gestion',1),(6,'INFORMATIQUE & ELECTRONIQUE','IE','2024-08-21 16:16:12','2024-08-21 16:16:12',NULL,'Informatique et Electronique',1);
/*!40000 ALTER TABLE `mentions` ENABLE KEYS */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('texte','image','document','vocal','multimedia') NOT NULL,
  `contenu` text,
  `fichiers` json DEFAULT NULL,
  `metadonneesFichiers` json DEFAULT NULL,
  `statut` enum('envoye','lu','livre','supprime') DEFAULT 'envoye',
  `localisation` json DEFAULT NULL,
  `dateEnvoi` datetime NOT NULL,
  `dateLecture` datetime DEFAULT NULL,
  `expediteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destinataireId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `estUrgent` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_expediteur_id` (`expediteurId`),
  KEY `messages_destinataire_id` (`destinataireId`),
  KEY `messages_date_envoi` (`dateEnvoi`),
  KEY `messages_statut` (`statut`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`expediteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`destinataireId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('07da86a2-5ecd-4956-919a-009b1dc6fee6','texte','Dia ahoana',NULL,NULL,'envoye',NULL,'2024-11-18 12:33:06',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 12:33:06','2024-11-18 12:33:06',NULL),('0a091bad-6645-4570-ad73-52365882bf52','texte','mandray mihoatra ny 80K',NULL,NULL,'envoye',NULL,'2024-11-18 01:17:40',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 01:17:40','2024-11-18 01:17:40',NULL),('1d865e78-abd2-4e6a-b24c-6070a7e1a36b','texte','Dia ahoana zany',NULL,NULL,'envoye',NULL,'2024-11-17 18:55:16',NULL,'4e359a23-a0d1-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-17 18:55:16','2024-11-17 18:55:16',NULL),('1df6dcd1-c96b-4369-b3c4-c95a25d4bb3a','texte','zay',NULL,NULL,'envoye',NULL,'2024-11-17 19:11:47',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:11:47','2024-11-17 19:11:47',NULL),('1f2cc02c-c74e-41b5-8bb3-e47f3d0d02ae','texte','Ca va ve ela',NULL,NULL,'envoye',NULL,'2024-11-17 17:41:09',NULL,'53c02327-a0d0-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-17 17:41:09','2024-11-17 17:41:09',NULL),('2040940d-4f73-49db-98b4-847df2f31fe7','texte','dia ahoana',NULL,NULL,'envoye',NULL,'2024-11-17 19:05:48',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:05:48','2024-11-17 19:05:48',NULL),('375d8909-e231-4f28-aa32-45884ebc0f16','texte','Inona ny vaovao',NULL,NULL,'envoye',NULL,'2024-11-17 21:57:16',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','53c02327-a0d0-11ef-ae23-40b0763c5df3',0,'2024-11-17 21:57:16','2024-11-17 21:57:16',NULL),('3933b399-b710-4d03-a0bc-62cd142120f0','texte','Bonsoir madame',NULL,NULL,'envoye',NULL,'2024-11-18 01:04:45',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359b67-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-18 01:04:45','2024-11-18 01:04:45',NULL),('5643403c-a5c8-4e9a-83e9-a7c9ae402dc2','multimedia',NULL,'[]','[]','envoye',NULL,'2024-11-18 01:55:23',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 01:55:23','2024-11-18 01:55:23',NULL),('5b0bd75c-2788-4977-9717-3e196719cf82','texte','coucou toi',NULL,NULL,'envoye',NULL,'2024-11-18 01:01:58',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-18 01:01:58','2024-11-18 01:01:58',NULL),('5fdacc30-837b-442d-a754-e0108e0c5761','texte','test',NULL,NULL,'envoye',NULL,'2024-11-17 19:02:15',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:02:15','2024-11-17 19:02:15',NULL),('70a6af81-6875-40ba-b95c-035271a7a2fd','texte','dia ahoana',NULL,NULL,'envoye',NULL,'2024-11-17 19:05:39',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:05:39','2024-11-17 19:05:39',NULL),('8033d434-025d-43fd-81ea-b48732d791fd','texte','Dia ahoana lessy ry Mirindra',NULL,NULL,'envoye',NULL,'2024-11-17 14:52:01',NULL,'4e359a23-a0d1-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-17 14:52:01','2024-11-17 14:52:01',NULL),('815e1e26-d25a-4cf6-892d-af040ad6b8da','texte','test',NULL,NULL,'envoye',NULL,'2024-11-17 19:31:14',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:31:14','2024-11-17 19:31:14',NULL),('9307f07f-f479-4e5e-b75d-010c09b61649','texte','dia ahoana',NULL,NULL,'envoye',NULL,'2024-11-17 19:05:29',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:05:29','2024-11-17 19:05:29',NULL),('9f245c42-0cde-4080-a3a6-b3c9650f0eff','texte','ousta',NULL,NULL,'envoye',NULL,'2024-11-18 01:01:01',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 01:01:01','2024-11-18 01:01:01',NULL),('aa7150e8-ddfe-41f4-bfce-f5062a99ae8e','texte','Enao ary tsy fantatro akoriny',NULL,NULL,'envoye',NULL,'2024-11-17 18:52:26',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 18:52:26','2024-11-17 18:52:26',NULL),('b87bede8-7cc9-4dab-92ce-eaaf70b3571a','multimedia',NULL,NULL,NULL,'envoye',NULL,'2024-11-18 01:44:16',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 01:44:16','2024-11-18 01:44:16',NULL),('bb3bfb00-e54b-4298-93e0-a3d85c513471','texte','Oui ca va et toi?',NULL,NULL,'envoye',NULL,'2024-11-17 21:56:28',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','53c02327-a0d0-11ef-ae23-40b0763c5df3',0,'2024-11-17 21:56:28','2024-11-17 21:56:28',NULL),('bd832191-f6d2-488e-8afd-2b0f6de5c82d','texte','Tsy mila miresaka aminao aho',NULL,NULL,'envoye',NULL,'2024-11-17 18:55:33',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 18:55:33','2024-11-17 18:55:33',NULL),('c4401e61-c2a6-4a88-adbb-781e6391f486','multimedia',NULL,NULL,NULL,'envoye',NULL,'2024-11-18 01:50:12',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','20a89396-89e2-45ce-b195-8c58f06dacbb',0,'2024-11-18 01:50:12','2024-11-18 01:50:12',NULL),('c4a31928-ef95-4aa0-8fa2-7e44916d8d9c','texte','Bonjour Mirindra',NULL,NULL,'envoye',NULL,'2024-11-17 17:41:00',NULL,'53c02327-a0d0-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-17 17:41:00','2024-11-17 17:41:00',NULL),('ca01d081-cbaa-4de8-88b7-378be359ef8d','texte','test',NULL,NULL,'envoye',NULL,'2024-11-17 19:03:37',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 19:03:37','2024-11-17 19:03:37',NULL),('cc5920fb-9032-48de-8281-1473f8ba6808','texte','ousta',NULL,NULL,'envoye',NULL,'2024-11-18 00:58:36',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-18 00:58:36','2024-11-18 00:58:36',NULL),('cd8dd529-178f-465d-a945-987ab52c86f2','texte','Salama tompoko ohhhh',NULL,NULL,'envoye',NULL,'2024-11-17 15:48:07',NULL,'abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3',0,'2024-11-17 15:48:07','2024-11-17 15:48:07',NULL),('e6ea1927-b248-4925-a3f7-04f6885fb2e5','texte','bonsoir ianao',NULL,NULL,'envoye',NULL,'2024-11-18 01:04:09',NULL,'4e359a23-a0d1-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-18 01:04:09','2024-11-18 01:04:09',NULL),('f3977403-46eb-42cc-a860-0683357e0995','texte','karakory ma fiainanao tsisy zao oooooo',NULL,NULL,'envoye',NULL,'2024-11-18 01:06:12',NULL,'20a89396-89e2-45ce-b195-8c58f06dacbb','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-18 01:06:12','2024-11-18 01:06:12',NULL);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_07_25_060305_create_mentions_table',1),(5,'2024_07_25_060531_create_series_table',1),(7,'2024_07_25_061201_create_etudiants_table',1),(8,'2024_07_25_061202_create_utilisateurs_table',1),(9,'2024_07_25_061203_create_payements_table',1),(10,'2024_07_29_075649_alter_utilisateur',1),(11,'2024_07_30_101133_create_mention_serie_table',1),(13,'2024_08_06_072023_alter_mention_table',1),(14,'2024_08_06_074052_create_parcours_table',1),(15,'2024_08_06_104521_create_niveaux_table',1),(16,'2024_08_14_100321_create_matricules_table',1),(18,'2024_08_16_130950_alter_payement_table',1),(20,'2024_07_31_104302_create_vagues_table',2),(21,'2024_08_16_130655_create_concours_table',2),(23,'2024_08_30_110130_alter_vagues_table',3),(25,'2024_07_25_060533_create_candidats_table',4),(26,'2024_08_21_085351_alter_candidat_table',4),(27,'2024_09_06_055034_add_vague_status',5),(28,'2024_09_10_104556_create_groupes_table',5),(29,'2024_09_10_105819_create_sous_groupes_table',5),(30,'2024_09_15_082349_alter_etudiants_tables',6),(31,'2024_09_20_081750_alter_matricules_table',6),(32,'2024_09_21_102126_create_annee_universitaires_table',6),(33,'2024_09_21_103241_create_inscriptions_table',6),(34,'2024_09_22_132630_add_inscription_foreign_key_to_paiement_table',7),(35,'2024_09_23_071150_drop_column_boolean_from_matricules',8),(36,'2024_09_23_060218_create_reinscription_table',9),(37,'2024_09_23_083120_create_reference_paiements_table',10),(38,'2024_09_23_110745_update_payements_table',11),(39,'2024_09_23_121056_alter_table_annee_universitaires_to_add_date_beg_and_end',12),(40,'2024_09_24_115621_alter_table_payements_set_caissiere_id',13),(41,'2024_09_24_130414_alter_table_payements_change_date_format',14),(42,'2024_09_21_125937_alter_mention_table',15),(43,'2024_09_25_060232_create_activity_logs_table',15),(44,'2024_09_25_072426_alter_candidat_table',15),(45,'2024_09_26_120202_alter_table_payements_to_insert_is_debit_column',15),(48,'2024_09_28_141753_create_table_command',16),(49,'2024_09_28_142209_create_command_element',16),(50,'2024_09_28_142845_setting_relationship_to_command_and_command_elements',16),(51,'2024_09_30_080608_set_maricule_id_to_reinscription_table',17),(52,'2024_09_24_160346_alter_reinscription_table',18),(53,'2024_09_26_114736_add_email_to_utilisateur',18),(54,'2024_09_27_061328_add_unique_constraint_to_design_column',18),(55,'2024_09_27_120501_alter_etudiant_table',18),(56,'2024_10_01_120724_alter_table_paiements_to_include_mvola_reference',19),(57,'2024_10_03_063318_update_payements_and_update_commands',20),(58,'2024_09_30_080444_add_email_sent_to_inscription',21),(59,'2024_10_07_150411_alter_table_payement_to_include_command_id',21),(60,'2024_10_09_053526_edit_table_reference_paiements_and_commands_to_include_new_column_each',22),(62,'2024_10_09_144308_create_univ_certifications_table',23),(63,'2024_10_09_144707_alter_commands_table_to_include_univ_certification',23),(64,'2024_10_10_153048_alter_commands_table_to_include_validation_date',24),(85,'2024_10_11_154903_create_comptes_table',25),(86,'2024_10_11_163919_create_compte_details_table',25),(87,'2024_10_11_164806_create_transactions_table',25),(88,'2024_10_11_170043_create_journal_transactions_table',25),(89,'2024_10_11_171006_create_journal_activites_table',25),(90,'2024_10_12_140612_setting_relationship_to_compte_module_table',25),(91,'2024_10_15_064600_add_compte_id_in_journal_activite_table',26),(92,'2024_10_16_074052_alter_compte_table_to_integrate_minimum_amount_authorised',27),(93,'2024_10_26_170308_alter_table_transaction_to_set_solde_histiorique',28),(94,'2024_10_30_074708_create_frais_scolarites_table',29),(95,'2024_10_30_082551_create_tranches_table',29),(96,'2024_10_30_084424_alter_table_paiement_to_include_tranche_id',29);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

--
-- Table structure for table `niveaux`
--

DROP TABLE IF EXISTS `niveaux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveaux` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` enum('L1','L2','L3','M1','M2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parcours_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `niveaux_parcours_id_foreign` (`parcours_id`),
  CONSTRAINT `niveaux_parcours_id_foreign` FOREIGN KEY (`parcours_id`) REFERENCES `parcours` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveaux`
--

/*!40000 ALTER TABLE `niveaux` DISABLE KEYS */;
INSERT INTO `niveaux` VALUES (4,'L1',NULL,1,'2024-09-10 09:50:49','2024-09-10 09:50:49'),(5,'L1',NULL,2,'2024-09-12 03:50:46','2024-09-12 03:50:46'),(6,'L2',NULL,NULL,NULL,NULL),(7,'L3',NULL,NULL,NULL,NULL),(8,'M1',NULL,NULL,NULL,NULL),(9,'M2',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `niveaux` ENABLE KEYS */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `publicationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `commentaireId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reactionPublicationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reactionCommentaireId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `creatorId` (`creatorId`),
  KEY `publicationId` (`publicationId`),
  KEY `commentaireId` (`commentaireId`),
  KEY `reactionPublicationId` (`reactionPublicationId`),
  KEY `reactionCommentaireId` (`reactionCommentaireId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`creatorId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`publicationId`) REFERENCES `publications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_4` FOREIGN KEY (`commentaireId`) REFERENCES `commentaires` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_5` FOREIGN KEY (`reactionPublicationId`) REFERENCES `Reactions_Publication` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_6` FOREIGN KEY (`reactionCommentaireId`) REFERENCES `reactions_commentaires` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('1de9bc48-7173-42b4-8d66-88db47e37cf7','4e359a23-a0d1-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10','COMMENTAIRE','Mirindrampitia a commenté votre publication: \"Ayyy inona itony\"',0,'abafd70e-e5b8-47cb-9f03-2d6cdf3fe501','4659c26f-33de-4e9f-b579-540886e6cbc6',NULL,NULL,'2024-11-15 19:28:42','2024-11-15 19:28:42'),('1e0a6224-6a0b-409d-a665-96481f69185c','abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3','reaction','raharisoa.aimee a réagi à votre publication',1,'6a2d8f8d-9414-4a18-af0b-95cfd505e744',NULL,'67a7ff49-266a-4079-88b8-2a931b93863c',NULL,'2024-11-14 21:08:19','2024-11-19 01:07:57'),('7da647c0-22a3-4f1b-bbdb-4fa8d534dcfb','abd2dd19-fcde-419c-97ea-58b18068dc10','53c02327-a0d0-11ef-ae23-40b0763c5df3','reaction','ravelontsalama.miora a réagi à votre publication',1,'35807a42-f70b-4ba0-9442-04409055acb1',NULL,'dc1b1043-99d4-44bb-ac07-94c19a32ebab',NULL,'2024-11-17 00:44:55','2024-11-18 12:16:47'),('ab3f73b9-ab5b-4227-81e2-aeefda0ebf3b','4e359a23-a0d1-11ef-ae23-40b0763c5df3','abd2dd19-fcde-419c-97ea-58b18068dc10','reaction','Mirindrampitia a réagi à votre publication',0,'abafd70e-e5b8-47cb-9f03-2d6cdf3fe501',NULL,'b5d059f2-167c-4c6d-89d3-5e433c5af717',NULL,'2024-11-15 19:28:47','2024-11-15 19:28:47'),('ff9759dd-2c04-473a-8e25-8868e3fcf6f3','abd2dd19-fcde-419c-97ea-58b18068dc10','4e359a23-a0d1-11ef-ae23-40b0763c5df3','reaction','raharisoa.aimee a réagi à votre publication',1,'35807a42-f70b-4ba0-9442-04409055acb1',NULL,'97e4e79e-4fba-4cc6-9a61-bf6bfb0892a2',NULL,'2024-11-15 19:21:35','2024-11-19 01:07:57');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;

--
-- Table structure for table `parcours`
--

DROP TABLE IF EXISTS `parcours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parcours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mention_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parcours_mention_id_foreign` (`mention_id`),
  CONSTRAINT `parcours_mention_id_foreign` FOREIGN KEY (`mention_id`) REFERENCES `mentions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcours`
--

/*!40000 ALTER TABLE `parcours` DISABLE KEYS */;
INSERT INTO `parcours` VALUES (1,'COMMUNICATION','Communication',1,'2024-09-10 09:26:41','2024-09-10 09:26:41'),(2,'DROIT','Droit',2,'2024-09-10 09:27:05','2024-09-10 09:27:05');
/*!40000 ALTER TABLE `parcours` ENABLE KEYS */;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;

--
-- Table structure for table `payements`
--

DROP TABLE IF EXISTS `payements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `etudiant_id` bigint unsigned DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `mode` enum('espece','mvola') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidat_id` bigint unsigned DEFAULT NULL,
  `inscription_id` bigint unsigned DEFAULT NULL,
  `reference_paiement_id` bigint unsigned DEFAULT NULL,
  `reinscription_id` bigint unsigned DEFAULT NULL,
  `caissiere_id` bigint unsigned DEFAULT NULL,
  `isDebit` tinyint(1) NOT NULL DEFAULT '1',
  `mobile_reference` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `command_id` bigint unsigned DEFAULT NULL,
  `tranche_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payements_reference_unique` (`reference`),
  KEY `payements_utilisateur_id_foreign` (`utilisateur_id`),
  KEY `payements_etudiant_id_foreign` (`etudiant_id`),
  KEY `payements_candidat_id_foreign` (`candidat_id`),
  KEY `payements_inscription_id_foreign` (`inscription_id`),
  KEY `payements_reference_paiements_id_foreign` (`reference_paiement_id`),
  KEY `payements_reinscription_id_foreign` (`reinscription_id`),
  KEY `payements_caissiere_id_foreign` (`caissiere_id`),
  KEY `payements_command_id_foreign` (`command_id`),
  KEY `payements_tranche_id_foreign` (`tranche_id`),
  CONSTRAINT `payements_caissiere_id_foreign` FOREIGN KEY (`caissiere_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_candidat_id_foreign` FOREIGN KEY (`candidat_id`) REFERENCES `candidats` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_command_id_foreign` FOREIGN KEY (`command_id`) REFERENCES `commands` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_inscription_id_foreign` FOREIGN KEY (`inscription_id`) REFERENCES `inscriptions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_reference_paiements_id_foreign` FOREIGN KEY (`reference_paiement_id`) REFERENCES `reference_paiements` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_reinscription_id_foreign` FOREIGN KEY (`reinscription_id`) REFERENCES `reinscriptions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_tranche_id_foreign` FOREIGN KEY (`tranche_id`) REFERENCES `tranches` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payements_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payements`
--

/*!40000 ALTER TABLE `payements` DISABLE KEYS */;
INSERT INTO `payements` VALUES (1,NULL,NULL,'2024-09-04 00:00:00','concours',50000.00,'espece','ref-018','2024-09-04 08:34:10','2024-09-05 05:44:19',NULL,1,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(2,NULL,NULL,'2024-09-09 00:00:00','concours salon',25000.00,'espece','ref-012','2024-09-09 09:09:35','2024-09-09 09:09:35',NULL,2,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(3,NULL,NULL,'2024-09-09 00:00:00','concours',50000.00,'espece','ref-011','2024-09-09 10:14:29','2024-09-09 10:14:29',NULL,4,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(4,NULL,NULL,'2024-09-09 00:00:00','concours salon',25000.00,'espece','ref-0149','2024-09-09 10:24:47','2024-09-09 10:24:47',NULL,5,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(5,NULL,NULL,'2024-09-10 00:00:00','concours',50000.00,'espece','ref-0201','2024-09-10 03:56:30','2024-09-10 03:56:30',NULL,6,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(6,NULL,NULL,'2024-09-10 00:00:00','concours salon',25000.00,'espece','ref-0189','2024-09-10 04:10:24','2024-09-26 08:37:01',NULL,7,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(7,NULL,NULL,NULL,'concours',50000.00,'espece','ref-0184','2024-09-11 09:49:11','2024-09-24 12:48:04','Helo orlwlrds',8,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(67,NULL,NULL,'2024-10-01 13:15:20','droit d\'inscription',250000.00,'mvola','124124','2024-10-01 11:15:20','2024-10-01 11:15:20',NULL,4,1,1,NULL,16,1,'234io12u41',NULL,NULL),(68,NULL,NULL,'2024-10-01 13:15:20','frais generaux',300000.00,'mvola','32352','2024-10-01 11:15:20','2024-10-01 11:15:20',NULL,4,1,3,NULL,16,1,'234io12u41',NULL,NULL),(69,NULL,NULL,'2024-10-01 13:18:10','droit d\'inscription',250000.00,'espece','2346524','2024-10-01 11:18:10','2024-10-01 11:18:10',NULL,2,2,1,NULL,16,1,NULL,NULL,NULL),(70,NULL,NULL,'2024-10-01 13:18:10','frais generaux',300000.00,'espece','325235','2024-10-01 11:18:10','2024-10-01 11:18:10',NULL,2,2,3,NULL,16,1,NULL,NULL,NULL),(71,NULL,NULL,'2024-10-01 13:19:26','droit de reinscription',200000.00,'mvola','93939393','2024-10-01 11:19:26','2024-10-01 11:19:26',NULL,NULL,NULL,4,2,16,1,'384238838',NULL,NULL),(72,NULL,NULL,'2024-10-01 13:19:26','frais generaux',300000.00,'mvola','93939339','2024-10-01 11:19:26','2024-10-01 11:19:26',NULL,NULL,NULL,3,2,16,1,'384238838',NULL,NULL),(75,NULL,NULL,'2024-10-07 16:29:23','Note de frais',60000.00,'espece','30492310','2024-10-07 14:29:23','2024-10-07 14:29:23',NULL,NULL,NULL,7,NULL,16,1,NULL,NULL,NULL),(82,NULL,NULL,'2024-10-08 07:37:39','Bon de commande',1750000.00,'espece','32552355','2024-10-08 05:37:39','2024-10-08 05:37:39',NULL,NULL,NULL,6,NULL,16,1,NULL,19,NULL),(83,NULL,NULL,'2024-10-18 12:48:28','Bon de commande',310000.00,'espece','39204902','2024-10-18 10:48:28','2024-10-18 10:48:28',NULL,NULL,NULL,6,NULL,16,1,NULL,39,NULL);
/*!40000 ALTER TABLE `payements` ENABLE KEYS */;

--
-- Table structure for table `personnel`
--

DROP TABLE IF EXISTS `personnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personnel` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `photoProfil` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nomUtilisateur` varchar(255) NOT NULL,
  `dateNaissance` datetime NOT NULL,
  `motDePasse` varchar(255) NOT NULL,
  `situationMatrimoniale` enum('celibataire','marie','divorce','veuf') NOT NULL,
  `situationProfessionnelle` enum('vacataire') NOT NULL,
  `posteOccupe` enum('professeur','ressourcehumaine','comptable','accueil','secretaire','securite') NOT NULL,
  `contact` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `role` enum('admin','professeur','etudiant','president_association','utilisateur_simple') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomUtilisateur` (`nomUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel`
--

/*!40000 ALTER TABLE `personnel` DISABLE KEYS */;
INSERT INTO `personnel` VALUES ('20a89396-89e2-45ce-b195-8c58f06dacbb','uploads/photoProfil-1731412935371-629746535.jpeg','Universite ','ACEEM','aceem','2024-11-06 07:00:00','$2b$10$F2TNu0OmoCLeIFbbAKZrbunSFlMi0yUFeTGdV1wpZ79N/sBUSgFsm','celibataire','vacataire','accueil','0349506277','mirindrampitirakotovao@gmail.com','Soanierana','etudiant','2024-11-12 19:02:15','2024-11-12 19:02:15'),('4e359971-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANANDRASANA','Joelle','andrianandrasana.joelle','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000001','andrianandrasana.joelle@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e3599be-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANALY','Jacquelin','andrianaly.jacquelin','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000002','andrianaly.jacquelin@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e3599d5-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTONDRAMASY','Franck','rakotondramasy.franck','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000003','rakotondramasy.franck@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e3599ec-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRINETRAZAFY','Hemerson','andrinetrazafy.hemerson','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000004','andrinetrazafy.hemerson@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e3599ff-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANAIVO','Fanja','andrianaivo.fanja','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000005','andrianaivo.fanja@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a10-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAHARISON','Noelin','raharison.noelin','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000006','raharison.noelin@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a23-a0d1-11ef-ae23-40b0763c5df3','uploads/photoProfil-1731581992236-714722860.jpeg','RAHARISOA','Aimée','raharisoa.aimee','1979-12-31 07:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000007','raharisoa.aimee@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-14 17:59:52'),('4e359a34-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','MAKSIM','Lucien','maksim.lucien','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000008','maksim.lucien@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a4a-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANOELINA','Hasina','andrianoelina.hasina','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000009','andrianoelina.hasina@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a5c-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAMAHANDRY','Tsirava Maurice','ramahandry.tsirava','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000010','ramahandry.tsirava@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a70-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANASOLO','Léon','andrianasolo.leon','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000011','andrianasolo.leon@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a85-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RASAMIMANANA','Livasoa','rasamimanana.livasoa','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000012','rasamimanana.livasoa@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359a99-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIAMBOLATIANA','Parson','andriambolatiana.parson','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000013','andriambolatiana.parson@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359aad-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RALAMBOSON','Hantsa','ralamboson.hantsa','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000014','ralamboson.hantsa@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359abf-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIANASY','Reine','andrianasy.reine','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000015','andrianasy.reine@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359ad2-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RASOANAIVO','Diana','rasoanaivo.diana','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000016','rasoanaivo.diana@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359ae6-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIAMAHEFA','Zo Nambinina','andriamahefa.zo','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000017','andriamahefa.zo@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359afa-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RANAIVOSOA','Boris','ranaivosoa.boris','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000018','ranaivosoa.boris@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b0a-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTONANAHARY','Herizo','rakotonanahary.herizo','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000019','rakotonanahary.herizo@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b21-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTOSON','Philippe Victorien','rakotoson.philippe','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000020','rakotoson.philippe@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b34-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RATOLONJANAHARY','Odon','ratolonjanahary.odon','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000021','ratolonjanahary.odon@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b44-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RATSIMBAZAFY','Fara','ratsimbazafy.fara','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000022','ratsimbazafy.fara@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b55-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFINTSIALONINA','Sitraka','razafintsialonina.sitraka','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000023','razafintsialonina.sitraka@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b67-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','HANITRINIAINA','Elie','hanitriniaina.elie','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000024','hanitriniaina.elie@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b7a-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RAFELAMANILO','Voahangy','rafelamanilo.voahangy','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000025','rafelamanilo.voahangy@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b8b-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','RASOAMANANJARA','Fy Maminiaina','rasoamananjara.fy','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000026','rasoamananjara.fy@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('4e359b9c-a0d1-11ef-ae23-40b0763c5df3','default_photo.jpg','BONNET','Gérard','bonnet.gerard','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000027','bonnet.gerard@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:37:09','2024-11-12 11:37:09'),('53c022f1-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFIMANDIMBY','Malalatiana','razafimandimby.malalatiana','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000001','razafimandimby.malalatiana@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c02327-a0d0-11ef-ae23-40b0763c5df3','uploads/photoProfil-1731764656898-47635084.jpeg','RAVELONTSALAMA','Miora','ravelontsalama.miora','1979-12-31 07:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000002','ravelontsalama.miora@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-16 20:44:16'),('53c0233c-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','ROBIVELO','Marie Michel','robivelo.mariemichel','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000003','robivelo.mariemichel@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c0234e-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','ROBIJAONA','Nomena','robijaona.nomena','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000004','robijaona.nomena@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c02360-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFIMANJATO','Jocelyn Yves','razafimanjato.jocelyn','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000005','razafimanjato.jocelyn@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c02371-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFINJATOVO','Heriniaina','razafinjatovo.heriniaina','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000006','razafinjatovo.heriniaina@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c02381-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTOZAFY','Rivo John','rakotozafy.rivojohn','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000007','rakotozafy.rivojohn@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('53c02390-a0d0-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIAMANOHISOA','Hery Zo','andriamanohisoa.heryzo','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261340000008','andriamanohisoa.heryzo@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:30:09','2024-11-12 11:30:09'),('8f7dcd6a-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFITRIMO','Ny Aina Lazaharijaona','razafitrimo.nyaina','1980-01-01 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261330000000','razafitrimo.nyaina@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dd2af-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIAMIFALIHARIMANANA','Rado','andriamifaliharimanana.rado','1975-02-15 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','marie','vacataire','professeur','+261331111111','andriamifaliharimanana.rado@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dd4b5-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RANDRIAMAMPIANINA','Andy','randriamampianina.andy','1985-03-20 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261332222222','randriamampianina.andy@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dd615-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFINDRALAMBO','Manohisoa','razafindralambo.manohisoa','1978-04-10 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','divorce','vacataire','professeur','+261333333333','razafindralambo.manohisoa@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dd79e-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFIZANAKA','Giannot','razafizanaka.giannot','1982-05-25 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','marie','vacataire','professeur','+261334444444','razafizanaka.giannot@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dd900-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTOARIMANANA','Tsiriheriniana','rakotoarimanana.tsiriheriniana','1990-06-30 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261335555555','rakotoarimanana.tsiriheriniana@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7ddb0c-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','ANDRIAMIHARIVOLAMENA','R. Jacob','andriamiharivolamena.jacob','1983-07-15 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','veuf','vacataire','professeur','+261336666666','andriamiharivolamena.jacob@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7ddc9b-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RANDRIANARIMANANA','Andoniaina Charles','randrianarimanana.charles','1981-08-20 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','marie','vacataire','professeur','+261337777777','randrianarimanana.charles@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7ddd7b-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','MANDRARA','Thosun Eric','mandrara.thosun','1984-09-05 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','celibataire','vacataire','professeur','+261338888888','mandrara.thosun@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7dde54-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAZAFIMANDIMBY','Rian\'aina','razafimandimby.riaina','1986-10-12 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','marie','vacataire','professeur','+261339999999','razafimandimby.riaina@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('8f7ddf0b-a0ce-11ef-ae23-40b0763c5df3','default_photo.jpg','RAKOTONDRATSIMBA','Tahiry','rakotondratsimba.tahiry','1992-11-25 00:00:00','$2b$10$ulNyKl6RmqxAg7dPhxR4ke.YfFMPmXhd1T4GN4EruDwtmV.O5Bn4W','divorce','vacataire','professeur','+261330000000','rakotondratsimba.tahiry@universite.edu.mg','Antananarivo, Madagascar','professeur','2024-11-12 11:17:30','2024-11-12 11:17:30'),('abd2dd19-fcde-419c-97ea-58b18068dc10','uploads/photoProfil-1731400522534-500551053.jpg','RAKOTOVAO','Mirindrampitia Diamondraniaina','Mirindrampitia','2004-03-24 07:00:00','$2b$10$oIVVQ5CVK3J9UdhOP/PQBetIjnvNBREg7U5UgpYriU7HA/K5XUI/K','celibataire','vacataire','ressourcehumaine','0349506277','mirindrampitirakotovao@gmail.com','Soanierana','admin','2024-11-12 15:35:22','2024-11-12 15:35:22');
/*!40000 ALTER TABLE `personnel` ENABLE KEYS */;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `audience` enum('public','etudiants') NOT NULL,
  `type` enum('annonce','forum') NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `datePublication` date NOT NULL,
  `heurePublication` time NOT NULL,
  `auteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nombre_commentaire` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auteurId` (`auteurId`),
  CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`auteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publications`
--

/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
INSERT INTO `publications` VALUES ('04cf080a-e53f-4815-9b61-1acccdd6b7c9','public','annonce','Test kely androany','[\"uploads/1731955075473-CreerMessage.png\",\"uploads/1731955075475-Forum.png\"]','2024-11-18','01:37:55','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-19 01:37:55','2024-11-19 01:37:55'),('35807a42-f70b-4ba0-9442-04409055acb1','public','annonce','Mandeha sa tsia','[\"uploads/1731673204816.png\"]','2024-11-15','19:20:04','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-15 19:20:04','2024-11-15 19:20:04'),('6a2d8f8d-9414-4a18-af0b-95cfd505e744','public','annonce','test KONEKTA','[\"uploads/1731588613248.png\"]','2024-11-14','19:50:13','abd2dd19-fcde-419c-97ea-58b18068dc10',0,'2024-11-14 19:50:13','2024-11-14 19:50:13'),('abafd70e-e5b8-47cb-9f03-2d6cdf3fe501','public','annonce','Vaovao eto amn ACEEM ry zareo ah','[\"uploads/1731673342152.png\"]','2024-11-15','19:22:22','4e359a23-a0d1-11ef-ae23-40b0763c5df3',1,'2024-11-15 19:22:22','2024-11-15 19:28:42');
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;

--
-- Table structure for table `reactions_commentaires`
--

DROP TABLE IF EXISTS `reactions_commentaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions_commentaires` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('like','love','sad','angry') NOT NULL,
  `auteurId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `commentaireId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auteurId` (`auteurId`),
  KEY `commentaireId` (`commentaireId`),
  CONSTRAINT `reactions_commentaires_ibfk_1` FOREIGN KEY (`auteurId`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reactions_commentaires_ibfk_2` FOREIGN KEY (`commentaireId`) REFERENCES `commentaires` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions_commentaires`
--

/*!40000 ALTER TABLE `reactions_commentaires` DISABLE KEYS */;
/*!40000 ALTER TABLE `reactions_commentaires` ENABLE KEYS */;

--
-- Table structure for table `reference_paiements`
--

DROP TABLE IF EXISTS `reference_paiements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_paiements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frequence` enum('unique','multiple','tranche') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isCommon` tinyint(1) NOT NULL DEFAULT '1',
  `date_echeance` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_paiements`
--

/*!40000 ALTER TABLE `reference_paiements` DISABLE KEYS */;
INSERT INTO `reference_paiements` VALUES (1,'DRTINSC','Droit d\'inscription','unique',250000,NULL,NULL,0,NULL),(3,'FRAIGEN','Frais généraux','unique',300000,NULL,NULL,0,NULL),(4,'DRTREINSC','Droit de réinscription','unique',200000,NULL,NULL,0,NULL),(5,'DTSTENT','Droit test ou entretien','unique',50000,NULL,NULL,0,NULL),(6,'BCCMD','Bon de commande','unique',20202020,NULL,'2024-10-28 12:56:16',0,NULL),(7,'NFCMD','Note de frais','unique',0,NULL,NULL,0,NULL),(8,'CCLCL','Concours local','unique',50000,NULL,NULL,0,NULL),(9,'CCELG','Concours en ligne','unique',50000,NULL,NULL,0,NULL),(11,'L1T1XXX','L1 Tranche 1','tranche',850000,'2024-10-28 12:18:42','2024-10-28 12:18:42',1,NULL);
/*!40000 ALTER TABLE `reference_paiements` ENABLE KEYS */;

--
-- Table structure for table `reinscriptions`
--

DROP TABLE IF EXISTS `reinscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reinscriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `etudiant_id` bigint unsigned DEFAULT NULL,
  `matricule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_payement_ok` tinyint(1) NOT NULL DEFAULT '0',
  `is_valid` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('passant','redoublant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'passant',
  `niveau_id` bigint unsigned DEFAULT NULL,
  `annee_univ_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_sco_ok` tinyint(1) DEFAULT '0',
  `matricule_id` bigint unsigned DEFAULT NULL,
  `is_email_sent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `reinscriptions_etudiant_id_foreign` (`etudiant_id`),
  KEY `reinscriptions_niveau_id_foreign` (`niveau_id`),
  KEY `reinscriptions_annee_univ_id_foreign` (`annee_univ_id`),
  KEY `reinscriptions_matricule_id_foreign` (`matricule_id`),
  CONSTRAINT `reinscriptions_annee_univ_id_foreign` FOREIGN KEY (`annee_univ_id`) REFERENCES `annee_universitaires` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reinscriptions_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reinscriptions_matricule_id_foreign` FOREIGN KEY (`matricule_id`) REFERENCES `matricules` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reinscriptions_niveau_id_foreign` FOREIGN KEY (`niveau_id`) REFERENCES `niveaux` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reinscriptions`
--

/*!40000 ALTER TABLE `reinscriptions` DISABLE KEYS */;
INSERT INTO `reinscriptions` VALUES (2,NULL,'001/IE/Iem','RAKOTONDRANAIVO Anderson',1,1,'passant',6,1,'2024-10-01 11:19:26','2024-10-01 11:19:26',NULL,1,1,0),(3,NULL,'002/IE/IIem','Voavison Binea',0,1,'passant',7,1,'2024-09-24 10:41:10','2024-09-24 10:41:10',NULL,1,2,0),(4,NULL,'003/DT/Iem','Steve Malikh',0,1,'passant',8,1,'2024-09-27 11:02:45','2024-09-27 11:02:45',NULL,1,3,0),(5,4,'004/ECO/Iem','Jhon Doe',0,1,'redoublant',5,1,'2024-10-01 11:01:37','2024-10-01 11:01:37',NULL,1,4,0);
/*!40000 ALTER TABLE `reinscriptions` ENABLE KEYS */;

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (1,'BACC A','2024-08-21 15:53:01','2024-08-21 15:53:01'),(2,'BACC D','2024-08-21 15:53:12','2024-08-21 15:53:12'),(3,'BACC C','2024-08-21 15:53:20','2024-08-21 15:53:20'),(4,'BACC S','2024-08-21 15:53:27','2024-08-21 15:53:27'),(5,'BACC A2','2024-08-21 15:53:40','2024-08-21 15:53:40'),(6,'BACC TECHNIQUE','2024-08-21 15:55:02','2024-08-21 15:55:02');
/*!40000 ALTER TABLE `series` ENABLE KEYS */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('eCDdPGWnAYEnuKqPpWN6qk2USI7FEwfuPbF0O100',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVlBkZnR6eEU2R093cE12VTFiQ0V5d0p2TXVEdGZsdTY4ODY3OWQyeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1726130605),('EMVY21S5Fx9mHjKHxSGF00XMo1HmuHminNj7Qzub',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFVicmpxY1dMZXhSNFIwN2Z0TGJpU05vM0JDaTdXQXVYNjFyQUtiNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fX0=',1726219891);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

--
-- Table structure for table `sous_groupes`
--

DROP TABLE IF EXISTS `sous_groupes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_groupes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `design` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupes_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sous_groupes_groupes_id_foreign` (`groupes_id`),
  CONSTRAINT `sous_groupes_groupes_id_foreign` FOREIGN KEY (`groupes_id`) REFERENCES `groupes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_groupes`
--

/*!40000 ALTER TABLE `sous_groupes` DISABLE KEYS */;
INSERT INTO `sous_groupes` VALUES (2,'Groupe 01','Groupe 01 1ère année',2,'2024-09-11 03:35:33','2024-09-11 04:46:37'),(3,'Groupe 02','Groupe Communication 02',2,'2024-09-12 03:51:56','2024-09-12 03:51:56'),(4,'Groupe 01','Groupe droit 01',3,'2024-09-12 03:52:20','2024-09-12 03:53:37'),(5,'Groupe 02','Groupe Droit 02',3,'2024-09-12 03:52:36','2024-09-12 03:52:36');
/*!40000 ALTER TABLE `sous_groupes` ENABLE KEYS */;

--
-- Table structure for table `tranches`
--

DROP TABLE IF EXISTS `tranches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tranches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `designation_tranche` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etat` enum('non paie','en retard','complet','reporte') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reste` decimal(15,2) NOT NULL DEFAULT '0.00',
  `echeance` datetime DEFAULT NULL,
  `frais_scolarite_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tranches_frais_scolarite_id_foreign` (`frais_scolarite_id`),
  CONSTRAINT `tranches_frais_scolarite_id_foreign` FOREIGN KEY (`frais_scolarite_id`) REFERENCES `frais_scolarites` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tranches`
--

/*!40000 ALTER TABLE `tranches` DISABLE KEYS */;
/*!40000 ALTER TABLE `tranches` ENABLE KEYS */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` decimal(15,2) NOT NULL DEFAULT '0.00',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_operation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `etat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `compte_source_id` bigint unsigned DEFAULT NULL,
  `compte_destination_id` bigint unsigned DEFAULT NULL,
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `solde_source` decimal(15,2) NOT NULL DEFAULT '0.00',
  `solde_destination` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `transactions_compte_source_id_foreign` (`compte_source_id`),
  KEY `transactions_compte_destination_id_foreign` (`compte_destination_id`),
  KEY `transactions_utilisateur_id_foreign` (`utilisateur_id`),
  CONSTRAINT `transactions_compte_destination_id_foreign` FOREIGN KEY (`compte_destination_id`) REFERENCES `comptes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_compte_source_id_foreign` FOREIGN KEY (`compte_source_id`) REFERENCES `comptes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('TRC-1729679771-uFbAnklH',4000000.00,'Simple transaction','Virement','erreur','2024-10-23 08:36:11','2024-10-23 08:36:11',5,7,17,0.00,0.00),('TRC-1729679885-PWPgy3BN',2000000000.00,'Virement de l\'operation de A vers B','Virement','erreur','2024-10-23 08:38:05','2024-10-23 08:38:05',7,5,17,0.00,0.00),('TRC-1729679931-FOC6tjBf',30000000.00,'Virement de l\'operation de A vers B','Virement','erreur','2024-10-23 08:38:51','2024-10-23 08:38:51',7,5,17,0.00,0.00),('TRC-1729680218-Iv7HU6rK',40000000.00,'Virement de l\'operation de A vers B','Virement','erreur','2024-10-23 08:43:38','2024-10-23 08:43:38',5,7,17,0.00,0.00),('TRC-1729680246-fkgJ6ox3',3423423430.00,'asdasd','Rechargement','erreur','2024-10-23 08:44:06','2024-10-23 08:44:06',7,5,17,0.00,0.00),('TRC-1729680277-CRmWPQSL',12000.00,'test OK','Transfert interne','succes','2024-10-23 08:44:37','2024-10-23 08:44:37',5,7,17,0.00,0.00),('TRC-1729680870-5GYTgype',40000000.00,'Dadsda','Dépôt','erreur','2024-10-23 08:54:30','2024-10-23 08:54:30',5,7,17,0.00,0.00),('TRC-1729680914-rnOOIL2F',40000000.00,'Dadsda','Dépôt','erreur','2024-10-23 08:55:14','2024-10-23 08:55:15',5,7,17,0.00,0.00),('TRC-1729681262-sB6iAF8f',60000.00,'Test OK','Crédit','succes','2024-10-23 09:01:02','2024-10-23 09:01:02',5,7,17,0.00,0.00),('TRC-1729681983-GVV5uLxa',4000000.00,'sadasd','Rechargement','erreur','2024-10-23 09:13:03','2024-10-23 09:13:03',5,7,17,0.00,0.00),('TRC-1729681997-dHJOVSma',4000000.00,'sadasd','Rechargement','erreur','2024-10-23 09:13:17','2024-10-23 09:13:18',5,7,17,0.00,0.00),('TRC-1729682298-B6lrApeZ',900000.00,'Virement de l\'operation de A vers B','Rechargement','erreur','2024-10-23 09:18:18','2024-10-23 09:18:18',5,7,17,0.00,0.00),('TRC-1729682306-lJuCmcq9',90000.00,'Virement de l\'operation de A vers B','Virement','succes','2024-10-23 09:18:26','2024-10-23 09:18:26',5,7,17,0.00,0.00),('TRC-1729755627-hCjnaS1l',90000.00,'Virement complet du solde MVOLA','Virement','erreur','2024-10-24 05:40:27','2024-10-24 05:40:28',5,7,17,0.00,0.00),('TRC-1729755867-l3PEWONP',30000.00,'Virement complet du solde MVOLA','Rechargement','succes','2024-10-24 05:44:27','2024-10-24 05:44:27',5,7,17,0.00,0.00),('TRC-1729858834-KQ33JCul',1000000.25,'Test OK','Dépôt','succes','2024-10-25 10:20:34','2024-10-25 10:20:35',4,5,17,240000.00,173500.00),('TRC-1729858899-fim0usIe',2000000.00,'sadasd','Crédit','erreur','2024-10-25 10:21:39','2024-10-25 10:21:39',7,5,17,240000.00,173500.00),('TRC-1729858952-MG5DFNLs',200000.00,'sadasd','Crédit','succes','2024-10-25 10:22:32','2024-10-25 10:22:33',7,5,17,1842000.00,250000.00),('TRC-1729963007-lQ1JOn3c',100000.25,'Virement urgent','Virement','succes','2024-10-26 15:16:47','2024-10-26 15:16:47',4,7,17,27880000.00,1742000.00),('TRC-1730029076-JCVTDgM2',1000000.00,'Depot mensuel','Dépôt','succes','2024-10-27 10:37:56','2024-10-27 10:37:57',7,4,17,1842000.00,27780000.00),('TRC-1730029162-QXAouELb',1000000.00,'Virement du solde du compte mvola vers caisse','Rechargement','succes','2024-10-27 10:39:22','2024-10-27 10:39:22',5,7,17,1258000.00,842000.00);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

--
-- Table structure for table `univ_certifications`
--

DROP TABLE IF EXISTS `univ_certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `univ_certifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `NIF` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `STAT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `utilisateur_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univ_certifications_utilisateur_id_foreign` (`utilisateur_id`),
  CONSTRAINT `univ_certifications_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `univ_certifications`
--

/*!40000 ALTER TABLE `univ_certifications` DISABLE KEYS */;
INSERT INTO `univ_certifications` VALUES (1,'3242839703FYR-R3R','349829-R3RR-R3EW',17,NULL,NULL);
/*!40000 ALTER TABLE `univ_certifications` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_changed` tinyint(1) NOT NULL DEFAULT '0',
  `etudiant_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `utilisateurs_email_unique` (`email`),
  KEY `utilisateurs_etudiant_id_foreign` (`etudiant_id`),
  CONSTRAINT `utilisateurs_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Siaceem','$2y$12$EU65CYAdtETc56sTZdl6yOSubsndKCOyULOYbmok1sWWevhmtnRa2','siaceem','SI Admin',1,NULL,'2024-08-21 11:16:56','2024-08-21 11:16:56',NULL,1,NULL),(2,'Caisse','$2y$12$I/mT/E3pqXONIHjUTRvD/ORJgjZWvKTiyHXDn.246G5c.5sDwRbCW','caisse','Caisse',1,NULL,'2024-08-21 15:47:29','2024-08-21 15:47:29',NULL,1,NULL),(3,'Acceuil','$2y$12$62uyUkQ9bGiliv1xDzQBz.IiVt.aOA7rqstNwGksW80pLhgSrv.xm','acceuil','Accueil',1,NULL,'2024-08-21 15:47:55','2024-08-26 09:44:29','2024-08-26 09:44:29',1,NULL),(4,'Inscription','$2y$12$hN/ryw/9RpyKrH4YJh33te2Jo9vdOavI/snk/1KmtaSc8H4nR7MY.','inscription','Inscription',1,NULL,'2024-08-21 15:48:21','2024-08-21 15:48:21',NULL,1,NULL),(5,'Caisse Candidat ACEEM','$2y$12$54H444nlJaB4xJ6t5KU45uiFe/2GGpob4PBWe9tYbXwMuvIBt5XOO','CA','CA',1,NULL,'2024-08-23 09:07:28','2024-08-23 09:07:28',NULL,1,NULL),(8,'Accueil','$2y$12$IIrIklfR9As9JGDYuUVwuu8hTAPvZl2cUZxgnQ/dJsGM5nAn/SZJK','accueil','Accueil',1,NULL,'2024-08-26 09:49:07','2024-08-26 09:49:07',NULL,1,NULL),(10,'RATOVOARIVONY Ainanirina Sabrino','$2y$12$2K9pWuJZHdIjOxK2myr09OGAHIUhJD.aCUec2CdiOUPPQ5IxygqQy','sabrino','Etudiant',1,1,'2024-09-05 05:46:43','2024-09-05 05:47:14',NULL,1,NULL),(11,'Voavison Binea','$2y$12$gxX6CVHe6wu40o2yohBaP.0Ffs.MGChCSvwYzkWZMptwgZXtbJugi','binea','Etudiant',1,2,'2024-09-09 09:43:14','2024-09-09 09:43:45',NULL,1,NULL),(12,'John Doe','$2y$12$Hst3dbLfz3mLeHRZKTJcn.anhLeXqkaTKiPwkEZU0Gj2ONF6GwY9y','john','Etudiant',1,3,'2024-09-09 10:17:00','2024-09-09 10:17:44',NULL,1,NULL),(13,'Voavy Paulin','$2y$12$mt.uCAnBCDwU5hUcTY2io.FgDEODFZdg4OIiyu/OMlaGchdlpn.66','voavy','Etudiant',1,4,'2024-09-09 10:28:41','2024-09-09 10:29:13',NULL,1,NULL),(14,'Henri VE','$2y$12$j6V/u7PJ5e7Ea6AeP9fivO6zkxKs6LU5r4LQA3ng1KdDneDIFwsse','henri','Etudiant',1,5,'2024-09-10 04:01:02','2024-09-10 04:03:53',NULL,1,NULL),(15,'Desiré Noel','$2y$12$FqcNaKjraPxEnCj4bgJVYusIwnkIeEOVvtPR.31XA8KsYqo37wkgC','desiré','Etudiant',1,6,'2024-09-10 04:13:17','2024-09-10 04:13:17',NULL,1,NULL),(16,'Wendi','$2y$12$d3kqGGQwM08xf36ZqsYX1.TuERNnOG8OxCdwNuktqJTSzUsLgqfuK','Wendi','Caisse',1,NULL,'2024-09-18 11:38:38','2024-09-18 11:39:02',NULL,1,NULL),(17,'Anderson','$2y$12$mSJR44cr77VySucgLlHea.PZVieq72pjB5BWiyXcurqTC7r2mMLh6','Anderson','Chef comptable',1,NULL,'2024-09-26 09:58:05','2024-09-26 09:58:27',NULL,1,NULL),(18,'Jhon Doe','$2y$12$neP45tioHFTmNCfic96mIOpWenxPgBFY3NhZbwPxkfVWl1s3GdbXK','sg','Sécrétaire Générale',1,NULL,'2024-10-04 04:55:52','2024-10-04 04:56:24',NULL,1,'pdg@gmail.com');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;

--
-- Table structure for table `vagues`
--

DROP TABLE IF EXISTS `vagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vagues` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deb_insc` date NOT NULL,
  `fin_insc` date DEFAULT NULL,
  `deb_conc` date NOT NULL,
  `fin_conc` date DEFAULT NULL,
  `concours_id` bigint unsigned DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `vagues_concours_id_foreign` (`concours_id`),
  CONSTRAINT `vagues_concours_id_foreign` FOREIGN KEY (`concours_id`) REFERENCES `concours` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagues`
--

/*!40000 ALTER TABLE `vagues` DISABLE KEYS */;
INSERT INTO `vagues` VALUES (1,'1er Vague','2024-09-05 05:27:14','2024-09-05 05:27:14',NULL,'2024-09-02','2024-09-08','2024-09-09','2024-09-11',1,0),(2,'2eme Vague','2024-09-05 05:27:39','2024-09-09 07:23:08',NULL,'2024-09-09','2024-09-15','2024-09-16','2024-09-18',1,0);
/*!40000 ALTER TABLE `vagues` ENABLE KEYS */;

--
-- Dumping routines for database 'uaceem'
--
/*!50003 DROP PROCEDURE IF EXISTS `InsererEnseignement` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsererEnseignement`(
    IN p_id VARCHAR(36),
    IN p_annee_universitaire VARCHAR(20),
    IN p_niveau VARCHAR(50),
    IN p_mention VARCHAR(100),
    IN p_semestre INT,
    IN p_type_ue VARCHAR(20),
    IN p_nom_matiere VARCHAR(255),
    IN p_cours_magistraux INT,
    IN p_travaux_diriges INT,
    IN p_volume_horaire_total INT,
    IN p_credits DECIMAL(5,2),
    IN p_coefficient DECIMAL(5,2),
    IN p_nom_enseignant VARCHAR(100),
    IN p_prenom_enseignant VARCHAR(100),
    IN p_titre_enseignant VARCHAR(50)
)
BEGIN
    -- Validation des données
    IF p_semestre < 1 OR p_semestre > 6 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Le semestre doit être entre 1 et 6';
    END IF;
    IF p_credits < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Les crédits doivent être positifs';
    END IF;
    -- Insertion des données
    INSERT INTO enseignements (
        id, 
        annee_universitaire, 
        niveau, 
        mention, 
        semestre, 
        type_ue, 
        nom_matiere, 
        cours_magistraux, 
        travaux_diriges, 
        volume_horaire_total, 
        credits, 
        coefficient, 
        nom_enseignant, 
        prenom_enseignant, 
        titre_enseignant
    ) VALUES (
        p_id, 
        p_annee_universitaire, 
        p_niveau, 
        p_mention, 
        p_semestre, 
        p_type_ue, 
        p_nom_matiere, 
        p_cours_magistraux, 
        p_travaux_diriges, 
        p_volume_horaire_total, 
        p_credits, 
        p_coefficient, 
        p_nom_enseignant, 
        p_prenom_enseignant, 
        p_titre_enseignant
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 10:14:20
