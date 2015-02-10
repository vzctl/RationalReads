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

    sortedItems.forEach( function (item) {
      if (item.type === ""
      console.log(item.get("time_ago"));
    });

    // this.chapters.each( function (chapter, index) {
    //   var subItem = new RationalReads.Views.ChapterItem({
    //     model: chapter,
    //     index: index
    //   });
    //   this.addSubview('.index', subItem);
    // }.bind(this));
    //
    // this.works.each( function (work, index) {
    //   var subItem = new RationalReads.Views.WorkItem({
    //     model: work,
    //     type: "latest",
    //     index: index
    //   });
    //   this.addSubview('.index', subItem);
    // }.bind(this));

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
        if (chapterDate > workDate) {
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
