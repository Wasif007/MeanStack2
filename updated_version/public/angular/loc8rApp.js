angular.module('loc8rApp', []);


var _isNumeric = function (n) {
return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
return function (distance) {
var numDistance, unit;
if (distance && _isNumeric(distance)) {
if (distance > 1) {
numDistance = parseFloat(distance).toFixed(1);
unit = 'km';
} else {
numDistance = parseInt(distance * 1000,10);
unit = 'm';
}
return numDistance + unit;
} else {
return "?";
}
};
}

var locationListCtrl = function ($scope,loc8rDatas) {
  $scope.message = "Searching for nearby places";
loc8rDatas
.success(function(data) {
$scope.message = data.length > 0 ? "" : "No locations found";
$scope.data = { locations: data };
})
.error(function (e) {
$scope.message = "Sorry, something's gone wrong ";
});

};

var loc8rData = function ($http) {
return $http.get('/api/locations?lng=-0.9&lat=51.3&maxDistance=20');
};

var ratingStars = function () {
return {
scope: {
thisRating : '=ratingss'
},
templateUrl : '/angular/rating-stars.html'
};
};
angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance',formatDistance)
  .directive('ratingStars',ratingStars)
  .service('loc8rDatas',loc8rData);

