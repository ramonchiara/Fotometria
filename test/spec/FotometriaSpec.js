describe("ISO", function() {

    it("It should be possible to get all possible ISO values", function() {
        expect(IsoValues()).toEqual([100, 200, 400, 800, 1600, 3200, 6400, 12800]);
    });

    describe("It should be possible to compare two ISO values in EVs", function() {
        var tests = [
            {isoA: 100, isoB: 100, ev: 0},
            {isoA: 100, isoB: 200, ev: 1},
            {isoA: 100, isoB: 400, ev: 2},
            {isoA: 100, isoB: 800, ev: 3},
            {isoA: 200, isoB: 100, ev: -1},
            {isoA: 200, isoB: 200, ev: 0},
            {isoA: 200, isoB: 400, ev: 1},
            {isoA: 200, isoB: 800, ev: 2},
            {isoA: 100, isoB: 12800, ev: 7},
            {isoA: 12800, isoB: 100, ev: -7}
        ];

        tests.forEach(function(test) {
            var isoA = new Iso(test.isoA);
            var isoB = new Iso(test.isoB);

            it("It should have " + test.ev + " EVs between " + isoA.value + " and " + isoB.value, function() {
                expect(isoA.toReach(isoB)).toBe(test.ev);
            });
        });
    });

});

describe("Shutter", function() {

    it("It should be possible to get all possible Shutter values", function() {
        expect(ShutterValues()).toEqual(['30', '15', '8', '4', '2', '1', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000', '1/4000', '1/8000']);
    });

    describe("It should be possible to compare two Shutter values in EVs", function() {
        var tests = [
            {sA: '1', sB: '1/4', ev: -2},
            {sA: '1', sB: '1/2', ev: -1},
            {sA: '1', sB: '1', ev: 0},
            {sA: '1', sB: '2', ev: 1},
            {sA: '1', sB: '4', ev: 2},
            {sA: '30', sB: '30', ev: 0},
            {sA: '30', sB: '15', ev: -1},
            {sA: '30', sB: '8', ev: -2},
            {sA: '30', sB: '4', ev: -3},
            {sA: '1/8000', sB: '1/8000', ev: 0},
            {sA: '1/8000', sB: '1/4000', ev: 1},
            {sA: '1/8000', sB: '1/2000', ev: 2},
            {sA: '1/8000', sB: '1/1000', ev: 3},
            {sA: '1/8000', sB: '30', ev: 18},
            {sA: '30', sB: '1/8000', ev: -18}
        ];

        tests.forEach(function(test) {
            var sA = new Shutter(test.sA);
            var sB = new Shutter(test.sB);

            it("It should have " + test.ev + " EVs between " + sA.value + " and " + sB.value, function() {
                expect(sA.toReach(sB)).toBe(test.ev);
            });
        });
    });

});

describe("Aperture", function() {

    it("It should be possible to get all possible Aperture values", function() {
        expect(ApertureValues()).toEqual([1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32, 45, 64]);
    });

    describe("It should be possible to compare two Aperture values in EVs", function() {
        var tests = [
            {aA: 1, aB: 1, ev: 0},
            {aA: 1, aB: 1.4, ev: -1},
            {aA: 1, aB: 2, ev: -2},
            {aA: 1, aB: 2.8, ev: -3},
            {aA: 1, aB: 4, ev: -4},
            {aA: 64, aB: 64, ev: 0},
            {aA: 64, aB: 45, ev: 1},
            {aA: 64, aB: 32, ev: 2},
            {aA: 64, aB: 22, ev: 3},
            {aA: 64, aB: 16, ev: 4},
            {aA: 1, aB: 64, ev: -12},
            {aA: 64, aB: 1, ev: 12}
        ];

        tests.forEach(function(test) {
            var aA = new Aperture(test.aA);
            var aB = new Aperture(test.aB);

            it("It should have " + test.ev + " EVs between " + aA.value + " and " + aB.value, function() {
                expect(aA.toReach(aB)).toBe(test.ev);
            });
        });
    });

});
