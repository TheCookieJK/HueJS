import { bridge } from '../main';
import { nameToId } from '../utils/translator';

export default class Lights{

    
    /** 
     * Get all informations about all the lights connected to the bridge
     */
    getAll(){
        let url = 'http://' + bridge.getIP() + "/api/" + bridge.getApiKey() + "/lights/";
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }
    
    /**
     * 
     * Get light id by name
     * 
     * @param {string} name 
     */
    getByName(name){
        let lights = this.getAllLights();
        let id = nameToId(lights, name);
        if(id == false){
            console.log("Light not found: " + name);
            return -1;
        }else{
            return lights[id];
        }
    }

    /**
     * 
     * Modify all states of a paritcular light
     * 
     * @param {string} light 
     * @param {string} target 
     * @param {Object} newJSON 
     * @param {function} callback 
     */
    modify(light, target, newJSON, callback = function(res){}){
        let match = ['state', 'swupddate', 'type', 'name', 'modelid', 'manufacturername', 'capabilities', 'uniqueid', 'swversion', 'swconfigid', 'productid'];
        if(match.indexOf(target) > -1){
            let url = 'http://' + bridge.getIP() + "/api/" + bridge.getApiKey() + "/lights/" + light +"/"+target;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    callback(this.responseText);
                }
            }
            xhr.open('PUT', url, true);
            xhr.send(JSON.stringify(newJSON));
        }  
    }

    /**
     * 
     * @param {string} light 
     */
    turnOff(light){
        this.modify(light, 'state', {'on': false});
    }

    turnAllOff(){
        let allLights = this.getAll();
        for(let light in allLights){
            if(allLights.hasOwnProperty(light)){
                this.modify(light, "state", {"on": false});
            }
        }
    }

    turnAllOn(){
        let allLights = this.getAll();
        for(let light in allLights){
            if(allLights.hasOwnProperty(light)){
                this.modify(light, "state", {"on": true});
            }
        }
    }


}

