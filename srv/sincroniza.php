<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_ESTUDIANTE.php";
require_once __DIR__ . "/modelo/validaeEstudiante.php";
require_once __DIR__ . "/bd/estudianteAgrega.php";
require_once __DIR__ . "/bd/estudianteBusca.php";
require_once __DIR__ . "/bd/estudianteConsultaNoEliminados.php";
require_once __DIR__ . "/bd/estudianteModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaeEstudiante($modelo);
  $modeloEnElServidor = estudianteBusca($modeloEnElCliente[EST_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[EST_ELIMINADO] === 0) {
    estudianteAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[EST_ELIMINADO] === 0
   && $modeloEnElCliente[EST_ELIMINADO] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
    estudianteModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[EST_ELIMINADO] === 0
   && $modeloEnElServidor[EST_ELIMINADO] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[EST_MODIFICACION] >
    $modeloEnElServidor[EST_MODIFICACION]
   ) {
    // La versión del cliente es más nueva y prevalece.
    estudianteModifica($modeloEnElCliente);
   }
  }
 }

 $lista = estudianteConsultaNoEliminados();

 devuelveJson($lista);
});
