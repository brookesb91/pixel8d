import * as express from 'express';
import * as path from 'path';
import cors from 'cors';

import { router } from './app/router';
import { config } from './app/config';
import { connect } from './app/database';
import { seed } from './app/data';

const host = config.get('host');
const port = config.get('port');
const address = `${host}:${port}`;

const app = express();

app.set('view engine', 'pug');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(process.cwd(), 'web')));

app.use(router);

const server = app.listen(port, host, 500, async () => {
  const connection = await connect(config.get('database.connection.uri'));

  if ((await connection.model('Sprite').countDocuments()) === 0) {
    await seed();
  }

  console.log(`Listening at ${address}`);
});
server.on('error', console.error);
