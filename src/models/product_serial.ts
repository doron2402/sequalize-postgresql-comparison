import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';

interface ProductSerialAttrs {
  product_id: number; // BIGSERIAL
  store_id: number;   // BIGINT
  price_in_cents: number;
  name: string;
  description?: string | null;
  keywords?: string[];
  category?: string | null;
  created_at: Date;
  updated_at: Date;
}

type ProductSerialCreation = Optional<ProductSerialAttrs, 'product_id' | 'description'>;

export class ProductSerial extends Model<ProductSerialAttrs, ProductSerialCreation> implements ProductSerialAttrs {
  public product_id!: number;
  public store_id!: number;
  public price_in_cents!: number;
  public name!: string;
  public description!: string | null;
  public keywords?: string[];
  public category?: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

ProductSerial.init(
  {
    product_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    price_in_cents: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    keywords: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
    category: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'product_serial', timestamps: false }
);