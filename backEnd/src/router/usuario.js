import express from'express';
const routerUser = express.Router();

import {createUser, editUser, getUsers, deleteUser} from'../controller/usuarioController.js';

routerUser.post('/usuario', createUser); //criar usuario
routerUser.get('/usuario', getUsers); //listar usuarios
routerUser.patch('/usuario/:id', editUser); //editar usuario
routerUser.delete('/usuario/:id', deleteUser);

export {routerUser};