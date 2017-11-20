$(document).ready(function(){


  $(".new-tweet > form > textarea").on("onchange", function(event){
    let text = $(this).val().trim();
    let textLength = text.length;
    let remainingText = 140 - textLength;
    let counter = $(this).siblings(".counter");

    counter.text(remainingText);

    console.log(textLength);

    if(remainingText < 0){
      $(counter).addClass("alert");
    } else{
      $(counter).removeClass("alert");
    }
  })

})

