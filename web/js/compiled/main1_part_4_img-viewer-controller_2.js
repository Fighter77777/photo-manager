imgApp.controller('ImgViewerController', [
    '$scope', 'TopicFactory', function ($scope, TopicFactory){
        var topics = TopicFactory();

        $scope.topicPager = {
            page: 1,
            take: 5,
            maxSize: 11,
            list: [],
            data: [],
            activate: activate
        };


        topics.get({}, function(response) {
            $scope.topics = response.data;
            $scope.topicPager.data = $scope.topics;
            updatePager();
        });

        $scope.$on('topicAdd', function (event, newTopic){
            $scope.topicPager.data.unshift(newTopic);
            updatePager();
        });


        function activate(page, take) {
            if($scope.topicPager.data.length<1){
                return [];
            }

            $scope.topicPager.page = page;

            var list = [];
            var shift = page * take;
            if(shift > $scope.topicPager.data.length){
                shift = $scope.topicPager.data.length;
            }

            for (var i = (page - 1) * take; i < shift; i++) {
                list.push($scope.topicPager.data[i]);
            }

            $scope.topicPager.list = list;
        }

        function updatePager() {
            $scope.topicPager.activate($scope.topicPager.page, $scope.topicPager.take);
        }
    }
]);