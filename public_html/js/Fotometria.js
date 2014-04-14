"use strict";

function Iso(value) {

    this.value = value;

    this.toReach = function(other) {
        var isos = IsoValues();

        var index1 = isos.indexOf(this.value);
        var index2 = isos.indexOf(other.value);

        return index2 - index1;
    };

}

function IsoValues() {
    var result = [];

    for (var iso = 100; iso <= 12800; iso *= 2) {
        result.push(iso);
    }

    return result;
}

function Shutter(value) {

    this.value = value;

    this.toReach = function(other) {
        var shutters = ShutterValues();

        var index1 = shutters.indexOf(this.value);
        var index2 = shutters.indexOf(other.value);

        return index1 - index2;
    };

}

function ShutterValues() {
    var result = [];

    for (var s = 30; s >= 1; s /= 2) {
        s = Math.round(s);
        result.push(Math.round(s).toString());
    }
    for (var s = 2; s <= 8000; s *= 2) {
        s = s === 16 ? s = 15 : s === 120 ? s = 125 : s;
        result.push('1/' + Math.round(s));
    }

    return result;
}

function Aperture(value) {

    this.value = value;

    this.toReach = function(other) {
        var apertures = ApertureValues();

        var index1 = apertures.indexOf(this.value);
        var index2 = apertures.indexOf(other.value);

        return index1 - index2;
    };

}

function ApertureValues() {
    var result = [];

    for (var a = 1; a < 90; a *= Math.SQRT2) {
        var ap = a.toPrecision(2).replace('.0', '');
        result.push(parseFloat(ap === '5.7' ? '5.6' : ap === '23' ? '22' : ap));
    }

    return result;
}
