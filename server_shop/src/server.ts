import express from 'express';
import { formatWithOptions } from 'util';
import { pool } from './Util/database';
import { registerUserSDS, getUsersSDS } from './controllers/users_sds';

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post("/get_user_sds", (req, res) => {
  const email: string = <string>req.body.email;
  const password: string = <string>req.body.password;
  getUsersSDS(req, res, email, password);
});

//route om gebruiker te registreren
app.post("/register_user_sds", (req, res) => {
  const email: string = <string>req.body.email;
  const fullname: string = <string>req.body.fullname;
  const password: string = <string>req.body.password;
  registerUserSDS(res, email, fullname, password);
});


// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
