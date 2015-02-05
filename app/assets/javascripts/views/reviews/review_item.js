RationalReads.Views.ReviewItem = Backbone.CompositeView.extend({

  template: JST['comments/comment_item'],

  events: {
    "click .reply": "createForm"
  },

  initialize: function (options) {
    this.work = options.work;
  },

  render: function () {
    var review = this.template({comment: this.model});
    this.$el.html(review);

    var $raty = this.$el.find(".raty")
      $raty.raty({
        readOnly: true,
        score: this.model.get("rating"),
      });

    return this;
  },

  createForm: function () {
    var newReview = new RationalReads.Views.ReviewForm({
        work: this.work,
        reply: true,
        parent_comment: this.model
      });

    this.$el.append(newReview.render().$el);
  }
});
