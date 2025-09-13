import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';

interface ProductV4Attrs {
  product_id: string; // uuid v7 in DB
  store_id: string;   // uuid v7 in DB
  price_in_cents: number;
  name: string;
  description?: string | null;
  keywords?: string[];
  category?: string | null;
  created_at: Date;
  updated_at: Date;
}

type ProductV4Creation = Optional<ProductV4Attrs, 'product_id' | 'description'>;

export class ProductV4 extends Model<ProductV4Attrs, ProductV4Creation> implements ProductV4Attrs {
  public product_id!: string;
  public store_id!: string;
  public price_in_cents!: number;
  public name!: string;
  public description!: string | null;
  public keywords!: string[];
  public category!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

ProductV4.init(
  {
    product_id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUID },
    store_id: { type: DataTypes.UUID, allowNull: false },
    price_in_cents: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    keywords: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
    category: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'product_v7', timestamps: false }
);

ProductV4.init(
  {
    product_id: { type: DataTypes.UUID, primaryKey: true },
    store_id: { type: DataTypes.UUID, allowNull: false },
    price_in_cents: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    keywords: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
    category: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'product_v4', timestamps: false }
);