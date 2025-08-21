const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db');
const routes = require('./routes');


const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('DB sync error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
