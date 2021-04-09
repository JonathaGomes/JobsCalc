const express = require("express");
const routes = require("./routes");
const app = express();

// Usar a template engine EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extende: true }));
app.use(routes);

app.listen(3000, () => console.log("Server started in port 3000"));