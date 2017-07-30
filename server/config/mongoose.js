var mongoose = require('mongoose'),
  assert = require('assert'),
  Truck = require('../models/Truck'),
  Shipment = require('../models/Shipment'),
  TimeSlot = require('../models/TimeSlot'),
  Cargo = require('../models/Cargo');

module.exports = function(config) {
  mongoose.Promise = global.Promise;

  mongoose.connect(config.DATABASE, {
    useMongoClient: true
  });

  var database = mongoose.connection;

  database.once('open', function(err) {
    if (err) {
        console.log('Database could not be opened:\n' + err);
        return;
    }
    console.log('Database up and running...');
  });

  database.on('error', function(err) {
    assert.equal(Truck.collection.findOne().constructor, global.Promise);
    assert.equal(Shipment.collection.findOne().constructor, global.Promise);
    assert.equal(TimeSlot.collection.findOne().constructor, global.Promise);
    assert.equal(Cargo.collection.findOne().constructor, global.Promise);

    console.log('Database error:\n' + err);
  });

  Truck.seedInitial();
  Shipment.seedInitial();
  TimeSlot.seedInitial();
  Cargo.seedInitial();
};
