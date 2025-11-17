/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../utils/db');

/**
* Listar trabajos
*
* returns List
* */
const trabajosGET = () => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('SELECT * FROM Trabajos');
      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al obtener los trabajos',
        e.status || 500,
      ));
    }
  },
);

/**
* Eliminar un trabajo
*
* idTrabajo Integer
* no response value expected for this operation
* */
const trabajosIdTrabajoDELETE = ({ IdTrabajo }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('DELETE FROM Trabajos WHERE IdTrabajo = ?', [IdTrabajo]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el trabajo',
          404,
        ));
      }
      resolve(Service.successResponse('Trabajo borrado correctamente', 204));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error del servidor',
        e.status || 500,
      ));
    }
  },
);

/**
* Obtener trabajo por ID
*
* idTrabajo Integer
* no response value expected for this operation
* */
const trabajosIdTrabajoGET = ({ IdTrabajo }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('SELECT * FROM Trabajos WHERE IdTrabajo = ?', [IdTrabajo]);
      if (rows.length === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el trabajo',
          404,
        ));
      }
      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error del servidor',
        e.status || 500,
      ));
    }
  },
);

/**
* Actualizar un trabajo
*
* idTrabajo Integer
* trabajo Trabajo
* no response value expected for this operation
* */
const trabajosIdTrabajoPUT = ({ IdTrabajo, body }) => new Promise(
  async (resolve, reject) => {
    const { Nombre } = body;

    try {
      const [rows] = await db.query('UPDATE Trabajos SET Nombre=? WHERE IdTrabajo=?', [Nombre, IdTrabajo]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el trabajo',
          404,
        ));
      }
      resolve(Service.successResponse(body, 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error del servidor',
        e.status || 500,
      ));
    }
  },
);

/**
* Crear un nuevo trabajo
*
* trabajo Trabajo
* no response value expected for this operation
* */
const trabajosPOST = ({ body }) => new Promise(
  async (resolve, reject) => {
    const { Nombre } = body;

    try {
      const [rows] = await db.query('INSERT INTO Trabajos (Nombre) VALUES (?)', [Nombre]);
      const TrabajoCreado = {
        IdTrabajo: rows.insertId,
        Nombre,
      };
      resolve(Service.successResponse(TrabajoCreado, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al crear el trabajo',
        e.status || 500,
      ));
    }
  },
);

module.exports = {
  trabajosGET,
  trabajosIdTrabajoDELETE,
  trabajosIdTrabajoGET,
  trabajosIdTrabajoPUT,
  trabajosPOST,
};
