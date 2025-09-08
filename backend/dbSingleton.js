
const mongoose = require('mongoose');

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this._connect();
    Database.instance = this;
  }

  _connect() {
    if (this.connection) return this.connection;
    this.connection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error:', err);
      });
    return this.connection;
  }
}

module.exports = new Database();
