function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDisckSapce) / 3;
        };
        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4);
        };
        classToExtend.prototype.isRoomy = function () {
           return this.hardDisckSapce > Math.floor(this.ram * this.processorSpeed);
        };
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            let manufacturerName = this.manufacturer;
            let keyboardManufacturer = this.keyboard.manufacturer;
            let monitorManufacturer = this.monitor.manufacturer;

            return manufacturerName === keyboardManufacturer &&
                   manufacturerName === monitorManufacturer
        };
        classToExtend.prototype.isClassy = function (classToExtend) {
            let batteryLife = this.battery.expectedLife;
            let computerColor = this.color;
            let computerWeight = this.weight;

            return batteryLife >= 3 && (computerColor === 'Silver' || computerColor === 'Black') && computerWeight < 3;
        };
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}