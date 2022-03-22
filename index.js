const express = require("express");
const fs=require("fs");
const app = express();
const exphbs = require("express-handlebars");

app.listen(3000, () => {
console.log("El servidor está inicializado en el puerto 3000");
});

app.use(express.static("assets"));

app.engine(
    "handlebars",
    exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes/",
    })
    );
    app.set("view engine", "handlebars");

//disponibiliza para el cliente la ruta /bootstrap para acceder a la carpeta '/node_modules/bootstrap/dist/css'...así desde el frontend podrá utilizar '/node_modules/bootstrap/dist/css' del backend llamando a '<link rel="stylesheet" href="/bootstrap/bootstrap.css" />'
app.use('/bootstrap', express.static(__dirname +
'/node_modules/bootstrap/dist/css'))

app.use('/bootstrap/js', express.static(__dirname +
'/node_modules/bootstrap/dist/js'))

app.use('/jquery', express.static(__dirname +
'/node_modules/jquery/dist'))

app.use("/:fruta", (req, res, next)=>{
    let frutas= JSON.parse(fs.readFileSync('./db/frutas.json', 'utf8')).frutas
    const { fruta } = req.params;
    frutas.includes(fruta)?next():res.send('<h1>Aquí no hay nada. Ve a http://localhost:3000/</h1>')
    
});

let arr=[]

app.get("/", (req, res)=>{
    let frutas= JSON.parse(fs.readFileSync('./db/frutas.json', 'utf8')).frutas
    res.render("Dashboard", {
    layout: "Dashboard",
    frutas,
    
    });
});

app.get("/:fruta", (req, res)=>{
    let frutas= JSON.parse(fs.readFileSync('./db/frutas.json', 'utf8')).frutas
    const { fruta } = req.params;
    arr.push(fruta)
    res.render("Dashboard", {
    layout: "Dashboard",
    frutas,
    arr
    });
});


app.get('/compras',(req, res)=>{
    res.render("Dashboard", {
    layout: "Modal",
    });
});
