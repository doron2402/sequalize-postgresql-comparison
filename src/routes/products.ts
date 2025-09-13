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
  }>('/v4/stores/:store_id/products/:product_id', async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductV4.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string };
  }>('/v4/stores/:store_id/products', async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductV4.findAll({ where, limit: 100, order: [['product_id', 'DESC']] });
    return reply.send(rows);
  });

  /****
   *
   * V7
   */
  fastify.get<{
    Params: { store_id: string; product_id: string };
  }>('/v7/stores/:store_id/products/:product_id', async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductV7.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string };
  }>('/v7/stores/:store_id/products', async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductV7.findAll({ where, limit: 100, order: [['product_id', 'DESC']] });
    return reply.send(rows);
  });

  /****
   *
   * Serial
   */
  fastify.get<{
    Params: { store_id: string; product_id: string };
  }>('/serial/stores/:store_id/products/:product_id', async (req, reply) => {
    const { store_id, product_id } = req.params;
    const row = await ProductSerial.findOne({ where: { store_id, product_id } });
    if (!row) {
      return reply.code(404).send({ message: 'Not found' });
    }
    return reply.send(row);
  });

  fastify.get<{
    Params: { store_id: string };
    Querystring: { search?: string };
  }>('/serial/stores/:store_id/products', async (req, reply) => {
    const { store_id } = req.params;
    const where: any = { store_id };
    if (req.query.search) {
      const { search } = req.query;
      where.name = { [Op.iLike]: `%${search}%` };
      where.description = { [Op.iLike]: `%${search}%` };
      where.keywords = { [Op.contains]: search };
    }
    const rows = await ProductSerial.findAll({ where, limit: 100, order: [['product_id', 'DESC']] });
    return reply.send(rows);
  });
}