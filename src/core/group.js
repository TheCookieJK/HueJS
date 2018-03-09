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
    },
    bri(bri){
        bri = Math.round(bri);
        if(bri < 0){
            bri = 0;
        }else if(bri > 255){
            bri = 255;
        }
        this.modify("action", {"bri": bri});
    },
    hue(hue){
        hue = Math.round(hue);
        this.modify("action", {"hue": hue});
    },
    select(){
        this.modify("action", {"alert": 'select'});
    }
};

export const group = (groupName) => Object.assign(Object.create(groupProto),{ groupName });