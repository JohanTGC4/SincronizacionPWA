/**
 * @param { any } objeto
 * @returns {import("./ESTUDIANTE.js").ESTUDIANTE}
 */
export function validaEstudiante(objeto) {

 if (typeof objeto.EST_ID !== "string")
  throw new Error("El id debe ser texto.")

 if (typeof objeto.EST_NOMBRE !== "string")
  throw new Error("El nombre debe ser texto.")
 if (typeof objeto.EST_DEPORTE !== "string")
    throw new Error("El deporte debe ser texto.")
 if (typeof objeto.EST_COLOR !== "string")
    throw new Error("El color debe ser texto.")

 if (typeof objeto.EST_MODIFICACION !== "number")
  throw new Error("El campo modificacion debe ser número.")

 if (typeof objeto.EST_ELIMINADO !== "number")
  throw new Error("El campo eliminado debe ser número.")

 return objeto

}