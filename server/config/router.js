var Controllers = require('../controllers');

module.exports = function(app) {
  app.get('/api/truck', Controllers.Truck.getAll);
  app.get('/api/truck/:timeslot', Controllers.Truck.getByTimeSlot);
  app.post('/api/truck', Controllers.Truck.create);

  app.get('/api/shipment', Controllers.Shipment.getAll);
  app.post('/api/shipment', Controllers.Shipment.create);

  app.get('/api/timeslot/:truck', Controllers.TimeSlot.getByTruck);

  app.get('/api/cargo', Controllers.Cargo.getAll);

  app.get('/api/*', function(req, res) {
      res.status(404);
      res.end();
  });

  app.get('/', function (req, res) {
      res.render('../../public/index');
  });

  app.locals.pretty = true;
};
