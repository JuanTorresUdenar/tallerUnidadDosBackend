import Sequelize from "sequelize";
import { db } from "../database/conexion.js";
import { Persona } from "./personaModelo.js";
import { mascotas } from "./mascostaModelo.js";

const solicitarMascota = db.define("solicitarMascota", {
    idSolicitud: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cedulaPersona: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Persona,
            key: 'cedula'
        }
    },
    idMascota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: mascotas,
            key: 'id'
        }
    }
});
// Relaciones
solicitarMascota.belongsTo(Persona, { foreignKey: 'cedulaPersona', as: 'persona' });
solicitarMascota.belongsTo(mascotas, { foreignKey: 'idMascota', as: 'mascota' });

export { solicitarMascota };