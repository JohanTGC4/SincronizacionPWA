import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaEstudiante } from "../modelo/validaEstudiante.js"
import { ALMACEN_ESTUDIANTE, Bd, INDICE_NOMBRE } from "./Bd.js"

export async function estudianteConsultaNoEliminados() {

 return bdConsulta(Bd, [ALMACEN_ESTUDIANTE],
  /**
   * @param {(resultado: import("../modelo/ESTUDIANTE.js").ESTUDIANTE[])=>void
   *                                                                  } resolve
   */
  (transaccion, resolve) => {

   const resultado = []

   const almacenEstudiante = transaccion.objectStore(ALMACEN_ESTUDIANTE)

   // Usa el índice INDICE_NOMBRE para recuperar los datos ordenados.
   const indiceNombre = almacenEstudiante.index(INDICE_NOMBRE)

   // Pide un cursor para recorrer cada objeto que devuelve la consulta.
   const consulta = indiceNombre.openCursor()

   /* onsuccess se invoca por cada uno de los objetos de la consulta y una vez
    * cuando se acaban dichos objetos. */
   consulta.onsuccess = () => {
    /* El cursor correspondiente al objeto se recupera usando
     *  consulta.result */
    const cursor = consulta.result
    if (cursor === null) {
     /* Si el cursor vale null, ya no hay más objetos que procesar; por lo
      * mismo, se devuelve el resultado con los pasatiempos recuperados, usando
      *  resolve(resultado). */
     resolve(resultado)
    } else {
     /* Si el cursor no vale null y hay más objetos, el siguiente se obtiene con
      *  cursor.value */
     const modelo = validaEstudiante(cursor.value)
     if (modelo.EST_ELIMINADO === 0) {
      resultado.push(modelo)
     }
     /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
      * vez que se invoque la función onsuccess. */
     cursor.continue()
    }
   }

  })

}

exportaAHtml(estudianteConsultaNoEliminados)