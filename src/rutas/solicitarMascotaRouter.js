import express from "express";
import {crearSolicitud,buscarSolicitudes,buscarSolicitudPorId, actualizarSolicitud, eliminarSolicitud} from "../controladores/solicitarMascotaController.js";

const routerSolicitud = express.Router();

routerSolicitud.post('/crear', crearSolicitud);
routerSolicitud.get('/buscarTodo', buscarSolicitudes);
routerSolicitud.get('/buscar/:id', buscarSolicitudPorId);
routerSolicitud.put('/actualizar/:id', actualizarSolicitud);
routerSolicitud.delete('/eliminar/:id', eliminarSolicitud);

export { routerSolicitud };