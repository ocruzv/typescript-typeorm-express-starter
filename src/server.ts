require('dotenv').config();
import 'reflect-metadata';
import App from './app';
const PORT = process.env.PORT || 3000;

import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Connected to the db.');
    const app = new App();
    app.initialize();

    app.defaultApp.listen(PORT, () => {
      console.log('Express server listening on port ' + PORT);
    });
  })
  .catch(error => console.log(error));
