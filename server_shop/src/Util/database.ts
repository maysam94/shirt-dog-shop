import * as mysql2 from 'mysql2';
 
// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'EnterPasswordHere',
  database: 'shirtdogshop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});