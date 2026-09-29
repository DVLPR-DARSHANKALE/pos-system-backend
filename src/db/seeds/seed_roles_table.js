/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  await knex('roles').del()
  await knex('roles').insert([
    { name: 'customer', code: "CUSTOMER" },
    { name: 'admin', code: "ADMIN" },
    { name: 'cashier', code: "CASHIER" }
  ]);
};
