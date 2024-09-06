import * as express from "express";
import { pool } from "../Util/database";

export class User {
  static getUsers(res: express.Response, email: string, password: string) {
    pool.query(
      "SELECT email, fullname, join_date, role FROM shirtdogshop.users_sds WHERE email= ? AND password = ?;",
      [email, password],
      function (err, results) {
        if (err != null) {
          console.log(err);
          res.status(500).json(err.message);
        } else {
          res.status(200).json(results);
        }
      }
    );
  }

  static registerUserSDS(
    res: express.Response,
    email: string,
    fullname: string,
    password: string
  ) {
    pool.execute(
      "INSERT INTO users_sds (email, fullname, password) VALUES (?, ?, ?);",
      [email, fullname, password],
      function (err, results, fields) {
        if (err != null) {
          if (
            err.message.includes("Duplicate entry") &&
            err.message.includes("for key 'users_sds.email_UNIQUE'")
          ) {
            res.statusMessage = "E-mail is already used.";
            res.status(409).json(err.message);
          } else if (
            err.message.includes("Data too long") &&
            err.message.includes("email")
          ) {
            res.statusMessage = "E-mail too long. 320 Characters max.";
            res.status(409).json(err.message);
          } else if (
            err.message.includes("Data too long") &&
            err.message.includes("fullname")
          ) {
            res.statusMessage = "Name too long. 255 Characters max.";
            res.status(409).json(err.message);
          } else {
            res.status(500).json(err.message);
          }
          console.log(err);
        } else {
          res.status(200).json(results);
        }
      }
    );
  }
}
