const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://naman:samranaman%40123@authprocluster.onzij.gcp.mongodb.net/graphqlSocial?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log('error' + ' ');
    console.log(err);
  });

module.exports = mongoose;
