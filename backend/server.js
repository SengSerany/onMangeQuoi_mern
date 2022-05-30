const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

// Call routers
const dishRouter = require('./routes/dishRoutes');

// Set routes
app.use('/api/v1/dish', dishRouter);

app.listen(port, () => {
  console.log(`> Server is listening on port ${port}`);
});
