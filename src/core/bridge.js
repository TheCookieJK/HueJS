export default class Bridge {
    
    /**
     * 
     * Get current ip
     * 
     */
    getIP(){
        return this.ip;
    }

    /**
     * 
     * Set current bridge ip adress
     * 
     * @param {string} ip 
     */
    setIP(ip){
        this.ip = ip;
    }

    /**
     * 
     * Set current api-key (replaced by verifyApplication)
     * 
     * @param {string} key 
     */
    setApiKey(key){
        this.apiKey = key;
    }

    /**
     * 
     * Get current bridge api-key
     * 
     */
    getApiKey(){
        return this.apiKey;
    }

    /**
     * 
     * Get bridge config
     * 
     */
    getConfig(){
        let url = "http://" + this.ip + "/api/" + this.apiKey + "/config";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }

    /**
     * 
     * Get bridge name
     * 
     */
    getName(){
        let config = this.getConfig();
        return config.name;
    }

    /**
     * 
     * Set name of bridge
     * 
     * @param {string} name 
     * @param {function} callback 
     */
    setName(name, callback = function(res){}){
        let url = "http://" + this.ip + "/api/" + this.apiKey + "/config";
        let xhr = new XMLHttpRequest();
        let data = {"name": name};
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                callback(this.responseText);
            }
        }
        xhr.open('PUT', url, true);
        xhr.send(JSON.stringify(data));
    }

    /**
     * 
     * @param {string} app 
     * @param {string} device 
     * @param {function} callback 
     * @param {number} timeToAccept 
     */
    verifyApplication(app, device, callback = function(res){}, timeToAccept = 50){

        if(this.ip !== null && app !== null && device !== null && this.apiKey == null){
            let url = "http://" + this.ip + "/api";
            let data = {"devicetype": app + "#" + device};
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, false);
            xhr.send(JSON.stringify(data));
            let response = JSON.parse(xhr.responseText)[0];
            if(typeof response.success !== "undefined"){
                console.log(response.success);
            }else{
                console.log("Press link button");
                callback(xhr.responseText); // on link button must be pressed.
                let remaining = timeToAccept;
                console.log("Waiting for " + remaining + " sec");
                let inter = setInterval(function(){
                    if(remaining <= 0){
                        clearInterval(inter);
                    }else{
                        remaining--;
                        console.log(remaining + " sec remaining...");
                        xhr.open("POST", url, false);
                        xhr.send(JSON.stringify(data));
                        console.log(JSON.parse(xhr.responseText));
                        let response2 = JSON.parse(xhr.responseText)[0];
                        if(typeof response2.success !== 'undefined'){
                            remaining = 0;
                            console.log("User found: "  + response2.success.username);
                            this.setApiKey(response2.success.username);
                            return response2.success.username;
                        } 
                    }
                }, 1000);
            }

        }else{
            console.error("No Bridge found!");
        }

    }

}

