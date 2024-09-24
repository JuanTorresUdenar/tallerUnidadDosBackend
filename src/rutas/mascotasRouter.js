import express from "express";
import { crearMascota, buscarMascotas, buscarMascotaPorId} from "../controladores/mascotasController.js";

const routerMascota = express.Router();

routerMascota.post('/crear', crearMascota);
routerMascota.get('/buscarTodo', buscarMascotas);
routerMascota.get('/buscar/:id', buscarMascotaPorId);



export { routerMascota };