// If we used const express = require('express');, the compiler interprets everything express related as any
// If we use the import statement (after installing @types/express), the compiler knows the actual types

import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('json spaces', 40);

// If you cannot get rid of an unused variable, preface it with an underscore. This informs the compiler that you can't do anything to remove it
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let height = req.query.height;
  let weight = req.query.weight;

  if (!height || !weight) {
    res.status(400);
    res.send("Missing parameter height or weight!");
  }

  else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400);
    res.send("The query parameters must be numbers!");
  } else {
    res.json({ weight: Number(weight), height: Number(height), bmi: calculateBmi(Number(height), Number(weight))});
  }
})
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});