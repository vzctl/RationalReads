RationalReads.Views.ChapterItem = Backbone.View.extend({

  latestTemplate: JST['chapters/latest_item'],

  render: function () {
    var content = this.latestTemplate({chapter: this.model});

    this.$el.html(content);

    var $raty = this.$el.find(".raty")
    $raty.raty({
      score: this.model.get("average_rating"),
      click : function (score) {
        this.submitRating(score);
      }.bind(this)
    });

    return this
  },

  submitRating: function (score) {

    var rating = new RationalReads.Models.Rating();
    var work_id = this.model.get("id");
    rating.set({work_id: work_id, rating: score});
    rating.save({},
      {
        success: function(model, response) {
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          if (response.type === "create") {
            this._updateStatsAfterCreate($ratingResponse, response);
          } else {
            this._updateStatsAfterUpdate($ratingResponse, response);
          }
          this._ratingGraphic($ratingResponse, $raty, score)
        }.bind(this),
        error: function (model, response) {
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          this._updateStatsAfterError($ratingResponse, $raty, response);
        }.bind(this)
      }
    )
  },

  _ratingGraphic: function ($ratingResponse, $raty, score) {
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

  _updateStatsAfterCreate: function($ratingResponse, response) {
    $ratingResponse.text("Added!");
    var numRatings = response.ratings;
    var $numRatings = this.$el.find(".num-ratings-number");

    $numRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(numRatings);
    }).animate({'opacity': 1}, 10);

    this._updateAverageRating(response.average_rating, response);
  },

  _updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.text("Updated!");
    this._updateAverageRating(response.average_rating, response);
    },

  _updateAverageRating: function(avgRating, response) {
    var $avgRatings = this.$el.find("span.avg");

    $avgRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(avgRating);
    }).animate({'opacity': 1}, 10);

  },

  _updateStatsAfterError: function($ratingResponse, $raty, response) {
    $ratingResponse.append(response.responseJSON[0]);

    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);
  }

});
