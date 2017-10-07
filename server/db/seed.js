const Product = require('./models/Product');
const Category = require('./models/Category');

const categories = [
  {
    title: "Original",
    description: "Classic, torus-shaped donuts!",
  },
  {
    title: "Filled",
    description: "Ellipsoidal donuts with a delicious filling!",
  },
  {
    title: "Mini",
    description: "Tiny donut spheres!",
  },
  {
    title: "Specialty",
    description: "Speciality donuts, including our world-famous vegan donuts!",
  },
];

const products = [
  {
    title: "Glazed Donut",
    description: "Plain ol' Glazed Donut.",
    price: 1.00,
    quantity: 1000,
    categoryId: 1,
  },
  {
    title: "Chocolate Donut",
    description: "It's a Chocolate Donut, as expected.",
    price: 1.50,
    quantity: 999,
    categoryId: 1,
  },
  {
    title: "Chocolate Donut with Sprinkles",
    description: "It's a Chocolate Donut, with sprinkles!",
    price: 1.75,
    quantity: 99,
    categoryId: 1,
  },
  {
    title: "Apple Cider Donut",
    description: "New England-style donut with a cake base.",
    price: 1.75,
    quantity: 199,
    categoryId: 1,
  },
  {
    title: "Jelly Dounut",
    description: "Put some jelly in a donut.",
    price: 2.00,
    quantity: 100,
    categoryId: 2,
  },
  {
    title: "Cream-Filled Donut",
    description: "Put some cream in a donut.",
    price: 2.25,
    quantity: 200,
    categoryId: 2,
  },
  {
    title: "Boston Creme Donut",
    description: "Vanilla custard filling? Yes, please.",
    price: 2.50,
    quantity: 300,
    categoryId: 2,
  },
  {
    title: "Mini Glazed Donut",
    description: "Tiny version of our Glazed Donut.",
    price: 0.50,
    quantity: 2000,
    categoryId: 3,
  },
  {
    title: "Mini Chocolate Donut",
    description: "Tiny version of our Chocolate Donut.",
    price: 0.75,
    quantity: 1500,
    categoryId: 3,
  },
  {
    title: "Savory Donut",
    description: "Basically a donut you could eat for lunch.",
    price: 3.00,
    quantity: 12,
    categoryId: 4,
  },
  {
    title: "Vegan Donut",
    description: "The world's best Vegan Donut!",
    price: 2.00,
    quantity: 24,
    categoryId: 4,
  },
];

const seed = () => {
  Promise.all(categories.map(category => {
    Category.create(category);
  }))
  .then(() => {
    Promise.all(products.map(product => {
      Product.create(product);
    }));
  });
};

module.exports = seed;