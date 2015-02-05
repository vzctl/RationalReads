RationalReads.Collections.Works = Backbone.Collection.extend({
  url: 'api/works',
  model: RationalReads.Models.Work,

  comparator: function (work) {
    return -work.get("average_rating");
  },

  read: function () {
    filtered = this.filter( function(work) {
      return !(work.get("user_rating") === "none");
    });

    return new RationalReads.Collections.Works(filtered);
  },

  recommendedWorks: function () {
    filtered = this.filter( function(work) {
      return (work.get("user_rating") === "none");
    });

    return new RationalReads.Collections.Works(filtered);
  }
});
