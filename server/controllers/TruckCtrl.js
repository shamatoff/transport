var mongoose = require('mongoose'),
  Truck = mongoose.model('Truck'),
  TimeSlot = mongoose.model('TimeSlot');


module.exports = {
  getAll: function(req, res, next) {
    Truck.find({}, function(err, collection) {
      if (err) {
        console.log('Trucks could not be loaded: ' + err);
      }

      res.send(collection);
    });
  },
  getByTimeSlot: function(req, res, next) {
    var dateRange = req.params.timeslot;

    TimeSlot.find({})
      .populate('truck')
      .exec(function(err, timeSlotCollection) {
        if (err) {
          console.log('Time slots could not be loaded: ' + err);
        }

        var truckIDs = [];

        var isRangeGood;
        for (var i = 0; i < timeSlotCollection.length; i++) {
          isRangeGood = validateDateRange(dateRange, timeSlotCollection[i].range);

          if (isRangeGood) {
            truckIDs.push(mongoose.Types.ObjectId(timeSlotCollection[i].truck._id));
          }
        }

        Truck.find( { '_id': { $in: truckIDs } },
          function(error, collection) {
            if (err) {
              console.log('Trucks could not be loaded: ' + err);
            }

            res.send(collection);
          })
      })
  },
  create: function(req, res) {
    var truckData = {
      licensePlate: req.body.licensePlate,
      driverName: req.body.driverName
    }

    var dateRanges = req.body.dateRanges;

    Truck.create(truckData, function(err, truck) {
      if (err) {
        console.log('Failed to create new truck! ' + err);
        return;
      }
      var timeSlotsData = [];
      for (var i = 0; i < dateRanges.length; i++) {
        var timeSlotData = {
          range: dateRanges[i],
          truck: truck._id
        }
        timeSlotsData.push(timeSlotData)
      }
      TimeSlot.create(timeSlotsData);

      res.end();
    });
  },
};

// Helpers
function validateDateRange(dateRange, timeSlot) {
  var range = getDatesFromRange(dateRange);
  var timeSlot = getDatesFromRange(timeSlot);

  // Check if the truck date range is in borders of the choosen one
  if (range.start >= timeSlot.start && range.end <= timeSlot.end) {
    return true;
  }

  return false;
}

function getDatesFromRange(dateRange) {
  var dateArr = dateRange.split(' - ');

  return {
    start: formatDate(dateArr[0], 'd/m/y'),
    end: formatDate(dateArr[1], 'd/m/y')
  }
}

function formatDate(VAdate, DAfrom, DAto, YNarr) {
   var YNdate_to = !!DAto;
   var ARformated_date = [];

   if (!DAto) {
      DAto = 'y-m-d'
   }
   if (!DAfrom) {
      VAdate = VAdate.getDate() + '/' + (VAdate.getMonth() + 1) + '/' + VAdate.getFullYear();
      DAfrom = 'd/m/y';
   }

   var ARdate_parts = VAdate.split(DAfrom[1]);

   for (var i = 0; i < DAfrom.length; i += 2) {
      for (var j = 0; j < DAto.length; j += 2) {
         if (DAto[j] === DAfrom[i]) {
            var i_prim = Math.round(i / 2);
            var j_prim = Math.round(j / 2);
            ARformated_date[j_prim] = ARdate_parts[i_prim];
         }
      }
   }

   if (!YNdate_to) {
      ARformated_date[1] = (parseInt(ARformated_date[1]) - 1).toString();
      ARformated_date = fixTwo(ARformated_date);

      if (YNarr) {
         return ARformated_date;
      }

      return new Date(ARformated_date[0], ARformated_date[1], ARformated_date[2]);
   }

   ARformated_date = fixTwo(ARformated_date);

   return ARformated_date.join(DAto[1]);

   function fixTwo(ARdate) {
      for (var i = 0; i < ARdate.length; i++) {
         if (ARdate[i].length < 2) {
            ARdate[i] = '0' + ARdate[i];
         }
      }
      return ARdate;
   }
}
