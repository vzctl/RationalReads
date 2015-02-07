RationalReads.Views.WorksHome = Backbone.CompositeView.extend({
  topTemplate: JST['works/headers/home_header'],
  bottomTemplate: JST['works/home_bottom'],
  noRecommendationsTemplate: JST['works/work_empty'],

  initialize: function () {
    this.views = [];
  },

  render: function () {
    this.$el.html(this.topTemplate());
    this.$el.addClass("home-body row");

    this.renderRecommendations(this.collection);

    this.$('#latest').append(this.renderLatest(this.collection).$el);
    this.$el.append(this.bottomTemplate());
    return this;
  },

  renderRecommendations: function (works) {
    var recWorks = works.recommendedWorks();

    if (recWorks === "none") {
      debugger
      this.$('#recommendations').append(this.noRecommendationsTemplate());
      recWorks = this.collection;
      $(this.$el.find(".recommendations-header")).text("Highest Rated Works");
    }
      recWorks.sort()
      var firstFiveRecs = new RationalReads.Collections.Comments();
      firstFiveRecs.reset(recWorks.first(5))
      var recommendationsView = new RationalReads.Views.WorksIndex({
        collection: firstFiveRecs,
        type: "sub",
        type: "home"
      });
      this.views.push(recommendationsView);
      this.$('#recommendations').append(recommendationsView.render().$el);

  },

  renderLatest: function (works) {
    works.changeSort("date");
    works.sort();
    var firstFiveLatest = new RationalReads.Collections.Comments();
    firstFiveLatest.reset(works.first(5))
    var latestView = new RationalReads.Views.WorksIndex({
      collection: firstFiveLatest,
      type: "sub",
      type: "home"
    });

    this.views.push(latestView);
    return latestView.render();
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.views.forEach( function (view) {
      view.remove();
    })
  }

});
