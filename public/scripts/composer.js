$(document).ready(function () {
  // listen for click on element
  $("#write-tweet").on("click", function () {
    $("#container")
      .find(".new-tweet")
      .slideToggle(400, function () {
        // if element height is > 0 then find the child textarea and focus on it
        if ($(this).height()) {
          $(this).find("input[type=text], textarea").focus();
        }
      });
  });

  //When screen scolls change CSS classes so that #scroll-top link shows/hides, and hide/show the nav bar
  $(window).scroll(function () {
    let yAxis = $(this).scrollTop();
    if (yAxis > 0) {
      $("#scroll-top").addClass("show");
      $("#scroll-top").removeClass("hide");
      $("#write-tweet").parent().slideUp(400);
    } else {
      $("#scroll-top").removeClass("show");
      $("#scroll-top").addClass("hide");
      $("#write-tweet").parent().slideDown(400);
    }
  });

  //when the #scroll-top link is clicked scroll top of the page and focus on the tweet textarea
  $("#scroll-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: "0" }, 400, function () {
      $("#submit-tweet").find("input[type=text], textarea").focus();
    });
  });
});
