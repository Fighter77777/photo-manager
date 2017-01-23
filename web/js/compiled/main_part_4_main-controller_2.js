imgApp.controller('MainController', [
    '$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.$on('foundPlaceInList', function (event, place) {
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
        });
    }
]);