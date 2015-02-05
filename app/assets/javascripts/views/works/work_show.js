RationalReads.Views.WorksShow = Backbone.CompositeView.extend({

  initialize: function () {
    // this.listenTo(this.collection, 'sync', this.render);
    // will want to sync on review collection getting fetched
    this.style = "show";
  },

  render: function () {
    this.$el.append("<div id='work-info'>")
    this.$el.append("<div id='review-form'>")

    var workShow = new RationalReads.Views.WorkItem({
        model: this.model,
        style: this.style
      });
    var newReview = new RationalReads.Views.ReviewForm({
        // model: review,
      });
    this.addSubview('#work-info', workShow)
    this.addSubview('#review-form', newReview)

    return this;
  },

});
