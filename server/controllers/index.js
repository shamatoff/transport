var TruckCtrl = require('../controllers/TruckCtrl'),
  ShipmentCtrl = require('../controllers/ShipmentCtrl'),
  TimeSlotCtrl = require('../controllers/TimeSlotCtrl'),
  CargoCtrl = require('../controllers/CargoCtrl');

module.exports = {
  Truck: TruckCtrl,
  Shipment: ShipmentCtrl,
  TimeSlot: TimeSlotCtrl,
  Cargo: CargoCtrl
};
