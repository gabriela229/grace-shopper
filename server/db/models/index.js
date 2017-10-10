const Category = require('./Category');
const Product = require('./Product');

// ASSOCIATION(s)
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  Category,
  Product,
};
