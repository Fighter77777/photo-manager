imgApp.filter('topicFilter', [function() {
    return function (items, searchPhrase){
        var filtered = [];

        if(!searchPhrase){
            return items;
        }

        items.forEach(function(item){

            if(item.topics_tags){
                for (i = 0; i < item.topics_tags.length; i++) {
                    console.log(item.topics_tags[i]);
                    if(item.topics_tags[i] != undefined && item.topics_tags[i].name.indexOf(searchPhrase)>=0) {
                        filtered.push(item);
                        break;
                    }
                }
            }
        });
        return filtered;
    };
}]);