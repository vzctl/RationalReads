RationalReads.Views.WorksShow = Backbone.CompositeView.extend({
  template: JST['comments/headers/work_comment_header'],
  chapterHeaderTemplate: JST['chapters/headers/chapter_index_header'],
  childInsertionTemplate: JST['comments/child_comment_marker'],

  initialize: function () {
    this.type = "show";
    RationalReads.Utils.MoveTop();
    this.$el = $("<div class='centered'>");
  },

  render: function () {
    this.renderWork();
    this.reSizeRatingBars();
    this.renderChapters();
    this.renderCommentForm();
    var remainingChildren = this.renderTopLevelComments();

    while (remainingChildren.length > 0) {
      var deletes = this.renderChildren(remainingChildren);
      deletes.sort( function (a,b) {
        return b - a;
      });

      remainingChildren = this.deleteArrayAt(remainingChildren, deletes);
    }

    return this;
  },

  reSizeRatingBars: function () {
    var distribution = this.ratingDistribution()
    for (var rating in distribution) {
      var bar = $(this.$el.find("." + rating))
      bar.width(350*distribution[rating])
    };
  },

  ratingDistribution: function () {
    var ratings = this.model.get("ratings");
    distribution = {};
    distribution["ones"] = this.model.get("ones") / ratings;
    distribution["twos"] = this.model.get("twos") / ratings;
    distribution["threes"] = this.model.get("threes") / ratings;
    distribution["fours"] = this.model.get("fours") / ratings;
    distribution["fives"] = this.model.get("fives") / ratings;

    return distribution
  },

  renderChapters: function () {
    if (this.model.chapters().length > 0) {
      var type = "full";
      this.$el.append(this.chapterHeaderTemplate());
      this.$el.append("<div id='chapters'>");
      this.model.chapters().each( function (chapter) {
        var newChapter = new RationalReads.Views.ChapterBlock({
          model: chapter
        });

        this.addSubview('#chapters', newChapter);
      }.bind(this))
    } else {
      var type = "short";
      this.$el.append("<div id='chapters'>");
    }
    var chapterFormButton = new RationalReads.Views.ChapterForm({
      model: this.model,
      type: type
    });

    this.addSubview('#chapters', chapterFormButton);

    if (this.model.chapters().length > 0) {
      this.renderFollowForm();
    }
  },

  renderFollowForm: function () {
    var newFollow = new RationalReads.Models.Follow({id: this.model.id});

    newFollow.fetch({
      error: function () {
        var followForm = new RationalReads.Views.FollowForm({
          model: this.model,
          followed: false
        });

        this.addSubview('#chapters', followForm);
      }.bind(this),
      success: function () {
        var followForm = new RationalReads.Views.FollowForm({
          model: this.model,
          followed: true,
          follow: newFollow
        });

        this.addSubview('#chapters', followForm);
      }.bind(this)
    });
  },

  renderWork: function () {
    this.$el.append("<div id='work-info'>");

    var workShow = new RationalReads.Views.WorkItem({
      model: this.model,
      type: this.type
    });

    this.addSubview('#work-info', workShow);
  },

  renderCommentForm: function () {
    this.$el.append("<div id='comment-form'>")

    var newComment = new RationalReads.Views.CommentForm({
      parent_comment: null,
      work: this.model,
      reply: false
    });

    this.addSubview('#comment-form', newComment)
  },

  renderTopLevelComments: function () {
    var remainingChildren = [];

    if (this.model.comments().length > 0) {
      this.$el.append(this.template());
      this.$el.append("<div id='comment'>")
      this.model.comments().sort();
    }

    this.model.comments().each(function (comment) {
      if (comment.get("parent_comment_id") === "none") {
        var commentItem = new RationalReads.Views.CommentItem({
          model: comment,
          work: this.model
        });
        this.addSubview('#comment', commentItem);
      } else {
        remainingChildren.push(comment);
      }
    }.bind(this));

    return remainingChildren
  },

  deleteArrayAt: function (remainingChildren, deletes) {
    deletes.forEach ( function (comment_index) {
      remainingChildren.splice(comment_index, 1);
    }.bind(this))

    return remainingChildren
  },

  renderChildren: function (remainingChildren) {
    var deletes = [];

    var childComments = new RationalReads.Collections.Comments();
    childComments.reset(remainingChildren);
    childComments.sort()

    childComments.each( function (comment, index) {
      var parentElement = this.$el.find('#' + comment.get("parent_comment_id"))
      if (parentElement.length > 0 ) {
        var commentItem = new RationalReads.Views.CommentItem({
          model: comment,
          work: this.model
        });

        if ( !(this.$el.find('#c' + comment.get("parent_comment_id")).length > 0) ) {
          var childInsertionDiv = this.childInsertionTemplate({id: comment.get("parent_comment_id")});
          var parentOfParent = $(parentElement).parent();
          $(childInsertionDiv).insertAfter(parentOfParent);
        }
        this.addSubview('#c' + comment.get("parent_comment_id"), commentItem);

        deletes.push(index);
      }
    }.bind(this));

    return deletes
  }

});
