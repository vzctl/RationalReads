RationalReads.Views.WorksHome = Backbone.CompositeView.extend({
  topTemplate: JST['works/headers/home_header'],
  bottomTemplate: JST['works/home_bottom'],
  noRecommendationsTemplate: JST['works/work_empty'],
  highestRatedLinkTemplate: JST['works/bottoms/highest_rated'],
  latestLinkTemplate: JST['works/bottoms/latest'],

  initialize: function () {
    this.views = [];
  },

  render: function () {
    this.$el.html(this.topTemplate());
    this.$el.addClass("home-body row");

    this.renderLeft();
    this.renderRight();

    return this;
  },

  renderLeft: function () {
    var firstFive = null;
    if (true) {
      firstFive = this.getHighestRated();
      bottom = this.highestRatedLinkTemplate();
    };

    var leftView = new RationalReads.Views.WorksIndex({
      collection: firstFive,
      type: "home"
    });
    this.views.push(leftView);
    this.$('#left').append(leftView.render().$el);
    this.$('#left').append(bottom);
  },

  renderRight: function () {
    var firstTen = null;
    if (true) {
      firstTen = this.getHighestRated();
      bottom = this.latestLinkTemplate();
    };

    var rightView = new RationalReads.Views.WorksIndex({
      collection: firstTen,
      type: "latest"
    });

    this.views.push(rightView);
    this.$('#right').append(rightView.render().$el);
    this.$('#right').append(bottom);
  },

  getHighestRated: function () {
    var highestWorks = this.collection;
    highestWorks.sort();
    var firstFive = new RationalReads.Collections.Works();
    firstFive.reset(highestWorks.first(5));

    return firstFive;
  },

  getLatest: function () {
    var latestWorks = this.collection
    latestWorks.changeSort("date");
    latestWorks.sort();
    var firstTenLatest = new RationalReads.Collections.Works();
    firstTenLatest.reset(works.first(5));

    return firstTenLatest;
  },


    renderRecommendations: function (works) {

        var recommendationsView = new RationalReads.Views.WorksIndex({
          collection: firstFiveRecs,
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

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.views.forEach( function (view) {
      view.remove();
    })
  }

});
