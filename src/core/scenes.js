import { bridge } from '../main';
import { nameToSceneId, nameToId } from '../utils/translator';

export default class Scenes{

    getAll(){
        let url = "http://" + bridge.getIP() + "/api/" + bridge.getApiKey() + "/scenes";
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }

    getIdByName(name){
        let scenes = this.getAll();
        let id = nameToId(scenes, name);
        return id;
    }

}