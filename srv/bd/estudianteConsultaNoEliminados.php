<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_ESTUDIANTE.php";

/**
 * @return array{
 *   PAS_ID: string,
 *   PAS_NOMBRE: string,
 *   PAS_MODIFICACION: int,
 *   PAS_ELIMINADO: int
 *  }[]
 */
function estudianteConsultaNoEliminados()
{
 return select(
  pdo: Bd::pdo(),
  from: ESTUDIANTE,
  where: [EST_ELIMINADO => 0],
  orderBy: EST_NOMBRE
 );
}
