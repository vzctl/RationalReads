RationalReads.Views.ChapterItem = Backbone.ItemView.extend({

  latestTemplate: JST['chapters/latest_item'],

  render: function () {
    var content = this.latestTemplate({chapter: this.model});

    this.$el.html(content);

    var $raty = this.$el.find(".raty")
    $raty.raty({
      score: this.model.get("user_rating"),
      click : function (score) {
        this.submitRating(score);
      }.bind(this)
    });

    return this
  },

  submitRating: function (score) {

    var rating = new RationalReads.Models.Rating();
    var chapter_id = this.model.get("id");
    rating.set({chapter_id: chapter_id, rating: score});
    rating.save({},
      {
        success: function(model, response) {
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          if (response.type === "create") {
            this.updateStatsAfterCreate($ratingResponse, response);
          } else {
            this.updateStatsAfterUpdate($ratingResponse, response);
          }
          this.ratingGraphic($ratingResponse, $raty, score)
        }.bind(this),
        error: function (model, response) {
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          this.updateStatsAfterError($ratingResponse, $raty, response);
        }.bind(this)
      }
    )
  }
});
