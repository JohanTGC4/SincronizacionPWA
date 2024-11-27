<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/update.php";
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
function estudianteModifica(array $modelo)
{
 validaId($modelo[EST_ID]);
 validaNombre($modelo[EST_NOMBRE]);
 update(
  pdo: Bd::pdo(),
  table: ESTUDIANTE,
  set: $modelo,
  where: [EST_ID => $modelo[EST_ID]]
 );
}
