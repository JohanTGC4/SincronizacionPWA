export const ALMACEN_ESTUDIANTE = "ESTUDIANTE"
export const EST_ID = "EST_ID"
export const INDICE_NOMBRE = "INDICE_NOMBRE"
export const EST_NOMBRE = "EST_NOMBRE"
export const EST_DEPORTE = "EST_DEPORTE"
export const EST_COLOR = "EST_COLOR"
const BD_NOMBRE = "sincronizacion"
const BD_VERSION = 1

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

 /* Se solicita abrir la base de datos, indicando nombre y
  * número de versión. */
 const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION)

 // Si se presenta un error, rechaza la promesa.
 solicitud.onerror = () => reject(solicitud.error)

 // Si se abre con éxito, devuelve una conexión a la base de datos.
 solicitud.onsuccess = () => resolve(solicitud.result)

 // Si es necesario, se inicia una transacción para cambio de versión.
 solicitud.onupgradeneeded = () => {

  const bd = solicitud.result

  // Como hay cambio de versión, borra el almacén si es que existe.
  if (bd.objectStoreNames.contains(ALMACEN_ESTUDIANTE)) {
   bd.deleteObjectStore(ALMACEN_ESTUDIANTE)
  }

  // Crea el almacén "ESTUDIANTE" con el campo llave "EST_ID".
  const almacenEstudiante =
   bd.createObjectStore(ALMACEN_ESTUDIANTE, { keyPath: EST_ID })

  // Crea un índice ordenado por el campo "EST_NOMBRE" que no acepta duplicados.
  almacenEstudiante.createIndex(INDICE_NOMBRE, "EST_NOMBRE")
 }

})