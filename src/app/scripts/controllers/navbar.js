angular.module('whatsPup')
    .controller('NavCtrl', function (Auth) {
        this.logout = Auth.logout;
    });