CREATE DATABASE  IF NOT EXISTS `productos_retro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `productos_retro`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: productos_retro
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.21.10.3

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(60,2) NOT NULL,
  `description` text,
  `photo` varchar(250) DEFAULT NULL,
  `category` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `province` varchar(200) NOT NULL,
  `idUser` int NOT NULL,
  `buyerId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Atari 2600',42.00,'Consola de juegos Atari 2600 en caja. Totalmente probada y funcionando.','./uploads/articlePhotoUploads/gaming/consolas/atari_2600.jpg','consolas','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(2,'Atari 7800 pal',129.00,'Consola Atari 7800 en perfecto estado, con mandos y pantalla','./uploads/articlePhotoUploads/gaming/consolas/atari_7800_pal.jpg','consolas','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(3,'Nintendo NES',40.00,'Video consola Nintendo NES original años 80. Versión española PAL.','./uploads/articlePhotoUploads/gaming/consolas/nintendo_nes.jpg','consolas','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(4,'Nintendo NES Trojan',19.95,'Juego 100% original. Buen estado. Carcasa y pegatinas con algunas marcas','./uploads/articlePhotoUploads/gaming/cartuchos_juegos/nintendo_nes_trojan.jpg','cartuchos','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(5,'Banjo kazooie Nintendo 64',35.00,'En muy buen estado. La caja no está deteriorada. Con carátula y folleto','./uploads/articlePhotoUploads/gaming/cartuchos_juegos/banjo_kazooie_nin64.jpg','cartuchos','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(6,'E.T. juego historico Atari 2600',69.00,'Caja custom. Cartucho y manual originales. Buen estado','./uploads/articlePhotoUploads/gaming/cartuchos_juegos/et_atari_2600.jpg','cartuchos','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(7,'BSO Grease',25.00,'Vinilo en perfecto estado','./uploads/articlePhotoUploads/musica/vinilos/bso_grease.jpg','vinilos','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(8,'Deep Purple Japon',20.00,'Versión Japón. Pequeño rallazo en una cara','./uploads/articlePhotoUploads/musica/vinilos/deep_purple_japon.jpg','vinilos','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(9,'Loquillo y Trogloditas-El Rompeolas',28.50,'Procedente de una discoteca. Buen estado','./uploads/articlePhotoUploads/musica/vinilos/loquillo_trogloditas.jpg','vinilos','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(10,'Rafaella Carra. Hay que venir al sur',9.00,'Muy poco uso','./uploads/articlePhotoUploads/musica/cintas/rafaella_carra.jpg','cintas','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(11,'Megadeth. Hanhar 18',10.00,'Casette single. Como nueva','./uploads/articlePhotoUploads/musica/cintas/hangar_18.jpg','cintas','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(12,'Mecano. Entre el cielo y el suelo',20.00,'Usada pero en muuy buen estado','./uploads/articlePhotoUploads/musica/cintas/mecano_cielo_suelo.jpg','cintas','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(13,'IBM PS2 30 286 8530',250.00,'Funciona perfectamente. Intel 286 10MHZ. 1024kb RAM. 30mb HDD','./uploads/articlePhotoUploads/informatica/ordenadores/ibm_ps2_30_286_8530.jpg','ordenadores','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(14,'IBM PS2 70 386',42.00,'Funciona bien. Es silencioso y no hace ruidos estraños','./uploads/articlePhotoUploads/informatica/ordenadores/ibm_ps2_70_386.jpg','ordenadores','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(15,'Sinclair ZX Spectrum 128k',120.00,'Funciona con normalidad. Algún detalle estético exterior. Con alimentador original','./uploads/articlePhotoUploads/informatica/ordenadores/sinclair_zx_spectrum_128k.jpg','ordenadores','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(16,'SHARP CE-X100KI',20.00,'Del año 1991. Funciona bien. Teclado inglés','./uploads/articlePhotoUploads/informatica/teclados/sharp_ce-x100ki.jpg','teclados','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(17,'IBM Sk-8811',35.00,'En buen estado de conservación','./uploads/articlePhotoUploads/informatica/teclados/ibm_sk-8811.jpg','teclados','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(18,'Apple M0110A',55.00,'Teclado clásico extendido. No se incluye cable','./uploads/articlePhotoUploads/informatica/teclados/apple_m0110a.jpg','teclados','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(19,'Tarjeta grafica ISA 16bits',15.00,'Tarjeta de 16bits VGA. Compatible con AMD e Intel','./uploads/articlePhotoUploads/informatica/accesorios/isa_16bits.jpg','accesorios','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(20,'Disquetera 3.5 Amstrad',60.00,'Casi nueva. Interruptor de encendido y selección de cara del diskette','./uploads/articlePhotoUploads/informatica/accesorios/disquetera_amstrad.jpg','accesorios','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(21,'Tarjeta grafica GeForce 210',15.00,'Perfecta. Muy poco uso. Caja y disco de instalacion original','./uploads/articlePhotoUploads/informatica/accesorios/geforce_210.jpg','accesorios','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(22,'NEC Multisync V250',40.00,'Funciona perfectamente. Monitor de 15pulgadas','./uploads/articlePhotoUploads/informatica/monitores/nec_multisync_v520.jpg','monitores','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(23,'Philips 107 T5',50.00,'Monitor de 17 pulgadas. Funciona perfectamente. Con cable de alimentacion','./uploads/articlePhotoUploads/informatica/monitores/philips_107_t5.jpg','monitores','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(24,'Samsung SyncMaster 753S',44.00,'Monitor de 17 pulgadas. Funcionando','./uploads/articlePhotoUploads/informatica/monitores/samsung_syncmaster_753s.jpg','monitores','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(25,'Cámara compacta Petri Color 35',40.00,'cámara compacta analógica para fotografía sin estabilizador','./uploads/articlePhotoUploads/imagen/camara_fotos/petri_color_35.jpg','camaraFotos','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(26,'Bencini comet S',80.00,'cámara vintage en excelente condición con algún roce en el alumninio','./uploads/articlePhotoUploads/imagen/camara_fotos/bencini_comet_s.jpg','camaraFotos','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(27,'Canon Canonet QL25',35.00,'Cámara telemétrica con obturador de 45mm f/2.5','./uploads/articlePhotoUploads/imagen/camara_fotos/canon_canonet_ql25.jpg','camaraFotos','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(28,'Canon miniDV MV850i',60.00,'Funciona perfectamente tanto a batería como conectada. Cable alimentación original.','./uploads/articlePhotoUploads/imagen/camara_video/canon_minidv_mv850i.jpg','camaraVideo','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(29,'Cámara video 8 Handycam',37.00,'testada. Con accesorios y bolsa original. Sin manual de instrucciones','./uploads/articlePhotoUploads/imagen/camara_video/camara_video_8_handycam.jpg','camaraVideo','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(30,'Canon UC8000 8mm',72.00,'Funciona perfectamente. Sirve para grabar tus videos caseros','./uploads/articlePhotoUploads/imagen/camara_video/canon_uc8000_8mm.jpg','camaraVideo','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(31,'Grundig GT 1401',60.00,'Totalmente funcionando. Se entrega con mando original','./uploads/articlePhotoUploads/imagen/televisores/grundig_gt_1401.jpg','televisores','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(32,'Telefunken 1200 S',99.00,'Funcionando. Le falta la antena telescopica','./uploads/articlePhotoUploads/imagen/televisores/telefunken_1200_s.jpg','televisores','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(33,'Hitachi i-89-311',47.00,'Tv portátil años 70. Con cable alimentación original. No funciona.','./uploads/articlePhotoUploads/imagen/televisores/hitachi_i-89_311.jpg','televisores','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(34,'Philips Estereo 400',70.00,'Antiguo tocadiscos Philips Stereo modelo 400 totalmente funcional.','./uploads/articlePhotoUploads/audio/tocadiscos/philips_400.jpg','tocadiscos','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(35,'Telefunken Musikus 105V',80.00,'Antiguo tocadiscos gramófono Musikus 105v. Funciona.','./uploads/articlePhotoUploads/audio/tocadiscos/telefunken_musikus_105v.jpg','tocadiscos','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(36,'Teppaz BI BALAD',99.00,'Antiguo tocadiscos portátil de 1967. Funciona. Excelente estado.','./uploads/articlePhotoUploads/audio/tocadiscos/teppaz_bi_balad.jpg','tocadiscos','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(37,'Roberts R25',42.00,'En buenas condiciones. Trabajando, con algunas crepitaciones','./uploads/articlePhotoUploads/audio/radios/roberts_r25.jpg','radios','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(38,'Bush TR82',20.00,'En buen funcionamiento y condición. Anchos de banda FM/MW/LW.','./uploads/articlePhotoUploads/audio/radios/bush_tr82.jpg','radios','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(39,'MontBlanc MG500',190.00,'6 altavoces. Funcionando todo. Poco desgaste superficial.','./uploads/articlePhotoUploads/audio/radios/montblanc_mg500.jpg','radios','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(40,'Sony WM22',110.00,'En perfecto estado.Se incluyen cascos.','./uploads/articlePhotoUploads/audio/walkman/sony_wm22.jpg','walkman','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(41,'Sony WM-EX910',60.00,'Extremadamente raro. Incluye cascos. Buena calidad de sonido.','./uploads/articlePhotoUploads/audio/walkman/sony_wm-ex910.jpg','walkman','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(42,'Aiwa HS-TX446',60.00,'Incluye caja y clip para el cinturón. Sin desperfectos.','./uploads/articlePhotoUploads/audio/walkman/aiwa_hs-tx446.jpg','walkman','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(43,'Heco Hi-Fi flatbox LB5',80.00,'Par original de altavoces con 2 vías.','./uploads/articlePhotoUploads/audio/altavoces/heco_hi-fi_flatbox_lb5.jpg','altavoces','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(44,'Geloso 3093-N',20.00,'Altavoz de los años 50. Caja abierta, pero el altavoz es nuevo.','./uploads/articlePhotoUploads/audio/altavoces/geloso_3093-n.jpg','altavoces','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(45,'Philips baquelita 1932',250.00,'Antiguo altavoz de baquelita con imitación carey fabricado en los 30.','./uploads/articlePhotoUploads/audio/altavoces/philips_baquelita_1932.jpg','altavoces','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(46,'Aplle Ipod Shuffle 3',5.00,'Bastante rallado. Tiene cable usb original','./uploads/articlePhotoUploads/audio/mp3/ipod_shuffle_3.jpg','mp3','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(47,'Apple Ipod Shuffle 2',21.00,'Muy buen estado. Capacidad 1Gb. Con cargador original','./uploads/articlePhotoUploads/audio/mp3/ipod_shuffle_2.jpg','mp3','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(48,'Victure M3',10.00,'Buen estado. Funciona perfectamente. Se vende el reproductor y cable usb-A','./uploads/articlePhotoUploads/audio/mp3/victure_m3.jpg','mp3','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(49,'Móvil Ericsson A1018S',20.00,'Antiguo teléfono móvil vintage Ericsson A1018S + SIM','./uploads/articlePhotoUploads/telefonos/moviles/ericsson_a1018s.jpg','moviles','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(50,'iPhone PRIMERA GENERACIÓN',2050.00,'El primer iPhone 8gb 2G IOS3 de 2007. Excelente estado. Caja+Accesocios+Manuales.Funciona.','./uploads/articlePhotoUploads/telefonos/moviles/iphone_1stgeneration.jpg','moviles','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(51,'Nokia 5110',45.00,'El Nokia irrompible. Nokia 5110. Usado - funcionando.','./uploads/articlePhotoUploads/telefonos/moviles/nokia_5110.jpg','moviles','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(52,'Teléfono fijo Alcatel botones',16.00,'Teléfono Alcatel Teide Vintage blanco. Años 80-90. Funciona.','./uploads/articlePhotoUploads/telefonos/fijos/alcatel_teide.jpg','fijos','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(53,'Teléfono de disco rojo',50.00,'Teléfono vintaje rojo, de disco. Totalmente original,de serie. Funciona','./uploads/articlePhotoUploads/telefonos/fijos/disco_rojo.jpg','fijos','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(54,'Teléfono góndola rojo',25.00,'Teléfonos góndola. Rojos. Funcionan. Uno por 25€, dos por 45 €.','./uploads/articlePhotoUploads/telefonos/fijos/gondola_rojo.jpg','fijos','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(55,'Despertador viaje Kienzle',28.00,'Made in Germany. Buen estado','./uploads/articlePhotoUploads/electronica/despertadores/despertador_viaje_kienzle.jpg','despertadores','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(56,'Despertador Peter',25.00,'El reloj está perfectamente conservado. Fabricado en Alemania','./uploads/articlePhotoUploads/electronica/despertadores/despertador_peter.jpg','despertadores','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(57,'Despertador Radiant',20.00,'Precioso reloj Radiant muy antigüo. La alarma funciona. La hora no.','./uploads/articlePhotoUploads/electronica/despertadores/despertador_radiant.jpg','despertadores','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(58,'Tomtom Go 4',20.00,'Funciona perfectamente. Le falta la ventosa.','./uploads/articlePhotoUploads/electronica/gps/tomtom_go_4.jpg','gps','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(59,'Garmin Nuvi 40',35.00,'Se entrega con soporte ventosa, cargador mechero y tarjeta MicroSD con mapas.','./uploads/articlePhotoUploads/electronica/gps/garmin_nuvi_40.jpg','gps','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(60,'Tomtom Start 2',26.00,'Funciona perfecto y lleva instalado mapa de Iberia actual.','./uploads/articlePhotoUploads/electronica/gps/tomtom_start_2.png','gps','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(61,'Casio casiowrite CW-17',20.00,'Máquina de escribir eléctrica. Buen estado exterior. No está probada.','./uploads/articlePhotoUploads/electronica/maquinas_escribir/casio_casiowriter_cw17.jpg','maquinasEscribir','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(62,'Olivetti Lettera 3',49.00,'Bonita máquina de escribir super retro.Necesita reparación.','./uploads/articlePhotoUploads/electronica/maquinas_escribir/olivetti_lettera_3.jpg','maquinasEscribir','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(63,'Canon S80',120.00,'Con pantalla digital y estuche de transporte original. Fabricada en 1989.','./uploads/articlePhotoUploads/electronica/maquinas_escribir/canon_s80.jpg','maquinasEscribir','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(64,'ereader cyberbook',44.00,'En perfecto estado para disfrute completo. Pantalla color.','./uploads/articlePhotoUploads/electronica/libros_electronicos/ereader_cyberbook.jpg','librosElectronicos','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(65,'Sony DD350',55.00,'Averiado. No se enciende.','./uploads/articlePhotoUploads/electronica/libros_electronicos/sony_dd350.jpg','librosElectronicos','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(66,'Sony DD10BZ',35.00,'Se entrega sin batería. Funciona bien.','./uploads/articlePhotoUploads/electronica/libros_electronicos/sony_dd10bz.jpg','librosElectronicos','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(67,'Scart Plane',10.00,'Gran mejora respecto a los SCART estándar. Largo 150cm','./uploads/articlePhotoUploads/electronica/cables/scart_plane.jpg','cables','Ponferrada','leon',6,NULL,'2022-01-06 00:00:00',NULL),(68,'Vga 150cm',4.00,'Funciona perfectamente','./uploads/articlePhotoUploads/electronica/cables/vga_150cm.jpg','cables','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(69,'Rca 10m',9.00,'En buen estado. Apenas usado','./uploads/articlePhotoUploads/electronica/cables/rca_10m.jpg','cables','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(70,'BSO Grease',25.00,'Vinilo en perfecto estado','./uploads/articlePhotoUploads/musica/vinilos/bso_grease.jpg','vinilos','Alcañices','zamora',7,NULL,'2022-01-07 00:00:00',NULL),(71,'Deep Purple Japon',20.00,'Versión Japón. Pequeño rallazo en una cara','./uploads/articlePhotoUploads/musica/vinilos/deep_purple_japon.jpg','vinilos','Guijuelo','salamanca',8,NULL,'2022-01-08 00:00:00',NULL),(72,'Loquillo y Trogloditas-El Rompeolas',28.50,'Procedente de una discoteca. Buen estado','./uploads/articlePhotoUploads/musica/vinilos/loquillo_trogloditas.jpg','vinilos','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(73,'Rafaella Carra. Hay que venir al sur',9.00,'Muy poco uso','./uploads/articlePhotoUploads/musica/cintas/rafaella_carra.jpg','cintas','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(74,'Megadeth. Hanhar 18',10.00,'Casette single. Como nueva','./uploads/articlePhotoUploads/musica/cintas/hangar_18.jpg','cintas','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL),(75,'Mecano. Entre el cielo y el suelo',20.00,'Usada pero en muuy buen estado','./uploads/articlePhotoUploads/musica/cintas/mecano_cielo_suelo.jpg','cintas','Ferrol','coruña',2,NULL,'2022-01-02 00:00:00',NULL),(76,'Grundig GT 1401',60.00,'Totalmente funcionando. 14, Se entrega con mando original','./uploads/articlePhotoUploads/imagen/televisores/grundig_gt_1401.jpg','televisores','Chantada','lugo',3,NULL,'2022-01-03 00:00:00',NULL),(77,'Telefunken 1200 S',99.00,'Funcionando. Le falta la antena telescopica','./uploads/articlePhotoUploads/imagen/televisores/telefunken_1200_s.jpg','televisores','Allariz','ourense',4,NULL,'2022-01-04 00:00:00',NULL),(78,'Hitachi i-89-311',47.00,'Tv portátil años 70. Con cable alimentación original. No funciona.','./uploads/articlePhotoUploads/imagen/televisores/hitachi_i-89_311.jpg','televisores','Gijón','asturias',5,NULL,'2022-01-05 00:00:00',NULL),(85,'Boston DTT-3630',15.00,'Funciona correctamente. No tiene mando a distancia pero funciona con uno universal','./uploads/articlePhotoUploads/electronica/tdt/boston_dtt-3630.jpg','tdt','Las Rozas','madrid',9,NULL,'2022-01-09 00:00:00',NULL),(86,'Axil RT200',35.00,'Combo dvd+tdt con mando a distancia y cable euroconector','./uploads/articlePhotoUploads/electronica/tdt/axil_rt200.jpg','tdt','San Cugat','barcelona',10,NULL,'2022-01-10 00:00:00',NULL),(87,'NPG DTR 126',16.00,'En muy buen estado. Con caja, mando y manuales','./uploads/articlePhotoUploads/electronica/tdt/npg_dtr_126.jpg','tdt','Nigrán','pontevedra',1,NULL,'2022-01-01 00:00:00',NULL);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trading_user`
--

DROP TABLE IF EXISTS `trading_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trading_user` (
  `idArtilce` int NOT NULL,
  `buy` tinyint DEFAULT NULL,
  `sellerId` int NOT NULL,
  `buyerId` int NOT NULL,
  `voted` tinyint(1) DEFAULT '0',
  `saleDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`idArtilce`),
  KEY `sellerId` (`sellerId`),
  KEY `buyerId` (`buyerId`),
  CONSTRAINT `trading_user_ibfk_1` FOREIGN KEY (`idArtilce`) REFERENCES `articles` (`id`),
  CONSTRAINT `trading_user_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`),
  CONSTRAINT `trading_user_ibfk_3` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trading_user`
--

LOCK TABLES `trading_user` WRITE;
/*!40000 ALTER TABLE `trading_user` DISABLE KEYS */;
INSERT INTO `trading_user` VALUES (2,NULL,2,6,0,NULL,'2022-03-07 13:08:37'),(38,NULL,7,6,0,NULL,'2022-03-02 00:31:57'),(47,NULL,9,6,0,NULL,'2022-03-01 21:55:20'),(48,NULL,10,6,0,NULL,'2022-03-04 13:20:51'),(68,NULL,7,6,0,NULL,'2022-03-05 23:38:05'),(69,NULL,8,6,0,NULL,'2022-03-04 00:00:13');
/*!40000 ALTER TABLE `trading_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_votes`
--

DROP TABLE IF EXISTS `user_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vote` tinyint NOT NULL,
  `idVotedUser` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idVotedUser` (`idVotedUser`),
  CONSTRAINT `user_votes_ibfk_1` FOREIGN KEY (`idVotedUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_votes`
--

LOCK TABLES `user_votes` WRITE;
/*!40000 ALTER TABLE `user_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `location` varchar(250) NOT NULL,
  `province` varchar(250) NOT NULL,
  `avatar` varchar(250) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `registrationCode` varchar(100) DEFAULT NULL,
  `recoverCode` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AndrewHebert@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','AndrewHebert','Nigrán','pontevedra','./uploads/userAvatarUploads/AndrewHerbert-avatar.jpg',1,0,NULL,NULL,'2022-01-01 00:00:00',NULL),(2,'IngridScott@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','IngridScott','Ferrol','coruña','./uploads/userAvatarUploads/IngridScott-avatar.jpg',1,0,NULL,NULL,'2022-01-02 00:00:00',NULL),(3,'JackTownsend@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','JackTownsen','Chantada','lugo','./uploads/userAvatarUploads/JackTownsen-avatar.jpg',1,0,NULL,NULL,'2022-01-03 00:00:00',NULL),(4,'LeonardSilva@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','LeonardSilva','Allariz','ourense','./uploads/userAvatarUploads/LeonardSilva-avatar.jpg',1,0,NULL,NULL,'2022-01-04 00:00:00',NULL),(5,'SylvesterRobinson@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','SylvesterRobinson','Gijón','asturias','./uploads/userAvatarUploads/SylvesterRobinson-avatar.jpg',1,0,NULL,NULL,'2022-01-05 00:00:00',NULL),(6,'ScarletTyler@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','ScarletTyler','Ponferrada','leon','./uploads/userAvatarUploads/ScarletTyler-avatar.jpg',1,0,NULL,NULL,'2022-01-06 00:00:00',NULL),(7,'GregoryAllison@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','GregoryAllison','Alcañices','zamora','./uploads/userAvatarUploads/GregoryAllison-avatar.jpg',1,0,NULL,NULL,'2022-01-07 00:00:00',NULL),(8,'CarlaShaffer@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','CarlaShaffer','Guijuelo','salamanca','./uploads/userAvatarUploads/CarlaShaffer-avatar.jpg',1,0,NULL,NULL,'2022-01-08 00:00:00',NULL),(9,'GiselleAlford@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','GiselleAlford','Las Rozas','madrid','./uploads/userAvatarUploads/GiselleAlford-avatar.jpg',1,0,NULL,NULL,'2022-01-09 00:00:00',NULL),(10,'DeborahCantrell@gmail.com','$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS','DeborahCantrell','San Cugat','barcelona','./uploads/userAvatarUploads/DeborahCantrell-avatar.jpg',1,0,NULL,NULL,'2022-01-10 00:00:00',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08  0:15:55
