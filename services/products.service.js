const Product = require('../models/products.model');

// const getAllProducts = async () => {
//     return await User.find();
// };
// GET: Obtener todos los productos con datos del proveedor
const getAllProducts = async () => {
    return await Product.find().populate("provider");
};

// // CREATE
// const createProduct = async (dataProduct) => {
//     const product = new User(dataProduct);
//     return await product.save();
// };

// POST: Crear nuevo producto (buscando el proveedor por companyName)
const createProduct = async (dataProduct) => {
    const { title, price, description, companyName } = dataProduct;

    const provider = await Provider.findOne({ companyName });
    if (!provider) {
        throw new Error(`No se encontró proveedor con nombre: ${companyName}`);
    }

    const product = new Product({
        title,
        price,
        description,
        provider: provider._id
    });

    return await product.save();
};

//UPDATE
const updateProduct = async (id, dataProduct) => {
    return await Product.findByIdAndUpdate(id, dataProduct, { new: true });
};

// //DELETE
// const deleteProduct = async (id) => {
//     return await Product.findByIdAndDelete(id);
// };

// DELETE: Eliminar producto por título
const deleteProduct = async (title) => {
    return await Product.findOneAndDelete({ title });
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};