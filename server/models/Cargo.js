var mongoose = require('mongoose');

var cargoSchema = mongoose.Schema({
    type: String
});

var Cargo = mongoose.model('Cargo', cargoSchema);

module.exports.seedInitial = function() {
    Cargo.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find cargo: ' + err);
            return;
        }
        if (collection.length == 0) {
            Cargo.create(
              [
                { type: 'furniture' },
                { type: 'vehicles' },
                { type: 'pets' },
                { type: 'food' }
              ]
            );
        }
    });
};
