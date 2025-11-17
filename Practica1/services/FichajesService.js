/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../utils/db');

/**
* Consultar fichajes con filtros opcionales
*
* idUsuario Integer  (optional)
* fechaHoraEntrada Date  (optional)
* fechaHoraSalida Date  (optional)
* returns List
* */
const fichajesGET = ({ IdUsuario, FechaHoraEntrada, FechaHoraSalida }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query(`SELECT * FROM Fichajes WHERE 
        (? IS NULL OR IdUsuario = ?) AND
        (? IS NULL OR FechaHoraEntrada = ?) AND
        (? IS NULL OR FechaHoraSalida = ?)`, [IdUsuario, IdUsuario, FechaHoraEntrada, FechaHoraEntrada, FechaHoraSalida, FechaHoraSalida]);
      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al obtener los fichajes',
        e.status || 500,
      ));
    }
  },
);

/**
* Eliminar un fichaje
*
* idFichaje Integer
* no response value expected for this operation
* */
const fichajesIdFichajeDELETE = ({ IdFichaje }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('DELETE FROM Fichajes WHERE IdFichaje = ?', [IdFichaje]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el fichaje',
          404,
        ));
      }
      resolve(Service.successResponse('Fichaje borrado correctamente', 204));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error del servidor',
        e.status || 500,
      ));
    }
  },
);

/**
* Actualizar un fichaje
*
* idFichaje Integer
* fichaje Fichaje
* no response value expected for this operation
* */
const fichajesIdFichajePUT = ({ IdFichaje, body }) => new Promise(
  async (resolve, reject) => {
    // recojo el request body por separado
    const {
      FechaHoraEntrada, FechaHoraSalida, HorasTrabajadas, IdTrabajo, IdUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud,
    } = body;

    try {
      const [rows] = await db.query('UPDATE Fichajes SET FechaHoraEntrada=?, FechaHoraSalida=?, HorasTrabajadas=?, IdTrabajo=?, IdUsuario=?, GeolocalizacionLatitud=?, GeolocalizacionLongitud=? WHERE IdFichaje = ?', [FechaHoraEntrada, FechaHoraSalida, HorasTrabajadas || 0, IdTrabajo, IdUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud, IdFichaje]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el fichaje',
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
* Crear un nuevo fichaje
*
* fichaje Fichaje
* no response value expected for this operation
* */
const fichajesPOST = ({ body }) => new Promise(
  async (resolve, reject) => {
    // recojo el request body por separado
    const {
      FechaHoraEntrada, FechaHoraSalida, HorasTrabajadas, IdTrabajo, IdUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud,
    } = body;

    try {
      const [rows] = await db.query('INSERT INTO Fichajes (FechaHoraEntrada, FechaHoraSalida, HorasTrabajadas, IdTrabajo, IdUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud) VALUES (?,?,?,?,?,?,?)', [FechaHoraEntrada, FechaHoraSalida || null, HorasTrabajadas || 0, IdTrabajo, IdUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud]);

      const FichajeCreado = {
        IdFichaje: rows.insertId,
        FechaHoraEntrada,
        FechaHoraSalida: FechaHoraSalida || null,
        HorasTrabajadas: HorasTrabajadas || 0,
        IdTrabajo,
        IdUsuario,
        GeolocalizacionLatitud,
        GeolocalizacionLongitud,
      };
      resolve(Service.successResponse(FichajeCreado, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al crear el fichaje',
        e.status || 500,
      ));
    }
  },
);

module.exports = {
  fichajesGET,
  fichajesIdFichajeDELETE,
  fichajesIdFichajePUT,
  fichajesPOST,
};
