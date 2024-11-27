<?php

class Bd
{

 private static ?PDO $pdo = null;

 static function pdo(): PDO
 {
  if (self::$pdo === null) {
    self::$pdo = new PDO(
     // cadena de conexión
    "mysql:host=localhost;dbname=u824022520_sincronizacion;charset=utf8mb4",
     // usuario
     'u824022520_root',
     // contraseña
     'fV7#B3jFF3UA',
    // Opciones: pdos no persistentes y lanza excepciones.
    [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
   );

   self::$pdo->exec(
    'CREATE TABLE IF NOT EXISTS ESTUDIANTE (
        EST_ID VARCHAR(255) NOT NULL,
        EST_NOMBRE TEXT NOT NULL,
        EST_DEPORTE TEXT NOT NULL,
        EST_COLOR TEXT NOT NULL,
        EST_MODIFICACION INTEGER NOT NULL,
        EST_ELIMINADO INTEGER NOT NULL,
        CONSTRAINT EST_PK PRIMARY KEY(EST_ID),
        CONSTRAINT EST_ID_NV CHECK(LENGTH(EST_ID) > 0),
        CONSTRAINT EST_NOM_NV CHECK(LENGTH(EST_NOMBRE) > 0)
    )'
);
  }

  return self::$pdo;
 }
}
