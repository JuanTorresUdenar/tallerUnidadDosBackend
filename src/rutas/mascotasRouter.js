import express from "express";
import { crearMascota} from "../controladores/mascotasController.js";

const routerMascota = express.Router();

routerMascota.post('/crear', crearMascota);



export { routerMascota };