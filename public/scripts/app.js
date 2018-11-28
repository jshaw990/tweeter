function renderTweets(tweets) {
  tweets.forEach(tweet => {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  })
}

function createTweetElement(tweet) {
  let $tweet = `<article>
    <header>
      <img class="avatar" src=${tweet.user.avatars.small}>
      <span name="username" style="vertical-align:top">${tweet.user.name}</span>
      <span name="handle" style="float:right">${tweet.user.handle}</span>
    </header>
    <span readonly name="tweet">${tweet.content.text}</span><hr>
    <footer class="contFoot">
      <span name="days">${moment(tweet.created_at).fromNow()}</span>
      <img name="flags" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/triangular-flag-on-post_1f6a9.png">
      <img name="flags" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/anticlockwise-downwards-and-upwards-open-circle-arrows_1f504.png">
      <img name="flags" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/black-heart-suit_2665.png">
    </footer>
  </article>`
  return $tweet;
}

function loadData() {

  $.ajax({
    method: "GET",
    url: "/tweets",
  })
    .done(function (tweets) {
      renderTweets(tweets)
    })
}

$(document).ready(function () {

  loadData();

  $('form').on('submit', function (event) {
    event.preventDefault()
    const $form = $(this);
    var text = event.target.elements.text
    if (text.value === '' || text.value.length + 1 > 140) {
      $(".alert").toggle().slideDown();
      return
    }
    $(".alert").hide();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $form.serialize()
    }).then(() => {
      $('#tweets-container').html("")
      loadData();
      text.value = '';
     $('span.counter').text(140);
    })
  })
})