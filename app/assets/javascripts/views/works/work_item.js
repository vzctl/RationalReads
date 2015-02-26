RationalReads.Views.WorkItem = Backbone.View.extend({

  initialize: function (options) {
    this.type = options.type;
    this.index = options.index;
    this.hover = false;
  },

  readTemplate: JST['works/display/read_show'],
  fullTemplate: JST['works/display/index_show'],
  showTemplate: JST['works/display/work_show'],
  homeTemplate: JST['works/display/home_show'],
  latestTemplate: JST['works/display/latest_show'],

  events: {
    "click .more": "expandDescription",
    "mouseover": "enlarge",
    "mouseleave": "shrink"
  },

  expandDescription: function () {
    $(this.$el.find(".more")).remove();
    $(this.$el.find(".hidden-display")).slideDown("slow");
    this.$el = $("<div class='item'>");
  },

  enlarge: function (event) {
    setTimeout(function() {
      if (!this.hover && this.indexPage()) {
        this.hover = true;
        this.$description = this.$el.find(".description");

        this.$borderBox = this.$el.find(".index-display");
        this.$previousEl = $(this.$el).prev();
        this.$nextEl = $(this.$el).next();
        this.$prevBorder = this.$previousEl.find(".index-display");

        if (this.$previousEl.length > 0) {
          this.$el.css({'margin-top': ''}).animate({
            'margin-top': -3
          }, 0);
        }

        this.$prevBorder.css({border: ''}).animate({
          borderWidth: 4
        }, 0);

        if (this.$nextEl.length > 0) {
          this.$borderBox.css({border: ''}).animate({
            borderWidth: 4
          }, 0);

          this.$nextEl.css({'margin-top': ''}).animate({
            'margin-top': -3
          }, 0);
        } else {
          $(".footer").css({'margin-top': ''}).animate({
            'margin-top': 12
          }, 0);
        }

        setTimeout( function(){
          this.$description.css( {'font-weight':500} )
        }.bind(this), 30);
        setTimeout( function(){
          this.$description.css( {'font-weight':600} )
        }.bind(this), 40);
      }
    }.bind(this), 0);
  },

  shrink: function (event) {
    setTimeout(function() {
      if (this.hover && this.indexPage()) {
        this.hover = false;
        this.$borderBox.css({border: ''}).animate({
          borderWidth: 1
        }, 0);

        this.$el.css({'margin-top': ''}).animate({
          'margin-top': 0
        }, 0);

        this.$prevBorder.css({border: ''}).animate({
          borderWidth: 1
        }, 0);

        if (this.$nextEl.length > 0) {
          this.$nextEl.css({'margin-top': ''}).animate({
            'margin-top': 0
          }, 0);
        } else {
          $(".footer").css({'margin-top': ''}).animate({
            'margin-top': 15
          }, 0);
        }

        setTimeout( function(){
          this.$description.css( {'font-weight':500} )
        }.bind(this), 30);
        setTimeout( function(){
          this.$description.css( {'font-weight':400} )
        }.bind(this), 40);
      }
    }.bind(this), 0);
  },

  indexPage: function () {
    if (this.type === "index" || this.type === "recommendations" || this.type === "search") {
      return true
    } else {
      return false
    }
  },

  render: function () {
    var displayRating = this.model.get("bayesian_average");

    if (this.indexPage()) {
      var content = this.fullTemplate({work: this.model});
    } else if (this.type === "read") {
      this.$el = $("<tr>")
      var content = this.readTemplate({work: this.model});
      displayRating = this.model.get("user_rating");
    } else if (this.type === "home") {
      var content = this.homeTemplate({work: this.model, index: this.index});
    } else if (this.type === "latest"){
      var content = this.latestTemplate({work: this.model});
    } else if (this.type === "show") {
      var cookie = document.cookie;
      var mod = cookie[cookie.indexOf("mod")+4]
      var content = this.showTemplate({work: this.model, mod: mod});
    }

    content = RationalReads.Utils.ShowMore.call(this, content, this.type);

    this.$el.html(content);

    var $raty = this.$el.find(".raty")
    $raty.raty({
      score: displayRating,
      click : function (score) {
        this.submitRating(score);
      }.bind(this)
    });

    return this
  },

  submitRating: function (score) {

    var rating = new RationalReads.Models.Rating();
    var work_id = this.model.get("id");
    rating.set({work_id: work_id, rating: score});
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
    $ratingResponse.append(response.responseJSON[0]);

    $raty.animate({'opacity': 0}, 500, function () {
        $(this).html($ratingResponse);
    }).animate({'opacity': 1}, 10);
  }

});
