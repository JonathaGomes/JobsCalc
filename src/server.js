const express = require("express");
const routes = require("./routes");
const app = express();
const path = require("path");

// Usar a template engine EJS
app.set("view engine", "ejs");

// Modificiar a localização do diretório views
app.set("views", path.join(__dirname, "views"));

// Habilitar/Ativar arquivos estáticos
app.use(express.static("public"));

// Habilitar/Ativa o request.body
app.use(express.urlencoded({ extende: true }));

app.use(routes);

app.listen(3000, () => console.log("Server started in port 3000"));