RationalReads.Views.ReviewItem = Backbone.CompositeView.extend({

  template: JST['comments/item'],

  events: {
    "click .reply": "createForm"
  },

  initialize: function (options) {
    this.work = options.work;
    this.formCreated = false;
    this.form = null;
    this.level = options.level;
  },

  render: function () {
    var review = this.template({comment: this.model, level: this.level});
    this.$el.html(review);

    var $raty = this.$el.find(".raty")
      $raty.raty({
        readOnly: true,
        score: this.model.get("rating"),
      });

    return this;
  },

  createForm: function () {
    if (!this.formCreated) {
      this.formCreated = true;
      var newReview = new RationalReads.Views.ReviewForm({
          work: this.work,
          reply: true,
          parent_comment: this.model
        });
      this.form = newReview;
      this.$el.append(newReview.render().$el);
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    if (this.form != null) {
        this.form.remove();
    }
  }

});
