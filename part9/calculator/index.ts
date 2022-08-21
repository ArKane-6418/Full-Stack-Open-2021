// If we used const express = require('express');, the compiler interprets everything express related as any
// If we use the import statement (after installing @types/express), the compiler knows the actual types

import express from 'express';
import { calculator } from './calculator';

const app = express();
app.use(express.json());

// If you cannot get rid of an unused variable, preface it with an underscore. This informs the compiler that you can't do anything to remove it
app.get('/ping', (_req, res) => {
  res.send('pong');
});

// ISSUE: All the values parsed from the request body have type 'any'
// But in our tsconfig file we set noImplicitAny to true, so why is the compiler not complaining?
// The query field of an express Request object is explicitly typed as any, same with reqyest.body
// We use eslint to disallow explicit any
app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = req.body;

  if (!value1) {
    return res.status(400).send({ error: "value1 is missing."});
  }

  if (isNaN(Number(value1))) {
    return res.status(400).send({ error: "value1 is not a number."});
  }

  if (!value2) {
    return res.status(400).send({ error: "value2 is missing."});
  }

  if (isNaN(Number(value2))) {
    return res.status(400).send({ error: "value2 is not a number."});
  }

  if (!op) {
    return res.status(400).send({ error: "op is missing."});
  }

  if (!['add', 'subtract', 'multiply', 'divide'].includes(op)) {
    return res.status(400).send({ error: "op is not a valid operator."});
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);

  return res.send({ "result": result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});