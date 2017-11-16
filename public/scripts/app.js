/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function(){

  // Initially hide the new tweet form section

  $("section.new-tweet").hide();

  // On click event to toggle the form

  $("#compose").on("click", function(){
    $("section.new-tweet").slideToggle();
  });

  $('form').on("submit", function(event){
    event.preventDefault();
    let serialize = $(this).serialize();
    let textareaVal = $(this).find("textarea").val();

      // Condition to check null or empty  or characters more than 140 in textarea

    if( !textareaVal || textareaVal === null){
      $("form").append('<div class="error">Cannot post empty tweet. Please add something!</div>');
      setTimeout(function(){
        $('.error').fadeOut();;
      }, 4000);

    } else if (textareaVal.length > 140){
      $("form").append('<div class="error">Your tweet is far too long</div>');
      setTimeout(function(){
        $('.error').fadeOut();;
      }, 4000);

    } else{
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: serialize,
        success: function(){
          console.log("success");
          loadTweets()
          $("textarea").val("");
          $(".counter").text(140);
        }
      })
    }
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
      $("#tweets_container").prepend($tweet);
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
