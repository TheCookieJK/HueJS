import {groups} from '../main';

const groupProto = {
    isValid(){

    },
    isOn(){

    },
    isAnyOn(){
        
    },
    modify(target, newJSON){
        groups.modify(this.groupName, target, newJSON);
    },
    turnOn(){
        this.modify('action', {"on": true});
    },
    turnOff(){
        this.modify('action', {"on": false});
    },
    colorLoop(){
        this.modify("action", {"effect": "colorloop"});
    },
    clearEffects(){
        this.modify("action", {"effect": "none"});
    }
};

export const group = (groupName) => Object.assign(Object.create(groupProto),{ groupName });