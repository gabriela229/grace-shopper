const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['/public/images/default-product.png']
  }
}, {
  getterMethods: {
    quantityCounter() {
      const quantityArray = [];
      for (var i = 1; i < this.quantity; i++) {
        quantityArray.push(i);
      }
      return quantityArray;
    }
  }
});

module.exports = Product;
