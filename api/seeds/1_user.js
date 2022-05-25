/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE users CASCADE');
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first: 'Aaron', last: 'Aardvark', username: 'aaa', password: 'aaa'},
    {id: 2, first: 'Billy', last: 'Blue', username: 'bluebilly', password: 'bbb'},
    {id: 3, first: 'Carl', last: 'Carlson', username: 'carl2carl', password: 'ccc'}
  ]);
  await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'users\',\'id\'), (SELECT MAX(id) FROM users) )');
};
