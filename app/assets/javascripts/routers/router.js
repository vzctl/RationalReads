RationalReads.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    // this.navBar = $("#navbar");
    // this.footer = $("#footer");
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'home',
    'my-books': 'read',
    'works/:id': 'show'
  },

  home: function () {
    var posts = new RationalReads.Collections.Works();

    posts.fetch({
      success: function () {
        var indexView = new RationalReads.Views.WorksIndex({
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
