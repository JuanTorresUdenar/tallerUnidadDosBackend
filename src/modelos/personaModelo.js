import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Persona = db.define("persona", {
    cedula: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export { Persona };