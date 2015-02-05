RationalReads.Collections.Comments = Backbone.Collection.extend({
  model: RationalReads.Models.Comment,

  comparator: function (comment) {
    return comment.get("time_ago");
  }
});
