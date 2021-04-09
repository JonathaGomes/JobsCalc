const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/"; // Fazer com o EJS vá ler o src/views

const Profile = {
  data: {
    name: "Jonatha",
    avatar: "https://avatars.githubusercontent.com/u/58338004?v=4",
    "monthly-budget": 4000,
    "days-per-week": 5,
    "hours-per-day": 6,
    "vacation-per-year": 5,
    "value-hour": 50,
  },
  controllers: {
    index(request, response) {
      return response.render(views + "profile", { profile: Profile.data });
    },
    update(request, response) {
      const data = request.body;

      // Definir quantas semanas tem em um ano
      const weeksPerYear = 52;

      // Remover as semanas de ferias do ano, para pegar quantas semanas têm 1 mês
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

      // Quantas horas por semana vou trabalhar
      const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];

      // Calcular o total de horas trabalhadas por mês
      const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

      // Valor da hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...request.body,
        "value-hour": valueHour,
      };  

      return response.redirect("/profile");
    },
  }
};

const Job = {
  data: [
    {
      id: 1,
      name: "Verlene Bolos",
      "daily-hours": 4,
      "total-hours": 3,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Frango do Chefe",
      "daily-hours": 2,
      "total-hours": 30,
      created_at: Date.now(),
    }
  ],
  controllers: {
    index(request, response) {
      const updatedJobs = Job.data.map((job) => {
        
        // Cálculo do restante de dias do job
        const remaining = Job.services.remainingDays(job);
        
        // se os dias restantes chegarem a 0
        const status = remaining <= 0 ? "done" : "progress";
        
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        };
      });
      return response.render(views + "index", { jobs: updatedJobs });
    },
    create(request, response) {
      return response.render(views + "job");
    },
    save(request, response) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;
      Job.data.push({
        id: lastId + 1,
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
        created_at: Date.now()
      });
      return response.redirect("/");
    },
    show(request, response) {

      const jobId = request.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send("Job not found!")
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return response.render(views + "job-edit", { job })
    },
    update(request, response) {

      const jobId = request.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send("Job not found!");
      }

      const updatedJob = {
        ...job,
        name: request.body.name,
        "total-hours": request.body["total-hours"],
        "daily-hours": request.body["daily-hours"]
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }

        return job;
      })

      return response.redirect("/job/" + jobId);



    },
    delete(request, response) {
      const jobId = request.params.id;

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

      return response.redirect("/");
    }
  },
  services: {
    remainingDays (job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
      // Criar a data apartir da criação do job
      const createdDate = new Date(job.created_at);
  
      const dueDay = createdDate.getDate() + Number(remainingDays);
  
      const dueDateInMs = createdDate.setDate(dueDay);
  
      const timeDiffInMs = dueDateInMs - Date.now();
  
      // transformar MS em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs);
  
      // restam x dias
      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
};

routes.get("/", Job.controllers.index);

routes.get("/job", Job.controllers.create);

routes.post("/job", Job.controllers.save);

routes.get("/job/:id", Job.controllers.show);

routes.post("/job/:id", Job.controllers.update);

routes.post("/job/delete/:id", Job.controllers.delete);

routes.get("/profile", Profile.controllers.index);

routes.post("/profile", Profile.controllers.update);

module.exports = routes;