const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({ secret: 'Donuts are awesome' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/api', require('./api'));

app.get('/*', (req, res, next)=> res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.use(function (err, req, res, next) {
    console.log(err, err.stack);
    res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;

// db and server
const db = require('./db');
const seed = require('./db/seed.js');

db.sync({ force: true })
  .then(seed)
  .then(() => {
    console.log('Database is synced!');
    app.listen(PORT, () => console.log(`GS listening on port ${ PORT }...`));
  });
