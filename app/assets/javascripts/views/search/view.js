RationalReads.Views.SearchView = Backbone.CompositeView.extend({
  formTemplate: JST['search/search_form'],

  initialize: function (options) {
  },

  events: {
    "submit .search-bar": "renderResult"
  },

  render: function () {
    var content = this.formTemplate();

    this.$el.html(content);

    return this;
  },

  renderResult: function (event) {
    event.preventDefault();
    var searchTerm = $(event.currentTarget).find(".search").val()
    Backbone.history.navigate("#/search/" + searchTerm, {trigger: true})
  }
});
