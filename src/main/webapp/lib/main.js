'use strict'
var _page = document.getElementById("moduleId").getAttribute("pagename").split(",");
require.config({　
	baseUrl : "../lib",　
	paths: {　　
		jquery: 'jquery/jquery-1.11.1.min',　
        bootstrap:'bootstrap/bootstrap.min',
		angular:'angular/angular',
		angularroute:"angular/angular-route.min",
		angularUIroute:"angular/angular-ui-router",
		smarttable:"smarttable/Smart-Table.debug",
		_page:_page,
		interfaces:"../js/interface/interfacesConfig"
	},
	shim: {
		'bootstrap': {deps : ['jquery']},
		'angular' : {exports:'angular'},
		'angularroute' : {deps : ['angular']},
		'angularUIroute':{deps : ['angular']},
		'smarttable' : {deps : ['angular']},
		'_page':{deps : ['angular','smarttable','interfaces']}
	}
});
require(['angular','jquery','bootstrap','angularroute','angularUIroute','smarttable','interfaces','_page'], function(angular) {　
	angular.element(document).ready(function(){
		angular.bootstrap(document,["myApp"]);
	});
});