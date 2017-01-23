imgApp.controller('ImgViewerController', [
    '$scope', 'TopicFactory', function ($scope, TopicFactory){
        console.log(132435);



        $scope.init = function () {
            //$scope.topics = TopicFactory.getAll();
            $scope.topics = TopicFactory;
            console.log($scope.topics);

        };

        angular.element(document).ready(function () {
            console.log('Hello');
        });

        $scope.$on('runApp', function (event, $searchParams){

            console.log(777);
        });
    }
]);
console.log(99);