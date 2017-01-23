mapApp.factory('fieldsShowFactory', ['placeType', function(placeType) {
    //отображение мест в списке
    function changeShowNestedPlaces(places, parentType, parentId, isShow) {
        places.forEach(function (place, i, places) {
            if ((
                    place.type == placeType[parentType].control
                    && place[placeType[parentType].idName] == parentId
                ) || (
                    isShow == false
                    && place[placeType[parentType].idName] != undefined
                    && place[placeType[parentType].idName] == parentId
                )
            ) {
                place.visible = isShow;     //отображение в списке мест

                if (!isShow) {               //если место нужно скрыть
                    place.showContent = 0;  //закрывем все раскрытые вложенные списки
                }
            }

            if (place.type == parentType
                && place.id == parentId
            ) {
                place.showContent = isShow; //состояние пункта раскрывающегоя списка
            }
        });
    }

    function changeShowPlaceOnMap(places, placeForChange) {
        var allPlacesForChange = [placeForChange];
        placeForChange.showOnMap = 1 - placeForChange.showOnMap;

        //если это поле значить больше ничего не изменилось
        if(placeForChange.type == placeType.field.name){
            return allPlacesForChange;
        }

        //для всех вложенных мест применяем видимость на карте такую же как у placeForChange
        var placeIdName = placeType[placeForChange.type].idName;
        places.forEach(function (place, i, places) {
            if (place[placeIdName] != undefined && place[placeIdName] == placeForChange.id){
                place.showOnMap = placeForChange.showOnMap;
                allPlacesForChange.push(place);
            }
        });
        return allPlacesForChange;
    }

    return {
        changeShowInList: changeShowNestedPlaces,
        changeShowOnMap: changeShowPlaceOnMap
    };
}]);