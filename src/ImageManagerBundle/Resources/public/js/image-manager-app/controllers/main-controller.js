imgApp.controller('MainController', [
    '$scope', function ($scope) {
        $scope.$on('topicLoaded', function (event, topic) {
            $scope.$broadcast('topicAdd', topic);
        });
    }
]);