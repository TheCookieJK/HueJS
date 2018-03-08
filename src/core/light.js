import {lights} from '../main';
import * as errorMsg from '../const/error';

const lightProto = {
    isValid(){
        if(lights.get(this.lightName) != -1){
            return true;
        }else{
            return false;
        }
    },
    isOn(){
        if(this.isValid()){
            return lights.get(this.lightName).state.on;
        }
    },
    modify(target, newJSON){
        if(this.isValid()){
            lights.modify(this.lightName, target, newJSON);
        }else{
            console.error(errorMsg.lightNotFound(this.lightName));
        }
    },
    turnOn(){
        this.modify('state', {"on": true});
    },
    turnOff(){
        this.modify('state', {'on': false});
    },
    switchState(){
        this.modify('state', {"on": !this.isOn()});
    }
}

export const light = (lightName) => Object.assign(Object.create(lightProto), { 
    lightName 
});