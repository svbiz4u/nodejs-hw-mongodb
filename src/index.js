// src/index.js

const message = 'Hello world';

console.log(message);
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();