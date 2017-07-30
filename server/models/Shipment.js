var mongoose = require('mongoose');

var shipmentSchema = mongoose.Schema({
    timeslot: String,
    cargo: {type: mongoose.Schema.Types.ObjectId, ref: 'Cargo'},
    truck: {type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}
});

var Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports.seedInitial = function() {
    Shipment.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find shipments: ' + err);
            return;
        }
        if (collection.length == 0) {
            Shipment.create();
        }
    });
};
