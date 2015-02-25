RationalReads.Views.Loading = Backbone.CompositeView.extend({
  template: JST['loading'],

  initialize: function () {
    this.spinnerOptions = {
      lines: 17, // The number of lines to draw
      length: 13, // The length of each line
      width: 6, // The line thickness
      radius: 15, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#1ABDD6', // #rgb or #rrggbb or array of colors
      speed: 1.3, // Rounds per second
      trail: 100, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '10%', // Top position relative to parent
      left: '45%' // Left position relative to parent
    }
  },

  render: function () {
    this.$el.append(this.template());
    var $target = this.$el.find("#spinner");
    var spinner = new Spinner(this.spinnerOptions).spin();

    setTimeout(function() {
      $target.append(spinner.el);
    }.bind(this), 300);


    RationalReads.Utils.MoveTop();
    return this
  }

});
