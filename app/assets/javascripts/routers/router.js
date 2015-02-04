RationalReads.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    // this.navBar = $("#navbar");
    // this.footer = $("#footer");
    this.$rootEl = $('#main');
    this.works = new RationalReads.Collections.Works();

    var that = this;

    this.works.fetch({
      success: function () {
        console.log(that.works);
      }
    });
  },

  routes: {
    '': 'home',
  },

  home: function () {
    var indexView = new RationalReads.Views.WorksIndex({
        fullscreen: true,
        collection: this.works
      });

    this._swapView(indexView);
  },

  boardShow: function (id) {
    // var board = TrelloClone.Collections.boards.getOrFetch(id);
    //
    // var view = new TrelloClone.Views.BoardShow({
    //   model: board
    // });
    //
    // this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
