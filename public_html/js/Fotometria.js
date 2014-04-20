'use strict';

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
        var apertures = ShutterValues();

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

var fotometria = angular.module('Fotometria', []);

fotometria.controller('FotometriaCtrl', ['$scope', function($scope) {
        $scope.isos = IsoValues();
        $scope.shutters = ShutterValues();
        $scope.apertures = ApertureValues();

        $scope.update = function() {
            $scope.deltaIso = new Iso($scope.isoA).compareTo(new Iso($scope.isoB));
            $scope.deltaShutter = new Shutter($scope.shutterA).compareTo(new Shutter($scope.shutterB));
            $scope.deltaAperture = new Aperture($scope.apertureA).compareTo(new Aperture($scope.apertureB));
            $scope.deltaTotal = $scope.deltaIso + $scope.deltaShutter + $scope.deltaAperture;
        };

        $scope.isoA = 100;
        $scope.shutterA = '1/125';
        $scope.apertureA = 11;

        $scope.isoB = 400;
        $scope.shutterB = '1/250';
        $scope.apertureB = 16;

        $scope.update();
    }]);

fotometria.directive('isoSlider', function() {
    return {
        restrict: 'C',
        scope: {
            iso: '=id'
        },
        link: function(scope, element, attrs) {
            element.slider({
                min: 0,
                value: scope.$parent.isos.indexOf(scope.iso),
                max: scope.$parent.isos.length - 1,
                slide: function(event, ui) {
                    scope.iso = scope.$parent.isos[ui.value];
                    scope.$apply();
                }
            });
            scope.$watch('iso', function() {
                scope.$parent.update();
            });
            scope.iso = scope.$parent.isos[element.slider('value')];
        }
    };
});

fotometria.directive('shutterSlider', function() {
    return {
        restrict: 'C',
        scope: {
            shutter: '=id'
        },
        link: function(scope, element, attrs) {
            element.slider({
                min: 0,
                value: scope.$parent.shutters.indexOf(scope.shutter),
                max: scope.$parent.shutters.length - 1,
                slide: function(event, ui) {
                    scope.shutter = scope.$parent.shutters[ui.value];
                    scope.$apply();
                }
            });
            scope.$watch('shutter', function() {
                scope.$parent.update();
            });
            scope.shutter = scope.$parent.shutters[element.slider('value')];
        }
    };
});

fotometria.directive('apertureSlider', function() {
    return {
        restrict: 'C',
        scope: {
            aperture: '=id'
        },
        link: function(scope, element, attrs) {
            element.slider({
                min: 0,
                value: scope.$parent.apertures.indexOf(scope.aperture),
                max: scope.$parent.apertures.length - 1,
                slide: function(event, ui) {
                    scope.aperture = scope.$parent.apertures[ui.value];
                    scope.$apply();
                }
            });
            scope.$watch('aperture', function() {
                scope.$parent.update();
            });
            scope.aperture = scope.$parent.apertures[element.slider('value')];
        }
    };
});
