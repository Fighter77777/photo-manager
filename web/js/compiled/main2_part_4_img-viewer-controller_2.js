imgApp.controller('ImgViewerController', [
    '$scope', 'TopicFactory', function ($scope, TopicFactory){
        var topics = TopicFactory();

        $scope.topicPager = {
            page: 1,
            take: 5,
            maxSize: 11,
            list: [],
            data: data,
            activate: activate
        };


        topics.get({}, function(response) {
            $scope.topics = response.data;
            console.log($scope.topics);
            $scope.topicPager = $scope.topics
        });

        $scope.$on('topicAdd', function (event, newTopic){
            console.log('newTopic');
            console.log(newTopic);
        });


        function activate(page, take) {
            $scope.test.page = page;

            var list = [];

            for (var i = (page - 1) * take; i < page * take; i++) {
                list.push($scope.test.data[i]);
            }

            $scope.test.list = list;
        }
    }
]);