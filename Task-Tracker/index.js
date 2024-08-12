#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const listjson = path.join(__dirname, 'list.json')

function addTask(task) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let tasks = JSON.parse(data);
        let nuevoTask = {
            id: 0 === tasks.length ? 1 : tasks[tasks.length - 1].id + 1,
            task: task,
            done: 'in progress'
        }
        tasks.push(nuevoTask);
        fs.writeFile(listjson, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return
            }
            console.log('Task agregada!');
        })
    })
}
function updateTask(id, task) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let tasks = JSON.parse(data);
        let taskFind = tasks.filter(i => i.id == id)
        if (!taskFind) {
            console.error("ELEMENTO NO ENCONTRADO " + id)
            return
        } else {
            taskFind[0].task = task
        }
        const jsonString = JSON.stringify(tasks, null, 2)
        fs.writeFile(listjson, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return;
            }
            console.log('Elemento actualizado correctamente en el archivo JSON.');
        });
    })
}

function deleteTask(id) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let tasks = JSON.parse(data);
        let taskFind = tasks.filter(i => i.id !== id);

        if (tasks.length === taskFind.length) {
            console.log("No se encontro que id quieres borrar");
            return
        }
        const jsonString = JSON.stringify(taskFind, null, 2);

        fs.writeFile(listjson, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return;
            }
            console.log('Elemento actualizado correctamente en el archivo JSON.');
        });
    })
}
function markTask(id, status) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }

        let tasks = JSON.parse(data);
        let taskFind = tasks.filter(i => i.id == id);
        if (!taskFind) return
        if (status == 'progress') {
            taskFind[0].done = 'in progress'
        }
        else {
            taskFind[0].done = 'Done'
        }
        const jsonString = JSON.stringify(tasks, null, 2);
        fs.writeFile(listjson, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return;
            }
            console.log('Elemento actualizado correctamente en el archivo JSON.');
        });
    })
}
function listAll(status = null) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let tasks = JSON.parse(data);
        let tasksFind = status ? tasks.filter((task) => task.done == status) : tasks;
        if (!tasksFind) return
        console.log("Task:");
        tasksFind.forEach(task => {
            console.log(`ID: ${task.id}, DESCRIPTION: ${task.task}, STATUS: ${task.done}`)
        });
    })
}

yargs
    .command('add <description>', 'Add a new task', {}, (argv) => addTask(argv.description))
    .command('update <id> <description>', 'Update a task', {}, (argv) => updateTask(argv.id, argv.description))
    .command('delete <id>', 'Delete a Task', {}, (argv) => deleteTask(argv.id))
    .command('mark-in-progress <id>', 'Mark in progress a Task', {}, (argv) => markTask(argv.id, "progress"))
    .command('mark-done <id>', 'Mark done a Task', {}, (argv) => markTask(argv.id, "done"))
    .command('list [status]', 'List tasks', {}, (argv) => listAll(argv.status))
    .help()
    .argv;