/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function(){

  // Initially hide the new tweet form section

  $("section.new-tweet").hide();

  // On click event to toggle the form

  $("#compose").on("click", () => {
    $("section.new-tweet").slideToggle();
  });

  $('form').on("submit", (event) =>{
    event.preventDefault();
    let serialize = $(this).serialize();
    console.log(serialize);
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: serialize,
      success: function(data){
        console.log("success");
      }
    })
  });

// Function to load tweets through ajax get method

  function loadTweets(){
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'GET',
        dataType: 'json',
        success: function(json){
          return renderTweets(json);
        }
      });
  }

  loadTweets();

  // Function to render the tweets by looping through the database tweets

  function renderTweets(tweets){
    for(let tweet in tweets){
      tweetObject = tweets[tweet];
      $tweet = createTweetElement(tweetObject);
      $("#tweets_container").append($tweet);
    }
  }

  // Function to create dynamic new tweets

  function createTweetElement(object){
    $tweet = $("<article>").addClass("tweets");
    $header = $("<header>");
    $img = $("<img>").addClass("avatar").attr("src", object.user.avatars.small);
    $publisher = $("<h2>").addClass("publisher").text(object.user.name);
    $userLink = $("<a>").addClass("user_link").text(object.user.handle);
    $tweetBody = $("<p>").addClass("body").text(object.content.text);
    $footer = $("<footer>");

    // method to the time lapse

    $countDays = Math.floor((Date.now() - object.created_at) / (1000 * 60 * 60 * 24));

    $small = $("<small>").text($countDays + " days ago");
    $icons = $("<div>").addClass("icons");
    $iconsFlag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", true);
    $iconsRetweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", true);
    $iconsHeart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", true);

    $icons = $icons.append($iconsFlag).append($iconsRetweet).append($iconsHeart)
    $header = $header.append($img).append($publisher).append($userLink);
    $footer = $footer.append($small).append($icons)
    $tweet = $tweet.append($header).append($tweetBody).append($footer);

    return $tweet;
  }

});
