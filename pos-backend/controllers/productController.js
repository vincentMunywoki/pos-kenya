const Product = require('../models/Product');

// Add new product
exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, cost, stock } = req.body;
        const product = await Product.create(name, category, price, cost, stock);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, category, price, cost, stock } = req.body;
        const product = await Product.update(req.params.id, name, category, price, cost, stock);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
