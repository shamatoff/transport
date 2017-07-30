app
.controller('MainCtrl',
	function($scope, TruckResource, ShipmentResource, TimeSlotResource, CargoResource) {

    initApp();

    $scope.gotoAllShipments = function () {
      gotoAllShipments();
    }

		$scope.gotoAddShipment = function () {
			$scope.nextShipment = {};

			// Init datarange input field
      var today = new Date();
      var afterWeek = new Date(today.getTime() + (6 * 24 * 60 * 60 * 1000));
      $scope.nextShipment.timeslot = formatDate(today, undefined, 'd/m/y') + " - " + formatDate(afterWeek, undefined, 'd/m/y');

			getCargoTypes();
			getTrucks($scope.nextShipment.timeslot);
		}

    // "Add truck" tab functions
    $scope.createTruck = function(truck) {
			truck.dateRanges = $scope.availabilityDates;

			TruckResource.save(truck)
				.$promise
				.then(function(response) {
					$scope.availabilityDates = [];
					$scope.truck = {}
					console.log(response);
				}, function(error) {
					$scope.availabilityDates = [];
					console.log(error);
				});
    }

    $scope.removeDate = function(dateRange) {
      var index = $scope.availabilityDates.indexOf(dateRange);

      if (index > -1) {
        $scope.availabilityDates.splice(index, 1);
      }
    }

    $scope.addDate = function(dateRange) {
      var isDateRangeOK = validateDateRange(dateRange)

      if (isDateRangeOK) {
        $scope.availabilityDates.push(dateRange);
      }
    }

		// "Add shipment" tab functions
		$scope.checkForTrucks = function(nextShipment) {
			getTrucks(nextShipment);
		}

		$scope.addShipment = function(nextShipment) {
			nextShipment.truck = nextShipment.truck._id;
			nextShipment.cargo = nextShipment.cargo._id;

			ShipmentResource.save(nextShipment)
				.$promise
				.then(function(response) {
					location.reload();
					console.log(response);
				}, function(error) {
					location.reload();
					console.log(error);
				});
		}

		// Helpers
    function initApp() {
      // Init datarange input field
      var today = new Date();
      var afterWeek = new Date(today.getTime() + (6 * 24 * 60 * 60 * 1000));
      $scope.nextDate = formatDate(today, undefined, 'd/m/y') + " - " + formatDate(afterWeek, undefined, 'd/m/y');
      $(function() {
          $('input[name="daterange"]').daterangepicker({
            locale: {
              format: 'DD/MM/YYYY'
            }
          });
      });

      // Needed for adding a truck
      $scope.availabilityDates = [];

      // Fetching all shipments
      gotoAllShipments();
    }

		function getCargoTypes() {
			CargoResource
        .query()
        .$promise
        .then(function(cargo) {
          $scope.cargoTypes = cargo;
					$scope.nextShipment.cargo = cargo[0];
        }, function(error) {
          console.error(error);
        })
		}

		function getTrucks(timeSlot) {
			TruckResource
				.query({ timeslot: timeSlot })
				.$promise
				.then(function(trucks) {
					$scope.trucks = trucks;
					$scope.nextShipment.truck = trucks[0];
					if ($scope.nextShipment.truck) {
						getTimeSlotsByTruck($scope.nextShipment.truck._id);
					}
				}, function(error) {
					console.error(error);
				})
		}

		function getTimeSlotsByTruck(truckID) {
			TimeSlotResource
				.query({ truck: truckID })
				.$promise
				.then(function(timeSlots) {
					$scope.availTimeSlots = timeSlots;
				}, function(error) {
					console.log(error);
				})
		}

    function gotoAllShipments() {
      ShipmentResource
        .query()
        .$promise
        .then(function(shipments) {
          $scope.shipments = shipments;
        }, function(error) {
          console.error(error);
        })
    }

    function validateDateRange(dateRange) {
      var range = getDatesFromRange(dateRange);

      // Check if the date range is in the past
      var today = formatDate(new Date(), undefined, 'd/m/y');
      today = formatDate(today, 'd/m/y');
      if (range.start < today || range.end < today) {
        return false;
      }

      // Check if the date range is overlaping with current date ranges
      for (var i = 0; i < $scope.availabilityDates.length; i++) {
        var availabilityRange = getDatesFromRange($scope.availabilityDates[i]);

        if (range.start <= availabilityRange.end && range.end >= availabilityRange.start) {
          return false;
        }
      }

      return true;
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
});
