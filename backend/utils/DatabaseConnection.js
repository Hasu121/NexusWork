const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this._connected = false;
    DatabaseConnection.instance = this;
  }

  async connect(uri) {
    if (!this._connected) {
      try {
        await mongoose.connect(uri);
        this._connected = true;
        console.log('Connected to MongoDB successfully');
      } catch (err) {
        console.log('Error connecting to MongoDB:', err);
      }
    }
    return mongoose;
  }
}

module.exports = new DatabaseConnection();
const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this._connected = false;
    DatabaseConnection.instance = this;
  }

  async connect(uri) {
    if (!this._connected) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this._connected = true;
      console.log('MongoDB connected (singleton)');
    }
    return mongoose.connection;
  }
}

module.exports = new DatabaseConnection();