const db = require("../config/db");

class User {
    static async findByEmail(email) {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    };

    static async createUser(name, email, passwordHash) {
        const [result] = await db.query(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, passwordHash]
        );
        return result.insertId;
    }

    static async updatePassword(id, newPasswordHash) {
        const [result] = await db.query(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            [newPasswordHash, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = User;
