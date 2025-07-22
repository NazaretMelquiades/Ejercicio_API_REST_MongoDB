const Provider = require('../models/provider.model');

// GET
const getAllProviders = async () => {
    return await Provider.find();
}

// CREATE
const createProvider = async (dataProvider) => {
    const provider = new Provider(dataProvider);
    return await provider.save();
};

// UPDATE
const updateProvider = async (id, dataProvider) => {
    return await Provider.findByIdAndUpdate(id, dataProvider, { new: true });
};

// DELETE
const deleteProvider = async (id) => {
    return await Provider.findByIdAndDelete(id);
};

// const deleteProvider = async (companyName) => {
//     return await Provider.findOneAndDelete({ companyName });
// }

module.exports = {
    getAllProviders,
    createProvider,
    updateProvider,
    deleteProvider
}