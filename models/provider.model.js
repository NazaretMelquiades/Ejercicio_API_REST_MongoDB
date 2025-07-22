const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    CIF: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    url_web: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                if (url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            },
            message: "Porfa, introduce una URL válida"
        }
    }
}

// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

// // //Insertar un proveedor
// const p = new Provider({
//     companyName: "La casa de las flores",
//     CIF: "B1626",
//     address: "Calle Larios, 16, Málaga",
//     url_web: "https://www.lacasadelaflores.com"
// });

// // Guardar en la BBDD
// p.save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// // Insertar otro proveedor
// const p2 = new Provider({
//     companyName: "La casa de las plantas",
//     CIF: "B1627",
//     address: "Calle Larga, 26, Jerez",
//     url_web: "https://www.lacasadelasplantas.com"
// });

// // Guardar en la BBDD
// p2.save()
//     .then((data) => console.log(data))

// const p3 = new Provider({
//     companyName: "Teatro Marquina",
//     CIF: "B40236882",
//     address: "Calle de Prim 11",
//     url_web: "https://www.tortillasmarquina.com"
// })

// // Guardar en la BBDD
// p3.save()
//     .then((data) => console.log(data))


