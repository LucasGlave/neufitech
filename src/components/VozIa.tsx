// import React from 'react'

// const VozIa = () => {
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//         alert('API de reconocimiento de voz no soportada en este navegador.');
//     } else {
//         // Crear una instancia de SpeechRecognition
//         const recognition = new (window.speechSynthesis.);
//         // recognition.lang = 'es-ES';
//         // recognition.continuous = true;
//         // recognition.interimResults = true;

//         let finalTranscript = ''; // Inicializar la variable para almacenar la transcripción final

//         // Manejar resultados de reconocimiento
//         recognition.onresult = (event) => {
//             let interimTranscript = ''; // Inicializar la variable para resultados intermedios
            
//             // Procesar cada resultado del reconocimiento
//             for (let i = event.resultIndex; i < event.results.length; ++i) {
//                 if (event.results[i].isFinal) {
//                     finalTranscript += event.results[i][0].transcript + '\n'; // Añadir resultado final
//                 } else {
//                     interimTranscript += event.results[i][0].transcript; // Añadir resultado intermedio
//                 }
//             }
            
//             // Actualizar la transcripción en la página
//             document.getElementById('transcript').innerHTML = finalTranscript.replace(/\n/g, '<br>') + '<br><em style="color:gray;">' + interimTranscript + '</em>';
//         };

//         // Manejar errores de reconocimiento
//         recognition.onerror = (event) => {
//             console.error('Error de reconocimiento de voz:', event.error);
//         };

//         // Iniciar grabación al hacer clic en "Iniciar Grabación"
//         document.getElementById('startButton').addEventListener('click', () => {
//             recognition.start();
//             document.getElementById('startButton').disabled = true;
//             document.getElementById('stopButton').disabled = false;
//             document.getElementById('transcript').innerHTML = ''; // Limpiar transcripción
//             finalTranscript = ''; // Reiniciar transcripción final
//         });

//         // Detener grabación al hacer clic en "Detener Grabación"
//         document.getElementById('stopButton').addEventListener('click', () => {
//             recognition.stop();
//             document.getElementById('startButton').disabled = false;
//             document.getElementById('stopButton').disabled = true;
//         });
//   return (
//     <div>
//         <div id="header">
//             <h1>Sistema de Reconocimiento de Voz_Neufitech_Test 1</h1>
//         </div>
//         <button id="startButton">Iniciar Grabación</button>
//         <button id="stopButton" disabled>Detener Grabación</button>
//         <div id="results">
//             <h2>Transcripción:</h2>
//             <div id="transcript"></div>
//         </div>
//     </div>
//   )
// }

// export default VozIa

// {/* <div id="header">
//         <img id="logo" src="Capture.PNG" alt="Logo"> <!-- Asegúrate de que el archivo 'Capture.PNG' esté en la misma carpeta -->
//         <h1>Sistema de Reconocimiento de Voz_Neufitech_Test 1</h1>
//     </div>
//     <button id="startButton">Iniciar Grabación</button>
//     <button id="stopButton" disabled>Detener Grabación</button>
//     <div id="results">
//         <h2>Transcripción:</h2>
//         <div id="transcript"></div>
//     </div>
//     <script>
//         // Verificar compatibilidad del API en el navegador
//         if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//             alert('API de reconocimiento de voz no soportada en este navegador.');
//         } else {
//             // Crear una instancia de SpeechRecognition
//             const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.lang = 'es-ES'; // Establecer el idioma a español
//             recognition.continuous = true; // Permitir que el reconocimiento sea continuo
//             recognition.interimResults = true; // Mostrar resultados intermedios

//             let finalTranscript = ''; // Inicializar la variable para almacenar la transcripción final

//             // Manejar resultados de reconocimiento
//             recognition.onresult = (event) => {
//                 let interimTranscript = ''; // Inicializar la variable para resultados intermedios
                
//                 // Procesar cada resultado del reconocimiento
//                 for (let i = event.resultIndex; i < event.results.length; ++i) {
//                     if (event.results[i].isFinal) {
//                         finalTranscript += event.results[i][0].transcript + '\n'; // Añadir resultado final
//                     } else {
//                         interimTranscript += event.results[i][0].transcript; // Añadir resultado intermedio
//                     }
//                 }
                
//                 // Actualizar la transcripción en la página
//                 document.getElementById('transcript').innerHTML = finalTranscript.replace(/\n/g, '<br>') + '<br><em style="color:gray;">' + interimTranscript + '</em>';
//             };

//             // Manejar errores de reconocimiento
//             recognition.onerror = (event) => {
//                 console.error('Error de reconocimiento de voz:', event.error);
//             };

//             // Iniciar grabación al hacer clic en "Iniciar Grabación"
//             document.getElementById('startButton').addEventListener('click', () => {
//                 recognition.start();
//                 document.getElementById('startButton').disabled = true;
//                 document.getElementById('stopButton').disabled = false;
//                 document.getElementById('transcript').innerHTML = ''; // Limpiar transcripción
//                 finalTranscript = ''; // Reiniciar transcripción final
//             });

//             // Detener grabación al hacer clic en "Detener Grabación"
//             document.getElementById('stopButton').addEventListener('click', () => {
//                 recognition.stop();
//                 document.getElementById('startButton').disabled = false;
//                 document.getElementById('stopButton').disabled = true;
//             });
//         } */}