let data = [
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
  },
];

module.exports = {
  get() {
    return data;
  },
  update(newJob) {
    data = newJob;
  },
  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },
};
