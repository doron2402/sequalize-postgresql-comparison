import { FastifyInstance } from 'fastify';
import { ProductV4 } from '../models/product_v4';
import { ProductV7 } from '../models/product_v7';
import { ProductSerial } from '../models/product_serial';
import { Op } from 'sequelize';

export default async function routes(fastify: FastifyInstance) {

  /****
   *
   * V4
   */
  fastify.get<{
    Params: { store_id: string; product_id: string };
  }>('/v4/stores/:store_id/products/:product_id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
          product_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Product ID must be a valid UUID' } },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductV4.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string; limit: number; offset: number };
  }>('/v4/stores/:store_id/products', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
        },
      },
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string', pattern: '^[A-Za-z0-9 ]+$', errorMessage: { type: 'Search must be a string' } },
          limit: { type: 'number', minimum: 1, maximum: 500, default: 100 },
          offset: { type: 'number', minimum: 0, default: 0 },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductV4.findAll({
      attributes: ['product_id', 'name', 'description', 'category', 'updated_at'],
      where,
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['product_id', 'DESC']] });
    return reply.send(rows);
  });

  /****
   *
   * V7
   */
  fastify.get<{
    Params: { store_id: string; product_id: string };
  }>('/v7/stores/:store_id/products/:product_id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
          product_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Product ID must be a valid UUID' } },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductV7.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string; limit: number; offset: number };
  }>('/v7/stores/:store_id/products', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
        },
      },
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string', pattern: '^[A-Za-z0-9 ]+$', errorMessage: { type: 'Search must be a string' } },
          limit: { type: 'number', minimum: 1, maximum: 500, default: 100 },
          offset: { type: 'number', minimum: 0, default: 0 },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductV7.findAll({
      attributes: ['product_id', 'name', 'description', 'category', 'updated_at'],
      where,
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['product_id', 'DESC']]
    });
    return reply.send(rows);
  });

  /****
   *
   * Serial
   */
  fastify.get<{
    Params: { store_id: string; product_id: string };
  }>('/serial/stores/:store_id/products/:product_id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
          product_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Product ID must be a valid UUID' } },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductSerial.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string; limit: number; offset: number };
  }>('/serial/stores/:store_id/products', {
    schema: {
      params: {
        type: 'object',
        properties: {
          store_id: { type: 'string', format: 'uuid', errorMessage: { type: 'Store ID must be a valid UUID' } },
        },
      },
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string', pattern: '^[A-Za-z0-9 ]+$', errorMessage: { type: 'Search must be a string' } },
          limit: { type: 'number', minimum: 1, maximum: 500, default: 100 },
          offset: { type: 'number', minimum: 0, default: 0 },
        },
      },
    },
  }, async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductSerial.findAll({
      attributes: ['product_id', 'name', 'description', 'category', 'updated_at'],
      where,
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['product_id', 'DESC']]
    });
    return reply.send(rows);
  });
}