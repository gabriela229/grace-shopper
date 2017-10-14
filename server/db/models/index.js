const Category = require('./Category');
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const User = require('./User');

// ASSOCIATION(s)
Category.hasMany(Product);
Product.belongsTo(Category);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(User);

module.exports = {
  Category,
  Product,
  LineItem,
  Order,
  User
};
