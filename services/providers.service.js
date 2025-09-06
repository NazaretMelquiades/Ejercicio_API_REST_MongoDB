const Provider = require('../models/provider.model');

// GET
const getAllProvider = async () => {
    return await Provider.find({}, "-__v");
};

const getProviderByName = async (companyName) => {
    return await Provider.find({ companyName }, "-__v");
};

// CREATE
const createProvider = async (
    companyName,
    CIF,
    address,
    url_web
) => {
    const provider = new Provider({
        companyName,
        CIF,
        address,
        url_web
    });
    return await provider.save();
};

const updateProvider = async (providerData) => {
    const { companyName, CIF, address, url_web } = providerData;

    return await Provider.findOneAndUpdate({ companyName }, providerData, { new: true });
};

const deleteProvider = async (companyName) => {
    return await Provider.findOneAndDelete({ companyName });
};

module.exports = {
    getAllProvider,
    getProviderByName,
    createProvider,
    updateProvider,
    deleteProvider
}