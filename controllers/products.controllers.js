const productService = require("../services/products.service");

// [GET] Obtener todos los productos con populate
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: "Error al obtener productos",
            error: err.message
        });
    }
};

// [POST] Crear nuevo producto

const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({
            message: "producto creado",
            product: newProduct
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al crear producto",
            error: err.message
        });
    }
};


// [PUT] Actualizar un producto
const updateProduct = async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        const updated = await productService.updateProduct(_id, updateData);
        res.status(200).json({
            message: `producto actualizado: ${updated.title}`,
            product: updated
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al actualizar producto",
            error: err.message
        });
    }
};

// [DELETE] Eliminar producto por título
const deleteProduct = async (req, res) => {
    const { title } = req.body;

    try {
        const deleted = await productService.deleteProduct(title);
        if (!deleted) {
            return res.status(404).json({
                message: `No se encontró el producto: ${title}`
            });
        }

        res.status(200).json({
            message: `Se ha borrado el producto: ${title}`
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al borrar producto",
            error: err.message
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};