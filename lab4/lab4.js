// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("myApp", []);

// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("mainController", ['$scope','$http',function($scope, $http) {
    // Lets setup some variables for our expressions
    $scope.view = 0;
    $scope.show = 0;

    // Defining the search function to receive data from the api
    $scope.searchItem = function() {
        var base_url = 'http://services.runescape.com/m=itemdb_oldschool/';
        var item_api_url = `api/catalogue/detail.json?item=`;
        // not using this url rn
        var variable_item_api_url = `/api/catalogue/items.json?category=1&alpha=${$scope.text}&page=1`;
        $.getJSON('rs_db_good.json', function (rs_db) {
            $.getJSON(base_url + item_api_url + change_name_to_id(rs_db, $scope.text), function (data) {
                console.log(data);
                document.getElementById("name").innerHTML = data.item.name;
                document.getElementById("icon").src = data.item.icon_large;
                document.getElementById("description").innerHTML = data.item.description;
                document.getElementById("price").innerHTML = "Price: " + data.item.current.price + " gp";
                document.getElementById("members").src = data.item.members === "true" ? "./checkmark.png" : "./xmark.png";
                document.getElementById("mems_text").innerHTML = "Members: ";
            });
        });
    }
}]);

// function to determine if n is a number
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// function to map the corresponding item name with its id in the local rs database
function change_name_to_id(data, id) {
    var num = Number(id);
    if (isNumeric(id)) {
        return num.toString();
    }
    return data[id.toLowerCase()].toString();
}