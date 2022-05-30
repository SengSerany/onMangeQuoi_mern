const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).json({ entryPoint: 'login' });
});

app.listen(port, () => {
  console.log(`> Server is listening on port ${port}`);
});
