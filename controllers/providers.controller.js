const providerServices = require('../services/providers.service')

// GET
const getProvider = async (req, res) => {
    let providers;
    try {
        if (req.query.companyName) {
            providers = await providerServices.getProviderByName(req.query.companyName);
        }
        else {
            providers = await providerServices.getAllProvider();
        }
        if (!providers) {
            return res.status(404).json({ message: 'Providers not found' });
        }
        res.status(200).json(providers);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};

// POST 
const createProvider = async (req, res) => {
    try {
        const { companyName, CIF, address, url_web } = req.body;
        if (!companyName || !CIF || !address || !url_web) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
        let newProvider = await providerServices.createProvider(
            companyName,
            CIF,
            address,
            url_web
        );
        res.status(201).json({
            msj: "Provider saved",
            data: newProvider
        });
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};

// PUT 
const updateProvider = async (req, res) => {
    try {
        const { companyName, CIF, address, url_web } = req.body;

        if (!companyName || !CIF || !address || !url_web) {
            return res.status(400).json({ msj: "Missing necessary data" });
        }

        const providerData = { companyName, CIF, address, url_web };
        const updatedProvider = await providerServices.updateProvider(providerData);

        if (!updatedProvider) {
            return res.status(404).json({ msj: "Provider not found" });
        }

        return res.status(200).json({
            msj: "Provider updated",
            data: updatedProvider
        });
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        return res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};


// DELETE 
// controllers/providers.controller.js
const deleteProvider = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ msj: "Missing valid name" });
        }

        const deleted = await providerServices.deleteProvider(companyName);

        if (!deleted) {
            return res.status(404).json({ msj: `No provider found with name: ${companyName}` });
        }

        return res.status(200).json({ msj: `Provider: ${companyName} was successfully deleted` });
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        return res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};

module.exports = {
    getProvider,
    createProvider,
    updateProvider,
    deleteProvider
};
