RationalReads.Views.ReviewForm = Backbone.View.extend({
  template: JST['reviews/form'],
  errorTemplate: JST['reviews/error'],

  initialize: function (options) {
    this.work = options.work
  },

  events: {
    "submit .review": "submitComment"
  },

  render: function () {
    var content = this.template();

    this.$el.html(content);

    return this
  },

  submitComment: function (event) {
    event.preventDefault();
    var form = $(event.currentTarget);
    var textarea = form.find("textarea");
    var content = textarea.val();
    this.model.set({work_id: this.work.get("id"), content: content});
    this.model.save({},
      {
        success: function(model, response) {
          console.log(model)
        }.bind(this),
        error: function (model, response) {
          if (content.length === 0) {
            var error = "No content to submit! Type some more.";
          } else {
            var error = "You've got to log in to leave a comment!";
          }
          $(".errors").append(this.errorTemplate({error: error}));
        }.bind(this)
      }
    )
  }

});
