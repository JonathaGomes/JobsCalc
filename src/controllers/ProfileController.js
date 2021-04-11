const Profile = require("../model/Profile");

module.exports = {
  async index(request, response) {
    return response.render("profile", { profile: await Profile.get() });
  },
  async update(request, response) {
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

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...request.body,
      "value-hour": valueHour,
    });

    return response.redirect("/profile");
  },
};
