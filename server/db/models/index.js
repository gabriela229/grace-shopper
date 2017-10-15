const Category = require('./Category');
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Review = require('./Review');
const User = require('./User');

// ASSOCIATION(s)
Category.hasMany(Product);
Product.belongsTo(Category);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(User);

Review.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(User, {as: 'reviewer'});
User.hasMany(Review);

module.exports = {
  Category,
  Product,
  LineItem,
  Order,
  Review,
  User
};
