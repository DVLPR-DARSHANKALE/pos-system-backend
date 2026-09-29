const { query } = require("../../../config/db");

async function findUserByEmail(email) {
    const SQL = "SELECT * FROM users WHERE email = $1";
    const result = await query(SQL, [email]);
    return result.rows[0];
}

async function createUser(data) {
    const SQL = "INSERT INTO USERS (name,email,phone_number,password_hash) VALUES ($1,$2,$3,$4) RETURNING *"
    const result = await query(SQL, [data.name, data.email, data.phone_number, data.password_hash]);
    return result.rows[0];
}

module.exports = {
    createUser, findUserByEmail
}