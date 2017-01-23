imgApp.controller('MainController', [
    '$scope', '$rootScope', function ($scope, $rootScope) {
        console.log(1111);

        //$scope.$broadcast('runApp', 1);
        $scope.$emit('runApp', 1);
        console.log(q);
        console.log(222);

        $scope.init = function () {
            console.log('init');
        }
        /*$scope.$on('foundPlaceInList', function (event, place) {
            $scope.$broadcast('loadPlace', place);
        });


        $scope.$on('changeShowOnMap', function (event, placees) {
            $scope.$broadcast('changeShowPlace', placees);
        });


        $rootScope.$on('changeRoute', function (event, param) {
            $scope.$broadcast('selectPlace', param);
        });


        $rootScope.$on('changedFieldImageOnMap', function (event, param) {
            $scope.$broadcast('changedFieldImage', param);
        });*/
    }
]);