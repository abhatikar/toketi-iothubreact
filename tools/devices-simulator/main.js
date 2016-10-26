// Copyright (c) Microsoft. All rights reserved.

/*
    See README.md for the instructions to prepare this script

*/

"use strict";

// How frequently to send data
var frequency = 1000;

// Name of your Azure IoT hub (if truncated, use the value from the connection string)
var hubName = "my-iothub";

// Available protocols
//var Protocol = require("azure-iot-device-amqp-ws").AmqpWs;
//var Protocol = require("azure-iot-device-amqp").Amqp;
var Protocol = require("azure-iot-device-http").Http;

// Load credentials
require("vm").runInThisContext(require("fs").readFileSync(__dirname + "/credentials.js"))

// Instantiate simulators
var TemperatureSimulator = require("./temperature_simulator.js");
var HumiditySimulator = require("./humidity_simulator.js");

// Connect simulators to Azure IoT hub
var devices = [];
var j = 0;
for (var i = 0; i < hubDevices.length ; i++) {
  var deviceId = hubDevices[i][0].deviceId;
  var accessKey = hubDevices[i][0].authentication.SymmetricKey.primaryKey;

  devices[j] = new TemperatureSimulator(hubName, deviceId, accessKey, Protocol, frequency);
  devices[j++].connect();
  devices[j] = new HumiditySimulator(hubName, deviceId, accessKey, Protocol, frequency);
  devices[j++].connect();
}

// Start sending data generated by the simulators
for (var i = 0; i < devices.length ; i++) {
  devices[i].startSending();
}
