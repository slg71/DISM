/* eslint-disable no-async-promise-executor */
/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../utils/db');

/**
* Validar ApiKey
*
* key String 
* no response value expected for this operation
* */
const apikeyGET = ({ key }) => new Promise(
  (resolve, reject) => {
    // Validar que el parámetro key no esté vacío
    if (!key) {
      reject(Service.rejectResponse(
        'La ApiKey es requerida',
        400,
      ));
      return;
    }

    // Consultar BD para ver si existe esa key (ejer3)
    db.query('SELECT * FROM ApiKey WHERE Key = ?', [key], (err, rows) => {
      if (err) {
        console.log(`Error en GET /apikey ${err}`);
        reject(Service.rejectResponse(
          'Error del servidor',
          500,
        ));
      } else if (rows.length === 0) {
        // No se encontró la key -> acceso NO autorizado
        console.log(`ApiKey inválida: ${key}`);
        reject(Service.rejectResponse(
          'ApiKey inválida',
          401,
        ));
      } else {
        // Key encontrada -> acceso permitido
        console.log(`ApiKey válida: ${key}`);
        resolve(Service.successResponse(rows[0]));
      }
    });
  },
);

// Solo exporto GET porque es lo único que tengo definido en mi OpenAPI
// Luego puedo añadir POST, DELETE, etc si los necesito en la AppAdmin
module.exports = {
  apikeyGET,
};
