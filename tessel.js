// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/
var tessel = require('tessel');
var async = require('async');
var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);

var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
    var position = 0; //  Target position of the servo between 0 (min) and 1 (max).
    rfid.on('ready', function (version) {
        console.log('Ready to read card');
        rfid.on('data', function (card) {
            console.log('Read card');
            servo.configure(servo1, 0.05, 0.12, function () {
                var doit = setInterval(function () {
                    //  Set servo #1 to position pos.
                    servo.move(servo1, position);
                    // Increment by 10% (~18 deg for a normal servo)
                    position += 0.99;
                    if (position > 1) {
                        position = 0; // Reset servo position
                    }
                    // position++;
                    // setTimeout(function () {
                    //     // Wait for UPS wonderful person to put in parcel.
                    // }, 1000);
                    // position = 0;
                }, 1000);
                setTimeout(function () { clearInterval(doit) }, 2000);
                // Every 500 milliseconds
            });

            //console.log('UID:', card.uid.toString('hex'));
        });
    });
});














// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/