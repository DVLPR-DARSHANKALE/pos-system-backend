/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table
            .uuid("id")
            .primary()
            .defaultTo(knex.raw("gen_random_uuid()"));

        table
            .string("name", 100)
            .notNullable();

        table
            .string("email", 255)
            .notNullable()
            .unique();

        table
            .string("phone_number", 20)
            .unique();

        table
            .string("password_hash", 255)
            .notNullable();

        table
            .string("status", 20)
            .notNullable()
            .defaultTo("active");

        table
            .timestamps(true, true);

        table.check(
            "status IN ('active', 'inactive', 'blocked')",
            [],
            "users_status_check"
        );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("users");
};