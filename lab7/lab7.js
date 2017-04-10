var app = angular.module("myApp", []);
app.controller("mainController", ['$scope','$http',function($scope, $http) {
    $scope.tweets = [];

    var socket = io.connect("http://localhost:3000");
    // reads the tweetrs from Twitter's API and stores the tweets in the database
    $scope.getTweets = function() {
        $scope.tweets = [];
        $("#response").text("");
        // pass in the query term and number limit      
        $http.get("/query", {
            params: {
                query: $scope.query,
                number: $scope.number
            }
        }).then(function(response){
            $("#response").text(response.data);
        }).then(function(error){
            console.log("Error performing get request to api");
        });
    };
    // reads the tweets from the database and displays them on screen
    $scope.displayTweets = function () {
        $("#response").text("");
        $http.get("/display")
        .then(function (response) {
            $scope.tweets = response.data;
            if ($scope.tweets.length === 0) {
                $("#response").text("There are no tweets in the database.");
            }
        })
        .then(function(error){
            console.log("Error displaying tweets");
        });
    };
    // resets the form and page by refreshing the page
    $scope.reset = function () {
        window.location.reload(true);
    }
    // tells the server how to convert the data (if at all) by sending the export type
    $scope.exportFile = function() {
        $("#response").text("");
        $http.get("/export", {
            params: {
                type: $scope.fileType
            }
        }).then(function(response) {
              $("#response").text(response.data);
        }).then(function(error){
              console.log("Error performing get request to api");
        });
    }
}]);