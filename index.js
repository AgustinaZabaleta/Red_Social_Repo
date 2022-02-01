const mongoose = require('mongoose');
const config = require('./config');

const app = require('./app');

mongoose.connect(
  config.URI_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    try {
      if (err) {
        throw err;
      } else {
        console.log('Connectados');
        app.listen(config.PORT, () => {
          console.log(`Escuchando puerto http://localhost:${config.PORT}`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);
