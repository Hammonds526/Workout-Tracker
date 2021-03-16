const mongoose = require("mongoose");
const Workout = require("../models/workout");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    Workout.find()
      .sort({ _id: 1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => res.json(error));
  });

  app.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then(() => {
        Workout.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { totalDuration: req.body.duration } }
        )
          .then((updatedWorkout) => {
            res.json(updatedWorkout);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
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
