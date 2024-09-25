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

// Buscar todas las solicitudes
const buscarSolicitudes = async (req, res) => {
    try {
        const solicitudes = await solicitarMascota.findAll({
            include: [
                { model: Persona, as: 'persona' },  // Incluir información de la persona
                { model: mascotas, as: 'mascota' }  // Incluir información de la mascota
            ]
        });

        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ mensaje: `Error al buscar las solicitudes: ${error}` });
    }
};

// Buscar por una solicitud por id
const buscarSolicitudPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitud = await solicitarMascota.findByPk(id, {
            include: [
                { model: Persona, as: 'persona' },
                { model: mascotas, as: 'mascota' }
            ]
        });

        if (!solicitud) {
            return res.status(404).json({ mensaje: "Solicitud no encontrada." });
        }

        res.status(200).json(solicitud);
    } catch (error) {
        res.status(500).json({ mensaje: `Error al buscar la solicitud: ${error}` });
    }
};

const actualizarSolicitud = async (req, res) => {
    const { id } = req.params; // ID de la solicitud a actualizar
    const { cedula, nombre, apellido, direccion, idMascota } = req.body; // Datos de la persona y la mascota

    // Validar que los campos no sean nulos
    if (!cedula || !nombre || !apellido || !direccion || !idMascota) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    try {
        // Buscar la solicitud
        const solicitud = await solicitarMascota.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ mensaje: "Solicitud no existe." });
        }

        // Verificar si la mascota existe
        const mascotaExistente = await mascotas.findByPk(idMascota);
        if (!mascotaExistente) {
            return res.status(404).json({ mensaje: "No se pudo actualizar solicitud porque no existe la mascota" });
        }

        // Verificar si la persona existe
        let persona = await Persona.findByPk(cedula);
        if (!persona) {
            // Si la persona no existe, crear una nueva persona
            persona = await Persona.create({ cedula, nombre, apellido, direccion });
        } else {
            // Si existe, actualizar sus datos
            await persona.update({ nombre, apellido, direccion });
        }

        // Actualizar la solicitud con el ID de la persona y la mascota
        await solicitud.update({ cedulaPersona: persona.cedula, idMascota });

        res.status(200).json({ mensaje: "Solicitud actualizada con éxito." });
    } catch (error) {
        console.error(`Error al actualizar la solicitud: ${error.message}`); // Para depuración
        res.status(500).json({ mensaje: `Error al actualizar la solicitud: ${error.message}` });
    }
};

export { crearSolicitud, buscarSolicitudes, buscarSolicitudPorId, actualizarSolicitud };