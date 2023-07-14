/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create tweet HTML structure
const createTweetElement = function (tweet) {
  const $tweet = `<article class="tweet">
    <header>
      <div class="user"> 
        <img src=${tweet.user.avatars} class="avatar">
        <span class="name">${tweet.user.name}</span>
      </div>
      <span class="tag">${tweet.user.handle}</span>
    </header>
    <p>
      ${tweet.content.text}
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
  $(".new-tweet-container").empty();
  tweets.forEach((tweet) => {
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
const postFormData = () => {
  const serializedFormData = $("#submit-tweet").serialize();
  $.post("/tweets/", serializedFormData)
    .then(() => {
      loadTweets();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

//when document is loaded
$(document).ready(function () {
  //Get the database
  loadTweets();
  //listen for new tweet submission from form and add to db
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();
    postFormData();
  });
});
