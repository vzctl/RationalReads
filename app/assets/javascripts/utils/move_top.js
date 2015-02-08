RationalReads.Utils.MoveTop = function () {
  var distance = $(document).scrollTop();
  $.scrollTo(0, 0, {duration: distance/2});
};
