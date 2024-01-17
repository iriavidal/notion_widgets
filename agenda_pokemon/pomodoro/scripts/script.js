/* const $d = document,
  $start = $d.querySelector(".start"),
  $time = $d.querySelector(".time");
let pomodoros = 0,
  descanso = false;

const timer = {
  pomodoro: 0.3 * 60,
  shortBreak: 0.1 * 60,
  longBreak: 0.2 * 60,
  pomodorosUntilLongBreak: 4,
};

function cuentaAtras(tiempo) {
  let current = tiempo;
  let intervalo = setInterval(() => {
    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    console.log(tiempo);
    console.log("----------------");

    tiempo--;

    if (tiempo < 0) {
      if (current == timer.pomodoro) {
        pomodoros++;
        console.log("pomodoros: " + pomodoros);
        descanso = true;
      }
      clearInterval(intervalo);
    }
  }, 1000);
}

$start.addEventListener("click", (e) => {
  while (pomodoros < 5) {
    if (!descanso) {
      console.log("pomodoro");
      cuentaAtras(timer.pomodoro);
    } else {
      if (pomodoros == timer.pomodorosUntilLongBreak) {
        console.log("largo");
        cuentaAtras(timer.longBreak);
      } else {
        console.log("corto");
        cuentaAtras(timer.shortBreak);
      }
    }
  }
}); */

const $d = document,
  $start = $d.querySelector(".start"),
  $stop = $d.querySelector(".stop"),
  $time = $d.querySelector(".time");
let pomodoros = 0,
  descanso = false,
  tiempoRestante = 0,
  intervalo; // Variable para almacenar el intervalo

const timer = {
  pomodoro: 0.3 * 60,
  shortBreak: 0.1 * 60,
  longBreak: 0.2 * 60,
  pomodorosUntilLongBreak: 4,
};

function cuentaAtras(tiempo) {
  tiempoRestante = tiempo;
  intervalo = setInterval(() => {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    $time.textContent = `${minutos}:${segundos}`;

    tiempoRestante--;

    if (tiempoRestante < 0) {
      clearInterval(intervalo);
      if (!descanso) {
        pomodoros++;
        console.log("pomodoros: " + pomodoros);
        if (pomodoros < 5) {
          console.log("pomodoro");
          cuentaAtras(timer.pomodoro);
        } else {
          pomodoros = 0; // Reiniciar el contador de pomodoros
          console.log("largo");
          cuentaAtras(timer.longBreak);
        }
      } else {
        descanso = false;
        console.log("corto");
        cuentaAtras(timer.shortBreak);
      }
    }
  }, 1000);
}

$start.addEventListener("click", (e) => {
  if ($start.textContent === "Start") {
    // Si el botón dice "Start", iniciar el temporizador
    $start.textContent = "Stop";
    $start.classList.replace("start", "stop"); // Reemplazar la clase "start" con "stop"
    if (tiempoRestante === 0) {
      // Comenzar desde el inicio si no hay tiempo restante
      if (pomodoros < 5) {
        console.log("pomodoro");
        cuentaAtras(timer.pomodoro);
      } else {
        pomodoros = 0; // Reiniciar el contador de pomodoros
        console.log("largo");
        cuentaAtras(timer.longBreak);
      }
    } else {
      // Continuar desde el tiempo restante si hay tiempo almacenado
      cuentaAtras(tiempoRestante);
    }
  } else {
    // Si el botón dice "Stop", detener el temporizador
    $start.textContent = "Start";
    $start.classList.replace("stop", "start"); // Reemplazar la clase "stop" con "start"
    clearInterval(intervalo);
    console.log("Temporizador detenido por el usuario");
  }
});
