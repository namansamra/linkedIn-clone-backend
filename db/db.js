const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log('error' + ' ');
    console.log(err);
  });

module.exports = mongoose;
