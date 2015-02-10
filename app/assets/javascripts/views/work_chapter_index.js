RationalReads.Views.LatestAdditionsIndex = Backbone.CompositeView.extend({
  template: JST['works/headers/insert_location'],

  initialize: function (options) {
    this.$el = $("<div class='centered'>");
    this.chapters = options.chapters;
    this.works = options.works;
  },

  render: function () {
    this.$el.append(this.template());

    var sortedItems = this.merge();

    sortedItems.forEach( function (item, index) {
      if (item.type === "chapter") {
        var subItem = new RationalReads.Views.ChapterItem({
            model: item,
            index: index
          });
        } else {
          var subItem = new RationalReads.Views.WorkItem({
            model: item,
            type: "latest",
            index: index
          });
        }
        this.addSubview('.index', subItem);
      }.bind(this));

    return this;
  },

  merge: function () {
    var sortedItems = [];

    while (sortedItems.length < 10) {
      if (this.chapters.length === 0) {
        sortedItems.push(this.works.at(0));
        this.works.remove(this.works.at(0));
      } else if (this.works.length === 0) {
        sortedItems.push(this.chapters.at(0));
        this.chapters.remove(this.chapters.at(0));
      } else {
        var chapter = this.chapters.first();
        var work = this.works.first();

        var chapterDate = new Date(chapter.get("created_at"));
        var workDate = new Date(work.get("created_at"));

        if (chapterDate < workDate) {
          sortedItems.push(work);
          this.works.remove(this.works.at(0));
        } else {
          sortedItems.push(chapter);
          this.chapters.remove(this.chapters.at(0));
        }
      }
    }

    return sortedItems;
  }

});
