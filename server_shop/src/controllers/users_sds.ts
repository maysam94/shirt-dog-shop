import * as express from "express";
import { stringify } from "querystring";
import { User } from "../models/users_sds";

export const getUsersSDS = (
  req: express.Request,
  res: express.Response,
  email: string,
  password: string
) => {
  User.getUsers(res, email, password);
};

export const registerUserSDS = (
  res: express.Response,
  email: string,
  fullname: string,
  password: string
) => {
  User.registerUserSDS(res, email, fullname, password);
};
