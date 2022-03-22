const fs =require('fs')
//para crear el json con los productos
let frutas={
    frutas: [
        'banana',
        'cebollas',
        'lechuga',
        'papas',
        'pimenton',
        'tomate'
    ]
}

fs.writeFileSync('./db/frutas.json',JSON.stringify(frutas))