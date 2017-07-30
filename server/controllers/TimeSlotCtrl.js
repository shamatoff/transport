var TimeSlot = require('mongoose').model('TimeSlot');

module.exports = {
  getAll: function(req, res, next) {
    TimeSlot.find({}, function(err, collection) {
      if (err) {
        console.log('Time slots could not be loaded: ' + err);
      }

      res.send(collection);
    });
  },
  getByTruck: function(req, res, next) {
    TimeSlot.find({truck: req.params.truck}, function(err, collection) {
      if (err) {
        console.log('Time slots could not be loaded: ' + err);
      }

      res.send(collection);
    });
  },
  create: function(req, res) {
    var timeSlotData = req.body;
    TimeSlot.create(timeSlotData, function(err, truck) {
      if (err) {
        console.log('Failed to create new time slot! ' + err);
        return;
      }

      res.end();
    });
  }
};
