var Cargo = require('mongoose').model('Cargo');

module.exports = {
    getAll: function(req, res, next) {
        Cargo.find({}, function(err, collection) {
            if (err) {
                console.log('Cargo could not be loaded: ' + err);
            }
            res.send(collection);
        });
    }
};
