RationalReads.Views.ReviewForm = Backbone.View.extend({
  template: JST['reviews/form'],

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
    console.log(textarea.val())
  }

});
