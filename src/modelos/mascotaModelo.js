// aqui se crea la tabla mascotas mediante el ORM
import Sequelize from "sequelize";
import {db} from "../database/conexion.js";

const mascotas = db.define("mascotas", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    claseAnimal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    peso: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    color: {
        type: Sequelize.STRING, 
        allowNull: false
    }
});

export {mascotas};