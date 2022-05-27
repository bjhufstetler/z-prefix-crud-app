/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE users CASCADE');
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first: 'Aaron', last: 'Aardvark', username: 'aaa', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'},
    {id: 2, first: 'Billy', last: 'Blue', username: 'bluebilly', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'},
    {id: 3, first: 'Carl', last: 'Carlson', username: 'carl2carl', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'}
  ]);
  await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'users\',\'id\'), (SELECT MAX(id) FROM users) )');
};
