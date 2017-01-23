mapApp.factory('mapFactory', ['placeType', function(placeType)
{
    var overlayCollection = {};
    var titles = {};


    if(typeof google == 'undefined'){
        setInterval(function() {
            geocoder = new google.maps.Geocoder();
        }, 10);

    }else{
        geocoder = new google.maps.Geocoder();
    }
    var towns = [];

    function getTownAdress(place)
    {
        var address = '';

        if(place[placeType.region.nameForChildren] != undefined){
            address += ' ' + place[placeType.region.nameForChildren]
                +  ' ' + placeType.region.alias;
        }

        if(place[placeType.district.nameForChildren] != undefined){
            address += ' ' + place[placeType.district.nameForChildren]
                +  ' ' + placeType.district.alias;
        }

        address += ' ' + place['title'];
        return address;
    }

    function setTownInCenterMap(location)
    {
        map.setCenter(location);

        var marker = new google.maps.Marker({
            map: map,
            position: location
        });
    }

    function showTown(place)
    {
        var townKey = place.id + place.type;
        if(towns[townKey]){
            setTownInCenterMap(towns[townKey]);
        }else{
            geocoder.geocode({
                'address': getTownAdress(place)
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    towns[townKey] = results[0].geometry.location;
                    setTownInCenterMap(towns[townKey]);
                }
            });
        }

    }

    function createFieldTitle(content, extreme)
    {
        var position = {
            lat: parseFloat(extreme.max_lng) - .0005,
            lng: parseFloat(extreme.max_lat) - .003,
        };
        var infowindow = new google.maps.InfoWindow({
            content: content,
            position:position,
            map: map
        });
        return infowindow;
    }

    function updateFieldTitle(infowindow, content)
    {
        infowindow.setContent(content);
        if(!angular.isObject(infowindow.getMap())){
            infowindow.setMap(map);
        }
        return infowindow;
    }

    function hideFieldTitle(infowindow)
    {
        infowindow.setMap(null);
        return infowindow;
    }

    function getTitleContent(place, mapData, date)
    {
        var title = place.title +': ' + mapData.name + '<br>' + date;
        return title;
    }



    function createOverlay(src, extreme)
    {
        var imageBounds = {
            north: parseFloat(extreme.max_lng),
            south: parseFloat(extreme.min_lng),
            east:  parseFloat(extreme.max_lat),
            west:  parseFloat(extreme.min_lat)
        };

        var overlay = new google.maps.GroundOverlay(src, imageBounds);
        return overlay;
    }


    function showOverlay(place, mapData, extreme, day)
    {
        var mapName = mapData.uplId + mapData.name;
        var titleContent = getTitleContent(place, mapData, day);

        if(overlayCollection[place.id] == undefined){
            overlayCollection[place.id] = [];
            titles[place.id] = createFieldTitle(titleContent, extreme); //подпись к полю
        }else{  // убираем другие слои этого поля
            for(var m in overlayCollection[place.id]) {
               if(m!=mapName && isVisible(overlayCollection[place.id][m])) {
                   hideOverlay(overlayCollection[place.id][m]);
               }
            }
            updateFieldTitle(titles[place.id], titleContent);
        }


        if(overlayCollection[place.id][mapName] == undefined){
            overlayCollection[place.id][mapName] = createOverlay(mapData.path, extreme);
        }

        if(!isVisible(overlayCollection[place.id][mapName]))
            overlayCollection[place.id][mapName].setMap(map);


        return overlayCollection[place.id][mapName];
    }


    function hideOverlay(overlay)
    {
        overlay.setMap(null);
        return overlay;
    }

    function hideMap(placeId, mapName)
    {
        if(overlayCollection[placeId] == undefined){
            overlayCollection[placeId] = [];
            return;
        }

        if(overlayCollection[placeId][mapName] != undefined) {
            hideOverlay(overlayCollection[placeId][mapName]);
        }
        if(titles[placeId] != undefined) {
            hideFieldTitle(titles[placeId]);
        }
    }


    function isVisible(overlay)
    {
        return angular.isObject(overlay.getMap(map));
    }


    function setCenterMap(extreme)
    {
        var c = new google.maps.LatLng(
            (parseFloat(extreme.max_lng)+parseFloat(extreme.min_lng))/2,
            (parseFloat(extreme.max_lat)+parseFloat(extreme.min_lat))/2
        );
        map.setCenter(c);
    }


    return {
        select: function (place, mapData, extreme, day)
        {
            showOverlay(place, mapData, extreme, day);
            setCenterMap(extreme);
        },

        show: function (place, mapData, extreme, day) {
            showOverlay(place, mapData, extreme, day)
        },

        hide: function (place, mapData) {
            var mapName = mapData.uplId + mapData.name;
            hideMap(place.id, mapName);
        },

        hideAllByPlace: function (place) {
            if(overlayCollection[place.id] == undefined){
                return;
            }

            for(var mapName in overlayCollection[place.id]){
                hideMap(place.id, mapName)
            }
        },

        showTown:function (place) {
            showTown(place);
        }
    }
}]);