import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { validaDeporte } from "../modelo/validaNombre.js"
import { validaColor } from "../modelo/validaNombre.js"
import { ALMACEN_ESTUDIANTE, Bd } from "./Bd.js"
import { estudianteBusca } from "./estudianteBusca.js"

/**
 * @param { import("../modelo/ESTUDIANTE.js").ESTUDIANTE } modelo
 */
export async function estudianteModifica(modelo) {
 validaNombre(modelo.EST_NOMBRE)
 validaDeporte(modelo.EST_DEPORTE)
 validaColor(modelo.EST_COLOR)
 if (modelo.EST_ID === undefined)
  throw new Error(`Falta EST_ID de ${modelo.EST_NOMBRE}.`)
 validaId(modelo.EST_ID)
 const anterior = await estudianteBusca(modelo.EST_ID)
 if (anterior !== undefined) {
  modelo.EST_MODIFICACION = Date.now()
  modelo.EST_ELIMINADO = 0
  return bdEjecuta(Bd, [ALMACEN_ESTUDIANTE], transaccion => {
   const almacenEstudiante = transaccion.objectStore(ALMACEN_ESTUDIANTE)
   almacenEstudiante.put(modelo)
  })
 }
}

exportaAHtml(estudianteModifica)