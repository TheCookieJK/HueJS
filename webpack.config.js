const path = require('path');
const config = require('./package.json');

require('dotenv').config();

module.exports = {
    entry: {
        index: path.resolve(__dirname, config.main)
    },
    devtool: 'source-map',
    output: {
        library: process.env.NAME,
        libraryTarget: process.env.TARGET,
        path: path.join(__dirname, "dist"),
		filename: "hue.js"
    }
};