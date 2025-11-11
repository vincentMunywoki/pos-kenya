const pool = require('../utils/db');

const Supplier = {
    createSupplier: async (name, phone, email) => {
        const result = await pool.query(
            'INSERT INTO suppliers (name, phone, email) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, email]
        );
        return result.rows[0];
    },

    getSuppliers: async () => {
        const result = await pool.query('SELECT * FROM suppliers ORDER BY created_at DESC');
        return result.rows;
    },

    getSupplierById: async (id) => {
        const result = await pool.query('SELECT * FROM suppliers WHERE id=$1', [id]);
        return result.rows[0];
    },

    updateSupplier: async (id, name, phone, email) => {
        const result = await pool.query(
            'UPDATE suppliers SET name=$1, phone=$2, email=$3 WHERE id=$4 RETURNING *',
            [name, phone, email, id]
        );
        return result.rows[0];
    },

    deleteSupplier: async (id) => {
        await pool.query('DELETE FROM suppliers WHERE id=$1', [id]);
        return { message: 'Supplier deleted' };
    }
};

module.exports = Supplier;
