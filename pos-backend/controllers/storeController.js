const Store = require('../models/store');

exports.createStore = async (req, res) => {
    try {
        const { name, location } = req.body;
        const store = await Store.createStore(name, location);
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStores = async (req, res) => {
    try {
        const stores = await Store.getStores();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.getStoreById(req.params.id);
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStore = async (req, res) => {
    try {
        const { name, location } = req.body;
        const updated = await Store.updateStore(req.params.id, name, location);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteStore = async (req, res) => {
    try {
        const deleted = await Store.deleteStore(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
