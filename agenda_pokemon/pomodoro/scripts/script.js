const $d = document,
  $start = $d.querySelector(".start");

const timer = {
  pomodoro: 0.3 * 60,
  shortBreak: 0.1 * 60,
  longBreak: 0.2 * 60,
  pomodorosUntilLongBreak: 4,
};

let pomodorosCompleted = 0;
let currentState = "pomodoro";
let intervalo;

/*$start.addEventListener("click", (e) => {
   iniciarCuentaAtras(timer[currentState]);

  function iniciarCuentaAtras(tiempoInicial) {
    timer[currentState] = tiempoInicial;
    intervalID = setInterval(actualizarCuentaAtras, 1000);
  }

  function actualizarCuentaAtras() {
    let minutos = Math.floor(timer[currentState] / 60);
    let segundos = timer[currentState] % 60;

    // Formatear los minutos y segundos para que tengan dos dígitos
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Actualizar el contenido del elemento HTML
    $d.querySelector(".time").innerHTML = minutos + ":" + segundos;

    // Reducir el tiempo restante en el estado actual
    timer[currentState]--;

    // Verificar si se alcanzó el tiempo límite en el estado actual
    if (timer[currentState] < 0) {
      clearInterval(intervalID); // Detener la cuenta atrás

      // Cambiar al siguiente estado
      if (currentState === "pomodoro") {
        pomodorosCompleted++;

        if (pomodorosCompleted < timer.pomodorosUntilLongBreak) {
          currentState = "shortBreak";
        } else {
          currentState = "longBreak";
          pomodorosCompleted = 0; // Reiniciar contador de pomodoros completados
        }
      } else if (
        currentState === "shortBreak" ||
        currentState === "longBreak"
      ) {
        currentState = "pomodoro";
      }

      // Iniciar una nueva cuenta atrás con el tiempo del nuevo estado
      iniciarCuentaAtras(timer[currentState]);
    } 
  }
});*/
function actualizarCuentaAtras() {
  let minutos = Math.floor(timer[currentState] / 60);
  let segundos = timer[currentState] % 60;

  // Formatear los minutos y segundos para que tengan dos dígitos
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // Actualizar el contenido del elemento HTML
  $d.querySelector(".time").innerHTML = minutos + ":" + segundos;

  // Reducir el tiempo restante en el estado actual
  timer[currentState]--;

  // Verificar si se alcanzó el tiempo límite en el estado actual
  if (timer[currentState] < 0) {
    clearInterval(intervalo); // Detener la cuenta atrás
  }
}

$start.addEventListener("click", (e) => {
  for (let i = 0; i < timer.pomodorosUntilLongBreak; i++) {
    intervalo = setInterval(actualizarCuentaAtras, 1000);
  }
});
