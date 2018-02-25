$(function() {
  function messagesHTML(message){
    // ifを三項演算子に書き換え
    var imageURL = (message.image)? `<img class="lower-message__image" src= ${message.image} >`: "";
    var html =
      `<div class="message" data-id=${message.id}>
         <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
         </div>
         <div class="upper-message__date">
            ${message.date}
         </div>
         </div>
         <div class="lower-message">
          <p class="lower-message__content">
            ${message.text}
          </p>
            ${imageURL}
         </div>
        </div>`
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = messagesHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('#new_message').on("submit", function(){
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
      });
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });


//自動更新機能

    var interval = setInterval(function(){
      // 正規表現でURLに一致しないページで自動更新しないよう分岐
      if (location.href.match(/\/groups\/\d+\/messages/)){
        var message_id = $('.message:last').data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { message: { id: message_id } },
      dataType: 'json'
    })
    .done(function(new_messages){
      $.each(new_messages,function(i,new_message){
        var html = messagesHTML(new_message)
        $('.messages').append(html)
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
      })
    })
    .fail(function() {
      alert('自動更新失敗');
    });
  } else {
    clearInterval(interval);
  }} , 5000 );
});
