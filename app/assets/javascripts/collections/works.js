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
  },

  strategies: {
    rating: function (work) { return -work.get("average_rating"); },
    date: function (work) {
      var date = new Date(work.get("created_at"))
      return -date.getTime();
    }
  },

   changeSort: function (sortProperty) {
       this.comparator = this.strategies[sortProperty];
   }

});
