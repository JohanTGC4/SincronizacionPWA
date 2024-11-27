import { validaEstudiante } from "./validaEstudiante.js"

/**
 * @param { any } objetos
 * @returns {import("./ESTUDIANTE.js").ESTUDIANTE[]}
 */
export function validaEstudiantes(objetos) {
 if (!Array.isArray(objetos))
  throw new Error("no se recibió un arreglo.")
 /**
  * @type {import("./ESTUDIANTE.js").ESTUDIANTE[]}
  */
 const arreglo = []
 for (const objeto of objetos) {
  arreglo.push(validaEstudiante(objeto))
 }
 return arreglo
}