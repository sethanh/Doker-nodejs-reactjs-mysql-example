let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let cors = require('cors');
let app = express();
let PORT = 3001;

let options = {
  host: 'mysql_db',
  port: "3306",
  user: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: 'books'
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

app.use("/", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoute"));
app.use("/invoices", require("./routes/InvoicesRoute"));
app.use("/carts", require("./routes/cartsRoute"));
// app.get("/image", require("./routes/InvoicesRoute"));

// app.use("/books", require("./routes/bookRoutes"));
// app.use("/study", require("./routes/studyRoute"));
// app.use("/subject", require("./routes/subjectRoute"));
// app.use("/tables", require("./routes/TableRoute"));
// app.use("/speech", require("./routes/speechRoute"));
// app.use("/contacts/", require("./controllers/contacts/Controllers"));

// app.post("/upload", upload.single('profileImg'), (req, res) => {

// });

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
})

module.exports = app;