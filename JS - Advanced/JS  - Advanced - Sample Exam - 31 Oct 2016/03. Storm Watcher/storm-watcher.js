let solve = (function () {
    let id = 0;
    return class Record {
        constructor(temperature, humidity, pressure, windSpeed) {
            this.id = id++;
            this.temperature = Number(temperature);
            this.humidity = Number(humidity);
            this.pressure = Number(pressure);
            this.windSpeed = Number(windSpeed);
        }

        toString() {
            if (this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25) {
                this.status = 'Stormy';
            } else {
                this.status = 'Not stormy';
            }
            return `Reading ID: ${this.id}\nTemperature: ${this.temperature}*C\nRelative Humidity: ${this.humidity}%\nPressure: ${this.pressure}hpa\nWind Speed: ${this.windSpeed}m/s\nWeather: ${this.status}`;
        }
    }
})();

let record1 = new solve.Record(32, 66, 760, 12);
let record = new solve.Record(10, 40, 680, 30);

console.log(record1.toString());
console.log(record.toString());