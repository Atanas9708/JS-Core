let rgbToHexColor = require('./rgb-to-hex').rgbToHexColor;
let expect = require('chai').expect;

describe('RGB To Hex Color',function () {
    it('should return #FF9EAA for (255, 158, 170)',function () {
        expect(rgbToHexColor(255, 158, 170)).to.equals('#FF9EAA');
    });
    it('should return undefiend for (256, 15, 15)',function () {
        expect(rgbToHexColor(256, 15, 15)).to.be.undefined;
    });
    it('should return undefiend for (15, 256, 15)',function () {
        expect(rgbToHexColor(15, 256, 15)).to.be.undefined;
    });
    it('should return undefiend for (15, 15, 256)',function () {
        expect(rgbToHexColor(15, 15, 256)).to.be.undefined;
    });
    it('should pad values with zeroes',function () {
        expect(rgbToHexColor(12, 13, 14)).to.equals('#0C0D0E');
    });
    it('work at lower limit',function () {
        expect(rgbToHexColor(0, 0, 0)).to.equals('#000000');
    });
    it('work at upper limit',function () {
        expect(rgbToHexColor(255, 255, 255)).to.equals('#FFFFFF');
    });
    it('should return undefined for negative values',function () {
        expect(rgbToHexColor(-1, -1, -1)).to.be.undefined;
    });
});