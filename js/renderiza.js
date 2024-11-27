import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/ESTUDIANTE.js").ESTUDIANTE[]} estudiantes
 */
export function renderiza(lista, estudiantes) {
 let render = ""
 for (const modelo of estudiantes) {
  if (modelo.EST_ID === undefined)
   throw new Error(`Falta PAS_ID de ${modelo.EST_NOMBRE}.`)
  const nombre = htmlentities(modelo.EST_NOMBRE)
  const deporte = htmlentities(modelo.EST_DEPORTE)
  const color = htmlentities(modelo.EST_COLOR)
  const searchParams = new URLSearchParams([["id", modelo.EST_ID]])
  const params = htmlentities(searchParams.toString())
  render += /* html */
   `<li class='md-two-line'>
     <a href="modifica.html?${params}">Nombre: ${nombre}
      <span class='headline'>
      </span>
      <span class='supporting'>
       Deporte: ${deporte}, Color: ${color}
      </a>
    </li>`
 }
 lista.innerHTML = render
}

exportaAHtml(renderiza)