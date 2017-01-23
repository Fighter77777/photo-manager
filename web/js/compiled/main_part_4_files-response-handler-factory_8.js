mapApp.factory('filesResponseHandlerFactory', ['filterFilter', function(filterFilter){
    //сортировка объектов
    function sortByProperty(obj, propName)
    {
        function compareProp(elementA, elementB)   //Функция сравнения
        {
            return elementA[propName] > elementB[propName];//.toUpperCase();
        }

        return obj.sort(compareProp);
    }



    //форматирование и сортировка  дат
    function formatDateList(dateList)
    {
        var dateListArr = [];
        for (var upl_id in dateList) {
            dateListArr.push({
                uplId: upl_id,
                value: dateList[upl_id]
            });
        }

        dateListArr.sort(function(elA, elB){    //новые загрузки више
            if(elA.value == elB.value)
                return elA.uplId < elB.uplId;
            else
                return elA.value < elB.value;
        });

        var numDates = dateListArr.length;
        for (var i = 0; i < numDates; i++) {
            dateListArr[i].value = dateListArr[i].value.replace(/(\d+)-(\d+)-(\d+)/, '$3.$2.$1');
        }
        return dateListArr;
    }


    function parseImgPath(path) {
        var pathArr = path.split('/');
        if(pathArr.length<4)
            return false;

        var fileName = pathArr.pop(),
            fileHashDir = pathArr.pop(), fileYearDir =  pathArr.pop();
        var fileDir = fileYearDir + '/' + fileHashDir;

        //перший елемент пустий із-за слеша на початку, тому туди можна втавить host
        pathArr[0] = document.location.origin;

        pathArr.push('ready_maps');
        pathArr.push(fileDir);
        pathArr.push(fileName);


        //ищем имя карты

        var fileNameArr = fileName.split('.');
        var numPartPoint = fileNameArr.length;
        if(numPartPoint<2)
            return false;


        //получаем последнее слово в названии файла, оно и есть названием
        var wordArr = fileNameArr[numPartPoint-2].split(' ');
        var numWord = wordArr.length;
        if(numWord<1)
            return false;
        var mapName = wordArr[numWord-1];

        return {
            path: pathArr.join('/'),
            name: mapName
        };
    }


    function prepareDataToScope(resp){
            var mapData, mapTypeList = [], filesList = {};
            var dateList = {};

            if(resp.files == undefined){
                return false;
            }

            resp.files.forEach(function(item, i, files) {
                dateList[item['upl_id']] = item['date_add'];

                //если тип png и существуют координаты привязки
                if(item['ext'] == 'png' && resp.extreme[item['upl_id']] != undefined){
                    mapData = parseImgPath(item['path']);
                    if(mapData){
                        mapData.uplId = item['upl_id'];
                        mapData.checked = 0;

                        mapTypeList.push(mapData);
                    }
                }

                if(filesList[item['upl_id']] == undefined)
                    filesList[item['upl_id']] = [];
                filesList[item['upl_id']].push({
                    url: item['path'],
                    name: item['path'].split('/').pop()
                });
            });

            return {
                extreme: resp.extreme,
                dateList: formatDateList(dateList),
                mapsTypes: sortByProperty(mapTypeList, 'name'),
                filesList: filesList
            }
        }


        function calculateUploadId(currentDate, dateList)
        {
            var currentUploadId;

            if(!currentDate){
                currentUploadId = dateList[0].uplId;
                currentDate = dateList[0].value;
            }else{
                var foundDate = filterFilter(dateList, {value: currentDate});
                if(foundDate.length){
                    currentUploadId = foundDate[0].uplId;
                    currentDate = foundDate[0].value;
                }else{
                    currentUploadId = dateList[0].uplId;
                    currentDate = dateList[0].value;
                }
            }

            return {
                currentDate: currentDate,
                currentUploadId: currentUploadId
            }
        }


        return {
            handle: prepareDataToScope,
            calculateUploadId: calculateUploadId
        };
}]);
