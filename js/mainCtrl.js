 "use strict";

 angular.module("myApp")
     .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray) {

         $scope.trent = "hello";

         $scope.children = [];

         $scope.addChild = function() {

             $scope.children.push({
                 name: "",
                 age: 5,
                 nationality: ""
             })

         }
         $scope.removeChild = function(i) {

             $scope.children.splice(i, 1);

         }




     })
 const magic = () => {
     console.log($scope.child.age);
 }