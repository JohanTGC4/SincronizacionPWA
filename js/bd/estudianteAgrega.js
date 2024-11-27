import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_ESTUDIANTE, Bd } from "./Bd.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { validaDeporte } from "../modelo/validaNombre.js"
import { validaColor } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/ESTUDIANTE.js").ESTUDIANTE} modelo
 */
export async function estudianteAgrega(modelo) {
 validaNombre(modelo.EST_NOMBRE)
 validaDeporte(modelo.EST_DEPORTE)
 validaColor(modelo.EST_COLOR)
 modelo.EST_MODIFICACION = Date.now()
 modelo.EST_ELIMINADO = 0
 // Genera id único en internet.
 modelo.EST_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_ESTUDIANTE], transaccion => {
  const almacenEstudiante = transaccion.objectStore(ALMACEN_ESTUDIANTE)
  almacenEstudiante.add(modelo)
 })
}

exportaAHtml(estudianteAgrega)