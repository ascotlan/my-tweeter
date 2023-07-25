/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create tweet HTML structure

const createTweetElement = function (tweet) {
  //a function to escape some text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = `<article class="tweet">
    <header>
      <div class="user"> 
        <img src=${tweet.user.avatars} class="avatar">
        <span class="name">${escape(tweet.user.name)}</span>
      </div>
      <span class="tag">${escape(tweet.user.handle)}</span>
    </header>
    <p>
      ${escape(tweet.content.text)}
    </p>
    <footer>
      <div class="footer-items">
        <span class="tweet-age">${timeago.format(tweet.created_at)}</span>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart">'</i>
        </div>
      </div>
    </footer>
  </article>`;

  return $tweet;
};

// loop through the collection of tweets and render each tweet
const renderTweets = function (tweets) {
  $(".new-tweet-container").empty(); //empty the .new-tweet-container
  tweets.forEach((tweet) => {
    //refille the .new-tweet-container in chronological order - new to old
    $(".new-tweet-container").prepend(createTweetElement(tweet));
  });
};

// Getdata bases and pass array of tweets to the renderTweets function
const loadTweets = () => {
  $.ajax({
    url: "/tweets/",
    type: "GET",
    dataType: "json",
    success: (data) => {
      renderTweets(data); //render tweet data from db once the document is loaded
    },
    error: (error) => {
      console.error("Error: ", error);
    },
  });
};

//Make a POST request to the '/tweets/' endpoint to save tweet to db
const postFormData = (serializedFormData) => {
  $.post("/tweets/", serializedFormData)
    .then(() => {
      loadTweets();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

const validateFormData = (formData) => {
  // trim tweet text of white spaces
  const tweet = $(formData).find("input[type=text], textarea").val().trim();
  //Get tweet char count
  const charCount = $("#tweet-text")
    .parent("form")
    .find("output.counter")
    .val();

  if (tweet === "") {
    $("#errorMessage")
      .slideDown(400)
      .css({
        border: "1px solid red",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      })
      .text("Tweet content is not present!")
      .parent()
      .css("padding", "0");

    return false;
  } else if (charCount < 0) {
    $("#errorMessage")
      .slideDown(400)
      .css({
        border: "1px solid red",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      })
      .text("Tweet content limit is 140 characters!")
      .parent()
      .css("padding", "0");

    return false;
  } else {
    return true;
  }
};

//when document is loaded
$(document).ready(function () {
  //clear textarea on refresh
  $("#submit-tweet").find("input[type=text], textarea").val("");

  //Get the database
  loadTweets();

  //listen for new tweet submission from form and add to db
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();

    // if error message is showing then slideUp element
    if ($("#errorMessage").text()) {
      $("#errorMessage").slideUp(400).parent().css("padding", "16px 0");
    }

    if (validateFormData(this)) {
      //serialize form data for posting to server endpoint
      const serializedFormData = $(this).serialize();

      //post form data if data entered is valid
      postFormData(serializedFormData);

      // Clear textarea input fields in the form when new tweet renders & reset counter value to 140
      $("#submit-tweet")
        .find("input[type=text], textarea")
        .val("")
        .parent()
        .find("output.counter")
        .val("140");
    }
  });
});
