var mongoose = require('mongoose');

var timeSlotSchema = mongoose.Schema({
    range: String,
    truck: {type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}
});

var TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports.seedInitial = function() {
    TimeSlot.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find time slots: ' + err);
            return;
        }
        if (collection.length == 0) {
          TimeSlot.create();
        }
    });
};
