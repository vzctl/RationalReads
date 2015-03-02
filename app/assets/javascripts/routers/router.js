RationalReads.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'home',
    'works?order=:name': 'allSorted',
    'works': 'all',
    'my-works': 'read',
    'recommendations': 'recommendations',
    'works/new' : 'newWork',
    'works/:id': 'show',
    'works/:id/edit': 'editWork',
    'search/:terms': 'search',
    'chapters/:id': 'showChapter',
    'about': 'about',
    'contact': 'contact'
  },

  editWork: function (id) {
    var work = new RationalReads.Models.Work({id: id});
    var tags = new RationalReads.Collections.Tags();

    tags.fetch({
      success: function () {
        work.fetch({
          success: function () {
            var workForm = new RationalReads.Views.WorkForm({tags: tags, model: work, edit: true});
            this._swapView(workForm);

          }.bind(this)
        })
      }.bind(this)
    })


  },

  showChapter: function (id) {
    var chapter = new RationalReads.Models.Chapter({id: id});
    this._generateLoadingScreen();

    chapter.fetch({
      success: function () {
        var showView = new RationalReads.Views.ChaptersShow({
            model: chapter
          });

        this._swapView(showView);
      }.bind(this)
    })
  },

  about: function () {
    var about = new RationalReads.Views.About()
    this._swapView(about);
  },

  contact: function () {
    var contact = new RationalReads.Views.Contact()
    this._swapView(contact);
  },

  allSorted: function (comparator) {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      data: {page: 1, order: comparator},
      success: function () {
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "index",
            currentOrder: comparator
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  newWork: function () {
    var tags = new RationalReads.Collections.Tags();
    var work = new RationalReads.Models.Work();

    tags.fetch({
      success: function () {
        var workForm = new RationalReads.Views.WorkForm({tags: tags, edit: false, model: work});
        this._swapView(workForm);
      }.bind(this)
    })

  },

  search: function (terms) {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      success: function () {
        works = works.contains(terms);
        works.changeSort("name");
        works.sort();
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "search"
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  home: function () {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      success: function () {
        var homeView = new RationalReads.Views.WorksHome({
            collection: works
          });

        this._swapView(homeView);
      }.bind(this)
    })
  },

  recommendations: function () {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      data: { recommendations: "true", page: 1},
      success: function () {
        if (works === "none") {
          var $main = $("#main");
          $main.html($("<div class='centered'>"));
          $(".centered").append("<h3>Rate works to get recommendations.</h3>");
        } else {
          var indexView = new RationalReads.Views.WorksIndex({
              collection: works,
              type: "recommendations"
            });

          this._swapView(indexView);
        }
      }.bind(this)
    })
  },

  all: function () {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      data: { page: 1, order: "bayesian_average"},
      success: function () {
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "index",
            currentOrder: "bayesian_average"
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  read: function () {
    var works = new RationalReads.Collections.Works();
    this._generateLoadingScreen();

    works.fetch({
      success: function () {
        var readPosts = works.read();
        var indexView = new RationalReads.Views.WorksRead({
            collection: readPosts
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  show: function (id) {
    var work = new RationalReads.Models.Work({id: id});
    this._generateLoadingScreen();

    work.fetch({
      success: function () {
        var showView = new RationalReads.Views.WorksShow({
            model: work
          });

        this._swapView(showView);
      }.bind(this)
    })

  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _generateLoadingScreen: function () {
    var loading = new RationalReads.Views.Loading();
    this._swapView(loading);
  }
});
