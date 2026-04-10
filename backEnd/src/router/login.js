import express from "express";
const routerLogin = express.Router()

import {login, esqueciSenha} from"../controller/loginController.js";

routerLogin.post('/login', login);
routerLogin.post('/esqueci_senha', esqueciSenha);

export {routerLogin};