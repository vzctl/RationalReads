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

    this.updateShownRating(response.updatedrating, response);
  },

  updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.text("Updated!");
    this.updateShownRating(response.updatedrating, response);
    },

  updateShownRating: function(updatedRating, response) {
    var $avgRatings = this.$el.find("span.avg");

    $avgRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(updatedRating);
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
