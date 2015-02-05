RationalReads.Views.WorksShow = Backbone.CompositeView.extend({
  template: JST['comments/show_header'],

  initialize: function () {
    this.style = "show";
  },

  render: function () {
    this.$el.append("<div id='work-info'>")
    this.$el.append("<div id='comment-form'>")
    this.$el.append(this.template());
    this.$el.append("<div id='comment'>")

    var workShow = new RationalReads.Views.WorkItem({
        model: this.model,
        style: this.style
      });

    var newReview = new RationalReads.Views.ReviewForm({
        parent_comment: null,
        work: this.model,
        reply: false
      });

    this.model.comments().sort();
      
    this.model.comments().each(function (comment) {
      var reviewItem = new RationalReads.Views.ReviewItem({
        model: comment,
        work: this.model
      });

      this.addSubview('#comment', reviewItem);
    }.bind(this));

    this.addSubview('#work-info', workShow)
    this.addSubview('#comment-form', newReview)

    return this;
  },

});
