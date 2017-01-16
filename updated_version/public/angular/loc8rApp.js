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

var locationListCtrl = function ($scope) {
$scope.data = {
locations: [{
name: 'Burger King',
address: '125 High Street, Johar Town, Lahore',
rating: 3,
facilities: ['Hot drinks', 'Food', 'Premium wifi'],
distance: '0.296456',
_id: '5370a35f2536f6785f8dfb6a'
},{
name: 'Hardees',
address: '250 High Street, Garden Town, Karachi',
rating: 5,
facilities: ['Hot drinks', 'Free Food', 'Alcoholic drinks'],
distance: '0.7865456',
_id: '5370a35f2536f6785f8dfb6b'
}]};
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance',formatDistance);

