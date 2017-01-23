imgApp.factory('TopicFactory', ['$resource', function($resource) {
    return function(topicId) {
        var url = '/topics',
            param = {};

        if(topicId) {
            url += '/:topicId';
            param = {topicId: topicId};
        }

        return $resource(url, param, {
            getAll: {method: 'GET'},
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                }
            }
        });
    };
}]);