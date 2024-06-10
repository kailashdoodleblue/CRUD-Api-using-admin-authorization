const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/emploeeRoutes');
const sequelize = require('./config/database');

const app = express()
app.use(bodyParser.json());

app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
