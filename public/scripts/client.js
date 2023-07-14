/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

// Create tweet HTML structure
const createTweetElement = function (tweet) {
  //Determine age of tweet
  function timeStamp(time) {
    const ageInMs = Math.abs(new Date().getTime() - time);
    const ageInDays = Math.round(ageInMs / (1000 * 60 * 60 * 24));
    const ageInYears = Math.round(ageInDays / 365);
    const ageInHours = Math.round(ageInDays / (1000 * 60 * 60));
    const ageInMins = Math.round(ageInDays / (1000 * 60));
    const ageInSeconds = Math.round(ageInDays / 1000);

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
  tweets.forEach((tweet) => {
    $(".new-tweet-container").append(createTweetElement(tweet));
  });
};

$(document).ready(function () {
  renderTweets(data); //render tweet data once the document is loaded
});
