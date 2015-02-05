RationalReads.Views.WorkItem = Backbone.View.extend({

  initialize: function (options) {
    this.type = options.style;
  },

  templateRead: JST['works/read_item'],
  templateFull: JST['works/index_item'],
  templateShow: JST['works/show_item'],

  render: function () {
    if (this.type === "index") {
      var content = this.templateFull({work: this.model});
      var displayRating = this.model.get("average_rating");
    } else if (this.type === "list") {
      var content = this.templateRead({work: this.model});
      var displayRating = this.model.get("user_rating");
    } else {
      var content = this.templateShow({work: this.model});
      var displayRating = this.model.get("average_rating");
    }

    this.$el.html(content);

    var $raty = this.$el.find("#raty")
      $raty.raty({
        score: displayRating,
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
          var $raty = this.$el.find("#raty");
          var $ratingResponse = $("<div class='changed'>");
          if (response.type === "create") {
            this._updateStatsAfterCreate($ratingResponse, response);
          } else {
            this._updateStatsAfterUpdate($ratingResponse, response);
          }
          $raty.html($ratingResponse);
        }.bind(this),
        error: function (model, response) {
          this._updateStatsAfterError(response, id)
        }.bind(this)
      }
    )
  },

  _updateStatsAfterCreate: function($ratingResponse, response) {
    $ratingResponse.append("Rating added!");
    var numRatings = response.ratings;
    var $numRatings = this.$el.find(".num-ratings");
    $numRatings.html("<div class='changed'>" + numRatings + " ratings" + "</div>");
    this._updateAverageRating(response.average_rating, response);
  },

  _updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.append("Rating updated!");
    this._updateAverageRating(response.average_rating, response);
    },

  _updateAverageRating: function(avgRating, response) {
    var $avgRatings = this.$el.find(".avg-rating");
    $avgRatings.html("<div class='changed'>" + avgRating + "</div>");
  },

  _updateStatsAfterError: function(response) {
    var $work = this.$el.find("#raty");
    $ratingResponse = $("<div class='changed'>");
    $ratingResponse.append(response.responseText);
    $work.html($ratingResponse);
  }

});
