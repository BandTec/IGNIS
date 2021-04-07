const express = require('express');
const { ArduinoDataHumidity } = require('./serialHumidity')
const { ArduinoDataTemperature } = require('./serialTemperature')
const router = express.Router();

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataHumidity.List,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/temperature', (request, response, next) => {

    let sum = ArduinoDataTemperature.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemperature.List.length).toFixed(2);
	let sumHour = ArduinoDataTemperature.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemperature.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataTemperature.List,
        total: ArduinoDataTemperature.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemperature.ListHour,
		totalHour: ArduinoDataTemperature.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

module.exports = router;