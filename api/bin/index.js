/*
xStreams API
Date: 1/29/2025
Author: Chase Quinn

This is the main file for the API
*/

const express = require('express');
const app = express();

const settings = require('./settings/settings');
const settingsInstance = new settings.Settings();

module.exports = {
    app,
    settings,
    settingsInstance
};