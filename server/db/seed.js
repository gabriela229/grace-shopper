const { Product, Category, LineItem, Order, User, Review } = require('./models');
const bcrypt = require('bcrypt');

function createPassword(password){
  return bcrypt.genSalt(10)
    .then( salt => {
      return bcrypt.hash(password, salt);
    })
    .then( hash => {
        return hash;
    })
    .catch(err => console.log(err));
}

const users = [
  {
    name: 'Doug Hnut',
    email: 'doughnut@gmail.com',
    password: '123',
    isAdmin: true
  },
  {
    name: 'Homer Simpson',
    email: 'homer@gmail.com',
    password: '234',
    passwordExpired: true
  },
  {
    name: 'Duncan Donaught',
    email: 'duncan@gmail.com',
    password: '123'
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
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/chocolate.jpeg', 'https://s3.us-east-2.amazonaws.com/graceshopper/chocolate_sprinkle.jpeg'],
    description: "It's a Chocolate Donut, as expected.",
    price: 1.50,
    quantity: 999,
    categoryId: 1,
  },
  {
    title: "Chocolate Donut with Sprinkles",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/chocolate_sprinkle.jpeg'],
    description: "It's a Chocolate Donut, with sprinkles!",
    price: 1.75,
    quantity: 99,
    categoryId: 1,
  },
  {
    title: "Apple Cider Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/apple_cider.jpg'],
    description: "New England-style donut with a cake base.",
    price: 1.75,
    quantity: 199,
    categoryId: 1,
  },
  {
    title: "Jelly Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/jelly.jpeg'],
    description: "Put some jelly in a donut.",
    price: 2.00,
    quantity: 100,
    categoryId: 2,
  },
  {
    title: "Cream-Filled Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/cream_filled.jpeg'],
    description: "Put some cream in a donut.",
    price: 2.25,
    quantity: 200,
    categoryId: 2,
  },
  {
    title: "Boston Creme Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/boston_cream_filled.jpeg'],
    description: "Vanilla custard filling? Yes, please.",
    price: 2.50,
    quantity: 300,
    categoryId: 2,
  },
  {
    title: "Mini Glazed Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/mini_glazed.jpeg'],
    description: "Tiny version of our Glazed Donut.",
    price: 0.50,
    quantity: 2000,
    categoryId: 3,
  },
  {
    title: "Mini Chocolate Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/mini_chocolate.png'],
    description: "Tiny version of our Chocolate Donut.",
    price: 0.75,
    quantity: 1500,
    categoryId: 3,
  },
  {
    title: "Savory Donut",
    image: ["https://s3.us-east-2.amazonaws.com/graceshopper/savory.jpeg"],
    description: "Basically a donut you could eat for lunch.",
    price: 3.00,
    quantity: 12,
    categoryId: 4,
  },
  {
    title: "Vegan Donut",
    image : ['https://s3.us-east-2.amazonaws.com/graceshopper/vegan.jpeg'],
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
    userId: 3,
    status: 'Completed'
  },
  {
    address: "5 Hanover Square, Floor 25, New York, NY 10004",
    isCart: false,
    userId: 2,
    status: 'Processing'
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

const reviews = [
  {
    content: "Great donut! Just try it!",
    isVerified: true,
    productId: 1,
    userId: 1
  },
  {
    content: "This donut changed my life.",
    isVerified: true,
    productId: 1,
    userId: 2
  },
  {
    content: "I've heard that these are the best.",
    isVerified: false,
    productId: 1,
    userId: 3
  },
  {
    content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
    isVerified: false,
    productId: 1,
    userId: 3
  }
];

const seed = () => {
  Category.bulkCreate(categories)
    .then(() => {
      return Promise.all([
        createPassword(users[0].password),
        createPassword(users[1].password),
        createPassword(users[2].password)
      ]);
    })
    .then(([pass1, pass2, pass3]) => {
      users[0].password = pass1;
      users[1].password = pass2;
      users[2].password = pass3;
    })
    .then( () => User.bulkCreate(users))
    .then(() => Product.bulkCreate(products))
    .then(() => Order.bulkCreate(orders))
    .then(() => LineItem.bulkCreate(lineItems))
    .then(() => Review.bulkCreate(reviews))
    .catch( err => console.log(err));
};

module.exports = seed;
