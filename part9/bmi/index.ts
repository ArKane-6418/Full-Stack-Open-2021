// If we used const express = require('express');, the compiler interprets everything express related as any
// If we use the import statement (after installing @types/express), the compiler knows the actual types

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

// If you cannot get rid of an unused variable, preface it with an underscore. This informs the compiler that you can't do anything to remove it
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    return res.status(400).send("Missing parameter height or weight!");
  }

  else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send("The query parameters must be numbers!");
  } else {
    return res.json({ weight: Number(weight), height: Number(height), bmi: calculateBmi(Number(height), Number(weight))});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "Parameters missing" });
  } else if (daily_exercises.some(isNaN) || isNaN(target)) {
    return res.status(400).send({ error: "Malformatted parameters"});
  } else {
    return res.json(calculateExercises(target, daily_exercises));
  }


})
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});