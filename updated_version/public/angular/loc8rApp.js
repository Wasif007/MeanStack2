angular.module('loc8rApp', []);


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
  .controller('locationListCtrl', locationListCtrl);

