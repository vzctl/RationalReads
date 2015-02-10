RationalReads.Collections.Chapters = Backbone.Collection.extend({
  model: RationalReads.Models.Chapter,

  comparator: function (chapter) {
    return chapter.get("number");
  }
});
