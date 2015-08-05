require('angular');
var testController = require('./testController.js')();
var app = angular.module('test', []);
app.controller('testController', testController);
