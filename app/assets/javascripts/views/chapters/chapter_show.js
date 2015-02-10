RationalReads.Views.ChaptersShow = Backbone.CompositeView.extend({
  commentHeaderTemplate: JST['comments/headers/work_comment_header'],
  childInsertionTemplate: JST['comments/child_comment_marker'],
  template: JST['chapters/chapter_show'],

  initialize: function () {
    RationalReads.Utils.MoveTop();
    this.$el = $("<div class='centered'>");
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
    var content = this.template({chapter: this.model})

    this.$el.append(content);

    var $raty = this.$el.find(".raty");

    $raty.raty({
      score: this.model.get("average_rating"),
      click : function (score) {
        this.submitRating(score);
      }.bind(this)
    });
  },

  renderCommentForm: function () {
    this.$el.append("<div id='comment-form'>")

    var newComment = new RationalReads.Views.CommentForm({
      parent_comment: null,
      chapter: this.model,
      type: "chapter",
      reply: false
    });

    this.addSubview('#comment-form', newComment)
  },

  renderTopLevelComments: function () {
    this.$el.append(this.commentHeaderTemplate());
    this.$el.append("<div id='comment'>")

    this.model.comments().sort();
    var remainingChildren = [];

    this.model.comments().each(function (comment) {
      if (comment.get("parent_comment_id") === "none") {
        var commentItem = new RationalReads.Views.CommentItem({
          model: comment,
          chapter: this.model,
          type: "chapter"
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
  },

  submitRating: function (score) {

    var rating = new RationalReads.Models.Rating();
    var chapter_id = this.model.get("id");

    rating.set({chapter_id: chapter_id, rating: score});
    rating.save({},
      {
        success: function(model, response) {
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          if (response.type === "create") {
            this._updateStatsAfterCreate($ratingResponse, response);
          } else {
            this._updateStatsAfterUpdate($ratingResponse, response);
          }
          this._ratingGraphic($ratingResponse, $raty, score)
        }.bind(this),
        error: function (model, response) {
          debugger
          var $raty = this.$el.find(".raty");
          var $ratingResponse = $("<p class='transition'></p>");
          this._updateStatsAfterError($ratingResponse, $raty, response);
        }.bind(this)
      }
    )
  },

  _ratingGraphic: function ($ratingResponse, $raty, score) {
    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);

    setTimeout( function () {
      $raty.animate({'opacity': 0}, 500, function () {
        $raty.raty({
          score: score,
          click : function (score) {
            this.submitRating(score);
          }.bind(this)
        });
      }.bind(this)).animate({'opacity': 1}, 10);
    }.bind(this), 1000)
  },

  _updateStatsAfterCreate: function($ratingResponse, response) {
    $ratingResponse.text("Added!");
    var numRatings = response.ratings;
    var $numRatings = this.$el.find(".num-ratings-number");

    $numRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(numRatings);
    }).animate({'opacity': 1}, 10);

    this._updateAverageRating(response.average_rating, response);
  },

  _updateStatsAfterUpdate: function($ratingResponse, response) {
    $ratingResponse.text("Updated!");
    this._updateAverageRating(response.average_rating, response);
    },

  _updateAverageRating: function(avgRating, response) {
    var $avgRatings = this.$el.find("span.avg");

    $avgRatings.animate({'opacity': 0}, 500, function () {
        $(this).text(avgRating);
    }).animate({'opacity': 1}, 10);

  },

  _updateStatsAfterError: function($ratingResponse, $raty, response) {
    $ratingResponse.append(response.responseJSON);
    debugger
    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);
  }


});
