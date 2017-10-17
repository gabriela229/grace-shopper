const { Product, Category, LineItem, Order, User } = require('./models')

const users = [
  {
    name: 'Doug Hnut',
    email: 'doughnut@gmail.com',
    password: 123
  },
  {
    name: 'Homer Simpson',
    email: 'homer@gmail.com',
    password: 234
  },
  {
    name: 'Test',
    email: '1@1.com',
    password: 1
  }
];

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
    image : '/public/images/chocolate.jpeg',
    description: "It's a Chocolate Donut, as expected.",
    price: 1.50,
    quantity: 999,
    categoryId: 1,
  },
  {
    title: "Chocolate Donut with Sprinkles",
    image : '/public/images/chocolate_sprinkle.jpeg',
    description: "It's a Chocolate Donut, with sprinkles!",
    price: 1.75,
    quantity: 99,
    categoryId: 1,
  },
  {
    title: "Apple Cider Donut",
    image : '/public/images/apple_cider.jpg',
    description: "New England-style donut with a cake base.",
    price: 1.75,
    quantity: 199,
    categoryId: 1,
  },
  {
    title: "Jelly Donut",
    image : '/public/images/jelly.jpeg',
    description: "Put some jelly in a donut.",
    price: 2.00,
    quantity: 100,
    categoryId: 2,
  },
  {
    title: "Cream-Filled Donut",
    image : '/public/images/cream_filled.jpeg',
    description: "Put some cream in a donut.",
    price: 2.25,
    quantity: 200,
    categoryId: 2,
  },
  {
    title: "Boston Creme Donut",
    image : '/public/images/boston_cream_filled.jpeg',
    description: "Vanilla custard filling? Yes, please.",
    price: 2.50,
    quantity: 300,
    categoryId: 2,
  },
  {
    title: "Mini Glazed Donut",
    image : '/public/images/mini_glazed.jpeg',
    description: "Tiny version of our Glazed Donut.",
    price: 0.50,
    quantity: 2000,
    categoryId: 3,
  },
  {
    title: "Mini Chocolate Donut",
    image : '/public/images/mini_chocolate.png',
    description: "Tiny version of our Chocolate Donut.",
    price: 0.75,
    quantity: 1500,
    categoryId: 3,
  },
  {
    title: "Savory Donut",
    image: "/public/images/savory.jpeg",
    description: "Basically a donut you could eat for lunch.",
    price: 3.00,
    quantity: 12,
    categoryId: 4,
  },
  {
    title: "Vegan Donut",
    image : '/public/images/vegan.jpeg',
    description: "The world's best Vegan Donut!",
    price: 2.00,
    quantity: 24,
    categoryId: 4,
  },
];

const orders = [
  {
    address: "300 east 39th street, NY",
    isCart: false,
    userId: 3
  },
  {
    address: "5 Hanover Square, Floor 25, New York, NY 10004",
    isCart: false,
    userId: 3
  },
  {
    address: "",
    isCart: true,
    userId: 3
  }
];

const lineItems = [
  {
    productId: 1,
    orderId: 1,
    quantity: 5
  },
  {
    productId: 5,
    orderId: 1,
    quantity: 2
  },
  {
    productId: 1,
    orderId: 2,
    quantity: 7
  },
  {
    productId: 1,
    orderId: 3,
    quantity: 2
  },
  {
    productId: 4,
    orderId: 3,
    quantity: 5
  },
  {
    productId: 9,
    orderId: 3,
    quantity: 7
  }
];

const seed = () => {
  Category.bulkCreate(categories)
    .then(() => {
      User.bulkCreate(users);
    })
    .then(() => {
      Product.bulkCreate(products);
    })
    .then(() => {
      Order.bulkCreate(orders);
    })
    .then(() => {
      LineItem.bulkCreate(lineItems);
    });
};

module.exports = seed;
