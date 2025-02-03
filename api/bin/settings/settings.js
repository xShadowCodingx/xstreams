/*
xStreams API
Date: 1/29/2025
Author: Chase Quinn

This is the main settings file for the API

If there are any issues reading the file, or if it doesn't exist, it will create a new one using the default settings
*/

const fs = require('fs');
const xml2js = require('xml2js');
const icl = require('icolor-logs');
const colorTheme = icl.theme('default');

const parser = new xml2js.Parser();

class Settings {
    constructor() {
        this.settingsLocation = __dirname + '/settings.xml';;
        this.baseSettings = `
        <?xml version="1.0" encoding="UTF-8"?>
        <settings>
            <port>8443</port>
        </settings>
        `;
    }
    write() {
        fs.writeFile(this.settingsLocation, this.baseSettings, { flag: 'w' }, (err) => {
            if (err) {
                colorTheme.error("Error writing settings XML file:", err);
            } else {
                colorTheme.warning("Settings XML file corrupt or missing data... New Settings XML file created.");
            };
        });
    };

    deleteAndCreate() {
        fs.unlink(this.settingsLocation, (err) => {
            if (err) {
                colorTheme.error("Error deleting settings XML file:", err);
            }
            else {
                this.write();
            };
        });
    };

    sync() {
        if (fs.existsSync(this.settingsLocation)) {
            colorTheme.info("Checking settings XML file...");
            fs.readFile(this.settingsLocation, (err, data) => {
                if (err) {
                    colorTheme.error("Error reading settings XML file:", err);
                    this.deleteAndCreate();
                } else {
                    try {
                        parser.parseString(data, (err, result) => {
                            if (err) {
                                colorTheme.error("Error parsing settings XML file:", err);
                                this.deleteAndCreate();
                            } else {
                                if (result.settings.port) {
                                    try {
                                        colorTheme.info("Settings XML file already exists with port:", result.settings.port[0]);
                                    } catch (err) {
                                        colorTheme.error("Error reading settings XML file:", err);
                                        this.deleteAndCreate();
                                    };
                                }
                                else {
                                    this.deleteAndCreate();
                                }
                            };
                        });
                    } catch (err) {
                        this.deleteAndCreate();
                    }
                }
            })
        } else {
            this.write();
        };
    };

    getPort() {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.settingsLocation)) {
                fs.readFile(this.settingsLocation, (err, data) => {
                    if (err) {
                        colorTheme.error("Error reading settings XML file:", err)
                    } else {
                        parser.parseString(data, (err, result) => {
                            if (err) {
                                colorTheme.error("Error parsing settings XML file:", err);
                            } else {
                                resolve(result.settings.port[0]);
                            }
                        })
                    }
                })
            } else {
                console.error("Settings XML file does not exist!");
            };
        });
    };
};

module.exports = { Settings };