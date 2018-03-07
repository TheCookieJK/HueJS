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


## To do:
```javascript
var group1 = huejs.groups.getByName("group");
group1.modify({"on": true});
```