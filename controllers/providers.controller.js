const providerService = require('../services/providers.service')

// GET
const getProviders = async (req, res) => {
    try {
        const providers = await providerService.getAllProviders();
        res.status(200).json(providers);
    } catch (err) {
        res.status(500).json({
            message: "Error al obtener proveedores",
            error: err.message
        });
    }
};

// POST 
const createProvider = async (req, res) => {
    try {
        const newProvider = await providerService.createProvider(req.body);
        res.status(201).json({
            message: "proveedor creado",
            provider: newProvider
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al crear proveedor",
            error: err.message
        });
    }
};

// PUT 
const updateProvider = async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        const updated = await providerService.updateProvider(_id, updateData);
        res.status(200).json({
            message: `proveedor actualizado: ${updated.companyName}`,
            provider: updated
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al actualizar proveedor",
            error: err.message
        });
    }
};

// DELETE 
const deleteProvider = async (req, res) => {
    const { _id } = req.body;

    try {
        const deleted = await providerService.deleteProvider(_id);
        if (!deleted) {
            return res.status(404).json({
                message: `No se encontró el proveedor: ${_id}`
            });
        }

        res.status(200).json({
            message: `Se ha borrado el proveedor: ${_id}`
        });
    } catch (err) {
        res.status(400).json({
            message: "Error al borrar proveedor",
            error: err.message
        });
    }
};

module.exports = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider
};
