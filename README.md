# TP1 - Colección de Juegos (Informática General 2026)

Este proyecto es una plataforma web interactiva desarrollada para la materia **Informática General** (Artes Multimediales - UNA). Consiste en un sitio web estructurado con HTML5 semántico y CSS3 que alberga una colección de tres juegos interactivos desarrollados con JavaScript.

---

## 👥 Integrantes del Grupo

* **Oleg Poliakov:** Estructura general de HTML5 y CSS (Flexbox), maquetado base del sitio y desarrollo del Juego de Dados.
* **Naum Alvarez:** Desarrollo del Juego de Cartas, Juego de Preguntas (API), persistencia de datos (`localStorage`), temporizador, administración del repositorio en GitHub y documentación.

---

## 🛠️ Tecnologías y Estructura

* **HTML5 Semántico:** Estructuración de las 6 páginas principales (`index.html`, `dados.html`, `cartas.html`, `preguntas.html`, `records.html`, `nosotros.html`) utilizando elementos semánticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **CSS3 & Flexbox:** Estilos globales unificados (`css/style.css`), diseño responsivo y alineación mediante CSS Flexbox.
* **JavaScript ES6:** Manipulación del DOM, control de eventos, generación de números aleatorios, timers (`setInterval`), persistencia de datos con `localStorage` y solicitudes asíncronas (`fetch` / `async-await`).
* **Git & GitHub Pages:** Control de versiones colaborativo y publicación en línea.

---

## 🎮 Descripción de los Juegos

### 🎲 Juego de Dados
Juego interactivo desarrollado con JavaScript. El jugador tira dos dados con el objetivo de alcanzar o superar los 50 puntos acumulados en la menor cantidad de lanzamientos. Incluye control de estado (victoria/reinicio) y actualización del DOM en tiempo real.

### 🃏 Juego de Cartas
Juego basado en cartas con imágenes dinámicas y límite de tiempo. Incorpora un temporizador que limita la duración de la partida, cálculo de puntaje por rondas y control de estado de la mesa de juego.

### 🧠 Juego de Preguntas (Trivia API)
Juego de preguntas y respuestas que consume datos en tiempo real desde la API pública **Open Trivia DB** mediante `fetch()`. El sistema procesa las preguntas, mezcla las opciones de respuesta y suma puntos por cada acierto.

---

## 🏆 Persistencia y Récords

El sitio cuenta con una sección dedicada a la tabla de posiciones (`records.html`). Utiliza la API de **`localStorage`** del navegador para guardar y actualizar los mejores puntajes (récords) de cada uno de los juegos, de modo que la información se mantiene guardada incluso al cerrar el navegador.

---

## 🤖 Declaración de Uso de Inteligencia Artificial (IA)

En cumplimiento con las consignas de la materia, se declara que la lógica, la estructura y la resolución técnica del proyecto fueron desarrolladas por los integrantes del grupo aplicando los conocimientos vistos en clase.

Las herramientas de **Inteligencia Artificial Generativa** (asistentes de código LLM) se utilizaron de manera secundaria como apoyo durante las distintas etapas del desarrollo para:
1. **Consultas y estructura:** Asistencia en la optimización del maquetado HTML5 y Flexbox.
2. **Depuración y revisión:** Apoyo en la detección de errores (debugging) y formateo de la sintaxis en JavaScript.
3. **Validación:** Verificación de buenas prácticas en la manipulación del DOM y el consumo de APIs.

*Todo el código propuesto o revisado con asistencia de IA fue analizado, probado, adaptado e integrado de manera consciente por los integrantes del grupo.*
