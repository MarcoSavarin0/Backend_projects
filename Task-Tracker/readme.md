
# TASK TRACKER

Task tracker es un proyecto utilizado para rastrear y gestionar tus tareas. En este proyecto, construi una interfaz de línea de comandos (CLI) sencilla para rastrear lo que necesitas hacer, lo que has hecho y en lo que estás trabajando actualmente. Este proyecto me ayudo a practicar tus habilidades de programación, incluyendo el trabajo con el sistema de archivos, el manejo de entradas de usuario y la construcción de una aplicación CLI sencilla.




## Correr localmente

Clone the project

```bash
  git clone https://github.com/MarcoSavarin0/Backend_projects
```

Go to the project directory

```bash
  cd Backend_projects/Task-Tracker
```

Instala las dependencias

```bash
  npm install
```

Set up cli

```bash
  npm link
```
Si estas en mac o linux darle permisos al index.js
```bash
chmod +x index.js
```
Instala globalmente la lista de tarea para acceder desde cualquier parte
```bash
npm install -g .
```
Todos los comandos que puedes ejecutar
```bash
task-cli help
task-cli add <description>
task-cli update <id> <description>
task-cli delete <id>
task-cli mark-in-progress <id>
task-cli list <status>
```




