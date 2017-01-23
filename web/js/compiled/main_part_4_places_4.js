mapApp.filter('placesFilter', [function() {
    var forCheck = ['title', 'reg_name', 'dis_name', 'loc_name', 'num_customer', 'num_agrilab', 'num_local'];

    return function (items, searchPhrase){
        var filtered = [];
        items.forEach(function(item){
            if(!searchPhrase){
                if(item.visible != undefined && item.visible){
                    filtered.push(item);
                }
            }else{
                for(var i in forCheck){
                    if(item[forCheck[i]] != undefined && item[forCheck[i]].indexOf(searchPhrase)>=0){
                        filtered.push(item);
                        break;
                    }
                }
            }
        });
        return filtered;
    };
}]);