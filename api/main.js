/*
xStreams API
Date: 1/29/2025
Author: Chase Quinn

This is the main entry point for the API
*/

const api = require('./bin');
const icl = require('icolor-logs');

const colorTheme = icl.theme('default');

api.settingsInstance.sync();

async function run() {
    const port = await api.settingsInstance.getPort();
    api.app.listen(port, () => {
        colorTheme.success("xStreams API listening on port " + port)
    });
}

run();