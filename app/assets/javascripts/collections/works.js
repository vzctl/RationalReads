RationalReads.Collections.Works = Backbone.Collection.extend({
  url: 'api/works',
  model: RationalReads.Models.Work,

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

  orderBy: function (comparator) {
    this.changeSort(comparator);
    this.sort();
  },

  strategies: {
    average_rating: function (work) {
      return -work.get("average_rating");
    },
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
    bayesian_average: function (work) {
      return -work.get("bayesian_average");
    },
    length: function (work) {

      var lengthInNum = function lengthInNum (length) {
        if (length === "Short") {
          return 3
        } else if (length === "Medium") {
          return 2
        } else if (length === "Long") {
          return 1
        } else if (length === "Epic") {
          return 0
        }
      }
      var length = work.get("length");
      return lengthInNum(length);
    }
  },

  parse: function (response) {
    this.pages = response.pages;
    return response.works;
  },

   changeSort: function (sortProperty) {
       this.comparator = this.strategies[sortProperty];
   }

});
