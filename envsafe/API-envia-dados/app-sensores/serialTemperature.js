const sensors = require('./sensors')

class NewArduinoTemperature {

    constructor(){
        this.listData = [];
		this.__listDataTemp = [];
		this.listDataHour = [];
    }

    get List() {
        return this.listData;
    }
	
	get ListHour() {
		return this.listDataHour;
	}
    
    SetConnection(){
        setInterval(() => {
            let data_float = sensors.dht11({minTemp:30, maxTemp:40});

            if (this.__listDataTemp.length === 59) {
                let sum = this.__listDataTemp.reduce((a, b) =>  a + b, 0);
                this.listDataHour.push((sum / this.__listDataTemp.length).toFixed(2));
                while(this.__listDataTemp.length > 0) {
                    this.__listDataTemp.pop();
                }
            }
            
            this.__listDataTemp.push(data_float[1]);
            this.listData.push(data_float[1]);

        }, 1000);
    }
}

const serial = new NewArduinoTemperature();
serial.SetConnection();

module.exports.ArduinoDataTemperature = {List: serial.List, ListHour:serial.ListHour} 