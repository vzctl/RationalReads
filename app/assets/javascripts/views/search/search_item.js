RationalReads.Views.SearchItem = Backbone.CompositeView.extend({
  formTemplate: JST['search/search_show'],

  initialize: function (options) {
    this.$el = $("<li class='search-item'>")
  },

  render: function () {
    var content = this.formTemplate({work: this.model});

    this.$el.html(content);

    return this;
  },


});
