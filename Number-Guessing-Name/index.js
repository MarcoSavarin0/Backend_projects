const readline = require("readline");

const input = (promptText) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(promptText, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};
let level = ""
let inGame = true;
let chances = 10;
const numberChoice = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let nextStep = false
console.log(`
    ===============================
      Selecciona la dificultad
    ===============================
    1. Easy    (10 chances)
    2. Medium  (5 chances)
    3. Hard    (3 chances)
    `);
(async () => {
    while (!nextStep) {
        const respuesta = await input("Elegi la dificultad: ");
        const dificultad = parseInt(respuesta);
        if (isNaN(dificultad) || dificultad < 1 || dificultad > 3) {
            console.log("Por favor, elige una opción válida (1, 2 o 3).");
            continue
        }
        selectLevel(dificultad)
        console.log(`Buenisimo! Seleccionaste la dificultad ${level}`)
        console.log("EMPECEMOS!")
        nextStep = true
    }
    while (inGame) {
        const numero = await input(`Ingresa el número (Chances restantes: ${chances - intentos}): `);
        const numeroIngresado = parseInt(numero);
        if (isNaN(numeroIngresado)) {
            console.log("Por favor, ingresa un número válido.");
            continue;
        }
        intentos++;
        if (numeroIngresado === numberChoice) {
            console.log(`¡Felicidades! Adivinaste el número correcto en ${intentos} intentos.`);
            inGame = false;
        } else if (intentos === chances) {
            console.log(`Se te acabaron las oportunidades :( ${intentos} / ${chances}`);
            console.log(`El número era ${numberChoice}`);
            inGame = false;
        } else if (numeroIngresado < numberChoice) {
            console.log(`El número es mayor que ${numeroIngresado}. Intentos: ${intentos} / ${chances}`);
        } else {
            console.log(`El número es menor que ${numeroIngresado}. Intentos: ${intentos} / ${chances}`);
        }
    }
})();
function selectLevel(number) {
    if (number === 1) {
        chances = 10;
        level = "Easy";
    } else if (number === 2) {
        chances = 5;
        level = "Medium";
    } else if (number === 3) {
        chances = 3;
        level = "Hard";
    }
};

