require('dotenv').config();
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let cors = require('cors');
let app = express();

const db = require("./models");
const {
  userRoutes, shopRoutes, staffRoutes, unitRoutes,
  productRoutes, invoicesRoutes, cartRoutes, uploadRoutes,
} = require('./routes');

let options = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.userroot,
  password: process.env.passwordroot,
  database: process.env.database
};
let sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: false
}));
app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

app.use("/users", userRoutes);
app.use("/shops", shopRoutes);
app.use("/staffs", staffRoutes);
app.use("/units", unitRoutes);
app.use("/products", productRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/carts", cartRoutes);
app.use("/uploads", uploadRoutes);


app.use(express.static('public'));
app.listen(process.env.listionport, () => {
  console.log("Server started on http://localhost:" + process.env.listionport);
})

module.exports = app;