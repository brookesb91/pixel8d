import dotenv from 'dotenv';
import * as convict from 'convict';

dotenv.config();

const config = convict({
  env: {
    doc: 'Node environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  host: {
    doc: 'Host address to bind.',
    format: String,
    default: '0.0.0.0',
    env: 'HOST',
  },
  port: {
    doc: 'Port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  database: {
    connection: {
      uri: {
        doc: 'MongoDB URI',
        format: String,
        default: 'mongodb://localhost/pixelate',
        env: 'MONGODB_URI',
      },
    },
  },
});

config.validate({ allowed: 'strict' });

export { config };
