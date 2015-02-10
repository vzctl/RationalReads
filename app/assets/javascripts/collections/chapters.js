RationalReads.Collections.Chapters = Backbone.Collection.extend({
  model: RationalReads.Models.Chapter,
  url: '/api/chapters',

  comparator: function (chapter) {
    return -chapter.get("number");
  },

  strategies: {
    rating: function (work) { return -work.get("average_rating"); },
    date: function (work) {
      var date = new Date(work.get("created_at"))
      return -date.getTime();
    },
    name: function (work) {
      return work.get("name");
    },
    comments: function (work) {
      return -work.get("num_comments");
    },
  },

   changeSort: function (sortProperty) {
       this.comparator = this.strategies[sortProperty];
   }
});
