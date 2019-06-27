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

         $scope.showWarning = function(i) {
            console.log(i)

            let getUa = document.getElementById(i);

            if (getUa.style.display == "block") {
                getUa.style.display = "none";
            } else {
                getUa.style.display = "block";
            }
         }

        


     })