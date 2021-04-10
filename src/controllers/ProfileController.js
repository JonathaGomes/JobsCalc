const Profile = require("../model/Profile");

module.exports = {
  index(request, response) {
    return response.render("profile", { profile: Profile.get() });
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

    Profile.update({
      ...Profile.get(),
      ...request.body,
      "value-hour": valueHour,
    });

    return response.redirect("/profile");
  },
};
