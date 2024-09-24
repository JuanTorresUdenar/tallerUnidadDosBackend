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

// Buscar todas las mascotas
const buscarMascotas = async (req, res) => {
    try {
        const listaMascotas = await mascotas.findAll();
        res.status(200).json(listaMascotas);
    } catch (error) {
        res.status(500).json({ mensaje: `Error al buscar mascotas: ${error}` });
    }
};

// Buscar mascota por id
const buscarMascotaPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const mascota = await mascotas.findByPk(id);
        if (!mascota) {
            return res.status(404).json({ mensaje: "Mascota no encontrada." });
        }
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ mensaje: `Error al buscar mascota: ${error}` });
    }
};

export {crearMascota, buscarMascotas, buscarMascotaPorId}