import express from "express";
import {crearSolicitud,buscarSolicitudes} from "../controladores/solicitarMascotaController.js";

const routerSolicitud = express.Router();

routerSolicitud.post('/crear', crearSolicitud);
routerSolicitud.get('/buscarTodo', buscarSolicitudes);

export { routerSolicitud };