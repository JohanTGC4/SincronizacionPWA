import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_ESTUDIANTE, Bd } from "./Bd.js"
import { estudianteBusca } from "./estudianteBusca.js"

/**
 * @param { string } id
 */
export async function estudianteElimina(id) {
 const modelo = await estudianteBusca(id)
 if (modelo !== undefined) {
  modelo.EST_MODIFICACION = Date.now()
  modelo.EST_ELIMINADO = 1
  return bdEjecuta(Bd, [ALMACEN_ESTUDIANTE], transaccion => {
   const almacenEstudiante = transaccion.objectStore(ALMACEN_ESTUDIANTE)
   almacenEstudiante.put(modelo)
  })
 }
}

exportaAHtml(estudianteElimina)