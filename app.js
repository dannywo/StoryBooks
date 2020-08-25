const path = require('path');
const express = require('express');
// use environment variables
const dotenv = require('dotenv');
// logging
const morgan = require('morgan');

const exphbs = require('express-handlebars');

// mongoose connections
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env'});

connectDB();
const app = express();

// Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Hanglebars
app.engine('.hbs', exphbs({ defaulftLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

// Initate app with express
const port = process.env.PORT || 3000;

// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });

app.listen(port, () => console.log(`listening on http://localhost:${port} and running in ${process.env.NODE_ENV}`));
