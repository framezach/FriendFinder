// =============================================================
// Should include a GET route with the URL /api/friends. Display a JSON of all possible friends.
// A POST routes to /api/friends. Handles incoming survey results, this route will also be used to handle
// compatability logic.
// =============================================================

// Required Dependencies
var path = require('path');

// Imports friends data
var friends = require('../data/friends.js');

// Export API routes
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        // Takes input, console logs it.
        var input = req.body;
        console.log('Input was: ' + JSON.stringify(input));
        var response = input.scores;
        console.log(response);
        
        var matchName = '';
        var matchImage = '';
        var difference = 5;

        for (var i = 0; i < friends.length; i++){
            var startingDifference = 0;
            for (var j = 0; j < response.length; j++) {
                startingDifference += Math.abs(friends[i].scores[j] - response[j]);
            }
            if (startingDifference < difference) {
                difference = startingDifference;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }
        friends.push(input);

        res.json({status: 'Good!', matchName: matchName, matchImage: matchImage});
    });

}