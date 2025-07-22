const mongoose = require("mongoose");
const Provider = require("./provider.model");
require("../config/db_mongo");

const objectSchema = {
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

// Crear juego pasando titulo + nombre de compañía por parámetro
async function saveProduct(
    title,
    price,
    description,
    companyName,
) {
    const provider = await Provider.find({ companyName });
    const provider_id = provider[0]._id.toString();

    const product = new Product({
        title,
        price,
        description,
        provider: provider_id,
    });

    const result = await product.save();
    console.log(result);
}

module.exports = {
    Product,
    saveProduct
}; // Exportar el modelo y la función para crear productos

// saveProduct(
//     "Tortilla de patatas",
//     1.5,
//     "Cafe jugosa del teatro",
//     "La casa de las flores"
// );

// //crear otro pruducto para la casa de las plantas
// createProduct(
//     2,
//     "Ensalada de tomate",
//     2.5,
//     "Cafe jugosa del teatro",
//     "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
//     "La casa de las plantas"
// );

// saveProduct(
//     "Barrita tomate",
//     1.80,
//     "Cafe jugosa del teatro",
//     "La casa de las plantas"
// );

// const p = new Product({
//     title: "Barrita tomate",
//     price: 1.80,
//     description: "Cafe jugosa del teatro",
//     companyName: 'hola'
// });

// Guardar en la BBDD
// p.save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))


