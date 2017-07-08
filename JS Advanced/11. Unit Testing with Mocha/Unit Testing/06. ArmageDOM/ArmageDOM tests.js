let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let nuke = require('./ArmageDOM').nuke;

describe('ArmageDOM Unit Tests',function () {
    let targetHtml;
    beforeEach(function () {
        document.body.innerHTML = `<body>
         <div id="target">
             <div class="nested target">
                 <p>This is some text</p>
             </div>
             <div class="target">
                 <p>Empty div</p>
             </div>
             <div class="inside">
                 <span class="nested">Some more text</span>
                 <span class="target">Some more text</span>
             </div>
         </div>
         </body>`
        targetHtml = $('#target');
    });

    it('should not change for valid and invalid selector',function () {
        let validSelector = $('.inside');
        let invalidSelector = 2;
        let oldHtml = targetHtml.html();
        nuke(validSelector, invalidSelector);
        expect(targetHtml.html()).to.be.equal(oldHtml, 'Html has changed!');
    });
    it('should not change for two equal selectors',function () {
        let selector = $('.nested');
        let oldHtml = targetHtml.html();
        nuke(selector, selector);
        expect(targetHtml.html()).to.be.equal(oldHtml, 'Html has changed!');
    });
    it('should change for two valid selectors',function () {
        let validSelector1 = $('.nested');
        let validSelector2 = $('.target');
        let oldHtml = targetHtml.html();
        nuke(validSelector1, validSelector2);
        expect(targetHtml.html()).to.not.equal(oldHtml, 'Html did not changed!');
    });
    it('should not change for two equal selectors',function () {
        let validSelector1 = $('.nested');
        let validSelector2 = $('.inside');
        let oldHtml = targetHtml.html();
        nuke(validSelector1, validSelector2);
        expect(targetHtml.html()).to.be.equal(oldHtml);
    });
});