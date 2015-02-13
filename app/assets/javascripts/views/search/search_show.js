RationalReads.Views.SearchShow = Backbone.CompositeView.extend({
  formTemplate: JST['search/search_form'],

  initialize: function (options) {
    this.$el = $("<div class='seachbox'>");
    this.keyIndex = -1;
    this.link = "";
  },

  events: {
    "click #search-icon": "renderResult",
    "keyup .search": "autoComplete",
    "click #autocomplete": "clearSearch",
    "mouseleave": "clearSearchWithDelay",
    "mouseenter #autocomplete": "clearHighlight",
    "keydown .search": "moveHighlight"
  },

  render: function () {
    var content = this.formTemplate();

    this.$el.html(content);

    return this;
  },

  clearHighlight: function () {
    $(".search-item-box").removeClass("hovered-box");
  },

  moveHighlight: function (event) {
    var searchTerm = $(".search").val();
    var $searchItem = $(".search-item-box#" + this.keyIndex);

    if (searchTerm.length > 0) {
      if (event.keyCode === 38) {
        if (this.keyIndex > 0) {
          this.keyIndex--;
        }
      } else if (event.keyCode === 40) {
        if (this.keyIndex < $(".search-item-box").length - 1) {
          this.keyIndex = this.keyIndex + 1;
        }
      } else if (event.keyCode === 13) {
        if (this.keyIndex > -1) {
          var workIndex = $searchItem.attr("index");
          Backbone.history.navigate("/works/" + workIndex, {trigger: true})
        } else {
          Backbone.history.navigate("/search/" + searchTerm, {trigger: true})
        }
        this.clearSearchWithNoDelay();
      }
      this.clearHighlight();
      $searchItem = $(".search-item-box#" + this.keyIndex);
      $searchItem.addClass("hovered-box")
    }
  },


  renderResult: function (event) {
    event.preventDefault();
    var searchTerm = $(".search").val()
    Backbone.history.navigate("#/search/" + searchTerm, {trigger: true})
  },

  autoComplete: function (event) {
      var searchText = $(event.currentTarget).val();
      if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13 && searchText.length > 0) {
      this.clearSearch();

      var works = new RationalReads.Collections.Works();

      works.fetch({
        success: function () {
          works = works.contains(searchText);
          works.changeSort("name");
          works.sort();
          var index = 0;
          works.each( function (work) {
            var searchItem = new RationalReads.Views.SearchItem({
              model: work,
              index: index
            });
            index++;

            this.addSubview("#autocomplete", searchItem);
          }.bind(this));

        }.bind(this)
      })
    }
  },

  clearSearch: function () {
    $(".search").empty();
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  clearSearchWithDelay: function () {
    setTimeout( this.clearSearch.bind(this), 1000);
    this.keyIndex = -1;
  },

  clearSearchWithNoDelay: function () {
    this.clearSearch();
    this.keyIndex = -1;
  }

});
