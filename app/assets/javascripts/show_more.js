RationalReads.Plugins.ShowMore = function (content) {
  var $modifiedContent = $(content);
  $description = $modifiedContent.find(".description");
  var description = $description.text();

  var cutOff = description.substring(0, 383).lastIndexOf(".") + 1;

  if (description.length > 383) {
    var top = description.substring(0, cutOff);
    var bottom = description.substring(cutOff + 1, description.length);
    $description.text(top);

    var $link = $("<a>");
    $link.addClass("more")
    $link.text(" More...");
    $description.append($link);
    var $hiddenDiv = $("<div>");
    $hiddenDiv.addClass("hidden-display");

    $hiddenDiv.text(bottom);
    $description.append($hiddenDiv);
  }

  return $modifiedContent;
};
