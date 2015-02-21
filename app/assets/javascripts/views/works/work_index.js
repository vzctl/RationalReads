RationalReads.Views.WorksIndex = Backbone.CompositeView.extend({
  indexTemplate: JST['works/headers/index_header'],
  recommendationsTemplate: JST['works/headers/recommendations_header'],
  searchTemplate: JST['works/headers/search_header'],
  template: JST['works/headers/insert_location'],
  paginationTemplate: JST['works/pagination'],
  filterFormTemplate: JST['works/filter'],

  events: {
    "click .pagination-links a": "detectDesiredPage",
    "click .filter-link": "renderFilterForm"
  },

  initialize: function (options) {
    this.type = options.type;
    RationalReads.Utils.MoveTop();
    this.$el = $("<div class='centered'>");
    this.listenTo(this.collection, "sync", this.render);
    this.currentPage = "1";
  },

  render: function () {
    this.removePastPages();
    if (this.type === "index") {
      this.$el.html(this.indexTemplate());
    } else if (this.type === "recommendations" ){
      this.$el.html(this.recommendationsTemplate());
    } else if (this.type === "search") {
      this.$el.html(this.searchTemplate());
    }

    this.$el.append(this.template());

    this.renderWorks();

    return this;
  },

  renderFilterForm: function () {
    var tags = new RationalReads.Collections.Tags();

    tags.fetch({
      success: function (model, response) {
        var form = this.filterFormTemplate({tags: tags});
        var $formDiv = $(".filter-form")
        $formDiv.html(form);
        $formDiv.slideDown({
          duration: "slow"
        });
      }.bind(this)
    })
  },

  renderWorks: function () {
    this.collection.sort();

    this.collection.each( function (work, index) {
      var subItem = new RationalReads.Views.WorkItem({
        model: work,
        type: this.type,
        index: index
      });
      this.addSubview('.index', subItem);
    }.bind(this));

    if (this.type === "index") {
      // this.renderPagination();
    }
  },

  detectDesiredPage: function (event) {
    var page = $(event.currentTarget).text();
    if (this.currentPage !== page) {
      RationalReads.Utils.MoveTop();
      this.currentPage = page;
      this.collection.fetch({
        data: {page: page}
      })
    }
  },

  renderPagination: function () {
    var content = this.paginationTemplate({pages: this.collection.pages, currentPage: this.currentPage});
    this.$el.append(content);
  },

  removePastPages: function () {
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  }

});
