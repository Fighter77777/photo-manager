imgApp.controller('ImgViewerController', [
    '$scope', 'TopicFactory', function ($scope, TopicFactory){
        console.log(132435);
        $scope.init = function () {
            //$scope.topics = TopicFactory.getAll();
            $scope.topics = TopicFactory;
            console.log($scope.topics);

        };



        $scope.$on('selectPlace', function (event, $searchParams) { //вибор места для просмотра детальной инфо.


        });
    }
]);