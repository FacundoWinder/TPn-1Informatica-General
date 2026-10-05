# TP1 - Colección de Juegos (Informática General 2026)

Este es nuestro Trabajo Práctico 1 para la materia **Informática General** (Artes Multimediales - UNA). Armamos un sitio web con HTML5, CSS y JavaScript que incluye 3 juegos interactivos.

## Integrantes
* **Oleg Poliakov:** Maquetado base del sitio con HTML5 y CSS (Flexbox), estructura de las 6 páginas y desarrollo del Juego de Dados.
* **Naum Alvarez:** Juego de Cartas, Juego de Preguntas (con API), manejo de `localStorage`, temporizador, administración del repo y README.

## Estructura del Sitio
El proyecto tiene 6 páginas conectadas entre sí:
* `index.html` - Inicio.
* `dados.html` - Juego de Dados.
* `cartas.html` - Juego de Cartas.
* `preguntas.html` - Trivia con API.
* `records.html` - Tabla de récords.
* `nosotros.html` - Integrantes del grupo.

Para los estilos usamos un solo archivo CSS (`css/style.css`) con **Flexbox** para alinear el menú, los botones y las tarjetas de los juegos.

## Juegos

### 🎲 Juego de Dados
El objetivo es sumar 50 puntos o más en la menor cantidad de tiradas.
* Usa `Math.random()` para generar los valores de los dados (1 al 6).
* Cambia las imágenes de los dados dinámicamente según el resultado.
* Suma los puntos, muestra el resultado y bloquea el botón al ganar.

### 🃏 Juego de Cartas
Un juego de cartas interactivo que funciona con límite de tiempo.
* Incluye un temporizador y calcula el puntaje obtenido por rondas.

### 🧠 Juego de Preguntas (API)
Una trivia que trae preguntas en tiempo real desde la API pública **Open Trivia DB**.
* Usa `fetch()` para pedir las preguntas a la API.
* Mezcla las respuestas y suma puntos cuando se responde correctamente.

## Guardado de Récords
Usamos **`localStorage`** del navegador para guardar los mejores puntajes de los juegos, así los datos no se borran al cerrar o recargar la página.

## Declaración de Uso de IA
Usamos asistentes de IA como apoyo durante la cursada para:
1. Consultas sobre maquetado HTML5 y CSS Flexbox.
2. Detección y corrección de errores (debugging) en JavaScript.
3. Revisión de sintaxis para el consumo de la API y el uso del DOM.

Todo el código fue probado, adaptado y modificado por nosotros.