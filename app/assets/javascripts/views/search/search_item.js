RationalReads.Views.SearchItem = Backbone.View.extend({
  formTemplate: JST['search/search_show'],

  initialize: function () {
    this.$el = $("<li class='search-item'>")
  },

  render: function () {
    var content = this.formTemplate({work: this.model});

    this.$el.html(content);

    return this;
  },


});
