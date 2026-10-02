let puntosTotales = 0;
let lanzamientos = 0;
const PUNTOS_OBJETIVO = 50;
const imgDado1 = document.querySelector('#dado1');
const imgDado2 = document.querySelector('#dado2');
const btnTirar = document.querySelector('#btn-tirar');
const btnReiniciar = document.querySelector('#btn-reiniciar');

const elemSumaTiro = document.querySelector('#suma-tiro');
const elemPuntosTotales = document.querySelector('#puntos-totales');
const elemContadorLanzamientos = document.querySelector('#contador-lanzamientos');
const elemMensaje = document.querySelector('#mensaje-estado');
function tirarDados() {
    let valorDado1 = Math.floor(Math.random() * 6) + 1;
    let valorDado2 = Math.floor(Math.random() * 6) + 1;

    imgDado1.src = `img/${valorDado1}.png`;
    imgDado2.src = `img/${valorDado2}.png`;

    let sumaActual = valorDado1 + valorDado2;
    puntosTotales += sumaActual;
    lanzamientos++;

    elemSumaTiro.textContent = sumaActual;
    elemPuntosTotales.textContent = puntosTotales;
    elemContadorLanzamientos.textContent = lanzamientos;

    if (puntosTotales >= PUNTOS_OBJETIVO) {
        elemMensaje.textContent = `¡Felicidades! Ganaste en ${lanzamientos} lanzamientos. 🎉`;
        btnTirar.disabled = true;
    }
}

function reiniciarJuego() {
    puntosTotales = 0;
    lanzamientos = 0;

    imgDado1.src = 'img/1.png';
    imgDado2.src = 'img/1.png';


    elemSumaTiro.textContent = '0';
    elemPuntosTotales.textContent = '0';
    elemContadorLanzamientos.textContent = '0';
    elemMensaje.textContent = '';

    btnTirar.disabled = false;
}

btnTirar.addEventListener('click', tirarDados);
btnReiniciar.addEventListener('click', reiniciarJuego);