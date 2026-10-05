let mazo = [];
let manoJugador = [];
let manoDealer = [];
let partidaActiva = false;
let intervaloTimer = null;
let segundosRestantes = 60;

let victorias = 0;
let derrotas = 0;
let empates = 0;

let palos = ["♠", "♥", "♦", "♣"];
let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function crearMazo() {
    mazo = [];
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            mazo.push({ valor: valores[j], palo: palos[i] });
        }
    }
    mezclarMazo();
}

function mezclarMazo() {
    for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
}

function esRoja(carta) {
    return carta.palo === "♥" || carta.palo === "♦";
}

function crearCartaHTML(carta) {
    let div = document.createElement("div");
    div.className = "carta-visual";
    if (esRoja(carta)) {
        div.classList.add("carta-roja");
    }
    div.innerHTML =
        `<span class="carta-esquina-sup">${carta.valor}<br>${carta.palo}</span>` +
        `<span class="carta-centro">${carta.palo}</span>` +
        `<span class="carta-esquina-inf">${carta.valor}<br>${carta.palo}</span>`;
    return div;
}

function crearCartaOcultaHTML() {
    let div = document.createElement("div");
    div.className = "carta-visual carta-oculta";
    div.innerHTML = `<span class="carta-centro">🂠</span>`;
    return div;
}

function obtenerPuntoCarta(carta) {
    if (carta.valor === "A") {
        return 11;
    } else if (carta.valor === "J" || carta.valor === "Q" || carta.valor === "K") {
        return 10;
    } else {
        return Number(carta.valor);
    }
}

function calcularPuntos(mano) {
    let puntos = 0;
    let ases = 0;

    for (let i = 0; i < mano.length; i++) {
        puntos += obtenerPuntoCarta(mano[i]);
        if (mano[i].valor === "A") {
            ases++;
        }
    }

    while (puntos > 21 && ases > 0) {
        puntos -= 10;
        ases--;
    }

    return puntos;
}

function sacarCarta() {
    return mazo.pop();
}

function mostrarCartas(mano, contenedorId) {
    let contenedor = document.querySelector("#" + contenedorId);
    contenedor.innerHTML = "";

    for (let i = 0; i < mano.length; i++) {
        let carta = crearCartaHTML(mano[i]);
        contenedor.appendChild(carta);
    }
}

function mostrarCartaOculta() {
    let contenedor = document.querySelector("#mano-dealer");
    contenedor.innerHTML = "";

    let cartaVisible = crearCartaHTML(manoDealer[0]);
    contenedor.appendChild(cartaVisible);

    let cartaOculta = crearCartaOcultaHTML();
    contenedor.appendChild(cartaOculta);

    document.querySelector("#puntos-dealer").innerHTML = "?";
}

function iniciarTimer() {
    segundosRestantes = 60;
    document.querySelector("#timer").innerHTML = segundosRestantes;

    intervaloTimer = setInterval(function() {
        segundosRestantes--;
        document.querySelector("#timer").innerHTML = segundosRestantes;

        if (segundosRestantes <= 0) {
            clearInterval(intervaloTimer);
            terminarPartida("tiempo");
        }
    }, 1000);
}

function detenerTimer() {
    clearInterval(intervaloTimer);
}

function nuevaPartida() {
    crearMazo();
    manoJugador = [];
    manoDealer = [];
    partidaActiva = true;

    document.querySelector("#mensaje-partida").innerHTML = "";

    manoJugador.push(sacarCarta());
    manoJugador.push(sacarCarta());
    manoDealer.push(sacarCarta());
    manoDealer.push(sacarCarta());

    mostrarCartas(manoJugador, "mano-jugador");
    mostrarCartaOculta();

    document.querySelector("#puntos-jugador").innerHTML = calcularPuntos(manoJugador);

    document.querySelector("#btn-pedir").disabled = false;
    document.querySelector("#btn-plantarse").disabled = false;
    document.querySelector("#btn-nueva").disabled = true;

    detenerTimer();
    iniciarTimer();

    if (calcularPuntos(manoJugador) === 21) {
        terminarPartida("blackjack");
    }
}

function pedirCarta() {
    if (!partidaActiva) {
        return;
    }

    manoJugador.push(sacarCarta());
    mostrarCartas(manoJugador, "mano-jugador");

    let puntos = calcularPuntos(manoJugador);
    document.querySelector("#puntos-jugador").innerHTML = puntos;

    if (puntos > 21) {
        terminarPartida("pasado");
    } else if (puntos === 21) {
        plantarse();
    }
}

function plantarse() {
    if (!partidaActiva) {
        return;
    }
    jugarDealer();
}

function jugarDealer() {
    mostrarCartas(manoDealer, "mano-dealer");
    document.querySelector("#puntos-dealer").innerHTML = calcularPuntos(manoDealer);

    while (calcularPuntos(manoDealer) < 17) {
        manoDealer.push(sacarCarta());
        mostrarCartas(manoDealer, "mano-dealer");
        document.querySelector("#puntos-dealer").innerHTML = calcularPuntos(manoDealer);
    }

    let puntosJugador = calcularPuntos(manoJugador);
    let puntosDealer = calcularPuntos(manoDealer);

    if (puntosDealer > 21) {
        terminarPartida("dealer-pasado");
    } else if (puntosJugador > puntosDealer) {
        terminarPartida("gana-jugador");
    } else if (puntosDealer > puntosJugador) {
        terminarPartida("gana-dealer");
    } else {
        terminarPartida("empate");
    }
}

function terminarPartida(resultado) {
    partidaActiva = false;
    detenerTimer();

    document.querySelector("#btn-pedir").disabled = true;
    document.querySelector("#btn-plantarse").disabled = true;
    document.querySelector("#btn-nueva").disabled = false;

    mostrarCartas(manoDealer, "mano-dealer");
    document.querySelector("#puntos-dealer").innerHTML = calcularPuntos(manoDealer);

    let mensaje = document.querySelector("#mensaje-partida");
    let resultadoTexto = "";

    if (resultado === "blackjack") {
        mensaje.innerHTML = "🎉 ¡Blackjack! ¡Ganaste con 21 puntos exactos!";
        mensaje.style.color = "#27ae60";
        victorias++;
        resultadoTexto = "Victoria (Blackjack)";
    } else if (resultado === "pasado") {
        mensaje.innerHTML = "💥 ¡Te pasaste de 21! El dealer gana.";
        mensaje.style.color = "#e74c3c";
        derrotas++;
        resultadoTexto = "Derrota (pasado de 21)";
    } else if (resultado === "dealer-pasado") {
        mensaje.innerHTML = "🎉 ¡El dealer se pasó de 21! ¡Ganaste!";
        mensaje.style.color = "#27ae60";
        victorias++;
        resultadoTexto = "Victoria (dealer pasado)";
    } else if (resultado === "gana-jugador") {
        mensaje.innerHTML = "🎉 ¡Ganaste! Tu puntaje es mayor al del dealer.";
        mensaje.style.color = "#27ae60";
        victorias++;
        resultadoTexto = "Victoria";
    } else if (resultado === "gana-dealer") {
        mensaje.innerHTML = "😞 El dealer gana. Mejor suerte la próxima.";
        mensaje.style.color = "#e74c3c";
        derrotas++;
        resultadoTexto = "Derrota";
    } else if (resultado === "empate") {
        mensaje.innerHTML = "🤝 ¡Empate! Nadie gana esta ronda.";
        mensaje.style.color = "#f39c12";
        empates++;
        resultadoTexto = "Empate";
    } else if (resultado === "tiempo") {
        mensaje.innerHTML = "⏱ ¡Se acabó el tiempo! El dealer gana.";
        mensaje.style.color = "#e74c3c";
        derrotas++;
        resultadoTexto = "Derrota (tiempo agotado)";
        mostrarCartas(manoDealer, "mano-dealer");
        document.querySelector("#puntos-dealer").innerHTML = calcularPuntos(manoDealer);
        document.querySelector("#btn-pedir").disabled = true;
        document.querySelector("#btn-plantarse").disabled = true;
        document.querySelector("#btn-nueva").disabled = false;
    }

    document.querySelector("#victorias").innerHTML = victorias;
    document.querySelector("#derrotas").innerHTML = derrotas;
    document.querySelector("#empates").innerHTML = empates;

    guardarRecord(resultadoTexto, calcularPuntos(manoJugador));
}

function guardarRecord(resultado, puntos) {
    let records = [];

    try {
        let guardado = localStorage.getItem("records-blackjack");
        if (guardado !== null) {
            records = JSON.parse(guardado);
        }
    } catch (e) {
        records = [];
    }

    let nuevaEntrada = {
        resultado: resultado,
        puntos: puntos,
        fecha: new Date().toLocaleDateString()
    };

    records.push(nuevaEntrada);

    if (records.length > 10) {
        records = records.slice(records.length - 10);
    }

    try {
        localStorage.setItem("records-blackjack", JSON.stringify(records));
    } catch (e) {
        console.log("No se pudo guardar en localStorage");
    }
}
