RationalReads.Views.ChapterBlock = Backbone.View.extend({
  template: JST['chapters/chapter_block'],

  events: {
    "click": "showChapter"
  },

  render: function () {
    var fillTag = this.getFillTagClass();
    var content = this.template({chapter: this.model, tag: fillTag});

    this.$el.html(content);

    return this;
  },

  showChapter: function () {
    Backbone.history.navigate("#/chapters/" + this.model.get("id"), {trigger: true});
  },


  getFillTagClass: function () {
    var score = this.model.get("avg_rating");
    var fillTag = "";
    if (score < .51) {
      fillTag = "rating05"
    } else if (score > .50 && score < 1.01) {
      fillTag = "rating10"
    } else if (score > 1.00 && score < 1.51) {
      fillTag = "rating15"
    } else if (score > 1.50 && score < 2.01) {
      fillTag = "rating20"
    } else if (score > 2.00 && score < 2.51) {
      fillTag = "rating25"
    } else if (score > 2.50 && score < 3.01) {
      fillTag = "rating30"
    } else if (score > 3.00 && score < 3.51) {
      fillTag = "rating35"
    } else if (score > 3.50 && score < 4.01) {
      fillTag = "rating40"
    } else if (score > 4.00 && score < 4.51) {
      fillTag = "rating45"
    } else if (score > 4.50 && score < 5.01) {
      fillTag = "rating45"
    }

    return fillTag;
  }

});
