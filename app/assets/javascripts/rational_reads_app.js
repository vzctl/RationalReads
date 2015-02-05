window.RationalReads = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new RationalReads.Routers.Router
    Backbone.history.start();
  }
};
