import {mascotas} from "../modelos/mascotaModelo.js";

//Crear mascota
const crearMascota = async (req, res) => {    
    const { nombre, edad, claseAnimal, peso, color } = req.body;

    if (!nombre || !edad || !claseAnimal || !peso || !color) {
        return res.status(400).send({ mensaje: "Todos los campos son requeridos." });
    }

    try {
        await mascotas.create({ nombre, edad, claseAnimal, peso, color });
        res.status(201).json({ mensaje: "Mascota creada con éxito." });
    } catch (error) {
        res.status(500).json({ mensaje: `Error al crear la mascota: ${error}` });
    }
};

export {crearMascota}