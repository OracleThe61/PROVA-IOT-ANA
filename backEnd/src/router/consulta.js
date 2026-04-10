import express from "express"
import { getConsultas,adicionarConsulta,deletarConsulta,editarConsulta } from "../controller/consultaController.js"

const routerConsult = express.Router();

routerConsult.get('/consulta',getConsultas)
routerConsult.post('/consulta',adicionarConsulta)
routerConsult.patch('/consulta/:id',editarConsulta)
routerConsult.delete('/consulta/:id',deletarConsulta)

export {routerConsult};