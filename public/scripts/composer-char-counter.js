//after document is loaded listen on textarea element for input event
$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    const charLimit = 140; //limit of 140 chars
    let currentLength = $(this).val().length;

    //traverse up the DOM tree to the parent form node then find a child output node with class "counter", then assign the text value of characters left
    $(this)
      .parent("form")
      .find("output.counter")
      .text(charLimit - currentLength);

    // Set color of output element text based on the number of chars left
    if (charLimit - currentLength < 0) {
      $(this).parent("form").find("output.counter").css("color", "red");
    } else {
      $(this).parent("form").find("output.counter").css("color", "#545149");
    }
  });
});
