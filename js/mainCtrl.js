 "use strict";

 angular.module("myApp")
     .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray) {

         let getDate = new Date();
         $scope.date = `${getDate.getDate()}.${getDate.getMonth()+1}.${getDate.getFullYear()}`

         firebase.initializeApp(firebaseConfig);
         var user = firebase.auth().currentUser;

         // ********** GET USER *******
         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
                 // User is signed in.
                 $rootScope.user = user;
                 // GET PROFILE
                 var getProfile = firebase.database().ref('users/' + user.uid);
                 getProfile = $firebaseObject(getProfile);
                 getProfile.$bindTo($rootScope, "profile");
                 $window.location.href = '/#!/account';
             } else {
                 // No user is signed in.
                 $rootScope.user = null;
                 console.log("No user...");
             }
         });


         $scope.createProfile = function(profile, user) {
             firebase.database().ref('users/' + user.uid).set({
                 name: profile.name,
                 gName: user.displayName,
                 uid: user.uid,
                 email: profile.email,
                 gmail: user.email,
                 phone: profile.phone
             });
         }

         // LOG OUT
         $scope.logout = function() {


             alertify.confirm("Would you like to log out?",
                 function() {
                     firebase.auth().signOut().then(function() {
                         console.log('Logged out');

                     }).catch(function(error) {
                         alertify.error('Could log out!');
                         console.log(error)
                     });
                 },
                 function() {
                     alertify.error('Cancelled');
                 });

         };

         var provider = new firebase.auth.GoogleAuthProvider();
         // Google Login
         document.getElementById('googleLogin').addEventListener('click', () => {
             firebase.auth().signInWithRedirect(provider);
             firebase.auth().getRedirectResult().then(function(result) {
                 console.log(result)
                 if (result.credential) {
                     // This gives you a Google Access Token. You can use it to access the Google API.
                     var token = result.credential.accessToken;
                     // ...
                 }
                 // The signed-in user info.
                 var user = result.user;
                 $window.location.href = '/#!/home'
             }).catch(function(error) {
                 // Handle Errors here.
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // The email of the user's account used.
                 var email = error.email;
                 // The firebase.auth.AuthCredential type that was used.
                 var credential = error.credential;
                 console.log(errorCode)
                 // ...
             });
         })



         // WRITE NEW WILL
         $scope.newWill = {
             children: []
         };

         $scope.makeWill = function(will, user) {

             const children = {};

             if (!will.email) {
                 console.log("no spouse")
                 will.email = "none";
             }

             if (!will.spouse) {
                 console.log("no spouse")
                 will.spouse = "none";
             }
             if (will.children.length == 0) {
                 console.log("no children")
                 will.children = "none";
             }

             for (var i = 0; i < will.children.length; i++) {
                 console.log(will.children[i])
                 let count = `child${i}`;
                 children[count] = will.children[i];
             }

             if (user) {
                 console.log("Will is filed under user.")
                 firebase.database().ref('wills/' + user.uid).set({
                     firstName: will.firstName,
                     familyName: will.familyName,
                     country: will.country,
                     nationality: will.nationality,
                     age: will.age,
                     executor: will.executor,
                     partnerships: will.spouse,
                     children: children,
                     key: user.uid,
                     anonymous: false,
                     email: will.email

                 });
                 $window.location.href = '/#!/account';

             } else {
                 var newPostKey = firebase.database().ref().child('wills/').push().key;
                 console.log("Will is filed under anonymous")
                 firebase.database().ref('wills/' + newPostKey).set({
                     firstName: will.firstName,
                     familyName: will.familyName,
                     country: will.country,
                     nationality: will.nationality,
                     age: will.age,
                     executor: will.executor,
                     partnerships: will.spouse,
                     children: children,
                     key: newPostKey,
                     anonymous: true,
                     email: will.email
                 });
                 $rootScope.chosenWill = will;
                 $window.location.href = '/#!/account';
             }
         }


         $scope.addChild = function() {

             $scope.newWill.children.push({
                 name: "",
                 age: 5,
                 nationality: ""
             })

         }
         $scope.removeChild = function(i) {

             $scope.newWill.children.splice(i, 1);

         }

         $scope.showWarning = function(i) {

             let getUa = document.getElementById(i);
             console.log(getUa)

             if (getUa.style.display == "block") {
                 getUa.style.display = "none";
             } else {
                 getUa.style.display = "block";
             }
         }

         // VIEW WILL

         $scope.view = function(will) {
             $rootScope.chosenWill = will;
             $window.location.href = '/#!/viewing';

         }

         // DELETE WILL
         $scope.deleteWill = function(will) {
             console.log(will.key)
             alertify.confirm("Are you sure you wish to delete this entry?",
                 function() {
                     firebase.database().ref('users/' + will.key + "/will/").remove();
                     firebase.database().ref('wills/' + will.key).remove();
                     alertify.success("Will deleted.")
                 },
                 function() {
                     alertify.error('Will NOT deleted.');
                 });
         }

         $scope.printWill = function() {
             window.print();
         }

         // GET WILL
         var getWills = firebase.database().ref('wills');
         getWills = $firebaseObject(getWills);
         getWills.$bindTo($scope, "wills");




     })