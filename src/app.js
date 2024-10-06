import express from "express";
import cors from "cors"; // Importa cors
import { routerMascota } from "./rutas/mascotasRouter.js";
import { routerSolicitud } from "./rutas/solicitarMascotaRouter.js";
import { db } from "./database/conexion.js";

// Creamos la instancia de express
const app = express();

// Configurar CORS para permitir solicitudes desde el frontend (localhost:4200)
app.use(cors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Verificar conexión a la base de datos 
db.authenticate().then(() => {
    console.log("Conexión a base de datos correcta");
}).catch(err => {
    console.log(`Error en conexión a base de datos: ${err}`);
});

// Definir Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a CiberColas: Adopta con Amor');
});

app.use(express.json());

// Middleware
app.use('/mascotas', routerMascota);
app.use('/solicitudes', routerSolicitud);

// Definimos el puerto para el que va a escuchar este servicio
const PORT = 4000;

// Abre e inicia el servicio
db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(err => console.error(`Error: ${err}`));


