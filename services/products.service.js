const Product = require("../models/products.model");
const Provider = require("../models/provider.model");

// GET 
const getAllProducts = async () => {
    return await Product.find().populate("provider");
};

const createProduct = async (dataProduct) => {
    const { title, price, description, providerId } = dataProduct;

    // Verificar si el proveedor existe (opcional pero buena práctica)
    const provider = await Provider.findById(providerId);
    if (!provider) {
        throw new Error(`No se encontró proveedor con ID: ${providerId}`);
    }

    // Crear el producto
    const newProduct = new Product({
        title,
        price,
        description,
        provider: providerId
    });

    return await newProduct.save();
};

//UPDATE
const updateProduct = async (id, dataProduct) => {
    return await Product.findByIdAndUpdate(id, dataProduct, { new: true });
};

// DELETE
const deleteProduct = async (title) => {
    return await Product.findOneAndDelete({ title });
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};