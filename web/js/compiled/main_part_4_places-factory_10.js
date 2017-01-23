mapApp.factory('placesFactory', ['placeType', function(placeType)
{
    var result = [];
    function createReg(fields) {
        return {
            id: fields.reg_id,
            title: fields.reg_name + ' '+ placeType.region.alias,
            type: placeType.region.name,
            reg_name: fields.reg_name,
            visible: 1,
            showContent: 0,
            showOnMap: 0
        }
    }

    function createDis(fields) {
        return {
            id: fields.dis_id,
            title: fields.dis_name + ' '+ placeType.district.alias,
            type: placeType.district.name,
            reg_id: fields.reg_id,
            reg_name: fields.reg_name,
            dis_name: fields.dis_name,
            visible:0,
            showContent: 0,
            showOnMap: 0
        }
    }

    function createLoc(fields) {
        return {
            id: fields.loc_id,
            title: fields.loc_name,
            type: placeType.locality.name,
            reg_id: fields.reg_id,
            reg_name: fields.reg_name,
            dis_id: fields.dis_id,
            dis_name: fields.dis_name,
            visible:0,
            showContent: 0,
            showOnMap: 0
        }
    }

    function createField(fields, isCustomer) {
        fields.id = fields.f_id;
        fields.title = getFieldsTitle(fields, isCustomer);
        fields.type = placeType.field.name;
        fields.visible = 0;
        fields.showOnMap = 0;
        return fields;
    }

    function getFieldsTitle(fields, isCustomer) {
        var title;
        if(!isCustomer){    //для агрилаба всегда num_agrilab
            title = fields.f_name;
        }

        if(!title){
            title = (fields.num_customer)?fields.num_customer:fields.num_local;
        }

        if(!title){ //если нет названия поля клиента отображаем название агрилаба
            title = fields.f_name;
        }

        return title;
    }


    var format = function(fields, isCustomer) {
        var numFields = fields.length;
        if(!numFields)
            return [];

        if(result.length>0)
            return result;

        result = [
            createReg(fields[0]),
            createDis(fields[0]),
            createLoc(fields[0]),
            createField(fields[0], isCustomer)
        ];


        for (var i = 1; i < numFields; i++) {
            if(fields[i].reg_id != fields[i-1].reg_id){
                result.push(createReg(fields[i]));
            }
            if(fields[i].dis_id != fields[i-1].dis_id){
                result.push(createDis(fields[i]));
            }
            if(fields[i].loc_id != fields[i-1].loc_id){
                result.push(createLoc(fields[i]));
            }
            result.push(createField(fields[i], isCustomer));
        }

        return result;
    }

    return {
        format: format
    };
}]);