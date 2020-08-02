import * as express from 'express';

import { router } from './app/router';

const port = process.env.port || 3333;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
