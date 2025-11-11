const pool = require('../utils/db');

const Loyalty = {
    getPoints: async (customer_id) => {
        const result = await pool.query(
            'SELECT loyalty_points FROM customers WHERE id=$1',
            [customer_id]
        );
        return result.rows[0];
    },

    redeemPoints: async (customer_id, pointsToRedeem) => {
        const result = await pool.query(
            'UPDATE customers SET loyalty_points = loyalty_points - $1 WHERE id=$2 RETURNING loyalty_points',
            [pointsToRedeem, customer_id]
        );
        return result.rows[0];
    }
};

module.exports = Loyalty;
