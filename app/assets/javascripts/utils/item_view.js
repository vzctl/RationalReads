Backbone.ItemView = Backbone.View.extend({
  ratingGraphic: function ($ratingResponse, $raty, score) {
    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);

    setTimeout( function () {
      $raty.animate({'opacity': 0}, 500, function () {
        $raty.raty({
          score: score,
          click : function (score) {
            this.submitRating(score);
          }.bind(this)
        });
      }.bind(this)).animate({'opacity': 1}, 10);
    }.bind(this), 1000)
  },

  updateStatsAfterCreate: function($ratingResponse, response) {
    $ratingResponse.text("Added!");

    var $numRatings = this.$el.find(".num-ratings-number");
    var numRatings = parseInt($numRatings.text()) + 1

    $numRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(numRatings);
    }).animate({'opacity': 1}, 10);

    this.updateShownRating(response);
  },

  updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.text("Updated!");
    this.updateShownRating(response);
    },

  updateShownRating: function(response) {
    var $avgBayesianRatings = this.$el.find("span.avg");
    var $avgRatings = this.$el.find("span.other-avg");

    var bayesian = response.updated_bayesian_rating;
    var bayesian_with_decimals = parseFloat(bayesian).toFixed(2);

    var average = response.updated_average_rating;
    var average_with_decimals = parseFloat(average).toFixed(2);

    if (this.type === "show") {
      bayesian_with_decimals = bayesian_with_decimals + " Bayesian Adjusted"
      average_with_decimals = average_with_decimals + " Average Rating /"
    }

    $avgBayesianRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(bayesian_with_decimals);
    }).animate({'opacity': 1}, 10);


    $avgRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(average_with_decimals);
    }).animate({'opacity': 1}, 10);
  },

  updateStatsAfterError: function($ratingResponse, $raty, response) {
    if (response.responseJSON[0] == "Log in first!") {
      var $content = $("<a href='/session/new'>Log in first!</a>")
      $ratingResponse.append($content);
    } else {
      $ratingResponse.append(response.responseJSON[0]);
    }

    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);
  }

});
