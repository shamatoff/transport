var mongoose = require('mongoose');

var truckSchema = mongoose.Schema({
    licensePlate: String,
    driverName: String
});

var Truck = mongoose.model('Truck', truckSchema);

module.exports.seedInitial = function() {
    Truck.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find trucks: ' + err);
            return;
        }
        if (collection.length == 0) {
            Truck.create([
              { licensePlate: 'XA4324OV', driverName: 'Mincho' },
              { licensePlate: 'US2429OX', driverName: 'Gencho' },
              { licensePlate: 'BG9422VX', driverName: 'Pencho' },
              { licensePlate: 'GS2942KS', driverName: 'Mincho' },
            ]);
        }
    });
};
