RationalReads.Views.HomeView = Backbone.CompositeView.extend({
  topTemplate: JST['works/home_header'],
  bottomTemplate: JST['works/home_bottom'],

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.topTemplate());
    this.$el.addClass("home-body row");

    var posts = new RationalReads.Collections.Works();

    posts.fetch({
      success: function () {
        this.renderRecommendations(posts);
        this.renderLatest(posts);
      }.bind(this)
    });

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

    this.addSubview('#recommendations', recommendationsView)
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

    this.addSubview('#latest', latestView)
  }

});
