window.RationalReads = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new RationalReads.Routers.Router
    Backbone.history.start();
  }
};
