import express from "express";
import cors from'cors';
import { routerUser } from "./router/usuario.js";
import { routerLogin } from "./router/login.js";
import { routerConsult } from "./router/consulta.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerUser);
app.use(routerLogin);
app.use(routerConsult);

export {app};
