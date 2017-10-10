const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');


// ASSOCIATION(s)
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  Category,
  Product,
  User
};
