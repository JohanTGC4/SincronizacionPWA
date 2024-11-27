import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaEstudiante } from "../modelo/validaEstudiante.js"
import { ALMACEN_ESTUDIANTE, Bd } from "./Bd.js"

/**
 * @param {string} id
 */
export async function estudianteBusca(id) {

 return bdConsulta(Bd, [ALMACEN_ESTUDIANTE],
  /**
   * @param {(resultado: import("../modelo/ESTUDIANTE.js").ESTUDIANTE|undefined)
   *                                                            => any} resolve 
   */
  (transaccion, resolve) => {

   /* Pide el primer objeto de ALMACEN_ESTUDIANTE que tenga como llave
    * primaria el valor del parámetro id. */
   const consulta = transaccion.objectStore(ALMACEN_ESTUDIANTE).get(id)

   // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
   consulta.onsuccess = () => {
    /* Se recupera el objeto solicitado usando
     *  consulta.result
     * Si el objeto no se encuentra se recupera undefined. */
    const objeto = consulta.result
    if (objeto !== undefined) {
     const modelo = validaEstudiante(objeto)
     if (modelo.EST_ELIMINADO === 0) {
      resolve(modelo)
      return
     }
    }
    resolve(undefined)

   }

  })

}

exportaAHtml(estudianteBusca)