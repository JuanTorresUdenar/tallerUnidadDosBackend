import express from "express";

//Creamos la instancia de express
const app = express();

// Definir Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a CiberColas: Adopta con Amor');
});

//Definimos el puerto para el que va a escuchar este servicio
const PORT=4000;

app.use(express.json());

//Abre e inicia el servicio
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

