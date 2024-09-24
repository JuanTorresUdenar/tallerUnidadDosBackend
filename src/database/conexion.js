import Sequelize from "sequelize";

const db = new Sequelize("mascotas","mascotas5","mascostas2024",{
    dialect: "mysql",
    host: "localhost"

});

export {db}