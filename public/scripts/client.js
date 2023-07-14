/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create tweet HTML structure
const createTweetElement = function (tweet) {
  //Determine age of tweet
  function timeStamp(timeCreated) {
    const ageInMs = Math.abs(new Date().getTime() - timeCreated);
    const ageInSeconds = Math.round(ageInMs / 1000);
    const ageInMins = Math.round(ageInSeconds / 60);
    const ageInHours = Math.round(ageInMins / 60);
    const ageInDays = Math.round(ageInHours / 24);
    const ageInYears = Math.round(ageInDays / 365);

    if (ageInYears >= 1) {
      return ageInYears === 1
        ? `${ageInYears} year ago`
        : `${ageInYears} years ago`;
    } else if (ageInDays >= 1) {
      return ageInDays === 1 ? `${ageInDays} day ago` : `${ageInDays} days ago`;
    } else if (ageInHours >= 1) {
      return ageInHours === 1
        ? `${ageInHours} hour ago`
        : `${ageInHours} hours ago`;
    } else if (ageInMins >= 1) {
      return ageInMins === 1
        ? `${ageInMins} minute ago`
        : `${ageInMins} minutes ago`;
    } else {
      return ageInSeconds === 1
        ? `${ageInSeconds} second ago`
        : `${ageInSeconds} seconds ago`;
    }
  }

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
        <span class="tweet-age">${timeStamp(tweet.created_at)}</span>
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
const getDatabase = () => {
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
  $.post("/tweets/", serializedFormData).then(() => {
    getDatabase();
  });
};

//when document is loaded
$(document).ready(function () {
  //Get the database
  getDatabase();
  //listen for new tweet submission from form and add to db
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();
    postFormData();
  });
});
