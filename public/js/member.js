/**
 * Created by Leslie on 2017/1/25.
 */
var memberApp = angular.module('myApp.member', []);
memberApp.controller('member.ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {
        truename: '',
        email: '',
        password: '',
        password2: ''
    };
    $scope.registerForm = function () {
        $http.post('/users/register', $scope.user)
            .then(function (xhr) {
                if (xhr.data.result) {
                    alert('注册成功');
                    location.href = '/login.html';
                } else {
                    alert(xhr.data.msg);
                }
            }, function (error) {
                console.log(error)
                if(!error.data.result)
                    alert(error.data.msg);
            });
    };
    $scope.doLogin = function () {
        $http.post('/users/login', $scope.user)
            .then(function (xhr) {
                if (xhr.data.result) {
                    alert('登录成功');
                    location.href = '/';
                } else {
                    alert(xhr.data.msg);
                }
            }, function (error) {
                console.log(error)
                if(!error.data.result)
                    alert(error.data.msg);
            });
    }
}]);

