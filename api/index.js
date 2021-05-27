/* eslint-disable no-console */
const server = require('./src/app');
const { conn, addTypesToDb } = require('./src/db/index');
const { PORT } = require('./constants');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Backend listening at ${PORT}`);
    // Luego de levantar el server, inyectamos los Types a la DB desde la PokeAPI
    addTypesToDb()
      .then((resultado) => console.log(resultado))
      .catch((error) => console.error(error.message));
  });
});
