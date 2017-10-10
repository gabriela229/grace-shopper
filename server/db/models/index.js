const Category = require('./Category');
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');

// ASSOCIATION(s)
Category.hasMany(Product);
Product.belongsTo(Category);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

module.exports = {
  Category,
  Product,
};
