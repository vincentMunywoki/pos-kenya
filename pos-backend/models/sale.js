const pool = require('../utils/db');

const Sale = {
    // Create a new sale
    createSale: async (user_id, customer_id, total_amount, payment_method, items, store_id) => {
        try {
            await pool.query('BEGIN');

            // Insert sale
            const saleResult = await pool.query(
                'INSERT INTO sales (user_id, customer_id, total_amount, payment_method, store_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [user_id, customer_id || null, total_amount, payment_method, store_id || null]
            );
            const sale = saleResult.rows[0];

            // Process each sale item
            for (let item of items) {
                const { product_id, quantity, price } = item;

                // Get product info
                const productRes = await pool.query('SELECT * FROM products WHERE id=$1', [product_id]);
                const product = productRes.rows[0];

                if (!product) throw new Error(`Product ${product_id} not found`);
                if (product.stock < quantity) throw new Error(`Not enough stock for product ${product_id}`);

                // Inventory alert
                if (product.stock - quantity < product.min_stock) {
                    console.log(`⚠️ Alert: Product ${product.name} is low in stock!`);
                }

                // Insert into sale_items
                await pool.query(
                    'INSERT INTO sale_items (sale_id, product_id, quantity, price, total) VALUES ($1, $2, $3, $4, $5)',
                    [sale.id, product_id, quantity, price, price * quantity]
                );

                // Update product stock
                await pool.query(
                    'UPDATE products SET stock = stock - $1 WHERE id = $2',
                    [quantity, product_id]
                );
            }

            // Update loyalty points for customer (1 point per 100 KES)
            if (customer_id) {
                await pool.query(
                    'UPDATE customers SET loyalty_points = loyalty_points + $1 WHERE id = $2',
                    [Math.floor(total_amount / 100), customer_id]
                );

                 console.log(`🎁 Updated loyalty points for customer ${customer_id}: ${updateLoyalty.rows[0].loyalty_points}`);
            }

            await pool.query('COMMIT');
            return sale;

        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error in createSale:', error.message);
            throw error;
        }
    },

    // Get all sales
    getSales: async () => {
        const result = await pool.query('SELECT * FROM sales ORDER BY created_at DESC');
        return result.rows;
    },

    // Get single sale with items
    getSaleById: async (id) => {
        const saleResult = await pool.query('SELECT * FROM sales WHERE id=$1', [id]);
        const sale = saleResult.rows[0];

        if (!sale) throw new Error('Sale not found');

        const itemsResult = await pool.query('SELECT * FROM sale_items WHERE sale_id=$1', [id]);
        return { sale, items: itemsResult.rows };
    }
};

module.exports = Sale;
