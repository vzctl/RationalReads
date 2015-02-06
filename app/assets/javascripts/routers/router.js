RationalReads.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'home',
    'works': 'all',
    'my-works': 'read',
    'recommendations': 'recommendations',
    'works/new' : 'newWork',
    'works/:id': 'show',
    'search/:terms': 'search'
  },

  newWork: function () {
    var workForm = new RationalReads.Views.WorkForm();

    this._swapView(workForm);
  },

  search: function (terms) {
    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        works = works.contains(terms);
        works.changeSort("name");
        works.sort();
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "search",
            style: "index"
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  home: function () {
    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        var homeView = new RationalReads.Views.HomeView({
            collection: works
          });

        this._swapView(homeView);
      }.bind(this)
    })
  },

  recommendations: function () {
    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        works = works.recommendedWorks();
        works.sort();
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "recommendations",
            style: "index"
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  all: function () {
    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        var indexView = new RationalReads.Views.WorksIndex({
            collection: works,
            type: "all",
            style: "index"
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  read: function () {
    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        var readPosts = works.read();
        var indexView = new RationalReads.Views.ReadWorks({
            collection: readPosts
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  show: function (id) {
    var post = new RationalReads.Models.Work({id: id});

    post.fetch({
      success: function () {
        var showView = new RationalReads.Views.WorksShow({
            model: post
          });

        this._swapView(showView);
      }.bind(this)
    })

  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
