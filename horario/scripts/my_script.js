document.addEventListener("DOMContentLoaded", function () {
  // Mapeo de días de la semana a índices de columna (Lunes=1, Martes=2, etc.)
  const diasSemana = {
    1: 1, // Lunes
    2: 2, // Martes
    3: 3, // Miércoles
    4: 4, // Jueves
    5: 5, // Viernes
  };

  // Función para convertir hora en formato HH:MM a minutos desde medianoche
  function horaAMinutos(horaStr) {
    const [horas, minutos] = horaStr.split(":").map(Number);
    return horas * 60 + minutos;
  }

  // Función para verificar si la hora actual está dentro de un rango
  function estaEnRango(horaActual, inicioStr, finStr) {
    const inicio = horaAMinutos(inicioStr);
    const fin = horaAMinutos(finStr);
    return horaActual >= inicio && horaActual < fin;
  }

  // Función para resaltar el bloque actual
  function resaltarBloqueActual() {
    // Remover resaltado anterior
    const celdasResaltadas = document.querySelectorAll(".bloque-actual");
    celdasResaltadas.forEach((celda) => {
      celda.classList.remove("bloque-actual");
    });

    const ahora = new Date();
    const dia = ahora.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaActual = horas * 60 + minutos;

    // Solo resaltar si es día laboral (Lunes a Viernes)
    if (dia >= 1 && dia <= 5) {
      const columna = diasSemana[dia];

      // Obtener todas las filas de la tabla
      const filas = document.querySelectorAll("#horario tbody tr");

      // Buscar en qué bloque estamos según la hora
      for (let i = 0; i < filas.length; i++) {
        const celdaHora = filas[i].cells[0];
        const textoHora = celdaHora.textContent.trim();

        // Verificar si es una celda que contiene un rango de horas
        if (textoHora.includes(" - ") && !textoHora.includes("Descanso")) {
          const [inicio, fin] = textoHora.split(" - ");

          if (estaEnRango(horaActual, inicio, fin)) {
            // Resaltar la celda correspondiente al día y hora actuales
            const celdaActual = filas[i].cells[columna];
            if (celdaActual) {
              celdaActual.classList.add("bloque-actual");
            }
            break; // Solo puede estar en un bloque a la vez
          }
        }
      }
    }
  }

  // Ejecutar al cargar la página
  resaltarBloqueActual();

  // Actualizar cada minuto para detectar cambios de hora
  setInterval(resaltarBloqueActual, 60000);
});
