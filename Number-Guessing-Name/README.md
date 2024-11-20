
# 🎮 Juego de Adivinanza de Números

¡Bienvenido al **Juego de Adivinanza de Números**! Este es un juego simple basado en la línea de comandos en el que el usuario tiene que adivinar un número aleatorio entre 1 y 100. El juego incluye diferentes niveles de dificultad y te brinda pistas en cada intento. 🚀

[https://roadmap.sh/projects/number-guessing-game](https://roadmap.sh/projects/number-guessing-game)
---

## 📝 Reglas del Juego

1. Al iniciar el juego, selecciona el nivel de dificultad:
   - **Easy**: 10 intentos
   - **Medium**: 5 intentos
   - **Hard**: 3 intentos
2. La computadora generará un número aleatorio entre 1 y 100.
3. Ingresa tus conjeturas (números) para intentar adivinar el número generado.
4. El juego te dirá si el número es mayor o menor a tu conjetura.
5. El juego termina cuando:
   - Adivinas el número correcto, o
   - Se te acaban las oportunidades.
6. ¡Buena suerte!

---

## 🚀 Cómo Ejecutar el Juego

### **Requisitos**
- Tener instalado [Node.js](https://nodejs.org).

### **Pasos**
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Entra en el directorio del proyecto:
   ```bash
   cd <NOMBRE_DEL_DIRECTORIO>
   ```
3. Ejecuta el juego:
   ```bash
   node index.js
   ```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Para manejar la lógica del juego y la interacción por CLI.
- **readline**: Para capturar las entradas del usuario desde la línea de comandos.

---

## 📂 Estructura del Proyecto

```
📁 proyecto
└── 📄 index.js  # Archivo principal que contiene el juego
```

---

## 🧪 Ejemplo de Juego

### **Inicio del Juego**
```plaintext
==================================
Bienvenido al Juego de Adivinanza!
==================================
Estoy pensando en un número entre 1 y 100.
Tienes que adivinarlo según el nivel de dificultad que elijas.

===============================
  Selecciona la dificultad
===============================
1. Easy    (10 chances)
2. Medium  (5 chances)
3. Hard    (3 chances)

Elegi la dificultad: 2
Buenisimo! Seleccionaste la dificultad Medium
EMPECEMOS!

Ingresa el número (Chances restantes: 5): 50
El número es menor que 50. Intentos: 1 / 5

Ingresa el número (Chances restantes: 4): 25
¡Felicidades! Adivinaste el número correcto en 2 intentos.
```

---

## 👨‍💻 Autor

**Marco Savarino**  
Desarrollador Backend

---

¡Diviértete adivinando! 🎉

