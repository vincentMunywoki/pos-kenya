const pool = require('../utils/db');

const Sale = {
    createSale: async (user_id, customer_id, total_amount, payment_method, items) => {
        // ... your existing createSale code ...
    },

    getSales: async () => {
        const result = await pool.query('SELECT * FROM sales ORDER BY created_at DESC');
        return result.rows;
    },

    getSaleById: async (id) => {
        const saleResult = await pool.query('SELECT * FROM sales WHERE id=$1', [id]);
        const itemsResult = await pool.query('SELECT * FROM sale_items WHERE sale_id=$1', [id]);
        return { sale: saleResult.rows[0], items: itemsResult.rows };
    }
};

// This is correct export
module.exports = Sale;
