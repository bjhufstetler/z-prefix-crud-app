/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('post', table => {
        table.increments('id');
        table.integer('user_id');
        table.foreign('user_id')
            .references('user.id')
            .deferrable('deferred')
            .onDelete('SET NULL');
        table.string('title');
        table.text('content');
        table.dateTime('timestamp');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('post', table => table.dropForeign('user_id'))
    .then(() => { return knex.schema.dropTableIfExists('post') });
};
