/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../utils/db');

/**
* Obtener todos los usuarios
*
* returns List
* */
const usuariosGET = () => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('SELECT * FROM Usuarios');
      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al obtener los usuarios',
        e.status || 500,
      ));
    }
  },
);

/**
* Borrar un usuario
*
* idUsuario Integer
* no response value expected for this operation
* */
const usuariosIdUsuarioDELETE = ({ IdUsuario }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('DELETE FROM Usuarios WHERE IdUsuario = ?', [IdUsuario]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el usuario',
          404,
        ));
      }
      resolve(Service.successResponse('Usuario borrado correctamente', 204));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error del servidor',
        e.status || 500,
      ));
    }
  },
);

/**
* Obtener un usuario por su Id
*
* idUsuario Integer
* returns Usuario
* */
const usuariosIdUsuarioGET = ({ IdUsuario }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await db.query('SELECT * FROM Usuarios WHERE IdUsuario = ?', [IdUsuario]);
      if (rows.length === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el usuario',
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
* Actualizar datos de un usuario
*
* idUsuario Integer
* usuario Usuario
* no response value expected for this operation
* */
const usuariosIdUsuarioPUT = ({ IdUsuario, body }) => new Promise(
  async (resolve, reject) => {
    // recojo el request body por separado
    const { Nombre, Usuario, Clave } = body;

    try {
      const [rows] = await db.query('UPDATE Usuarios SET Nombre=?, Usuario=?, Clave=? WHERE IdUsuario = ?', [Nombre, Usuario, Clave, IdUsuario]);
      if (rows.affectedRows === 0) {
        return reject(Service.rejectResponse(
          'No se encontró el usuario',
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
* Crear un usuario nuevo
*
* usuario Usuario
* no response value expected for this operation
* */
const usuariosPOST = ({ body }) => new Promise(
  async (resolve, reject) => {
    // recojo el request body por separado
    const { Nombre, Usuario, Clave } = body;

    try {
      const [rows] = await db.query('INSERT INTO Usuarios (Nombre, Usuario, Clave) VALUES (?,?,?)', [Nombre, Usuario, Clave]);
      const UsuarioCreado = {
        IdUsuario: rows.insertId,
        Nombre,
        Usuario,
        Clave,
      };
      resolve(Service.successResponse(UsuarioCreado, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Error al crear el usuario',
        e.status || 500,
      ));
    }
  },
);

module.exports = {
  usuariosGET,
  usuariosIdUsuarioDELETE,
  usuariosIdUsuarioGET,
  usuariosIdUsuarioPUT,
  usuariosPOST,
};
