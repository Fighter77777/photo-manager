var imgApp = angular.module('imgApp', ['ui.router', 'ngResource']);

imgApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            controller: 'RouteCtrl'
        })
        .state('select_field', {
            url: '/place/:type/:id',
            controller: 'RouteCtrl'
        });
});


imgApp.constant('placeType', {
    region: {name:'region', alias:'область', idName: 'reg_id', nameForChildren: 'reg_name', control: 'district'},
    district: {name:'district', alias:'район', idName: 'dis_id', nameForChildren: 'dis_name', control: 'locality'},
    locality: {name:'locality', alias:'Населений пункт', idName: 'loc_id', nameForChildren: 'loc_name', control: 'field'},
    field: {name:'field', alias:'Поле', idName: 'f_id'}
});