RationalReads.Views.HomeView = Backbone.CompositeView.extend({
  topTemplate: JST['works/home_header'],
  bottomTemplate: JST['works/home_bottom'],

  render: function () {
    this.$el.html(this.topTemplate());
    this.$el.addClass("home-body row");

    this.$('#recommendations').append(this.renderRecommendations(this.collection).$el);
    this.$('#latest').append(this.renderLatest(this.collection).$el);

    this.$el.append(this.bottomTemplate());
    return this;
  },

  renderRecommendations: function (posts) {
    var recPosts = posts.recommendedWorks();
    recPosts.sort()
    var firstFiveRecs = new RationalReads.Collections.Comments();
    firstFiveRecs.reset(recPosts.first(5))
    var recommendationsView = new RationalReads.Views.WorksIndex({
        collection: firstFiveRecs,
        type: "sub",
        style: "home"
      });

    // this.addSubview('#recommendations', recommendationsView);
    return recommendationsView.render();
  },

  renderLatest: function (posts) {
    posts.changeSort("date");
    posts.sort();
    var firstFiveLatest = new RationalReads.Collections.Comments();
    firstFiveLatest.reset(posts.first(5))
    var latestView = new RationalReads.Views.WorksIndex({
        collection: firstFiveLatest,
        type: "sub",
        style: "home"
      });

    // this.addSubview('#latest', latestView);
    return latestView.render();
  }

});
