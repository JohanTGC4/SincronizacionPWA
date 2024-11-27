import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { estudianteConsultaTodos } from "./bd/estudianteConsultaTodos.js"
import { estudiantesReemplaza } from "./bd/estudiantesReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaEstudiantes } from "./modelo/validaEstudiantes.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await estudianteConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const estudiantes = validaEstudiantes(respuesta.body)
   await estudiantesReemplaza(estudiantes)
   renderiza(lista, estudiantes)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)

}

exportaAHtml(sincroniza)