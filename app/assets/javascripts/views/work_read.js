RationalReads.Views.ReadWorks = Backbone.View.extend({
  template: JST['works/read'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      works: this.collection
    });

    this.$el.html(content);
    this.collection.sort({read: true});
    var that = this;
    this.collection.each(function (model) {
      var $work = that.$el.find("div #" + model.get("id"))
      $work.raty({
        score: model.get("user_rating"),
        click : function (score) {
          that.submitRating(score, model.get("id"));
        }
      });
    });

    return this;
  },

  submitRating: function (score, id) {
    var rating = new RationalReads.Models.Rating();
    rating.set({work_id: id, rating: score});
    var id = id;
    rating.save({},
      {
        success: function(model, response) {
          var $work = this.$el.find("div #" + id);
          var $ratingResponse = $("<div class='changed'>");
          if (response.type === "create") {
            this._updateStatsAfterCreate($ratingResponse, response);
          } else {
            this._updateStatsAfterUpdate($ratingResponse, response);
          }
          $work.html($ratingResponse);
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
    var $numRatings = this.$el.find("div #num-ratings" + response.id);
    $numRatings.html("<div class='changed'>" + numRatings + " ratings" + "</div>");
    this._updateAverageRating(response.average_rating, response);
  },

  _updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.append("Rating updated!");
    this._updateAverageRating(response.average_rating, response);
    },

  _updateAverageRating: function(avgRating, response) {
    var $avgRatings = this.$el.find("div #avg-rating" + response.id);
    $avgRatings.html("<div class='changed'>" + avgRating + "</div>");
  },

  _updateStatsAfterError: function(response, id) {
    var $work = this.$el.find("div #" + id);
    $ratingResponse = $("<div class='changed'>");
    $ratingResponse.append(response.responseText);
    $work.html($ratingResponse);
  }

});
