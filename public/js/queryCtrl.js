let queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', ($scope, $log, $http, $rootScope, geolocation, gservice) => {
    $scope.formData = {};

    // Get user's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then((data) => {
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    });

    // Get coordinates based on mouse click. When a click event is detected...
    $rootScope.$on("clicked", () => {
        $scope.$apply(() => {
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        });
    });

    // Take query parameters and incorporate into a JSON queryBody
    $scope.queryUsers = () => {
      let queryBody = {
          longitude: parseFloat($scope.formData.longitude),
          latitude: parseFloat($scope.formData.latitude),
          distance: parseFloat($scope.formData.distance),
          male: $scope.formData.male,
          female: $scope.formData.female,
          other: $scope.formData.other,
          minAge: $scope.formData.minage,
          maxAge: $scope.formData.maxage,
          favlang: $scope.formData.favlang,
          reqVerified: $scope.formData.verified
      };

      $http.post('/query', queryBody)
          .then((queryResults) => {
              // Query Body and Result Logging
              gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

              // Count the number of records retrieved for the panel-footer
              $scope.queryCount = queryResults.length;
          }, (queryResults) => {
              console.log('Error ' + queryResults);
          });
    };
});