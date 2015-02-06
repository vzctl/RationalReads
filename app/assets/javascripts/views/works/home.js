RationalReads.Views.HomeView = Backbone.CompositeView.extend({
  template: JST['works/home_header'],

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    this.$el.addClass("home-body row");

    this.renderRecommendations();
    return this;
  },

  renderRecommendations: function () {
    var posts = new RationalReads.Collections.Works();

    posts.fetch({
      success: function () {
        posts = posts.recommendedWorks();
        posts.sort();
        var indexView = new RationalReads.Views.WorksIndex({
            collection: posts,
            type: "sub",
            style: "home"
          });

          this.addSubview('#recommendations', indexView)
      }.bind(this)
    })
  }

});
