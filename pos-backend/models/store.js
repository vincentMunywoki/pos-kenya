const pool = require('../utils/db');

const Store = {
    createStore: async (name, location) => {
        const result = await pool.query(
            'INSERT INTO stores (name, location) VALUES ($1, $2) RETURNING *',
            [name, location]
        );
        return result.rows[0];
    },

    getStores: async () => {
        const result = await pool.query('SELECT * FROM stores ORDER BY created_at DESC');
        return result.rows;
    },

    getStoreById: async (id) => {
        const result = await pool.query('SELECT * FROM stores WHERE id=$1', [id]);
        return result.rows[0];
    },

    updateStore: async (id, name, location) => {
        const result = await pool.query(
            'UPDATE stores SET name=$1, location=$2 WHERE id=$3 RETURNING *',
            [name, location, id]
        );
        return result.rows[0];
    },

    deleteStore: async (id) => {
        await pool.query('DELETE FROM stores WHERE id=$1', [id]);
        return { message: 'Store deleted' };
    }
};

module.exports = Store;
