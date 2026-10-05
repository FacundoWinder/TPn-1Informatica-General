let bancoPregunta = [
    { pregunta: "¿Cuál es el planeta más grande del sistema solar?", correcta: "Júpiter", incorrectas: ["Saturno", "Neptuno", "Urano"] },
    { pregunta: "¿En qué año llegó el hombre a la Luna por primera vez?", correcta: "1969", incorrectas: ["1965", "1972", "1961"] },
    { pregunta: "¿Cuántos continentes tiene la Tierra?", correcta: "7", incorrectas: ["5", "6", "8"] },
    { pregunta: "¿Cuál es el río más largo del mundo?", correcta: "El Nilo", incorrectas: ["El Amazonas", "El Yangtsé", "El Mississippi"] },
    { pregunta: "¿Quién pintó la Mona Lisa?", correcta: "Leonardo da Vinci", incorrectas: ["Miguel Ángel", "Rafael", "Botticelli"] },
    { pregunta: "¿Cuál es el elemento químico con símbolo Au?", correcta: "Oro", incorrectas: ["Plata", "Aluminio", "Cobre"] },
    { pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?", correcta: "206", incorrectas: ["180", "215", "230"] },
    { pregunta: "¿En qué país se encuentra la Torre Eiffel?", correcta: "Francia", incorrectas: ["Italia", "España", "Bélgica"] },
    { pregunta: "¿Cuál es el océano más grande del mundo?", correcta: "El Pacífico", incorrectas: ["El Atlántico", "El Índico", "El Ártico"] },
    { pregunta: "¿Qué gas es el más abundante en la atmósfera terrestre?", correcta: "Nitrógeno", incorrectas: ["Oxígeno", "Dióxido de carbono", "Argón"] },
    { pregunta: "¿Cuál es la capital de Australia?", correcta: "Canberra", incorrectas: ["Sídney", "Melbourne", "Brisbane"] },
    { pregunta: "¿Quién escribió el Quijote?", correcta: "Miguel de Cervantes", incorrectas: ["Lope de Vega", "Francisco de Quevedo", "Garcilaso de la Vega"] },
    { pregunta: "¿Cuántos lados tiene un hexágono?", correcta: "6", incorrectas: ["5", "7", "8"] },
    { pregunta: "¿Cuál es el animal terrestre más rápido?", correcta: "El guepardo", incorrectas: ["El León", "El caballo", "El avestruz"] },
    { pregunta: "¿En qué año comenzó la Primera Guerra Mundial?", correcta: "1914", incorrectas: ["1910", "1918", "1939"] },
    { pregunta: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?", correcta: "11", incorrectas: ["9", "10", "12"] },
    { pregunta: "¿Cuál es la montaña más alta del mundo?", correcta: "El Everest", incorrectas: ["El K2", "El Aconcagua", "El Kilimanjaro"] },
    { pregunta: "¿Cuál es el país más grande del mundo en superficie?", correcta: "Rusia", incorrectas: ["Canadá", "China", "Estados Unidos"] },
    { pregunta: "¿Cuántos colores tiene el arcoíris?", correcta: "7", incorrectas: ["5", "6", "8"] },
    { pregunta: "¿Cuál es el metal más liviano?", correcta: "Litio", incorrectas: ["Aluminio", "Titanio", "Magnesio"] }
];

let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;
let intervaloTimer = null;
let segundosRestantes = 15;
let esperandoRespuesta = true;

function mostrarPantalla(id) {
    let pantallas = ["pantalla-inicio", "pantalla-juego", "pantalla-resultado", "pantalla-carga", "pantalla-error"];
    for (let i = 0; i < pantallas.length; i++) {
        document.querySelector("#" + pantallas[i]).classList.add("oculto");
    }
    document.querySelector("#" + id).classList.remove("oculto");
}

function mezclarArray(array) {
    let copia = [];
    for (let i = 0; i < array.length; i++) {
        copia.push(array[i]);
    }
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = copia[i];
        copia[i] = copia[j];
        copia[j] = temp;
    }
    return copia;
}

function iniciarJuego() {
    preguntaActual = 0;
    puntaje = 0;
    esperandoRespuesta = true;

    document.querySelector("#puntaje-actual").innerHTML = 0;
    document.querySelector("#mensaje-respuesta").innerHTML = "";

    mostrarPantalla("pantalla-carga");
    cargarPreguntas();
}

async function cargarPreguntas() {
    try {
        const respuesta = await fetch("https://opentdb.com/api.php?amount=10&type=multiple&lang=es");
        const datos = await respuesta.json();

        if (datos.response_code === 0) {
            preguntas = datos.results;
            mostrarPantalla("pantalla-juego");
            mostrarPregunta();
        } else {
            usarPreguntasLocales();
        }
    } catch (error) {
        usarPreguntasLocales();
    }
}

function usarPreguntasLocales() {
    let mezcladas = mezclarArray(bancoPregunta);
    preguntas = mezcladas.slice(0, 10);

    for (let i = 0; i < preguntas.length; i++) {
        preguntas[i].question = preguntas[i].pregunta;
        preguntas[i].correct_answer = preguntas[i].correcta;
        preguntas[i].incorrect_answers = preguntas[i].incorrectas;
    }

    mostrarPantalla("pantalla-juego");
    mostrarPregunta();
}

function decodificarHTML(texto) {
    let elemento = document.createElement("textarea");
    elemento.innerHTML = texto;
    return elemento.value;
}

function mostrarPregunta() {
    esperandoRespuesta = true;

    let pregunta = preguntas[preguntaActual];

    document.querySelector("#numero-pregunta").innerHTML = preguntaActual + 1;
    document.querySelector("#texto-pregunta").innerHTML = decodificarHTML(pregunta.question || pregunta.pregunta);
    document.querySelector("#mensaje-respuesta").innerHTML = "";

    let opciones = [];
    let incorrectas = pregunta.incorrect_answers || pregunta.incorrectas;
    for (let i = 0; i < incorrectas.length; i++) {
        opciones.push(incorrectas[i]);
    }
    opciones.push(pregunta.correct_answer || pregunta.correcta);
    opciones = mezclarArray(opciones);

    let contenedor = document.querySelector("#contenedor-opciones");
    contenedor.innerHTML = "";

    for (let i = 0; i < opciones.length; i++) {
        let boton = document.createElement("button");
        boton.className = "btn-opcion";
        boton.innerHTML = decodificarHTML(opciones[i]);
        boton.setAttribute("data-respuesta", opciones[i]);
        boton.addEventListener("click", function() {
            elegirRespuesta(this);
        });
        contenedor.append(boton);
    }

    iniciarTimerPregunta();
}

function iniciarTimerPregunta() {
    clearInterval(intervaloTimer);
    segundosRestantes = 15;
    document.querySelector("#timer-preguntas").innerHTML = segundosRestantes;

    intervaloTimer = setInterval(function() {
        segundosRestantes--;
        document.querySelector("#timer-preguntas").innerHTML = segundosRestantes;
        if (segundosRestantes <= 0) {
            clearInterval(intervaloTimer);
            tiempoAgotado();
        }
    }, 1000);
}

function tiempoAgotado() {
    if (!esperandoRespuesta) {
        return;
    }
    esperandoRespuesta = false;

    let pregunta = preguntas[preguntaActual];
    let respuestaCorrecta = decodificarHTML(pregunta.correct_answer || pregunta.correcta);
    document.querySelector("#mensaje-respuesta").innerHTML = "⏱ ¡Tiempo! La respuesta correcta era: <strong>" + respuestaCorrecta + "</strong>";
    document.querySelector("#mensaje-respuesta").style.color = "#e74c3c";

    deshabilitarBotones();

    setTimeout(function() {
        avanzarPregunta();
    }, 2000);
}

function elegirRespuesta(boton) {
    if (!esperandoRespuesta) {
        return;
    }
    esperandoRespuesta = false;
    clearInterval(intervaloTimer);

    let respuestaUsuario = boton.getAttribute("data-respuesta");
    let pregunta = preguntas[preguntaActual];
    let respuestaCorrecta = pregunta.correct_answer || pregunta.correcta;
    let mensajeDiv = document.querySelector("#mensaje-respuesta");

    if (respuestaUsuario === respuestaCorrecta) {
        puntaje += 10;
        document.querySelector("#puntaje-actual").innerHTML = puntaje;
        boton.classList.add("opcion-correcta");
        mensajeDiv.innerHTML = "✅ ¡Correcto!";
        mensajeDiv.style.color = "#27ae60";
    } else {
        boton.classList.add("opcion-incorrecta");
        mensajeDiv.innerHTML = "❌ Incorrecto. La respuesta correcta era: <strong>" + decodificarHTML(respuestaCorrecta) + "</strong>";
        mensajeDiv.style.color = "#e74c3c";
    }

    deshabilitarBotones();

    setTimeout(function() {
        avanzarPregunta();
    }, 2000);
}

function deshabilitarBotones() {
    let botones = document.querySelectorAll(".btn-opcion");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

function avanzarPregunta() {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        terminarJuego();
    }
}

function terminarJuego() {
    clearInterval(intervaloTimer);
    document.querySelector("#puntaje-final").innerHTML = puntaje;

    let mensajeFinal = document.querySelector("#mensaje-final");
    if (puntaje === 100) {
        mensajeFinal.innerHTML = "🏆 ¡Perfecto! Respondiste todo correctamente.";
    } else if (puntaje >= 70) {
        mensajeFinal.innerHTML = "🎉 ¡Muy bien! Superaste el 70%.";
    } else if (puntaje >= 40) {
        mensajeFinal.innerHTML = "👍 No estuvo mal, podés mejorar.";
    } else {
        mensajeFinal.innerHTML = "😅 Seguí practicando.";
    }

    guardarRecordPreguntas(puntaje);
    mostrarPantalla("pantalla-resultado");
}

function guardarRecordPreguntas(puntos) {
    let records = [];
    try {
        let guardado = localStorage.getItem("records-preguntas");
        if (guardado !== null) {
            records = JSON.parse(guardado);
        }
    } catch (e) {
        records = [];
    }

    let nuevaEntrada = {
        resultado: puntos + " / 100 puntos",
        puntos: puntos,
        fecha: new Date().toLocaleDateString()
    };

    records.push(nuevaEntrada);

    if (records.length > 10) {
        records = records.slice(records.length - 10);
    }

    try {
        localStorage.setItem("records-preguntas", JSON.stringify(records));
    } catch (e) {
        console.log("No se pudo guardar en localStorage");
    }
}
