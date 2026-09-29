/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("user_roles", (table) => {
        table
            .uuid("id")
            .primary()
            .defaultTo(knex.raw("gen_random_uuid()"));

        table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table
            .uuid("role_id")
            .notNullable()
            .references("id")
            .inTable("roles")
            .onDelete("RESTRICT");

        table
            .timestamps(true, true);

        table.unique(
            ["user_id", "role_id"],
            "user_roles_user_id_role_id_unique"
        );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("user_roles");
};