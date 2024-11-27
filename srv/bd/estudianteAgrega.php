<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_ESTUDIANTE.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PAS_ID: string,
 *   PAS_NOMBRE: string,
 *   PAS_MODIFICACION: int,
 *   PAS_ELIMINADO: int
 *  } $modelo
 */
function estudianteAgrega(array $modelo)
{
 validaId($modelo[EST_ID]);
 validaNombre($modelo[EST_NOMBRE]);
 insert(pdo: Bd::pdo(), into: ESTUDIANTE, values: $modelo);
}
