function cargarRecords(juego, contenedorId) {
    let contenedor = document.querySelector("#" + contenedorId);
    let records = [];

    try {
        let guardado = localStorage.getItem("records-" + juego);
        if (guardado !== null) {
            records = JSON.parse(guardado);
        }
    } catch (e) {
        records = [];
    }

    if (records.length === 0) {
        contenedor.innerHTML = "<p class='sin-records'>Todavía no hay partidas registradas.</p>";
        return;
    }

    let tabla = "<table class='tabla-records'>";
    tabla += "<tr><th>#</th><th>Resultado</th><th>Puntos</th><th>Fecha</th></tr>";

    for (let i = records.length - 1; i >= 0; i--) {
        let fila = records[i];
        tabla += "<tr>";
        tabla += "<td>" + (records.length - i) + "</td>";
        tabla += "<td>" + fila.resultado + "</td>";
        tabla += "<td>" + fila.puntos + "</td>";
        tabla += "<td>" + fila.fecha + "</td>";
        tabla += "</tr>";
    }

    tabla += "</table>";
    contenedor.innerHTML = tabla;
}

function borrarRecords(juego) {
    let confirmar = confirm("¿Seguro que querés borrar todos los récords de " + juego + "?");

    if (confirmar) {
        try {
            localStorage.removeItem("records-" + juego);
        } catch (e) {
            console.log("No se pudo borrar de localStorage");
        }

        cargarRecords(juego, "records-" + juego);
    }
}

cargarRecords("blackjack", "records-blackjack");
cargarRecords("dados", "records-dados");
cargarRecords("preguntas", "records-preguntas");
