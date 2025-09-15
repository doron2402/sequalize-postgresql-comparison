const { randomUUID } = require('crypto');
import { QueryInterface } from 'sequelize';
import { ProductV4 } from '../src/models/product_v4';
import { ProductV7 } from '../src/models/product_v7';
import { ProductSerial } from '../src/models/product_serial';

function randomString(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function randomKeywords() {
  return [randomString(5), randomString(6), randomString(4)];
}

const storesv4 = Array.from({ length: 10 }, (_, idx) => ({ store_id: randomUUID() }));
const storesv7 = Array.from({ length: 10 }, (_, idx) => ({ store_id: randomUUID({ version: 7 }) }));
const storesserial = Array.from({ length: 10 }, (_, idx) => ({ store_id: idx }));

const BATCH_SIZE = 10000;
const TOTAL = 1000000;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // product_v4
    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const batch = Array.from({ length: BATCH_SIZE }, () => ({
        product_id: randomUUID(),
        store_id: storesv4[Math.floor(Math.random() * storesv4.length)].store_id,
        price_in_cents: Math.floor(Math.random() * 10000),
        name: randomString(10),
        description: randomString(20),
        keywords: randomKeywords(),
        category: randomString(8),
        created_at: new Date(),
        updated_at: new Date(),
      }));
      console.log(`Inserting v4 batch ${i} of ${TOTAL}`);
      await queryInterface.bulkInsert('product_v4', batch);
    }
    // product_v7
    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const batch = Array.from({ length: BATCH_SIZE }, () => ({
        product_id: randomUUID({ version: 7 }),
        store_id: storesv7[Math.floor(Math.random() * storesv7.length)].store_id,
        price_in_cents: Math.floor(Math.random() * 10000),
        name: randomString(10),
        description: randomString(20),
        keywords: randomKeywords(),
        category: randomString(8),
        created_at: new Date(),
        updated_at: new Date(),
      }));
      console.log(`Inserting v7 batch ${i} of ${TOTAL}`);
      await queryInterface.bulkInsert('product_v7', batch);
    }
    // product_serial
    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const batch = Array.from({ length: BATCH_SIZE }, (_, idx) => ({
        // product_id is auto-increment
        store_id: storesserial[Math.floor(Math.random() * storesserial.length)].store_id,
        price_in_cents: Math.floor(Math.random() * 10000),
        name: randomString(10),
        description: randomString(20),
        keywords: randomKeywords(),
        category: randomString(8),
        created_at: new Date(),
        updated_at: new Date(),
      }));
      console.log(`Inserting serial batch ${i} of ${TOTAL}`);
      await queryInterface.bulkInsert('product_serial', batch);
    }
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('product_v4', {});
    await queryInterface.bulkDelete('product_v7', {});
    await queryInterface.bulkDelete('product_serial', {});
  },
};
