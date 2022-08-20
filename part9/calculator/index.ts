// If we used const express = require('express');, the compiler interprets everything express related as any
// If we use the import statement (after installing @types/express), the compiler knows the actual types

import express from 'express';

const app = express();

// If you cannot get rid of an unused variable, preface it with an underscore. This informs the compiler that you can't do anything to remove it
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});