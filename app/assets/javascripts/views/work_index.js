RationalReads.Views.WorksIndex = Backbone.View.extend({
  template: JST['works/index'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.fullscreen = options.fullscreen;
  },

  render: function () {
    var content = this.template({
      works: this.collection
    });

    this.$el.html(content);

    var that = this;
    this.collection.each(function (model) {
      var $work = that.$el.find("div #" + model.get("id"))
      $work.raty({
        score: model.get("average_rating"),
        click : function (score) {
          that.submitRating(score, model.get("id"));
        }
      });
    });

    return this;
  },

  submitRating: function (score, id) {
    var rating = new RationalReads.Models.Rating();
    rating.set({work_id: id, rating: score})
    var id = id
    rating.save({},
      {
        success: function(model, response) {
          var $work = this.$el.find("div #" + id)
          $ratingResponse = $("<div class='rating-change'>")
          if (response.created_at === response.updated_at) {
            $ratingResponse.append("Rating added!");
          } else {
            $ratingResponse.append("Rating updated!");
          }
          $work.html($ratingResponse);
        }.bind(this),

        error: function (model, response) {
          console.log(response)
          var $work = this.$el.find("div #" + id)
          $ratingResponse = $("<div class='rating-change'>")
          $ratingResponse.append(response.responseText);
          $work.html($ratingResponse);
        }.bind(this)
      }
    )

  }

});
