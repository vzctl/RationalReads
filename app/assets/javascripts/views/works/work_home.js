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

    this.renderLeft();

    this.$('#latest').append(this.renderLatest(this.collection).$el);
    this.$el.append(this.bottomTemplate());
    return this;
  },

  renderLeft: function () {
    var firstFive = null;
    if (true) {
      firstFive = this.getHighestRated();
    };

    var leftView = new RationalReads.Views.WorksIndex({
      collection: firstFive,
      type: "home"
    });
    this.views.push(leftView);
    this.$('#left').append(leftView.render().$el);

  },

  getHighestRated: function (works) {
    var highestWorks = this.collection;
    highestWorks.sort();
    var firstFive = new RationalReads.Collections.Comments();
    firstFive.reset(highestWorks.first(5));
    return firstFive;
  },

  renderRecommendations: function (works) {

      var recommendationsView = new RationalReads.Views.WorksIndex({
        collection: firstFiveRecs,
        type: "sub",
        type: "home"
      });
      this.views.push(recommendationsView);
      this.$('#recommendations').append(recommendationsView.render().$el);

    // if (recWorks === "none") {
    //   this.$('#recommendations').append(this.noRecommendationsTemplate());
    //   recWorks = this.collection;
    //   $(this.$el.find(".recommendations-header")).text("Highest Rated Works");
    // }
    //   recWorks.sort()
    //   var firstFiveRecs = new RationalReads.Collections.Comments();
    //   firstFiveRecs.reset(recWorks.first(5))
    //   var recommendationsView = new RationalReads.Views.WorksIndex({
    //     collection: firstFiveRecs,
    //     type: "sub",
    //     type: "home"
    //   });
    //   this.views.push(recommendationsView);
    //   this.$('#recommendations').append(recommendationsView.render().$el);

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
