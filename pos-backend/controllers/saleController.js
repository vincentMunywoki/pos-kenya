const Sale = require('../models/sale');

// Add new sale
exports.addSale = async (req, res) => {
    try {
        const { user_id, customer_id, total_amount, payment_method, items } = req.body;

        const sale = await Sale.createSale(user_id, customer_id, total_amount, payment_method, items);

        res.status(201).json({ message: 'Sale completed', sale });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.getSales();
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single sale with items
exports.getSaleById = async (req, res) => {
    try {
        const saleData = await Sale.getSaleById(req.params.id);
        if (!saleData.sale) return res.status(404).json({ message: 'Sale not found' });
        res.json(saleData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
