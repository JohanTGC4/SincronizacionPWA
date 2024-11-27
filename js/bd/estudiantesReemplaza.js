import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_ESTUDIANTE, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén PASATIEMPO y guarda nuevospasatiempos.
 * @param {import("../modelo/ESTUDIANTE.js").ESTUDIANTE[]} nuevosestudiantes
 */
export async function estudiantesReemplaza(nuevosestudiantes) {
 return bdEjecuta(Bd, [ALMACEN_ESTUDIANTE], transaccion => {
  const almacenEstudiante = transaccion.objectStore(ALMACEN_ESTUDIANTE)
  almacenEstudiante.clear()
  for (const objeto of nuevosestudiantes) {
   almacenEstudiante.add(objeto)
  }
 })
}