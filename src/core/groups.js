import { bridge } from '../main';
import { nameToId } from '../utils/translator';

export default class Groups{

    /** 
     * Get all informations about all the lights connected to the bridge
     */
    getAll(){
        let url = 'http://' + bridge.getIP() + "/api/" + bridge.getApiKey() + "/groups/";
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }
    /**
     * 
     * Function to modify the different states of a particular group
     * 
     * @param {string} group 
     * @param {string} target 
     * @param {Object} newJSON 
     * @param {function} callback 
     */
    modify(group, target, newJSON, callback = function(res){}){
        let match = ['name', 'lights', 'type', 'state', 'recycle', 'action', 'xy', 'ct', 'alert', 'colormode'];
        if(match.indexOf(target) > -1){
            let url = 'http://' + bridge.getIP() + "/api/" + bridge.getApiKey() + "/groups/" + group + "/" + target;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    callback(this.responseText);
                }else{
                    // console.log(this.readyState);
                    // console.log(this.response);
                }
            }
            xhr.open('PUT', url, true);
            xhr.send(JSON.stringify(newJSON));
        }else{
            console.log("Unknown target");
            return -2;
        }
        
    }

    getByName(groupName){
        let groups = this.getAll();
        let id = nameToId(groups, groupName);
        if(id == false){
            return false;
        }else{

            let groupObj = groups[id];
            // groupObj['modify'] = this.modify(id, 'action', newJSON);

            return groupObj;
        }
    }

    /**
     * 
     * Get all group informations by name
     * 
     * @param {string} group
     */
    getById(group){
        let url = "http://" + bridge.getIP() + "/api/" + bridge.getApiKey() + "/groups/" + group;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        let response = JSON.parse(xhr.responseText);
        if(typeof response !== "undefined"){
            if(typeof response != "undefined" && !(response instanceof Array)){
                return response;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    /**
     * 
     * Checks if a particular group is on or off
     * 
     * @param {string} group 
     * @return {boolean}
     */
    isGroupOn(group, args = {'all': true}){
        
        let groupInfo = this.getByName(group);
        if(groupInfo == false){
            groupInfo = this.getById(group);
        }
        if(groupInfo == false){
            return "Group not found!";
        }else{
            if(args.all == true){
                if(groupInfo.state.all_on != null){
                    return groupInfo.state.all_on;
                }
            }else{
                if(groupInfo.state.any_on != null){
                    return groupInfo.state.any_on;
                }
            }
        }
    }

    /**
     * 
     * Switch group on or off
     * 
     * @param {string} group 
     * @param {function} callback 
     */
    switchOnOffGroup(group, callback = function(res){}){
        let url = 'http://' + bridge.getIP()  + "/api" + bridge.getApiKey() + "/groups/" + group + "/action";
        let data = {"on": false};
        if(this.isGroupOn(group) == false){
            data = {"on": true};
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                callback(this.responseText);
                
            }
        }
        xhr.open('PUT', url, true);
        xhr.send(JSON.stringify(data));
    }


}

