var hiringApp = angular.module('hiringApp', []);

hiringApp.controller('MainController', function ($scope, $http, $timeout) {

    $scope.loading = false;
    $scope.progress = 0;

    $scope.results = [];

    var checkProgress = function() {
        $timeout(function() {

            console.log("Checking progress...");

            $http ({method : 'GET', url : '/progress'}).

                success(function(data, status, headers, config) {

                    console.log("progress=" + data.progress + "%");

                    $scope.progress = data.progress;

                    if (data.progress < 99) {
                        checkProgress();
                    } else {

                        console.log("Finished searching, getting the results...");

                        $http({method: 'GET', url: '/results'}).

                            success(function(data, status, headers, config) {
                                console.log("Displaying the results");
                                $scope.loading = false;
                                $scope.results = data.results;
                            }).

                            error(function(data, status, headers, config) {
                                alert("Can't fetch the results :(");
                            });

                    }

                }).

                error(function(data, status, headers, config) {
                    alert("Error while getting the progress");
                }) ;

        }, 2000);
    };

    $scope.go = function(search) {

        var query = {q: search.q};

        $http({method: 'POST', url: '/search', data: query}).

            success(function(data, status, headers, config) {

                console.log('Starting search for ' + query.q + '...');
                $scope.loading = true;

                checkProgress();

            }).

            error(function(data, status, headers, config) {
                alert("Can't search for now :(");
            });

    };

    $scope.cancel = function() {

        console.log("Sending cancel request");

        $http({method: 'POST', url: '/cancel'}).

            success(function(data, status, headers, config) {

                console.log("Cancelled");

                $scope.loading = false;

            }).

            error(function(data, status, headers, config) {
                alert("Can't cancel");
            });

    };

    $scope.openDoc = function(result) {

        window.open('/view?path=' + result.path);

    };

});
