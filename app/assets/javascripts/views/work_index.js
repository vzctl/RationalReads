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

    this.collection.each(function (model) {
      // <script>
      /// find the div by the model id, then call .raty on it, passing in the average rating
      // $('div#score').raty({ score:<%= Number(work.get("average_rating")) %> });
      // </script>
    });

    this.$el.html(content);
    return this;
  }
});
