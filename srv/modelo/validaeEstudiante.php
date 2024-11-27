<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_ESTUDIANTE.php";

function validaeEstudiante($objeto)
{

 $objeto = validaJson($objeto);

 if (!isset($objeto->EST_ID) || !is_string($objeto->EST_ID))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El id debe ser texto.",
   type: "/error/idincorrecto.html",
  );

 if (!isset($objeto->EST_NOMBRE) || !is_string($objeto->EST_NOMBRE))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El nombre debe ser texto.",
   type: "/error/nombreincorrecto.html",
  );
  if (!isset($objeto->EST_DEPORTE) || !is_string($objeto->EST_DEPORTE))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El nombre debe ser texto.",
   type: "/error/nombreincorrecto.html",
  );
  if (!isset($objeto->EST_COLOR) || !is_string($objeto->EST_COLOR))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El nombre debe ser texto.",
   type: "/error/nombreincorrecto.html",
  );

 if (!isset($objeto->EST_MODIFICACION)  || !is_int($objeto->EST_MODIFICACION))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "La modificacion debe ser número.",
   type: "/error/modificacionincorrecta.html",
  );

  if (!isset($objeto->EST_ELIMINADO) || !is_int($objeto->EST_ELIMINADO))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El campo eliminado debe ser entero.",
   type: "/error/eliminadoincorrecto.html",
  );

 return [
    EST_ID => $objeto->EST_ID,
    EST_NOMBRE => $objeto->EST_NOMBRE,
    EST_DEPORTE => $objeto->EST_DEPORTE,
    EST_COLOR => $objeto->EST_COLOR,
    EST_MODIFICACION => $objeto->EST_MODIFICACION,
    EST_ELIMINADO => $objeto->EST_ELIMINADO
 ];
}
