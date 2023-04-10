let marcador = document.getElementById("mark")
let quizContainer = document.getElementById("quiz-container")
let countPoint = 0;
let iniciar1 = document.getElementById("btnInit1");
let iniciar2 = document.getElementById("btnInit2");
let iniciar3 = document.getElementById("btnInit3");
let iniciar4 = document.getElementById("btnInit4");
let initGame = document.getElementById("initGame");
let ambiente = new Howl({
    src: "music/ambiente.mp3",
    volume: 0.1,
});
let correcto = new Howl({
    src: "music/correcto.mp3",
    volume: 0.3,
});
let incorrecto = new Howl({
    src: "music/incorrecto.mp3",
    volume: 0.3,
});
let bajo = new Howl({
    src: "music/bajo.mp3",
    volume: 0.3,
});
let medio = new Howl({
    src: "music/medio.mp3",
    volume: 0.3,
});
let alto = new Howl({
    src: "music/alto.mp3",
    volume: 0.3,
});

iniciar1.addEventListener("click", function() {
    init("programacion"); 
    initGame.classList.remove("initGame"); 
    initGame.innerHTML = ``;  
});
iniciar2.addEventListener("click", function() {
    init("cultura"); 
    initGame.classList.remove("initGame"); 
    initGame.innerHTML = ``;  
});
iniciar3.addEventListener("click", function() {
    init("ingles"); 
    initGame.classList.remove("initGame"); 
    initGame.innerHTML = ``;  
});
iniciar4.addEventListener("click", function() {
    init("matematicas"); 
    initGame.classList.remove("initGame"); 
    initGame.innerHTML = ``;  
});

function init(patron) {
    ambiente.play();
    // El patron dependerá de la categoría elegida a través del botón, ingles, matematicas, programacion o ingles
    fetch(`data/${patron}.json`)
        .then(response => response.json())
        .then(preguntas => {
        mostrarPregunta(preguntas[0]);
        marcador.classList.add("mark"); 
        quizContainer.classList.add("quiz-container"); 
        function mostrarPregunta(pregunta) {
            mark.innerHTML = `Puntaje: ${countPoint} de ${preguntas.length}` ; 
    
            let tiempoRestante = 15;
    
            // Crear HTML para mostrar tiempo restante
            let tiempoRestanteHTML = `<div class="tiempo-restante">Tiempo restante: <br> ${tiempoRestante} segundos</div>`;

            // Función para mostrar un número aleatorio de 1 a 10, según la elección.
            function obtenerNumeroAleatorio() {
                let random = Math.random();
                random *= 10;
                let entero = Math.floor(random);
                let resultado = entero + 1;
                return resultado;
            }
            let randomNumber = obtenerNumeroAleatorio();
            let preguntaHTML = `
                <div class="img-questions">
                    <video src='./img/${patron}/${randomNumber}.mp4' width='200' height='150' frameBorder='0' autoplay loop></video>
                    ${tiempoRestanteHTML}
                </div>
                
                <h2 class="title-questions">
                    ${pregunta.pregunta}
                </h2>
            `;
            let preguntaEl = document.createElement("h2");
            preguntaEl.textContent = pregunta.pregunta;
            document.getElementById("quiz-container").innerHTML = preguntaHTML;

            // Intervalor para actualizar contador de tiempo restante cada segundo
            let intervalo = setInterval(function() {
                tiempoRestante--;
                if (tiempoRestante < 0) {
                    clearInterval(intervalo);
                    swal("Tiempo terminado!", "", "error");
                    let indicePreguntaActual = preguntas.indexOf(pregunta);
                    if (indicePreguntaActual + 1 < preguntas.length) {
                      mostrarPregunta(preguntas[indicePreguntaActual + 1]);
                    }
                } else {    
                    document.querySelector(".tiempo-restante").textContent = `Tiempo restante: \n ${tiempoRestante} segundos`;
                }
            }, 1000);
        
    
            // Mostrar las opciones de respuesta
            let containerButtons = document.createElement("DIV");
            containerButtons.classList.add("containerButtons"); 
            containerButtons.id = "containerButtons";
            pregunta.respuestas.forEach(respuesta => {
                let respuestaEl = document.createElement("button");
                respuestaEl.classList.add("separador"); 
                containerButtons.appendChild(respuestaEl);
                respuestaEl.textContent = respuesta;
                respuestaEl.addEventListener("click", function() {
                    if (respuesta === pregunta.respuesta_correcta) {
                        // Sumar 1 punto si la respuesta es correcta
                        countPoint++;
                        mark.innerHTML = `Puntaje: ${countPoint} de ${preguntas.length}` 
                        clearInterval(intervalo);
                        swal("Correcto!", "", "success");
                        correcto.play();
                    } else {
                        mark.innerHTML = `Puntaje: ${countPoint} de ${preguntas.length}`  
                        clearInterval(intervalo);
                        swal(`Incorrecto!`,`Respuesta Correcta: ${pregunta.respuesta_correcta}`, "error");
                        incorrecto.play();
                    }
            
                    // Mostrar la siguiente pregunta
                    let indicePreguntaActual = preguntas.indexOf(pregunta);
                    if (indicePreguntaActual < preguntas.length - 1 || intervalo < 0) {
                        mostrarPregunta(preguntas[indicePreguntaActual + 1]);
                    } else {
                        if (countPoint <= 3) {
                            ambiente.stop();
                            document.getElementById("quiz-container").innerHTML = `
                            <div class="title-fin">Podrías volver a intentarlo y mejorar</div>
                            <br>
                            <div class="img-questions">
                                <video src='./img/${patron}/${randomNumber}.mp4' width='480' height='270' frameBorder='0' autoplay loop></video>
                            </div>
                            <br> <button id="recargar" class="opcion">Volver a Intentar</button>`;  
                            mark.innerHTML = `Puntaje Total: ${countPoint} de ${preguntas.length}`;  
                            setTimeout(() => {
                                bajo.play();
                            }, 500);
                        } else if (countPoint <= 7) {
                            ambiente.stop();
                            document.getElementById("quiz-container").innerHTML = `
                            <div class="title-fin">¡Buen Intento!</div> 
                            <br>
                            <div class="img-questions">
                                <video src='./img/${patron}/${randomNumber}.mp4' width='480' height='270' frameBorder='0' autoplay loop></video>
                            </div>
                            <br> <button id="recargar" class="opcion">Volver a Intentar</button>`;  
                            mark.innerHTML = `Puntaje Total: ${countPoint} de ${preguntas.length}`;
                            setTimeout(() => {
                                medio.play();
                            }, 500);
                        } else if (countPoint <= 10) {
                            ambiente.stop();
                            document.getElementById("quiz-container").innerHTML = `
                            <div class="title-fin">¡Excelente Puntaje!</div> 
                            <br>
                            <div class="img-questions">
                                <video src='./img/${patron}/${randomNumber}.mp4' width='480' height='270' frameBorder='0' autoplay loop></video>
                            </div>
                            <br> <button id="recargar" class="opcion">Volver a Intentar</button>`;  
                            mark.innerHTML = `Puntaje Total: ${countPoint} de ${preguntas.length}`;  
                            setTimeout(() => {
                                alto.play();
                            }, 500);
                        }
                        intervalo = 0;                    
                        // Para recargar la página
                        document.getElementById("recargar").addEventListener("click", function() {
                            location.reload();
                        });
                    }
                });
                document.getElementById("quiz-container").appendChild(respuestaEl);
            });
        }
    })
    .catch(error => console.error(error));
}