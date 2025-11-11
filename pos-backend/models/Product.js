const pool = require('../utils/db');

const Product = {
    create: async (name, category, price, cost, stock) => {
        const result = await pool.query(
            'INSERT INTO products (name, category, price, cost, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, category, price, cost, stock]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    },

    update: async (id, name, category, price, cost, stock) => {
        const result = await pool.query(
            'UPDATE products SET name=$1, category=$2, price=$3, cost=$4, stock=$5 WHERE id=$6 RETURNING *',
            [name, category, price, cost, stock, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Product;
