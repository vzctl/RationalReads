RationalReads.Views.SearchItem = Backbone.View.extend({
  formTemplate: JST['search/search_show'],

  initialize: function (options) {
    this.$el = $("<li class='search-item'>"),
    this.index = options.index
  },

  render: function () {
    var content = this.formTemplate({work: this.model, index: this.index});

    this.$el.html(content);

    return this;
  },


});
