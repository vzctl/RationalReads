RationalReads.Views.WorksHome = Backbone.CompositeView.extend({
  topTemplate: JST['works/headers/home_header'],
  moreTemplate: JST['works/home_bottom'],
  noRecommendationsTemplate: JST['works/work_empty'],

  initialize: function () {
    this.views = [];
    this.currentTab = "average_rating";
    this.$el = $("<div class='home-page row'>");
  },

  events: {
    "click li": "toggleTab"
  },

  displayNewWorkProperly: function ($latest) {
    var timeDiv = $('div:contains("less than a minute ago")');
    var $date = $latest.find(".stats").first().find(".date");
    if ($date.text().indexOf("less than a minute ago") > 0) {
      $date.next().remove();
    }

    return $latest
  },

  render: function () {
    this.$el.html(this.topTemplate());

    this.renderLeft();
    this.renderRight();

    return this;
  },

  renderLeft: function () {
    var leftWorks = this.collection;
    leftWorks.orderBy(this.currentTab);
    leftWorks.sort();

    var firstFive = new RationalReads.Collections.Works();
    firstFive.reset(leftWorks.first(5));
    firstFive.orderBy(this.currentTab);

    var leftView = new RationalReads.Views.WorksIndex({
      collection: firstFive,
      type: "home"
    });

    this.views.push(leftView);
    this.updateLeftHeader();

    var $content = $(leftView.render().$el);
    $content.addClass("left-hidden");
    this.$('#left').append($content);

    $content.animate({
    'margin-left':'0px',
    'opacity': 100
  }, 200)

    setTimeout( function () {
      this.$('#left').append(this.moreTemplate({comparator: this.currentTab}));
    }.bind(this), 200);
  },

  updateLeftHeader: function () {
    var $headerText = this.$el.find(".left-header");
    if (this.currentTab === "rating") {
      $headerText.text("Highest Rated");
    } else if (this.currentTab === "comments") {
      $headerText.text("Most Commented");
    } else {
      $headerText.text("Longest");
    }
  },

  renderRight: function () {
    if (true) {
      var firstTenWorks = this.getLatest(this.collection);
      var comparator = "created_at"
    };

    var chapters = new RationalReads.Collections.Chapters();

    chapters.fetch({
      success: function () {
        var firstTenChapters = this.getLatest(chapters);

        var rightView = new RationalReads.Views.LatestAdditionsIndex({
          works: firstTenWorks,
          chapters: firstTenChapters
        });

        this.views.push(rightView);
        var $latest = $(rightView.render().$el);
        $latest = this.displayNewWorkProperly($latest);

        this.$('#right').append($latest);
        this.$('#right').append(this.moreTemplate({comparator: comparator}));
      }.bind(this)
    });
  },

  toggleTab: function (event) {
    var $tab = $(event.currentTarget);
    var clickedId = $tab.attr("id");
    if (clickedId != this.currentTab) {
      this.toggleTabClasses($tab);
      this.currentTab = clickedId;

      $("#left .centered").animate({
      'margin-left':'500px',
      'opacity': 0
    }, 200)

      setTimeout( function () {
        this.$('#left').empty();
        this.renderLeft();
        this.currentTab = clickedId;
      }.bind(this), 200);

    }
  },

  toggleTabClasses: function ($tab) {
    $tab.addClass("activated");
    $tab.removeClass("unactivated");
    $("#"+this.currentTab).addClass("unactivated");
    $("#"+this.currentTab).removeClass("activated");
  },

  getLatest: function (collection) {
    var latestWorks = collection
    latestWorks.changeSort("date");
    latestWorks.sort();
    var firstTenLatest = new RationalReads.Collections.Works();
    firstTenLatest.reset(latestWorks.first(10));
    firstTenLatest.changeSort("date");
    firstTenLatest.sort();
    return firstTenLatest;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.views.forEach( function (view) {
      view.remove();
    })
  }

});
