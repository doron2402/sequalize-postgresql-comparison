import Fastify from 'fastify';
import routes from './routes/products';
import { sequelize } from './db/sequelize';
import ajvFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import Ajv from 'ajv';

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
});

ajvFormats(ajv);
ajvErrors(ajv);

async function bootstrap() {
  const app = Fastify({
    logger: {
      serializers: {
        req: (req: any) => {
          return {
            method: req.method,
            url: req.url,
          };
        },
        res: (res: any) => {
          return {
            statusCode: res.statusCode,
            headers: res.headers
          };
        },
      },
      redact: ['headers.token', 'headers.authorization',],
      level: process.env.LOG_LEVEL || 'info'
    }
  });

  // Set the validator compiler (this will support UUID)
  app.setValidatorCompiler((opt) => ajv.compile(opt.schema));

  await sequelize.authenticate();
  app.register(routes);

  const port = +(process.env.PORT || 3000);
  await app.listen({ port, host: '0.0.0.0' });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});