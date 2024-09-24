import { solicitarMascota } from "../modelos/solicitarMascotaModelo.js";
import { mascotas } from "../modelos/mascostaModelo.js";
import { Persona } from "../modelos/personaModelo.js";

// Crear solicitud de mascota
const crearSolicitud = async (req, res) => {
    const { cedula, nombre, apellido, direccion, idMascota } = req.body;

    if (!cedula || !nombre || !apellido || !direccion || !idMascota) {
        return res.status(400).json({ mensaje: "Todos los campos son requeridos." });
    }

    try {
        // Verificar que la mascota exista
        const mascotaExistente = await mascotas.findByPk(idMascota);
        if (!mascotaExistente) {
            return res.status(404).json({ mensaje: "La mascota no existe." });
        }

        // Verificar si la persona ya existe
        let personaExistente = await Persona.findByPk(cedula);
        if (!personaExistente) {
            // Si no existe, crear una nueva persona
            personaExistente = await Persona.create({ cedula, nombre, apellido, direccion });
        }

        // Crear la solicitud de mascota
        const nuevaSolicitud = await solicitarMascota.create({
            cedulaPersona: personaExistente.cedula,
            idMascota: idMascota
        });

        res.status(201).json({ mensaje: "Solicitud de adopción creada con éxito."});
    } catch (error) {
        res.status(500).json({ mensaje: `Error al crear la solicitud: ${error}` });
    }
};

export { crearSolicitud };