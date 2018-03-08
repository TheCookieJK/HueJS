# HueJS
HueJS is a Javascript library to work with <a href="https://developers.meethue.com/philips-hue-api">Philips Hue Api.</a>


## Get started
### Generate File 
```javascript
npm run build
```

### Import
```javascript
<script src='dist/hue.js'></script>
```
### Setup
```javascript
huejs.bridge.setIP("<bridge-ip>");
huejs.bridge.setAPIKey("<api-key>");
```
### Example
```javascript
huejs.lights.modify('1', 'state', {'on': true});

huejs.groups.modify('1', 'action', {'on': false});
```


### Lights & groups as objects:
```javascript
var group = huejs.group("<group-name or group-id>");
group.modify("action", {"on": true});
group.turnOff();

var light = huejs.light("<light-name or group-id>");
light.modify("action", {"on": true});
if(light.isOn()){
    alert(light.lightName + " is on");
}
```