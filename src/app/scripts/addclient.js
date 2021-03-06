'use strict';

angular.module('whatsPup')
    .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth, $state, $stateParams) {
    
        var self = this;
        this.loggedIn = Auth.loggedIn;
    
        if (this.loggedIn() == undefined) {
            $state.go('home');
        }
        
        var userUid = Auth.onAuth(function (user) {
            self.user = user;
            if (user === null) {
                console.log('null')
            } else {
                console.log(user.$id)
                return user.$id;
            }
        });

        var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients/' + self.user.$id);
       


        var authData = userInfo.getAuth();
        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        }



        this.obj = $firebaseArray(userInfo);
        console.log(this.obj)

        this.userArray = {};


        this.newClient = {
            name: '',
            pet: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            sitterUid: self.user.$id

        };

        this.addClient = function (newClient) {
            this.obj.$add(newClient);
            return this.newClient = {
                name: '',
                pet: '',
                email: '',
                phone: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                sitterUid: ''

            };
        }
        this.deleteClient = function (newClient) {
            var delClient = new Firebase('https://whatspup.firebaseio.com/Clients/' + self.user.$id + '/' + newClient.$id);
            delClient.remove();
            //console.log(newClient.$id)
        }



    });