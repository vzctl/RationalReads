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

  contains: function (terms) {
    filtered = this.filter( function(work) {
      var workName = work.get("name").toLowerCase();
      var searchString = terms.toLowerCase()
      return !(workName.indexOf(searchString) === -1);
    });

    return new RationalReads.Collections.Works(filtered);
  },

  recommendedWorks: function () {
    var ratedWorks = 0;
    filtered = this.filter( function(work) {
      if (work.get("user_rating") === "none") {
        ratedWorks++;
        return true;
      } else {
        return false;
      }
    });

    if (ratedWorks === this.length) {
      return "none";
    } else {
      return new RationalReads.Collections.Works(filtered);
    }
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
      console.log(work.get("num_comments"))
      return -work.get("num_comments");
    }
  },

   changeSort: function (sortProperty) {
       this.comparator = this.strategies[sortProperty];
   }

});
