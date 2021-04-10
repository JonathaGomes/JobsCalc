let data = {
  name: "Jonatha",
  avatar: "https://avatars.githubusercontent.com/u/58338004?v=4",
  "monthly-budget": 4000,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacation-per-year": 5,
  "value-hour": 50,
};

// OBS: Model é quem cuida dos dados

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
