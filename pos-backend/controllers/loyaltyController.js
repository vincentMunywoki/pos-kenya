const Loyalty = require('../models/loyalty');

exports.getPoints = async (req, res) => {
    try {
        const customer = await Loyalty.getPoints(req.params.customerId);
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.redeemPoints = async (req, res) => {
    try {
        const { points } = req.body;
        const customer = await Loyalty.redeemPoints(req.params.customerId, points);
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
