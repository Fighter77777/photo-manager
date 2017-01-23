mapApp.factory('filesForFields', ['$resource', function($resource) {
    var urlManager = {
        fieldInfoUrl: null,
        getFieldInfoUrl : function(){
            if(!this.fieldInfoUrl){
                this.fieldInfoUrl = $('#app_data').data('field_info_url');
            }

            return this.fieldInfoUrl
        }
    }

    return $resource(urlManager.getFieldInfoUrl());
}]);
