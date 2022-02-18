CREATE SCHEMA `productos_retro`;
USE productos_retro;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  location varchar(250) NOT NULL,
  province varchar(250) NOT NULL,
  avatar VARCHAR(250),
  active BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  registrationCode VARCHAR(100),
  recoverCode VARCHAR(100),
  createdAt DATETIME NOT NULL,
  modifiedAt DATETIME
);


INSERT INTO users (`email`,`password`,`username`,`avatar`,`createdAt`,`location`, `province`, `active`) VALUES
("AndrewHebert@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","AndrewHebert","./uploads/userAvatarUploads/AndrewHerbert-avatar.jpg","2022/01/01","Pontevedra", "almeria", "1"),
("IngridScott@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","IngridScott","./uploads/userAvatarUploads/IngridScott-avatar.jpg","2022/01/02","Coruña", "barcelona", "1"),
("JackTownsend@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","JackTownsen","./uploads/userAvatarUploads/JackTownsen-avatar.jpg","2022/01/03","Lugo", "madrid", "1"),
("LeonardSilva@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","LeonardSilva","./uploads/userAvatarUploads/LeonardSilva-avatar.jpg","2022/01/04","Ourense", "almeria", "1"),
("SylvesterRobinson@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","SylvesterRobinson","./uploads/userAvatarUploads/SylvesterRobinson-avatar.jpg","2022/01/05","Pontevedra", "sevilla", "1"),
("ScarletTyler@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","ScarletTyler","./uploads/userAvatarUploads/ScarletTyler-avatar.jpg","2022/01/06","Coruña","barcelona", "1"),
("GregoryAllison@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","GregoryAllison","./uploads/userAvatarUploads/GregoryAllison-avatar.jpg","2022/01/07","Lugo", "sevilla", "1"),
("CarlaShaffer@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","CarlaShaffer","./uploads/userAvatarUploads/CarlaShaffer-avatar.jpg","2022/01/08","Ourense", "madrid", "1"),
("GiselleAlford@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","GiselleAlford","./uploads/userAvatarUploads/GiselleAlford-avatar.jpg","2022/01/09","Pontevedra", "pontevedra", "1"),
("DeborahCantrell@gmail.com","$2b$10$SqBYg1EUu5B5lagQ8Sk6p.47HkqR5YqwIW496STymEAGzRSFYrwjS","DeborahCantrell","./uploads/userAvatarUploads/DeborahCantrell-avatar.jpg","2022/01/10","Madrid", "madrid", "1");



CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(60,2) NOT NULL,
  description TEXT,
  photo VARCHAR(250),
  category VARCHAR(200) NOT NULL,
  location VARCHAR(200) NOT NULL,
  province VARCHAR(200) NOT NULL,
  idUser INT NOT NULL,
  FOREIGN KEY (idUser) REFERENCES users(id),
  buyerId INT DEFAULT NULL,
  createdAt DATETIME NOT NULL,
  modifiedAt DATETIME
);

-- consolas
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`,`location`, `province`) VALUES

("Atari 2600",42,"Consola de juegos Atari 2600 en caja. Totalmente probada y funcionando.","./uploads/articlePhotoUploads/gaming/consolas/atari_2600.jpg","consolas",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Atari 7800 pal",129,"Consola Atari 7800 en perfecto estado, con mandos y pantalla","./uploads/articlePhotoUploads/gaming/consolas/atari_7800_pal.jpg","consolas",2,NULL,"2022/01/02", "Coruña", "barcelona"),
("Nintendo NES",40,"Video consola Nintendo NES original años 80. Versión española PAL.","./uploads/articlePhotoUploads/gaming/consolas/nintendo_nes.jpg","consolas",3,NULL,"2022/01/03","Lugo", "madrid");

-- cartuchos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Nintendo NES Trojan",19.95,"Juego 100% original. Buen estado. Carcasa y pegatinas con algunas marcas","./uploads/articlePhotoUploads/gaming/cartuchos_juegos/nintendo_nes_trojan.jpg","cartuchos",4,NULL,"2022/01/04","Ourense", "almeria"),
("Banjo kazooie Nintendo 64",35,"En muy buen estado. La caja no está deteriorada. Con carátula y folleto","./uploads/articlePhotoUploads/gaming/cartuchos_juegos/banjo_kazooie_nin64.jpg","cartuchos",5,NULL,"2022/01/05","Pontevedra", "sevilla"),
("E.T. juego historico Atari 2600",60,"Caja custom. Cartucho y manual originales. Buen estado","./uploads/articlePhotoUploads/gaming/cartuchos_juegos/et_atari_2600.jpg","cartuchos",6,NULL,"2022/01/06","Lugo", "sevilla");

-- vinilos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("BSO Grease",25,"Vinilo en perfecto estado","./uploads/articlePhotoUploads/musica/vinilos/bso_grease.jpg","vinilos",7,NULL,"2022/01/07","Coruña","barcelona"),
("Deep Purple Japon",20,"Versión Japón. Pequeño rallazo en una cara","./uploads/articlePhotoUploads/musica/vinilos/deep_purple_japon.jpg","vinilos",8,NULL,"2022/01/08","Ourense", "madrid"),
("Loquillo y Trogloditas-El Rompeolas",28.50,"Procedente de una discoteca. Buen estado","./uploads/articlePhotoUploads/musica/vinilos/loquillo_trogloditas.jpg","vinilos",9,NULL,"2022/01/09","Pontevedra", "pontevedra");

-- cintas
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Rafaella Carra. Hay que venir al sur",9,"Muy poco uso","./uploads/articlePhotoUploads/musica/cintas/rafaella_carra.jpg","cintas",10,NULL,"2022/01/10","Madrid", "madrid"),
("Megadeth. Hanhar 18",10,"Casette single. Como nueva","./uploads/articlePhotoUploads/musica/cintas/hangar_18.jpg","cintas",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Mecano. Entre el cielo y el suelo",20,"Usada pero en muuy buen estado","./uploads/articlePhotoUploads/musica/cintas/mecano_cielo_suelo.jpg","cintas",2,NULL,"2022/01/02", "Coruña", "barcelona");

-- ordenadores
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("IBM PS2 30 286 8530",250,"Funciona perfectamente. Intel 286 10MHZ. 1024kb RAM. 30mb HDD","./uploads/articlePhotoUploads/informatica/ordenadores/ibm_ps2_30_286_8530.jpg","ordenadores",3, NULL,"2022/01/03","Lugo", "madrid"),
("IBM PS2 70 386",42,"Funciona bien. Es silencioso y no hace ruidos estraños","./uploads/articlePhotoUploads/informatica/ordenadores/ibm_ps2_70_386.jpg","ordenadores",4,NULL,"2022/01/04","Ourense", "almeria"),
("Sinclair ZX Spectrum 128k",120,"Funciona con normalidad. Algún detalle estético exterior. Con alimentador original","./uploads/articlePhotoUploads/informatica/ordenadores/sinclair_zx_spectrum_128k.jpg","ordenadores",5,NULL,"2022/01/05","Pontevedra", "sevilla");

-- teclados
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("SHARP CE-X100KI",20,"Del año 1991. Funciona bien. Teclado inglés","./uploads/articlePhotoUploads/informatica/teclados/sharp_ce-x100ki.jpg","teclados",6,NULL,"2022/01/06","Lugo", "sevilla"),
("IBM Sk-8811",35,"En buen estado de conservación","./uploads/articlePhotoUploads/informatica/teclados/ibm_sk-8811.jpg","teclados",7,NULL,"2022/01/07","Coruña","barcelona"),
("Apple M0110A",55,"Teclado clásico extendido. No se incluye cable","./uploads/articlePhotoUploads/informatica/teclados/apple_m0110a.jpg","teclados",8,NULL,"2022/01/08","Ourense", "madrid");

-- accesorios
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Tarjeta grafica ISA 16bits",15,"Tarjeta de 16bits VGA. Compatible con AMD e Intel","./uploads/articlePhotoUploads/informatica/accesorios/isa_16bits.jpg","accesorios",9,NULL,"2022/01/09","Pontevedra", "pontevedra"),
("Disquetera 3.5 Amstrad",60,"Casi nueva. Interruptor de encendido y selección de cara del diskette","./uploads/articlePhotoUploads/informatica/accesorios/disquetera_amstrad.jpg","accesorios",10,NULL,"2022/01/10","Madrid", "madrid"),
("Tarjeta grafica GeForce 210",15,"Perfecta. Muy poco uso. Caja y disco de instalacion original","./uploads/articlePhotoUploads/informatica/accesorios/geforce_210.jpg","accesorios",1,NULL,"2022/01/01", "Pontevedra", "almeria");

-- monitores
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("NEC Multisync V250",40,"Funciona perfectamente. Monitor de 15pulgadas","./uploads/articlePhotoUploads/informatica/monitores/nec_multisync_v520.jpg","monitores",2,NULL,"2022/01/02", "Coruña", "barcelona"),
("Philips 107 T5",50,"Monitor de 17 pulgadas. Funciona perfectamente. Con cable de alimentacion","./uploads/articlePhotoUploads/informatica/monitores/philips_107_t5.jpg","monitores",3,NULL,"2022/01/03","Lugo", "madrid"),
("Samsung SyncMaster 753S",44,"Monitor de 17 pulgadas. Funcionando","./uploads/articlePhotoUploads/informatica/monitores/samsung_syncmaster_753s.jpg","monitores",4,NULL,"2022/01/04","Ourense", "almeria");

-- camaraFotos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Cámara compacta Petri Color 35",40,"cámara compacta analógica para fotografía sin estabilizador","./uploads/articlePhotoUploads/imagen/camara_fotos/petri_color_35.jpg","camaraFotos",7,NULL,"2022/01/07","Coruña","barcelona"),
("Bencini comet S",80,"cámara vintage en excelente condición con algún roce en el alumninio","./uploads/articlePhotoUploads/imagen/camara_fotos/bencini_comet_s.jpg","camaraFotos",8,NULL,"2022/01/08","Ourense", "madrid"),
("Canon Canonet QL25",35,"Cámara telemétrica con obturador de 45mm f/2.5","./uploads/articlePhotoUploads/imagen/camara_fotos/canon_canonet_ql25.jpg","camaraFotos",9,NULL,"2022/01/09","Pontevedra", "pontevedra");

-- camaraVideo
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Canon miniDV MV850i",60,"Funciona perfectamente tanto a batería como conectada. Cable alimentación original.","./uploads/articlePhotoUploads/imagen/camara_video/canon_minidv_mv850i.jpg","camaraVideo",10,NULL,"2022/01/10","Madrid", "madrid"),
("Cámara video 8 Handycam",37,"testada. Con accesorios y bolsa original. Sin manual de instrucciones","./uploads/articlePhotoUploads/imagen/camara_video/camara_video_8_handycam.jpg","camaraVideo",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Canon UC8000 8mm",72,"Funciona perfectamente. Sirve para grabar tus videos caseros","./uploads/articlePhotoUploads/imagen/camara_video/canon_uc8000_8mm.jpg","camaraVideo",2,NULL,"2022/01/02", "Coruña", "barcelona");

-- televisores
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Grundig GT 1401",60,"Totalmente funcionando. Se entrega con mando original","./uploads/articlePhotoUploads/imagen/televisores/grundig_gt_1401.jpg","televisores",3,NULL,"2022/01/03","Lugo", "madrid"),
("Telefunken 1200 S",99,"Funcionando. Le falta la antena telescopica","./uploads/articlePhotoUploads/imagen/televisores/telefunken_1200_s.jpg","televisores",4,NULL,"2022/01/04","Ourense", "almeria"),
("Hitachi i-89-311",47,"Tv portátil años 70. Con cable alimentación original. No funciona.","./uploads/articlePhotoUploads/imagen/televisores/hitachi_i-89_311.jpg","televisores",5,NULL,"2022/01/05","Pontevedra", "sevilla");

-- tocadiscos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Philips Estereo 400",70,"Antiguo tocadiscos Philips Stereo modelo 400 totalmente funcional.","./uploads/articlePhotoUploads/audio/tocadiscos/philips_400.jpg","tocadiscos",4,NULL,"2022/01/04","Ourense", "almeria"),
("Telefunken Musikus 105V",80,"Antiguo tocadiscos gramófono Musikus 105v. Funciona.","./uploads/articlePhotoUploads/audio/tocadiscos/telefunken_musikus_105v.jpg","tocadiscos",5,NULL,"2022/01/05","Pontevedra", "sevilla"),
("Teppaz BI BALAD",99,"Antiguo tocadiscos portátil de 1967. Funciona. Excelente estado.","./uploads/articlePhotoUploads/audio/tocadiscos/teppaz_bi_balad.jpg","tocadiscos",6,NULL,"2022/01/06","Lugo", "sevilla");

-- radios
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Roberts R25",42,"En buenas condiciones. Trabajando, con algunas crepitaciones","./uploads/articlePhotoUploads/audio/radios/roberts_r25.jpg","radios",6,NULL,"2022/01/06","Lugo", "sevilla"),
("Bush TR82",20,"En buen funcionamiento y condición. Anchos de banda FM/MW/LW.","./uploads/articlePhotoUploads/audio/radios/bush_tr82.jpg","radios",7,NULL,"2022/01/07","Coruña","barcelona"),
("MontBlanc MG500",190,"6 altavoces. Funcionando todo. Poco desgaste superficial.","./uploads/articlePhotoUploads/audio/radios/montblanc_mg500.jpg","radios",8,NULL,"2022/01/08","Ourense", "madrid");

-- walkman
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Sony WM22",110,"En perfecto estado.Se incluyen cascos.","./uploads/articlePhotoUploads/audio/walkman/sony_wm22.jpg","walkman",9,NULL,"2022/01/09","Pontevedra", "pontevedra"),
("Sony WM-EX910",60,"Extremadamente raro. Incluye cascos. Buena calidad de sonido.","./uploads/articlePhotoUploads/audio/walkman/sony_wm-ex910.jpg","walkman",9,NULL,"2022/01/09","Pontevedra", "pontevedra"),
("Aiwa HS-TX446",60,"Incluye caja y clip para el cinturón. Sin desperfectos.","./uploads/articlePhotoUploads/audio/walkman/aiwa_hs-tx446.jpg","walkman",10,NULL,"2022/01/10","Madrid", "madrid");

-- altavoces
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Heco Hi-Fi flatbox LB5",80,"Par original de altavoces con 2 vías.","./uploads/articlePhotoUploads/audio/altavoces/heco_hi-fi_flatbox_lb5.jpg","altavoces",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Geloso 3093-N",20,"Altavoz de los años 50. Caja abierta, pero el altavoz es nuevo.","./uploads/articlePhotoUploads/audio/altavoces/geloso_3093-n.jpg","altavoces",2,NULL,"2022/01/02", "Coruña", "barcelona"),
("Philips baquelita 1932",250,"Antiguo altavoz de baquelita con imitación carey fabricado en los 30.","./uploads/articlePhotoUploads/audio/altavoces/philips_baquelita_1932.jpg","altavoces",3,NULL,"2022/01/3","Lugo", "madrid");

-- mp3
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Aplle Ipod Shuffle 3",5,"Bastante rallado. Tiene cable usb original","./uploads/articlePhotoUploads/audio/mp3/ipod_shuffle_3.jpg","mp3",8,NULL,"2022/01/08","Ourense", "madrid"),
("Apple Ipod Shuffle 2",21,"Muy buen estado. Capacidad 1Gb. Con cargador original","./uploads/articlePhotoUploads/audio/mp3/ipod_shuffle_2.jpg","mp3",9,NULL,"2022/01/09","Pontevedra", "pontevedra"),
("Victure M3",10,"Buen estado. Funciona perfectamente. Se vende el reproductor y cable usb-A","./uploads/articlePhotoUploads/audio/mp3/victure_m3.jpg","mp3",10,NULL,"2022/01/10","Madrid", "madrid");

-- moviles
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Móvil Ericsson A1018S",20,"Antiguo teléfono móvil vintage Ericsson A1018S + SIM","./uploads/articlePhotoUploads/telefonos/moviles/ericsson_a1018s.jpg","moviles",4,NULL,"2022/01/04","Ourense", "almeria"),
("iPhone PRIMERA GENERACIÓN",2050,"El primer iPhone 8gb 2G IOS3 de 2007. Excelente estado. Caja+Accesocios+Manuales.Funciona.","./uploads/articlePhotoUploads/telefonos/moviles/iphone_1stgeneration.jpg","moviles",5,NULL,"2022/01/05","Pontevedra", "sevilla"),
("Nokia 5110",45,"El Nokia irrompible. Nokia 5110. Usado - funcionando.","./uploads/articlePhotoUploads/telefonos/moviles/nokia_5110.jpg","moviles",6,NULL,"2022/01/06","Lugo", "sevilla");

-- fijos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Teléfono fijo Alcatel botones",16,"Teléfono Alcatel Teide Vintage blanco. Años 80-90. Funciona.","./uploads/articlePhotoUploads/telefonos/fijos/alcatel_teide.jpg","fijos",6,NULL,"2022/01/06","Lugo", "sevilla"),
("Teléfono de disco rojo",50,"Teléfono vintaje rojo, de disco. Totalmente original,de serie. Funciona","./uploads/articlePhotoUploads/telefonos/fijos/disco_rojo.jpg","fijos",7,NULL,"2022/01/07","Coruña","barcelona"),
("Teléfono góndola rojo",25,"Teléfonos góndola. Rojos. Funcionan. Uno por 25€, dos por 45 €.","./uploads/articlePhotoUploads/telefonos/fijos/gondola_rojo.jpg","fijos",8,NULL,"2022/01/08","Ourense", "madrid");

-- despertadores
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Despertador viaje Kienzle",28,"Made in Germany. Buen estado","./uploads/articlePhotoUploads/electronica/despertadores/despertador_viaje_kienzle.jpg","despertadores",4,NULL,"2022/01/04","Ourense", "almeria"),
("Despertador Peter",25,"El reloj está perfectamente conservado. Fabricado en Alemania","./uploads/articlePhotoUploads/electronica/despertadores/despertador_peter.jpg","despertadores",5,NULL,"2022/01/05","Pontevedra", "sevilla"),
("Despertador Radiant",20,"Precioso reloj Radiant muy antigüo. La alarma funciona. La hora no.","./uploads/articlePhotoUploads/electronica/despertadores/despertador_radiant.jpg","despertadores",6,NULL,"2022/01/06","Lugo", "sevilla");

-- gps
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Tomtom Go 4",20,"Funciona perfectamente. Le falta la ventosa.","./uploads/articlePhotoUploads/electronica/gps/tomtom_go_4.jpg","gps",7,NULL,"2022/01/07","Coruña","barcelona"),
("Garmin Nuvi 40",35,"Se entrega con soporte ventosa, cargador mechero y tarjeta MicroSD con mapas.","./uploads/articlePhotoUploads/electronica/gps/garmin_nuvi_40.jpg","gps",8,NULL,"2022/01/08","Ourense", "madrid"),
("Tomtom Start 2",26,"Funciona perfecto y lleva instalado mapa de Iberia actual.","./uploads/articlePhotoUploads/electronica/gps/tomtom_start_2.png","gps",9,NULL,"2022/01/09","Pontevedra", "pontevedra");

-- maquinasEscribir
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Casio casiowrite CW-17",20,"Máquina de escribir eléctrica. Buen estado exterior. No está probada.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/casio_casiowriter_cw17.jpg","maquinasEscribir",10,NULL,"2022/01/10","Madrid", "madrid"),
("Olivetti Lettera 3",49,"Bonita máquina de escribir super retro.Necesita reparación.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/olivetti_lettera_3.jpg","maquinasEscribir",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Canon S80",120,"Con pantalla digital y estuche de transporte original. Fabricada en 1989.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/canon_s80.jpg","maquinasEscribir",2,NULL,"2022/01/02", "Coruña", "barcelona");

-- librosElectronicos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("ereader cyberbook",44,"En perfecto estado para disfrute completo. Pantalla color.","./uploads/articlePhotoUploads/electronica/libros_electronicos/ereader_cyberbook.jpg","librosElectronicos",3,NULL,"2022/01/03","Lugo", "madrid"),
("Sony DD350",55,"Averiado. No se enciende.","sony_dd350.jpg","./uploads/articlePhotoUploads/electronica/libros_electronicos/librosElectronicos/sony_dd350.jpg",4,NULL,"2022/01/04","Ourense", "almeria"),
("Sony DD10BZ",35,"Se entrega sin batería. Funciona bien.","./uploads/articlePhotoUploads/electronica/libros_electronicos/sony_dd10bz.jpg","librosElectronicos",5,NULL,"2022/01/05","Pontevedra", "sevilla");

-- cables
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Scart Plane",10,"Gran mejora respecto a los SCART estándar. Largo 150cm","./uploads/articlePhotoUploads/electronica/cables/scart_plane.jpg","cables",6,NULL,"2022/01/06","Lugo", "sevilla"),
("Vga 150cm",4,"Funciona perfectamente","./uploads/articlePhotoUploads/electronica/cables/vga_150cm.jpg","cables",7,NULL,"2022/01/07","Coruña","barcelona"),
("Rca 10m",9,"En buen estado. Apenas usado","./uploads/articlePhotoUploads/electronica/cables/rca_10m.jpg","cables",8,NULL,"2022/01/08","Ourense", "madrid");

-- vinilos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("BSO Grease",25,"Vinilo en perfecto estado","./uploads/articlePhotoUploads/musica/vinilos/bso_grease.jpg","vinilos",7,NULL,"2022/01/07","Coruña","barcelona"),
("Deep Purple Japon",20,"Versión Japón. Pequeño rallazo en una cara","./uploads/articlePhotoUploads/musica/vinilos/deep_purple_japon.jpg","vinilos",8,NULL,"2022/01/08","Ourense", "madrid"),
("Loquillo y Trogloditas-El Rompeolas",28.50,"Procedente de una discoteca. Buen estado","./uploads/articlePhotoUploads/musica/vinilos/loquillo_trogloditas.jpg","vinilos",9,NULL,"2022/01/09","Pontevedra", "pontevedra");

-- cintas
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Rafaella Carra. Hay que venir al sur",9,"Muy poco uso","./uploads/articlePhotoUploads/musica/cintas/rafaella_carra.jpg","cintas",10,NULL,"2022/01/10","Madrid", "madrid"),
("Megadeth. Hanhar 18",10,"Casette single. Como nueva","./uploads/articlePhotoUploads/musica/cintas/hangar_18.jpg","cintas",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Mecano. Entre el cielo y el suelo",20,"Usada pero en muuy buen estado","./uploads/articlePhotoUploads/musica/cintas/mecano_cielo_suelo.jpg","cintas",2,NULL,"2022/01/02", "Coruña", "barcelona");

-- televisores
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Grundig GT 1401",60,"Totalmente funcionando. 14, Se entrega con mando original","./uploads/articlePhotoUploads/imagen/televisores/grundig_gt_1401.jpg","televisores",3,NULL,"2022/01/03","Lugo", "madrid"),
("Telefunken 1200 S",99,"Funcionando. Le falta la antena telescopica","./uploads/articlePhotoUploads/imagen/televisores/telefunken_1200_s.jpg","televisores",4,NULL,"2022/01/04","Ourense", "almeria"),
("Hitachi i-89-311",47,"Tv portátil años 70. Con cable alimentación original. No funciona.","./uploads/articlePhotoUploads/imagen/televisores/hitachi_i-89_311.jpg","televisores",5,NULL,"2022/01/05","Pontevedra", "sevilla");

-- maquinasEscribir
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Casio casiowrite CW-17",20,"Máquina de escribir eléctrica. Buen estado exterior. No está probada.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/casio_casiowriter_cw17.jpg","maquinasEscribir",10,NULL,"2022/01/10","Madrid", "madrid"),
("Olivetti Lettera 3",49,"Bonita máquina de escribir super retro.Necesita reparación.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/olivetti_lettera_3.jpg","maquinasEscribir",1,NULL,"2022/01/01", "Pontevedra", "almeria"),
("Canon S80",120,"Con pantalla digita/librosElectronicosl y estuche de transporte original. Fabricada en 1989.","./uploads/articlePhotoUploads/electronica/maquinas_escribir/canon_s80.jpg","maquinasEscribir",2,NULL,"2022/01/02", "Coruña", "barcelona");

-- librosElectronicos
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("ereader cyberbook",44,"En perfecto estado para disfrute completo. Pantalla color.","./uploads/articlePhotoUploads/electronica/libros_electronicos/ereader_cyberbook.jpg","librosElectronicos",3,NULL,"2022/01/03","Lugo", "madrid"),
("Sony DD350",55,"Averiado. No se enciende.","./uploads/articlePhotoUploads/electronica/libros_electronicos/sony_dd350.jpg","librosElectronicos",4,NULL,"2022/01/04","Ourense", "almeria"),
("Sony DD10BZ",35,"Se entrega sin batería. Funciona bien.","./uploads/articlePhotoUploads/electronica/libros_electronicos/sony_dd10bz.jpg","librosElectronicos",5,NULL,"2022/01/05","Pontevedra", "sevilla");

-- tdt
INSERT INTO articles (`name`,`price`,`description`,`photo`,`category`,`idUser`,`buyerId`,`createdAt`, `location`, `province`) VALUES

("Boston DTT-3630",15,"Funciona correctamente. No tiene mando a distancia pero funciona con uno universal","./uploads/articlePhotoUploads/electronica/tdt/boston_dtt-3630.jpg","tdt",9,NULL,"2022/01/09","Pontevedra", "pontevedra"),
("Axil RT200",35,"Combo dvd+tdt con mando a distancia y cable euroconector","./uploads/articlePhotoUploads/electronica/tdt/axil_rt200.jpg","tdt",10,NULL,"2022/01/10","Madrid", "madrid"),
("NPG DTR 126",16,"En muy buen estado. Con caja, mando y manuales","./uploads/articlePhotoUploads/electronica/tdt/npg_dtr_126.jpg","tdt",1,NULL,"2022/01/01", "Pontevedra", "almeria");



CREATE TABLE user_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vote TINYINT NOT NULL,
  idVotedUser INT NOT NULL,
  FOREIGN KEY (idVotedUser) REFERENCES users(id) ON DELETE CASCADE,
  createdAt DATETIME NOT NULL
);

CREATE TABLE trading_user (
  idArtilce INT PRIMARY KEY,
  FOREIGN KEY (idArtilce) REFERENCES articles(id),
  buy TINYINT DEFAULT NULL,
  sellerId INT NOT NULL,
  FOREIGN KEY (sellerId) REFERENCES users(id),
  buyerId INT NOT NULL,
  FOREIGN KEY (buyerId) REFERENCES users(id),articles
  saleDate DATETIME DEFAULT NULL,
  createdAt DATETIME NOT NULL
);
