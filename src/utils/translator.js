export const nameToId = (raw_json, name) => {
    let input = flattenObject(raw_json);
    let found = 0;
    for(let k in input){
        if(input[k.split('.')[0] + ".name"] == name){
            found++;
            return k.split('.')[0];
        }
    }
    if(found == 0){
        return false;
    }
}

export const flattenObject = function(ob) {
    var toReturn = {};
    
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};