import Fastify from 'fastify';
import routes from './routes/products';
import { sequelize } from './db/sequelize';

async function bootstrap() {
  const app = Fastify({ logger: true });

  await sequelize.authenticate();
  app.register(routes);

  const port = +(process.env.PORT || 3000);
  await app.listen({ port, host: '0.0.0.0' });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});