RationalReads.Views.WorksHome = Backbone.CompositeView.extend({
  topTemplate: JST['works/headers/home_header'],
  moreTemplate: JST['works/home_bottom'],
  noRecommendationsTemplate: JST['works/work_empty'],

  initialize: function () {
    this.views = [];
    this.currentTab = "rating";
  },

  events: {
    "click li": "toggleTab"
  },

  render: function () {
    this.$el.html(this.topTemplate());
    this.$el.addClass("home-body row");

    this.renderLeft();
    this.renderRight();

    return this;
  },

  renderLeft: function () {
    var leftWorks = this.collection;
    leftWorks.changeSort(this.currentTab);
    leftWorks.sort();
    var firstFive = new RationalReads.Collections.Works();
    firstFive.reset(leftWorks.first(5));
    // debugger
    firstFive.sort();
    var leftView = new RationalReads.Views.WorksIndex({
      collection: firstFive,
      type: "home"
    });

    this.views.push(leftView);
    this.$('#left').append(leftView.render().$el);
    this.$('#left').append(this.moreTemplate({comparator: this.currentTab}));
  },

  renderRight: function () {
    if (true) {
      var firstTen = this.getLatest();
      var comparator = "date"
    };

    var rightView = new RationalReads.Views.WorksIndex({
      collection: firstTen,
      type: "latest"
    });

    this.views.push(rightView);
    this.$('#right').append(rightView.render().$el);
    this.$('#right').append(this.moreTemplate({comparator: comparator}));
  },

  toggleTab: function (event) {
    var $tab = $(event.currentTarget);
    var clickedId = $tab.attr("id");
    if (clickedId != this.currentTab) {
      this.toggleTabClasses($tab);
      this.currentTab = clickedId;
      this.$('#left').empty();
      this.renderLeft();
      this.currentTab = clickedId;
    }
  },

  toggleTabClasses: function ($tab) {
    $tab.addClass("activated");
    $tab.removeClass("unactivated");
    $("#"+this.currentTab).addClass("unactivated");
    $("#"+this.currentTab).removeClass("activated");
  },

  getLatest: function () {
    var latestWorks = this.collection
    latestWorks.changeSort("date");
    latestWorks.sort();
    var firstTenLatest = new RationalReads.Collections.Works();
    firstTenLatest.reset(latestWorks.first(10));

    return firstTenLatest;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.views.forEach( function (view) {
      view.remove();
    })
  }

});
