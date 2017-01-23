mapApp.filter('legendsFilter', [function() {
    return function (items, actualLegends){
        var filtered = [];

        if(!actualLegends.length){
            return filtered;
        }

        items.forEach(function(item){
            if($.inArray(item.element, actualLegends)>=0){
                filtered.push(item);
            }
        });
        return filtered;
    };
}]);