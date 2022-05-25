/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE post CASCADE')
  await knex('post').del()
  await knex('post').insert([
    {id: 1, user_id: 1, title: 'First post', content: 'This is my first post', timestamp: '2022-02-02 22:22:22.222222'},
    {id: 2, user_id: 1, title: 'Second post', content: 'This is my second post', timestamp: '2022-02-03 22:22:22.222222' },
    {id: 3, user_id: 1, title: 'Third post', content: 'This is my third post', timestamp: '2022-02-04 22:22:22.222222'},
    {id: 4, user_id: 2, title: 'Long post 1', content: 'This is my first long post. It just needs to be greater than 100 characters long. I dont know how Im going to do that', timestamp: '2022-02-05 22:22:22.222222'},
    {id: 5, user_id: 2, title: 'Long post 2', content: 'This is my second long post. It just needs to be greater than 100 characters long. I dont know how Im going to do that', timestamp: '2022-02-06 22:22:22.222222'},
    {id: 6, user_id: 2, title: 'Long post 3', content: 'This is my third long post. It just needs to be greater than 100 characters long. I dont know how Im going to do that', timestamp: '2022-02-07 22:22:22.222222'},
    {id: 7, user_id: 3, title: 'User 3 Post A', content: 'This is my A post', timestamp: '2022-02-08 22:22:22.222222'},
    {id: 8, user_id: 3, title: 'User 3 Post B', content: 'This is my B post', timestamp: '2022-02-09 22:22:22.222222'}
  ]);
  await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'post\',\'id\'), (SELECT MAX(id) FROM post) )');
};
