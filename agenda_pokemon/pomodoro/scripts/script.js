const $d = document,
  $start = $d.querySelector(".start"),
  $stop = $d.querySelector(".stop"),
  $time = $d.querySelector(".time"),
  $circulos = $d.querySelectorAll(".circulo"),
  $times = $d.querySelector(".times").querySelectorAll("p"),
  $reset = $d.querySelector(".reset"),
  $settings = $d.querySelector(".settings");

const timer = {
  pomodoro: 0.3 * 60,
  shortBreak: 0.1 * 60,
  longBreak: 0.2 * 60,
  pomodorosUntilLongBreak: 4,
};

let pomodoros = 1,
  descanso = false,
  tiempoRestante = timer.pomodoro,
  intervalo;

function cuentaAtras() {
  let minutos = Math.floor(tiempoRestante / 60);
  let segundos = tiempoRestante % 60;

  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  $time.textContent = `${minutos}:${segundos}`;

  tiempoRestante--;

  if (tiempoRestante < 0) {
    if (descanso) {
      $times[1].classList.remove("active");
      $times[2].classList.remove("active");
      $times[0].classList.add("active");
      //console.log("pomodoros: " + pomodoros);
      tiempoRestante = timer.pomodoro;
      pomodoros++;
      descanso = false;
    } else {
      descanso = true;
      if (pomodoros < 4) {
        $times[0].classList.remove("active");
        $times[1].classList.add("active");
        $circulos[pomodoros - 1].classList.add("active");
        //console.log("corto");
        tiempoRestante = timer.shortBreak;
      } else {
        $times[0].classList.remove("active");
        $times[2].classList.add("active");
        pomodoros = 0;
        //console.log("largo");
        tiempoRestante = timer.longBreak;
        $circulos.forEach((e) => e.classList.remove("active"));
      }
    }
  }
}

$start.addEventListener("click", (e) => {
  if ($start.textContent === "Start") {
    $start.textContent = "Stop";
    $start.classList.replace("start", "stop");

    intervalo = setInterval(cuentaAtras, 1000);
  } else {
    $start.textContent = "Start";
    $start.classList.replace("stop", "start");

    clearInterval(intervalo);
    console.log("Temporizador detenido por el usuario");
  }
});

$reset.addEventListener("click", (e) => location.reload());

$settings.addEventListener("click", (e) =>
  alert("Función todavía no disponible ⸜(｡˃ ᵕ ˂ )⸝♡")
);
