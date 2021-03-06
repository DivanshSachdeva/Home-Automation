const mongoose = require('mongoose');
const{ MongoMemoryServer } = require('mongodb-memory-server');

module.exports = function(){
    const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    // autoReconnect: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true 
  };

  mongoose.connect(mongoUri, mongooseOpts);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify',false);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});
}