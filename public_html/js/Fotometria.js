"use strict";

function IsoValues() {
    var result = [];

    for (var iso = 100; iso <= 12800; iso *= 2) {
        result.push(iso);
    }

    return result;
}


function Iso(value) {

    this.value = value;

    this.compareTo = function(other) {
        var isos = IsoValues();

        var index1 = isos.indexOf(this.value);
        var index2 = isos.indexOf(other.value);

        return index2 - index1;
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

function Shutter(value) {

    this.value = value;

    this.compareTo = function(other) {
        var shutters = ShutterValues();

        var index1 = shutters.indexOf(this.value);
        var index2 = shutters.indexOf(other.value);

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

function Aperture(value) {

    this.value = value;

    this.compareTo = function(other) {
        var apertures = ApertureValues();

        var index1 = apertures.indexOf(this.value);
        var index2 = apertures.indexOf(other.value);

        return index1 - index2;
    };

}

function Configuration(iso, shutter, aperture) {

    this.iso = new Iso(iso);
    this.shutter = new Shutter(shutter);
    this.aperture = new Aperture(aperture);

    this.getIso = function() {
        return this.iso.value;
    };

    this.getShutter = function() {
        return this.shutter.value;
    };

    this.getAperture = function() {
        return this.aperture.value;
    };

    this.compareTo = function(other) {
        var deltaIso = this.iso.compareTo(other.iso);
        var deltaShutter = this.shutter.compareTo(other.shutter);
        var deltaAperture = this.aperture.compareTo(other.aperture);

        return deltaIso + deltaShutter + deltaAperture;
    };

    this.toString = function() {
        return '[' + this.iso.value + ', ' + this.shutter.value + ', ' + this.aperture.value + ']';
    };

}

var isos = IsoValues();
var shutters = ShutterValues();
var apertures = ApertureValues();

$('#isoA').slider({min: 0, max: isos.length - 1});
$('#shutterA').slider({min: 0, max: shutters.length - 1});
$('#apertureA').slider({min: 0, max: apertures.length - 1});

$('#isoB').slider({min: 0, max: isos.length - 1});
$('#shutterB').slider({min: 0, max: shutters.length - 1});
$('#apertureB').slider({min: 0, max: apertures.length - 1});

var fotometria = angular.module('Fotometria', []);

fotometria.controller('FotometriaController', function($scope) {
    $scope.isoA = isos[$('#isoA').slider('value')];
    $scope.shutterA = shutters[$('#shutterA').slider('value')];
    $scope.apertureA = apertures[$('#apertureA').slider('value')];

    $scope.isoB = isos[$('#isoB').slider('value')];
    $scope.shutterB = shutters[$('#shutterB').slider('value')];
    $scope.apertureB = apertures[$('#apertureB').slider('value')];

    $scope.deltaIso = $scope.isoA - $scope.isoB;
    $scope.deltaShutter = $scope.shutterA - $scope.shutterB;
    $scope.deltaAperture = $scope.apertureA - $scope.apertureB;
    $scope.deltaTotal = $scope.deltaIso + $scope.deltaShutter + $scope.deltaAperture;


});
