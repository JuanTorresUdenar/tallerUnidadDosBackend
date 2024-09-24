import express from "express";
import { crearMascota, buscarMascotas, buscarMascotaPorId, actualizarMascota, eliminarMascota} from "../controladores/mascotasController.js";

const routerMascota = express.Router();

routerMascota.post('/crear', crearMascota);
routerMascota.get('/buscarTodo', buscarMascotas);
routerMascota.get('/buscar/:id', buscarMascotaPorId);
routerMascota.put('/actualizar/:id', actualizarMascota);
routerMascota.delete('/eliminar/:id', eliminarMascota);


export { routerMascota };