var app = angular.module("myApp", []);
app.controller("mainController", ['$scope','$http',function($scope, $http) {
    $scope.tweets = [];

    var socket = io.connect("http://localhost:3000");
    socket.on('tweet', function (data) {
        // allows the pushed tweet to automatically show up on the screen
        $scope.$apply(function(){
            $scope.tweets.push(data);
        });
    });
    console.log(socket);
    $scope.getTweets = function() {
        $scope.tweets = [];
        // pass in the query term and number limit      
        $http.get("/query", {
            params: {
                query: $scope.query,
                number: $scope.number,
                id: socket.id
            }
        }).then(function(response){
            $("#export").removeAttr("hidden");
        }).then(function(error){
            console.log("Error performing get request to api");
        });
    };
    $scope.exportFile = function() {
        $http.get("/export", {
            params: {
                id: socket.id,
                type: $scope.fileType
            }
        }).then(function(response) {
              $("#response").text(response.data);
        }).then(function(error){
              console.log("Error performing get request to api");
        });
    }
}]);