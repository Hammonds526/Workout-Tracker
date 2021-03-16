const mongoose = require("mongoose");
const Workout = require("../models/workout");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => res.json(error));
  });

  app.get("/api/workouts", (req, res) => {
    Workout.findOne()
      .sort({ created_at: -1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => res.json(error));
  });

  app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => res.json(error));
  });

  app.put("/api/workouts/:id", (req, res) => {
    const currentWorkout = req.params.id;
    Workout.findByIdAndUpdate(currentWorkout, {
      $push: { exercises: req.body },
    })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => res.json(error));
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find()
      .sort({ _id: 1 })
      .then((data) => {
        if (data.length > 7) {
          res.json(data.splice(8));
        } else {
          res.json(data);
        }
      })
      .catch((error) => res.json(error));
  });
};
