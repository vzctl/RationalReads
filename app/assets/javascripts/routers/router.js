RationalReads.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    // this.navBar = $("#navbar");
    // this.footer = $("#footer");
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'home',
    'my-books': 'read'
  },

  home: function () {
    var posts = new RationalReads.Collections.Works();

    posts.fetch({
      success: function () {
        var indexView = new RationalReads.Views.WorksIndex({
            fullscreen: true,
            collection: posts
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  read: function () {
    var posts = new RationalReads.Collections.Works();

    posts.fetch({
      success: function () {
        var readPosts = posts.read();
        var indexView = new RationalReads.Views.ReadWorks({
            fullscreen: true,
            collection: readPosts
          });

        this._swapView(indexView);
      }.bind(this)
    })
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
