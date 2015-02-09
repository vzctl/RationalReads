RationalReads.Views.WorksShow = Backbone.CompositeView.extend({
  template: JST['comments/headers/work_comment_header'],
  childInsertionTemplate: JST['comments/child_comment_marker'],

  initialize: function () {
    this.type = "show";
    RationalReads.Utils.MoveTop();
  },

  render: function () {
    this.renderWork();
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
    this.$el.append(this.template());
    this.$el.append("<div id='comment'>")
    this.model.comments().sort();
    var remainingChildren = [];

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
