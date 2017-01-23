mapApp.factory('fieldsFactory', function() {
    var fieldsData;

    function getData() {
        var dataNode = $('#app_data');
        var fieldsList = dataNode.data('fields');

        dataNode.removeAttr('data-fields');

        return fieldsList;
    }

    function format(fields) {
        if(!!!fields)
            return false;

        var result = [];
        var numFields = fields.length;
        for (var i = 1; i < numFields; i++) {
            result.push(fields[i]);
        }

        return result;
    }

    fieldsData = format(getData());

    return fieldsData;
});