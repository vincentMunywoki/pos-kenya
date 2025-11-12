const db = require('../utils/db');

class User {
  // Create new user
  static async create(name, email, passwordHash, role = 'user', store = 'Main Store') {
    const query = `
      INSERT INTO users (name, email, password_hash, role, store)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, store
    `;
    const values = [name, email, passwordHash, role, store];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = `
      SELECT id, name, email, password_hash, role, store
      FROM users
      WHERE email = $1
    `;
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  // Update user by ID (for settings/profile)
  static async updateById(id, updates) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key in updates) {
      fields.push(`${key} = $${idx}`);
      values.push(updates[key]);
      idx++;
    }
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING id, name, email, role, store
    `;

    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = User;
