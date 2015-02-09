RationalReads.Utils.ShowMore = function (content, type) {
  var $modifiedContent = $(content);
  $description = $modifiedContent.find(".description");
  var description = $description.text();
  var initialCut = 383;

  if (type === "index") {
    initialCut = 600;
  } else if (type === "show") {
    initialCut = 2000;
  }

  var cutOff = description.substring(0, initialCut).lastIndexOf(".") + 1;

  if (description.length > initialCut) {
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
