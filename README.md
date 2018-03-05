# HueJS
HueJS is a Javascript library to work with <a href="https://developers.meethue.com/philips-hue-api">Philips Hue Api.</a>


## Get started
# Import
```javascript
<script src='dist/hue.js'></script>
```
# Setup
```javascript
huejs.bridge.setIP("<bridge-ip>");
huejs.bridge.setAPIKey("<api-key>");
```
# Example
```javascript
huejs.lights.modifyLight('1', 'state', {'on': true});
```