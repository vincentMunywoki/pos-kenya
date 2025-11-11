const Supplier = require('../models/supplier');

exports.createSupplier = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const supplier = await Supplier.createSupplier(name, phone, email);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.getSupplierById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const updated = await Supplier.updateSupplier(req.params.id, name, phone, email);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const deleted = await Supplier.deleteSupplier(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
