$(document).ready(function () {
  $("#write-tweet").on("click", function () {
    $("#container")
      .find(".new-tweet")
      .slideToggle(400, function () {
        if ($(this).height()) {
          $(this).find("input[type=text], textarea").focus();
        }
      });
  });
});
