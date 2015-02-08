RationalReads.Views.SearchShow = Backbone.CompositeView.extend({
  formTemplate: JST['search/search_form'],

  initialize: function (options) {
    this.$el = $("<div class='seachbox'>")
  },

  events: {
    "submit .search-bar": "renderResult",
    "keyup .search": "autoComplete",
    "click #autocomplete": "clearSearch",
    "mouseleave": "clearSearchWithDelay"
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
  },

  autoComplete: function (event) {
    var searchText = $(event.currentTarget).val();
    this.clearSearch();

    var works = new RationalReads.Collections.Works();

    works.fetch({
      success: function () {
        works = works.contains(searchText);
        works.changeSort("name");
        works.sort();
        works.each( function (work) {
          var searchItem = new RationalReads.Views.SearchItem({
            model: work
          });

          this.addSubview("#autocomplete", searchItem);
        }.bind(this));

      }.bind(this)
    })

  },

  clearSearch: function () {
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  clearSearchWithDelay: function () {
    setTimeout( this.clearSearch.bind(this), 1000);
  }

});
