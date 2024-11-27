/**
 * @param {string} nombre
 */
export function validaNombre(nombre) {
 if (nombre === "")
  throw new Error("Falta el nombre.")
}

export function validaDeporte(deporte) {
  if (deporte === "")
   throw new Error("Falta el nombre.")
 }

 export function validaColor(color) {
  if (color === "")
   throw new Error("Falta el nombre.")
 }