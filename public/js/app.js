/**
 * Created by Leslie on 2017/1/24.
 */
var app = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'summernote']);
app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                mainView: {
                    templateUrl: '/templates/index.tpl.html',
                    controller: 'index.ctrl'
                }
            },
            resolve: ['$rootScope', function ($rootScope) {
                $rootScope.sideShow = true;
            }]
        })
        .state('questioncreate', {
            url: '/question/create',
            views: {
                mainView: {
                    templateUrl: '/templates/questioncreate.tpl.html',
                    controller: 'question.create.ctrl'
                }
            },
            resolve: {
                side: function ($rootScope) {
                    $rootScope.sideShow = false;
                },
                autoLoad: function ($ocLazyLoad) {
                    $ocLazyLoad.load('./static/components/select2/dist/css/select2.css');
                    // console.log($ocLazyLoad.getModules());
                }
            }
        })
        .state('question', {
            url: '/question/{name:[a-zA-Z]{0,}}{id:[0-9a-z]{0,}}',
            views: {
                mainView: {
                    templateUrl: function ($route) {
                        if ($route.id && $route.name == '') {
                            return '/templates/questiondetail.tpl.html';
                        } else {
                            return '/templates/question.tpl.html';
                        }
                    },
                    controller: 'question.ctrl',
                }
            },
            resolve: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.sideShow = $stateParams.id ? false : true;
            }]
        })
        .state('topics', {
            url: '/topics',
            views: {
                mainView: {
                    templateUrl: '/templates/topics.tpl.html',
                    controller: 'topics.ctrl'
                }
            },
            resolve: ['$rootScope', function ($rootScope) {
                $rootScope.sideShow = false;
            }]
        })
}]);

app.run(['$http', '$rootScope', function ($http, $rootScope) {
    $rootScope.is_login = false;
    $rootScope.user = null;

    $http.post('/users/islogin')
        .then(function (xhr) {
            $rootScope.is_login = xhr.data.result || false;
            $rootScope.user = xhr.data.data;
        });

    $http.post('/category/getlist')
        .then(function (xhr) {
            $rootScope.categoryList = xhr.data.data;
        });

    $rootScope.logout = function () {
        $http.post('/users/logout')
            .then(function (xhr) {
                $rootScope.is_login = false;
                location.reload()
            });
    }
}]);

app.controller('index.ctrl', ['$rootScope','$http', '$scope',function ($rootScope,$http,$scope) {
    // 获取最新的10个问题
    $http.post('/question/getlist',{order: 'desc', limit: 10})
        .then(function (xhr) {
            $scope.questionList = xhr.data.data;
        })
}]);

app.controller('question.ctrl', ['$sce', '$scope', '$rootScope', '$stateParams', '$http', '$state', function ($sce, $scope, $rootScope, $stateParams, $http, $state) {
    console.log($stateParams);
    if ($stateParams.id) {
        $http.post('/question?id=' + $stateParams.id)
            .then(function (xhr) {
                $scope.question = xhr.data.data;
                $scope.question.content = $sce.trustAsHtml($scope.question.content);

                return $http.post('/answer/getlist', {question_id: $stateParams.id})
            })
            .then(function (answers) {
                console.log(answers);
                $scope.answerlist = answers.data.data;
            });
    } else {
        $http.post('/question?name=' + $stateParams.name)
            .then(function (xhr) {
                $scope.questionList = xhr.data.data || [];
            })
    }

    $scope.options = {
        height: 150,
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    };

    // 回答问题
    $scope.answerCreate = function () {
        $scope.answer.question_id = $scope.question._id;
        console.log($scope.answer);
        $http.post('/answer/create', $scope.answer)
            .then(function (xhr) {
                alert(xhr.data.msg);
                $state.reload();
            }, function (xhr) {
                if (xhr.data.statusCode == 400) {
                    location.href = '/login.html';
                }
            })
    }
}]);

app.controller('question.create.ctrl', ['$rootScope', '$scope', '$http', '$state', function ($rootScope, $scope, $http, $state) {
    if (!$rootScope.user) {
        location.href = 'login.html';
    }

    // 我要提问
    $scope.questionCreate = function () {
        if ($scope.question.title == '') {
            alert('标题输入不能为空');
            return;
        }
        if ($scope.question.cname.length<=0) {
            alert('话题输入不能为空');
            return;
        }

        $http.post('/question/create', $scope.question)
            .then(function (xhr) {
                alert(xhr.data.msg);
                $state.go('question');
            }, function (xhr) {
                alert(xhr.data.msg);
            })
    };

    $scope.question = {
        user_id: $rootScope.user._id,
        title: '',
        content: '',
        cname: []
    };

    $scope.options = {
        height: 150,
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    };
}]);

app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});