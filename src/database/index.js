import { Sequelize } from "sequelize";
import mongoose from "mongoose";

import User from "../apps/models/User";

// import configDatabase from "../config/database";
import Product from "../apps/models/Product";
import Category from "../apps/models/Category";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(
      "postgresql://postgres:dXYqwZenftFUemZkWonjaDUDYEhZdVwh@roundhouse.proxy.rlwy.net:48032/railway",
    );
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:RvRcAfJRwldbyTfLuFQhZUgjSwzEwhmc@monorail.proxy.rlwy.net:12622",
    );
  }
}

export default new Database();
