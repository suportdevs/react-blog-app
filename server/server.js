const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// internal exports
const dbConnect = require('./db/dbconnection');
const auth = require('./routes/auth');
const web = require("./routes/web");
const AuthenticatedMiddleware = require('./middleware/AuthenticatedMiddleware');

const app = express();
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static('../public'));
// Use the cookie-parser middleware
// app.use(cookieParser());
// use middleware
dotenv.config();

// database connection
dbConnect();

app.get('/', (req, res) => {
  return res.send('runing...');
})
app.use('/auth', auth);
app.use('/', web);

app.use((err, req, res, next) => {
  if(err){
      if(err instanceof require('multer').MulterError){
          res.status(400).json({ error: "Upload error", message: err.message });
      } else if(err instanceof require('mongoose').Error.ValidationError){
          res.status(400).json({ error: "Mongoose validation error", message: err.errors });
      }else if (err.code === 11000 && err.keyPattern) {
        // Use err.keyValue to show the conflicting value
        res.status(400).json({ error: 'Mongoose unique error', message: `${err.keyValue} is already in use` });
      }else if (err.name === 'JsonWebTokenError') {
        // Handle JWT validation errors
        return res.status(401).json({ message: 'Unauthorized', error });
      }else {
          res.status(400).json({ error: "Error", message: err.message });
      }
      next(err);
  } 
})

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
    console.log(`Server is runging  on port ${port}`);
})
