const mongoose = require("mongoose");
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

module.exports = Product; // Exportar el modelo y la función para crear productos




