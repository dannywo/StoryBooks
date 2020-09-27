const path = require('path');
const express = require('express');
const session = require('express-session')
const dotenv = require('dotenv'); // use environment variables
const morgan = require('morgan'); // logging
const exphbs = require('express-handlebars');
const passport = require('passport'); //authentication
const connectDB = require('./config/db'); // mongoose connections

// Load config
dotenv.config({ path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

connectDB();
const app = express();

// Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Hanglebars
app.engine('.hbs', exphbs({ defaulftLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Expression Session
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
// }))

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// Initate app with express
const port = process.env.PORT || 3000;

// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });

app.listen(port, () => console.log(`listening on http://localhost:${port} and running in ${process.env.NODE_ENV}`));
