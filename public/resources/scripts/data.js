'use strict';

app
.factory('TruckResource', function($resource) {
  var TruckResource = $resource(
    '/api/truck/:timeslot/:id',
    {
      id: '@id',
      timeslot: '@id'
    },
    {
      update: {
        method: 'PUT',
        isArray: false
      }
    });

  return TruckResource;
})
.factory('ShipmentResource', function($resource) {
  var ShipmentResource = $resource(
    '/api/shipment/:id',
    {
      id: '@id'
    },
    {
      update: {
        method: 'PUT',
        isArray: false
      }
    });

  return ShipmentResource;
})
.factory('TimeSlotResource', function($resource) {
  var TimeSlotResource = $resource(
    '/api/timeslot/:truck/:id',
    {
        id: '@id',
        truck: '@id'
    },
    {
      update: {
        method: 'PUT',
        isArray: false
      }
    });

  return TimeSlotResource;
})
.factory('CargoResource', function($resource) {
  var CargoResource = $resource(
    '/api/cargo/:id',
    {
      id: '@id'
    },
    {
      update: {
        method: 'PUT',
        isArray: false
      }
    });

  return CargoResource;
});
