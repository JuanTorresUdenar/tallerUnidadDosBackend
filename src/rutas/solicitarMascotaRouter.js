import express from "express";
import { crearSolicitud} from "../controladores/solicitarMascotaController.js";

const routerSolicitud = express.Router();

routerSolicitud.post('/crear', crearSolicitud); // Ruta para crear solicitud

export { routerSolicitud };