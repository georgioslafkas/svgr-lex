angular.module('svgr', ['xeditable'])

.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
})

.controller('SvgrController', function($scope, $http) {

    $scope.words = [];
    $http.get('lexikon.json').success(function(data) {
        $scope.words = data.words;
        $scope.data = data;
    });

    $scope.selectWord = function(word) {
        $scope.word = word;
    };

    var newWord;
    $scope.newWord = function() {
        newWord = { text: "Νέα λέξη", translation: "Μετάφραση", example: "Παράδειγμα" };
        $scope.word = newWord;
    };

    var flag = "";
    $scope.save = function(word) {
        if ($scope.words.indexOf(word) < 0 && flag != "erase") {
            $scope.words.push(word);
        }
        flag = "";
        $http.post('saveJson.php', $scope.data).then(function() {
            console.log("words saved");
        });
    };

    $scope.erase = function(word) {
        var wordIndex = $scope.words.indexOf(word);
        $scope.words.splice(wordIndex, 1);
        flag = "erase";
        $scope.save();
        $scope.word = null;
    }

});
