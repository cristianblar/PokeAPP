/* eslint-disable no-console */
const server = require('./src/app.js');
const { conn, addTypesToDb } = require('./src/db/index.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Backend listening at 3001');
    // Luego de levantar el server, inyectamos los Types a la DB desde la PokeAPI
    addTypesToDb()
      .then((resultado) => console.log(resultado))
      .catch((error) => console.error(error.message));
  });
});
