import express from "express";
import {crearSolicitud,buscarSolicitudes,buscarSolicitudPorId} from "../controladores/solicitarMascotaController.js";

const routerSolicitud = express.Router();

routerSolicitud.post('/crear', crearSolicitud);
routerSolicitud.get('/buscarTodo', buscarSolicitudes);
routerSolicitud.get('/buscar/:id', buscarSolicitudPorId);

export { routerSolicitud };