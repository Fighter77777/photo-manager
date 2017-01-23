imgApp.controller('ImgLoaderController', [
    '$scope', 'TopicFactory', function ($scope, TopicFactory){
        var topic = TopicFactory();
        var formData = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formData.append(key, value);
            });
        };

        $scope.submit = function (event){
            topic.save(formData, function(newTopic) {
                if(typeof newTopic.id != 'undefined'){
                    document.getElementById('topic_imgPath').value = '';

                    $scope.$emit('topicLoaded', newTopic);
                }
            });

            return false;
        };
    }
]);