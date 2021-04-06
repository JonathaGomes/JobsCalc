const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/"; // Fazer com o EJS vá ler o src/views

const profile = {
  name: "Jonatha",
  avatar: "https://avatars.githubusercontent.com/u/58338004?v=4",
  "monthly-budget": 4000,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacations-per-year": 5 
};

routes.get("/", (request, response) => response.render(views + "index"));
routes.get("/job", (request, response) => response.render(views + "job"));
routes.get("/job/edit", (request, response) => response.render(views + "job-edit"));
routes.get("/profile", (request, response) => response.render(views + "profile", { profile }));

module.exports = routes;