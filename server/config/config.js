var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        ROOT_PATH: rootPath,
        DATABASE: 'mongodb://admin:kostaa@ds127153.mlab.com:27153/transport-db',
        PORT: process.env.PORT || 3030
    },
    production: {
        ROOT_PATH: rootPath,
        DATABASE: 'mongodb://admin:kostaa@ds127153.mlab.com:27153/transport-db',
        PORT: process.env.PORT || 3030
    }
};
