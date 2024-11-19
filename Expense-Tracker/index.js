#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const listjson = path.join(__dirname, 'list.json')
let dateNow = new Date()
let year = dateNow.getFullYear();
let month = dateNow.getMonth();
let day = dateNow.getDate();

let fullDate = `${year}-${month}-${day}`

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function addExpense(description, amount) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let expenses = JSON.parse(data)
        let newExpense = {
            id: 0 === expenses.length ? 1 : expenses[expenses.length - 1].id + 1,
            description: description,
            amount: amount,
            date: fullDate
        }
        expenses.push(newExpense);
        fs.writeFile(listjson, JSON.stringify(expenses, null, 2), (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return
            }
            console.log('Expensa agregada');
        })
    })
}
function updateExpense(id, description, amount) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let expenses = JSON.parse(data);
        let expenseFind = expenses.filter(i => i.id == id)
        if (!expenseFind) {
            console.error("ELEMENTO NO ENCONTRADO " + id)
            return
        } else {
            expenseFind[0].description = description != null || undefined ? description : expenseFind[0].description
            expenseFind[0].amount = amount > 1 ? amount : expenseFind[0].amount
        }
        const jsonString = JSON.stringify(expenses, null, 2)
        fs.writeFile(listjson, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return;
            }
            console.log('Elemento actualizado correctamente en el archivo JSON.');
        });
    })
}
function deleteExpense(id) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let expenses = JSON.parse(data);
        let expenseFind = expenses.filter(i => i.id !== id)
        if (expenses.length === expenseFind.length) {
            console.log("No se encontro que id quieres borrar");
            return
        }
        const jsonString = JSON.stringify(expenseFind, null, 2);
        fs.writeFile(listjson, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return;
            }
            console.log('Elemento actualizado correctamente en el archivo JSON.');
        })
    })
}
function listExpense() {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let expenses = JSON.parse(data)
        const maxIdLength = Math.max(...expenses.map(e => String(e.id).length), 2);
        const maxDateLength = Math.max(...expenses.map(e => e.date.length), 4);
        const maxDescLength = Math.max(...expenses.map(e => e.description.length), 11);
        const maxAmountLength = Math.max(...expenses.map(e => String(e.amount).length), 6);

        const header = `${"ID".padEnd(maxIdLength)}  ${"Fecha".padEnd(maxDateLength)}  ${"Descripcion".padEnd(maxDescLength)}  ${"Monto".padEnd(maxAmountLength)}`;
        console.log(header);
        console.log("-".repeat(header.length));

        expenses.forEach(expense => {
            console.log(
                `${String(expense.id).padEnd(maxIdLength)}  ${expense.date.padEnd(maxDateLength)}  ${expense.description.padEnd(maxDescLength)}  $${String(expense.amount).padStart(maxAmountLength - 1)}`
            );
        });
    })
}

function summaryAllExpenses(year = 0, month = 0) {
    fs.readFile(listjson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return
        }
        let expenses = JSON.parse(data)
        if (year > 1) {
            const filteredDatesSplit = expenses.filter(exp => exp.date.split("-")[0] === String(year));
            if (filteredDatesSplit.length > 0) {
                const total = filteredDatesSplit.reduce((acc, exp) => acc + exp.amount, 0)
                console.log(`Total de expensas en ${year}: $${total}`)
            }
        } else if (month > 0 && month <= 12) {
            const filteredDatesSplitMonth = expenses.filter(exp => exp.date.split("-")[1] === String(month));
            if (filteredDatesSplitMonth.length > 0) {
                const total = filteredDatesSplitMonth.reduce((acc, exp) => acc + exp.amount, 0)
                console.log(`Total de expensas ${meses[month]}: $${total}`)
            }
        } else {
            const total = expenses.reduce((acc, exp) => acc + exp.amount, 0)
            console.log(`Total de expensas: $${total}`)
        }
    })
}


yargs
    .command(
        'add', 
        'Agrega una nueva expensa', 
        (yargs) => {
            return yargs
                .option('description', {
                    alias: 'd',
                    type: 'string',
                    describe: 'Descripción del gasto',
                    demandOption: true,
                })
                .option('amount', {
                    alias: 'a',
                    type: 'number',
                    describe: 'Monto del gasto',
                    demandOption: true,
                });
        },
        (argv) => addExpense(argv.description, argv.amount)
    )
    .command(
        'update',
        'Actualiza una expensa existente',
        (yargs) => {
            return yargs
                .option('id', {
                    describe: 'ID del gasto a actualizar',
                    demandOption: true,
                    type: 'number',
                })
                .option('description', {
                    describe: 'Nueva descripción del gasto',
                    type: 'string',
                })
                .option('amount', {
                    describe: 'Nueva cantidad del gasto',
                    type: 'number',
                });
        },
        (argv) => updateExpense(argv.id, argv.description, argv.amount)
    )
    .command(
        'delete',
        'Elimina una expensa por su ID',
        (yargs) => {
            return yargs.option('id', {
                alias: 'i',
                describe: 'ID del gasto a eliminar',
                demandOption: true,
                type: 'number',
            });
        },
        (argv) => deleteExpense(argv.id)
    )
    .command(
        'list',
        'Lista todas las expensas',
        (yargs) => yargs,
        (argv) => listExpense()
    )
    .command(
        'summary',
        'Resumen de expensas',
        (yargs) => {
            return yargs
                .option('year', {
                    describe: 'El año por cual quieres filtrar',
                    type: 'number',
                })
                .option('month', {
                    describe: 'El mes por cual quieres filtrar',
                    type: 'number',
                });
        },
        (argv) => summaryAllExpenses(argv.year, argv.month)
    )
    .help()
    .argv;
