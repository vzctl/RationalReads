RationalReads.Views.WorksIndex = Backbone.CompositeView.extend({
  indexTemplate: JST['works/headers/index_header'],
  recommendationsTemplate: JST['works/headers/recommendations_header'],
  searchTemplate: JST['works/headers/search_header'],
  template: JST['works/headers/insert_location'],

  initialize: function (options) {
    this.type = options.type;
  },

  render: function () {
    if (this.type === "index") {
      this.$el.html(this.indexTemplate());
    } else if (this.type === "recommendations" ){
      this.$el.html(this.recommendationsTemplate());
    } else if (this.type === "search") {
      this.$el.html(this.searchTemplate());
    }

    this.$el.append(this.template());

    this.collection.sort();

    this.collection.each( function (work, index) {
      var subItem = new RationalReads.Views.WorkItem({
        model: work,
        type: this.type,
        index: index
      });
      this.addSubview('.index', subItem);
    }.bind(this));

    return this;
  },

});
