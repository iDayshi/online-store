const express = require('express');
const mongoose = require('mongoose').default;
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');
const path = require('path')
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

const PORT = process.env.PORT || config.get("port") || 8080;

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath = path.join(__dirname, 'client', 'index.html')

  app.get('*', (res,req)=>{
    res.sendFile(indexPath)
  })
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(config.get('mongoUri'));
    console.log(chalk.yellowBright.inverse(`MongoDB connected`));
    app.listen(PORT, () => {
      console.log(chalk.green.inverse(`Server started. Port: ${PORT}`));
    });
  } catch (err) {
    console.log(chalk.red.inverse(`ERROR: ${err.message}`));
    process.exit(1);
  }
}

start().then();
